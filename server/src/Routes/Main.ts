import { Response,Request, Router } from "express";
import Service from "../Services/Main";
import Controller from '../Controllers/Main'
export default()=>{
   const router:Router = Router();
   const service:Service = new Service();
   const controller:Controller = new Controller(service);

   router.get('/',(req:Request,res:Response)=>{controller.GetData(req,res)});
   router.post('/',(req:Request,res:Response)=>{controller.Search(req,res)});
   router.get('/cart',(req:Request,res:Response)=>{controller.GetCart(req,res)});

   return router;
}