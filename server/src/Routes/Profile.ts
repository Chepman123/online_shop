import { Response,Request, Router } from "express";
import Service from "../Services/Profile";
import Controller from '../Controllers/Profile'
export default()=>{
   const router:Router = Router();
   const service:Service = new Service();
   const controller:Controller = new Controller(service);

   router.get('/:username',(req:Request,res:Response)=>{controller.GetData(req,res)});
   router.post('/:username',(req:Request,res:Response)=>{controller.Edit(req,res)});
   router.get('/:username/likes',(req:Request,res:Response)=>{controller.GetLiked(req,res)});

   return router;
}