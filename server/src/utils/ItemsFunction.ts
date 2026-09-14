import { Collection, ObjectId } from "mongodb";
import jwt from 'jsonwebtoken';
import db from "../db";
import Item, { item } from "../Services/Item";
import { User } from "../Services/RegLog";
export default async function IsInCart(token:string,_id:ObjectId):Promise<boolean>{
  const decoded:ObjectId = new ObjectId((await jwt.verify(token,process.env.SECRET!) as {_id:string})._id);
  const client = (await db).db('test');
  const users:Collection<User> = client.collection('users');

  const result = await users.findOne({_id:decoded});
   return result?.cart?.some(id => id.equals(_id)) ?? false;
}
export async function AddMoneyToCreater(collection:Collection<User>,item:item) {
  const price = item.price;
  const creatorId = item.creator;
  const currentMoney = (await collection.findOne({_id:creatorId}))?.money;
  await collection.updateOne({_id:creatorId},{$set:{money:(currentMoney ?? 0) + price}});
}