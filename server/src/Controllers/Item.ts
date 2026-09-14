import { Request, Response } from "express";
import AddItem from "../Services/Item";

export default class{
    constructor(private service:AddItem){}
    async AddItem(req:Request,res:Response){
       const result = await this.service.AddItem(req.body.item,req.body.photos,req.cookies.token,req.body.categories);
       res.json(result);
    }
    async GetItem(req:Request,res:Response){
        res.json(await this.service.GetData(req.params.id));
    }
    async AddCart(req:Request,res:Response){
        this.service.AddCart(req.params.id,req.cookies.token);
    }
    async Like(req:Request,res:Response){
        this.service.Like(req.params.id,req.cookies.token);
    }
    async Review(req:Request,res:Response){
        this.service.Review(req.params.id,req.body.review,"LaraBraus",req.body.stars)
    }
}