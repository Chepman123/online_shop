import db from "../db"
import { Collection, ObjectId } from 'mongodb';
import { User } from "./RegLog";
export interface item{
   title:string,
   description:string,
   price:number,
   review?:review[]
}
export interface review{
     content:string,
    creator:string,
    stars:number
}

export default class{
    async AddItem(item:item){
     const client = (await db).db('test');
     const items = await client.collection('items');
     items.insertOne(item);
    }
    async GetData(id:string|ObjectId):Promise<item|null>{
        const client = (await db).db('test');
        const items:Collection<item> = await client.collection('items');
        id = new ObjectId(id);
        const item:item|null = await items.findOne({_id:new ObjectId(id)});
        console.log(typeof(item?.review));
        const users = await client.collection('users')
        if (item?.review && Array.isArray(item.review)) {
  for (const review of item.review) {
    const user = await users.findOne({ _id: new ObjectId(review.creator) });
    review.creator = user?.username ?? "Unknown";
  }
  }

        return item;
    }
    async AddCart(id:string){
        const client = (await db).db('test');
        const users:Collection<User> = await client.collection('users'); 
        users.updateOne({username:"LaraBraus"},{$push:{cart:new ObjectId(id)}});
    }
    async Like(id:string,username:string){
        const client = (await db).db('test');
        const userId =(await client.collection('users').findOne({username:username}))?._id;
        const items:Collection<item> = client.collection('items');
        items.updateOne({_id:new ObjectId(id)},{$push:{likes:userId}})
    }
    async Review(id:string,content:string,username:string,stars:number){
        const client = (await db).db('test');
        const users:Collection<User> = client.collection('users');
        let userId = (await users.findOne({username:username}))?._id;
        
       if(!userId) userId='';

        const items:Collection<item> = client.collection('items');
        items.updateOne({_id:new ObjectId(id)},{$push:{review:{content:content,creator:userId,stars:stars}as review}});
    }
}