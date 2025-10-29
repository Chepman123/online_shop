import RegLogService from "../Services/RegLog";
import { Response,Request} from "express";

export default class RegLogController{
    constructor(private service:RegLogService){}
    async Reg(req:Request,res:Response) {
        this.service.Reg(req.body.login,req.body.password,req.body.username);
    }
    async Login(req:Request,res:Response){
        this.service.Login(req.body.login,req.body.password);
    }
}