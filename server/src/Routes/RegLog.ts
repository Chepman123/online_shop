import { Response,Request, Router } from "express";
import RegLogService from "../Services/RegLog";
import RegLogController from "../Controllers/RegLog";
export default()=>{
   const router:Router = Router();
   const service:RegLogService = new RegLogService();
   const controller:RegLogController = new RegLogController(service);

   router.post('/registration',(req:Request,res:Response)=>{controller.Reg(req,res)});
   router.post('/login',(req:Request,res:Response)=>{controller.Login(req,res)});

   return router;
}