import { User } from "./RegLog";
import db from '../db'
import { Collection, ObjectId } from "mongodb";
import { item } from "./Item";
import jwt from 'jsonwebtoken';
import { equal } from "node:assert";
import IsInCart from "../utils/ItemsFunction";
export default class Profile{
    async GetProfile(username:string,token:string) {
        const client = (await db).db('test');
        const users:Collection<User> = client.collection('users');
        const result = await users.aggregate([
    {
        $match: {
            username: username
        }
    },
    {
        $lookup: {
            from: 'items',
            localField: '_id',
            foreignField: 'creator',
            as: 'created'
        }
    },
    {
        $lookup: {
            from: 'items',
            localField: '_id',
            foreignField: 'likes',
            as: 'liked'
        }
    }
]).toArray();
        for(let i=0;i<result[0].created.length;i++){
            result[0].created[i].isInCart = await IsInCart(token,result[0].created[i]._id);
        }
        const decoded:ObjectId = new ObjectId((await jwt.verify(token,process.env.SECRET!) as {_id:string})._id);

        result[0].root = decoded.equals(result[0]._id);
        
        return result[0];
    }
    async EditProfile(username:string,description?:string){
        const client = (await db).db('test');
        const users = client.collection('users');
        users.updateOne({username:username},{$set:{description:description}});
    }
    async GetLiked(username:string,token:string):Promise<item[]>{
        const client = (await db).db('test');
        const users = await client.collection('users');
        const id = (await users.findOne({username:username}))?._id;

        const items:Collection<item> = await client.collection('items');
        const result:item[] = await items.find({likes:id}).toArray();
          for(let i=0;i<result.length;i++){
            result[i].isInCart = await IsInCart(token,new ObjectId(result[i]._id));
        }
        return result;
    }
}