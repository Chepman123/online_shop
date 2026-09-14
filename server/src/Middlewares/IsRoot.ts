import { NextFunction, Request,Response } from "express";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import db from "../db";

export default async function(req:Request,res:Response,next:NextFunction){
    const token:string = req.cookies.token;
    if(!token) return;

   const decoded: ObjectId = new ObjectId(
    ((await jwt.verify(token, process.env.SECRET!)) as { _id: string })._id
);
    const username:string = req.params.username;
    
    const client = (await db).db('test');
    const users = client.collection('users');
    const result = await users.findOne({username:username},{projection:{_id:1}});
    
    const _id = result?._id;

    if (!_id?.equals(decoded)) return;
    next();
}