import db from "../db"
import { Collection, ObjectId } from 'mongodb';
import { User } from "./RegLog";
import jwt from 'jsonwebtoken'
import Item from "../Controllers/Item";
import IsInCart from "../utils/ItemsFunction";
export interface item{
   title:string,
   description:string,
   price:number,
   review?:review[],
   photos:string[],
   creator:ObjectId|string,
   _id?:ObjectId,
   categories:{_id:ObjectId}[],
   isInCart?:boolean
   isLiked?:boolean,
   likes?:ObjectId[]
}
export interface review{
     content:string,
    creator:string,
    stars:number
}

export default class{
    async AddItem(item:item,photos:[string],token:string,categories:string[]):Promise<string|undefined>{

    const decoded:ObjectId = new ObjectId((await jwt.verify(token,process.env.SECRET!) as {_id:string})._id);
     item.creator = decoded;
     item.photos = photos;
     const client = (await db).db('test');

     const categorie = client.collection('categories');

     const resultCat: { _id: ObjectId }[] = await categorie.find(
    {
        title: {
            $in:categories 
        }
    },
    {
        projection: {
            title: 0
        }
    }
).toArray();
     item.categories = resultCat;
     const items = await client.collection('items');
     
     const result = await items.insertOne(item);
     return result.insertedId.toString();
    }
    async GetData(id:string|ObjectId,token:string):Promise<item|null>{
        const client = (await db).db('test');
        const items:Collection<item> = await client.collection('items');
        id = new ObjectId(id);
       const result = await items.aggregate<item>([
    {
        $match: {
            _id: new ObjectId(id)
        }
    },
    {
        $lookup: {
            from: "users",
            localField: "creator",
            foreignField: "_id",
            as: "creator"
        }
    }
]).toArray();

const item: item | null = result[0] ?? null;
 const decoded:ObjectId = new ObjectId((await jwt.verify(token,process.env.SECRET!) as {_id:string})._id);
        item.isLiked = item.likes?.some(id => id.equals(decoded));
        const users:Collection<User> = await client.collection('users');
const user = await users.findOne({ _id: decoded });
 item.isInCart = user?.cart?.some(
    id => id.equals(item._id!)
) ?? false;

        if (item?.review && Array.isArray(item.review)) {
  for (const review of item.review) {
    const user = await users.findOne({ _id: new ObjectId(review.creator) });
    review.creator = user?.username ?? "Unknown";
  }
  }

        return item;
    }
    async AddCart(id:string,token:string){

         const decoded:ObjectId = new ObjectId((await jwt.verify(token,process.env.SECRET!) as {_id:string})._id);

        const client = (await db).db('test');
        const users:Collection<User> = await client.collection('users'); 
        if(!await IsInCart(token,new ObjectId(id)))users.updateOne({_id:decoded},{$push:{cart:new ObjectId(id)}});
        else users.updateOne({_id:decoded},{$pull:{cart:new ObjectId(id)}});
    }
    async Like(id:string,token:string){
        const client = (await db).db('test');
         const decoded:ObjectId = new ObjectId((await jwt.verify(token,process.env.SECRET!) as {_id:string})._id);
        const items:Collection<item> = client.collection('items');
if ((await items.findOne({ _id: new ObjectId(id) }))?.likes?.some(
    like => like.equals(decoded)
)) {
    items.updateOne({_id:new ObjectId(id)},{$pull:{likes:decoded}});
}
        else items.updateOne({_id:new ObjectId(id)},{$push:{likes:decoded}})
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