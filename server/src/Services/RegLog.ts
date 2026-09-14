import { Collection, ObjectId } from 'mongodb';
import db from '../db';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import Item from './Item';
export interface User{
    login:string,
    username:string,
    password:string,
    _id?:string|ObjectId,
    description?:string,
    cart?:ObjectId[],
    created?:Item[],
    root?:boolean,
    money?:number
}
export type status = 'success'|'password is too short'|'login is used'|`password doesn't match`|`login doesn't exist`|'all fields are required';
export default class RegLogService{

    async Reg(login:string,password:string,username:string):Promise<{token:string,status:status}>{
        const client = (await db).db('test');
        const users:Collection<User> = client.collection('users');
        const hashedPassword:string = await bcrypt.hash(password,10);
        
        if(await this.LoginIsUsed(login,users)) return{token:'',status: 'login is used'};

        if(password.length<6) return {token:'',status:'password is too short'};

        await users.insertOne({login:login,password:hashedPassword,username:username});
        
        const _id = (await users.findOne({login:login}))?._id;
        const token:string = jwt.sign({_id},process.env.SECRET!);

        return {token:token,status:'success'}
    }
    async Login(login:string,password:string):Promise<{token:string,status:status}>{
       const client = (await db).db('test');
       const users = client.collection('users');
       const hashedPassword:string = (await users.findOne({login:login},{projection:{password:1,_id:0}}))?.password;

       if((await users.findOne({login:login})) == null) return {token:'',status:'login doesn\'t exist'}
       if(await bcrypt.compare(password,hashedPassword)){
          const _id = (await users.findOne({login:login}))?._id;
        const token:string = jwt.sign({_id},process.env.SECRET!);
        return {token:token,status:'success'};
       }
       else return {token:'',status:'password doesn\'t match'};
       
    }
    async LoginIsUsed(login:string,users:Collection<User>):Promise<boolean>{
       const result = await users.findOne({login:login});
       return result != null;
    }
}