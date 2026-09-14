import { Collection, Document, ObjectId } from "mongodb";
import db from "../db";
import { item } from "./Item";
import { User } from "./RegLog";
import jwt from 'jsonwebtoken';
import IsInCart, { AddMoneyToCreater } from "../utils/ItemsFunction";
import { skip } from "node:test";

interface Filter{
  minPrice?:number,
  maxPrice?:number,
  sort:-1|1
}

export default class{
    async GetData():Promise<item[]>{
        const client = (await db).db('test');
        const itemsCol:Collection<item> = client.collection('items');
        const items:item[] = await itemsCol.find().toArray();
        return items;
    }
    async GetCart(token:string):Promise<item[]>{
        const client = (await db).db('test');
        const users:Collection<User> = client.collection('users');
        const decoded:ObjectId = new ObjectId((await jwt.verify(token,process.env.SECRET!) as {_id:string})._id);
        const user = await users.aggregate([{$match:{_id:decoded}},{
            $lookup:{
                from:'items',
                localField:'cart',
                foreignField:'_id',
                as:'item'
            }
        }]).toArray();
        for(let i=0;i<user[0].item.length;i++){

                    user[0].item[i].isInCart = true;
                    
                }
       return user[0].item;
    }
    async Search(value:string,filter:Filter,categories:string[],token:string,page:number):Promise<item[]>{
        const client = (await db).db('test');
        const items:Collection<item> = await client.collection('items');
        if(value===undefined) value = '';

        if(categories.length==0) categories = (await this.GetAllCategories()).map((cat: { title: string }) => cat.title);

        const category = client.collection('categories');
const catResult: { _id: ObjectId }[] = await category.find(
    {
        title: {
            $in: categories
        }
    },
    {
        projection: {
            title: 0
        }
    }
).toArray();
       
        let result:item[] = [];
        const skipPage = (page-1)*8;
        
        result = (await items.find({title:{$regex:value?value:'',$options:'i'},categories: {$in:catResult},price:{$gt:filter.minPrice,$lt:filter.maxPrice}}).sort({title:filter.sort}).skip(skipPage).limit(8).toArray());
        
                  for(let i=0;i<result.length;i++){
                    result[i].isInCart = await IsInCart(token,new ObjectId(result[i]._id));
                }
        

        return result;
    }
    async GetHeader(token:string):Promise<{count:number,username:string,money:number}>{
        const client = (await db).db('test');
        const users = client.collection('users');
        const _id = (await jwt.verify(token,process.env.SECRET!) as {_id:string})._id;

        if(!token) return {count:0,username:'',money:0};

        const result = await users.findOne({_id:new ObjectId(_id)},{projection:{_id:0,username:1,cart:1}});
        const moneyResult:number = (await users.findOne({_id:new ObjectId(_id)},{projection:{_id:0,money:1}}))?.money;
        return {count:result?.cart?.length,username:result?.username,money:moneyResult?moneyResult:0};
    }
    async AddMoney(count:number,token:string){
        const client = (await db).db('test');
        const collection = client.collection('users');

        const _id = (jwt.verify(token,process.env.SECRET!) as {_id:string})._id;

        let result = await collection.findOne({_id:new ObjectId(_id)});
        const currentMoney:number = result?.money?result.money:0;

        collection.updateOne({_id:new ObjectId(_id)},{$set:{money:currentMoney+count}});
    }
    async GetAllCategories():Promise<{title:string}[]>{
        const client = (await db).db('test');
        const categories = client.collection<{title:string}>('categories');

        return (await categories.find({},{projection:{_id:0}})).toArray();
    }
    async Buy(token:string){
        const client = (await db).db('test');
        const users:Collection<User> = client.collection('users');
        if(!token) return 'something is wrong with the token';
        const decoded:ObjectId = new ObjectId((await jwt.verify(token,process.env.SECRET!) as {_id:string})._id);

       const cart = await users.aggregate([
    {
        $match: {
            _id: decoded
        }
    },
    {
        $lookup: {
            from: 'items',
            localField: 'cart',
            foreignField: '_id',
            as: 'cartItems'
        }
    }
]).toArray();
    const money = cart[0].money?cart[0].money:0;
    let fullPrice = 0;
    for(let i = 0;i<cart[0].cartItems.length;i++){
        fullPrice+=cart[0].cartItems[i].price;
    }
    if(money<fullPrice) return `you don't have enought money`;

    users.updateOne({_id:decoded},{$set:{money:money-fullPrice,cart:[]}});

    for(let i=0;i<cart[0].cartItems.length;i++){
        AddMoneyToCreater(users,cart[0].cartItems[i]);
    }

    return 'success';
    }
}