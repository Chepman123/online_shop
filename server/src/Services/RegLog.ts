import { Collection, ObjectId } from 'mongodb';
import db from '../db';
import bcrypt from 'bcrypt'
export interface User{
    login:string,
    username:string,
    password:string,
    _id?:string,
    description?:string,
    cart?:ObjectId[]
}
export default class RegLogService{

    async Reg(login:string,password:string,username:string){
        const client = (await db).db('test');
        const users:Collection<User> = client.collection('users');
        const hashedPassword:string = await bcrypt.hash(password,10);
        
        if(await this.LoginIsUsed(login,users)) return

        await users.insertOne({login:login,password:hashedPassword,username:username});
    }
    async Login(login:string,password:string){
       const client = (await db).db('test');
       const users = client.collection('users');
       const hashedPassword:string = (await users.findOne({login:login},{projection:{password:1,_id:0}}))?.password;

       if(await bcrypt.compare(password,hashedPassword)){
       }
    }
    async LoginIsUsed(login:string,users:Collection<User>):Promise<boolean>{
       const result = await users.findOne({login:login});
       return result != null;
    }
}