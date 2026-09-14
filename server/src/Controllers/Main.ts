import { Request, Response } from "express";
import Main from "../Services/Main";

export default class{
    constructor(private service:Main){}
    async GetData(req:Request,res:Response) {
        res.json(await this.service.GetData());
    }
    async GetCart(req:Request,res:Response){
        res.json(await this.service.GetCart(req.cookies.token));
    }
    async Search(req:Request,res:Response){
        res.json(await this.service.Search(req.body.value,req.body.filter,req.body.categories,req.cookies.token,req.body.page));
    }
    async GetHeader(req:Request,res:Response){

        const token:string = req.cookies.token;
         
        const result = await this.service.GetHeader(token);
       
        res.json(result);
    }
    AddMoney(req:Request,res:Response){
        this.service.AddMoney(req.body.count,req.cookies.token);
       res.status(200);
    }
    async GetCategories(req:Request,res:Response){
        const result = await this.service.GetAllCategories();
        res.json(result);
    }
    async Buy(req:Request,res:Response){
        const result = await this.service.Buy(req.cookies.token);
        res.json(result);
    }
}