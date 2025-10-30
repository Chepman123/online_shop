import { Collection, ObjectId } from "mongodb";
import db from "../db";
import { item } from "./Item";
import { User } from "./RegLog";

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
    async GetCart(username:string):Promise<item[]>{
        const client = (await db).db('test');
        const users:Collection<User> = client.collection('users');

        const result = users.aggregate([]);

        const user = await users.aggregate([{$match:{username:username}},{
            $lookup:{
                from:'items',
                localField:'cart',
                foreignField:'_id',
                as:'item'
            }
        }]).toArray();

       return user[0].item;
    }
    async Search(value:string,filter:Filter):Promise<item[]>{
        const client = (await db).db('test');
        const items:Collection<item> = await client.collection('items');
        let result:item[] = [];
        console.log(filter);
        result = (await items.find({title:{$regex:value,$options:'i'},price:{$gt:filter.minPrice,$lt:filter.maxPrice}}).sort({title:filter.sort}).toArray());
        
        return result;
    }
}