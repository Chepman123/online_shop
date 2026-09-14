import { Request, Response } from "express";
import Profile from "../Services/Profile";

export default class{
    constructor(private service:Profile){}

    async GetData(req:Request,res:Response){
       res.json(await this.service.GetProfile(req.params.username,req.cookies.token));
    }
    async Edit(req:Request,res:Response){
        this.service.EditProfile(req.params.username,req.body.description);
    }
    async GetLiked(req:Request,res:Response){
        const result = await this.service.GetLiked(req.params.username,req.cookies.token);

        res.json(result);
    }
}