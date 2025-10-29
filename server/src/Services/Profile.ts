import { User } from "./RegLog";
import db from '../db'
import { Collection } from "mongodb";

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
}