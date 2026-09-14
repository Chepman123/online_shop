import RegLogService from "../Services/RegLog";
import { Response,Request} from "express";

export default class RegLogController{
    constructor(private service:RegLogService){}
    async Reg(req:Request,res:Response) {
        const result = await this.service.Reg(req.body.login,req.body.password,req.body.username);
        res.cookie('token',result.token,{
                httpOnly:true,
                secure:false,
                sameSite:'lax',
                maxAge:7*24*60*60*1000
            })
       res.json(result.status);
    }
    async Login(req:Request,res:Response){
        const result = await this.service.Login(req.body.login,req.body.password);
        res.cookie('token',result.token,{
                httpOnly:true,
                secure:false,
                sameSite:'lax',
                maxAge:7*24*60*60*1000
            })         
            
        res.json(result.status);
    }
}