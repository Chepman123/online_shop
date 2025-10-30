import { useState } from "react"

export interface item{
   title:string,
   description:string,
   price:number,
   review?:review[]
}
export interface review{
     content:string,
    creator:string,
    stars?:number
}
export default function AddItem(){
    const [item,setItem] = useState<item>();
    function AddItem(){
        fetch('http://localhost:5000/newItem',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(item)
        })
    }
    return<>
    <input type="text"onChange={(e)=>setItem({...item!,title:e.target.value})} placeholder="title" value={item?.title}/>
    <input type="text"onChange={(e)=>setItem({...item!,description:e.target.value})} placeholder="description" value={item?.description}/>
    <input type="number"onChange={(e)=>setItem({...item!,price:Number(e.target.value)})} placeholder="price" value={item?.price}/>
    <button onClick={AddItem}>Add item</button>
    </>
}