import { Response,Request, Router } from "express";
import RegLogService from "../Services/RegLog";
import RegLogController from "../Controllers/RegLog";
import Service from "../Services/Item";
import Controller from '../Controllers/Item'
export default()=>{
   const router:Router = Router();
   const service:Service = new Service();
   const controller:Controller = new Controller(service);

   router.post('/newItem',(req:Request,res:Response)=>{controller.AddItem(req,res)});
   router.get('/item/:id',(req:Request,res:Response)=>{controller.GetItem(req,res)});
   router.post('/item/:id/review',(req:Request,res:Response)=>{controller.Review(req,res)});
   router.all('/item/:id/cart',(req:Request,res:Response)=>{controller.AddCart(req,res)});
   router.all('/item/:id/like',(req:Request,res:Response)=>{controller.Like(req,res)});

   return router;
}