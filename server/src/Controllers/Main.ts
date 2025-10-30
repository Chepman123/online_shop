import { Request, Response } from "express";
import Main from "../Services/Main";

export default class{
    constructor(private service:Main){}
    async GetData(req:Request,res:Response) {
        res.json(await this.service.GetData());
    }
    async GetCart(req:Request,res:Response){
        res.json(await this.service.GetCart('LaraBraus'));
    }
    async Search(req:Request,res:Response){
        res.json(await this.service.Search(req.body.value,req.body.filter));
    }
}