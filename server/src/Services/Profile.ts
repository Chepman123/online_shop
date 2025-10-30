import { User } from "./RegLog";
import db from '../db'
import { Collection } from "mongodb";
import { item } from "./Item";

export default class Profile{
    async GetProfile(username:string):Promise<User|null> {
        const client = (await db).db('test');
        const users:Collection<User> = client.collection('users');
        const result:User|null = await users.findOne({username:username});
        return result;
    }
    async EditProfile(username:string,description?:string){
        const client = (await db).db('test');
        const users = client.collection('users');
        users.updateOne({username:username},{$set:{description:description}});
    }
    async GetLiked(username:string):Promise<item[]>{
        const client = (await db).db('test');
        const users = await client.collection('users');
        const id = (await users.findOne({username:username}))?._id;

        const items:Collection<item> = await client.collection('items');
        const result:item[] = await items.find({likes:id}).toArray();
        return result;
    }
}