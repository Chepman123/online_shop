import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import type{ item,review } from "../AddItem/AddItem";

export default function ItemPage(){
    const[data,setData] = useState<item>();
    const[value,setValue] = useState<string>('')
    const[stars,setStars] = useState<number>(0);
    const{id} = useParams();

    async function getData(){
      const response = await fetch(`http://localhost:5000/item/${id}`);
      const result = await response.json();
      console.log(result);
      setData(result);
    }
    async function AddToCart(){
      await fetch(`http://localhost:5000/item/${id}/cart`);
    }
    async function Like() {
      await fetch(`http://localhost:5000/item/${id}/like`);
    }
    async function SendReview() {
      await fetch(`http://localhost:5000/item/${id}/review`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({review:value,stars:stars})
      })
    }
    useEffect(()=>{
        getData();
    },[])
   return <>
   <h1>{data?.title}</h1>
   <p>{data?.description}</p>
   <h2>{data?.price}</h2>
   <button onClick={Like}>Like</button>
   <button onClick={AddToCart}>Add to cart</button>
   <input type="text" onChange={(e)=>setValue(e.target.value)} value={value}/>
   <select value={stars} onChange={(e)=>setStars(Number(e.target.value))}>
    <option value={0}>0</option>
    <option value={1}>1</option>
    <option value={2}>2</option>
    <option value={3}>3</option>
    <option value={4}>4</option>
    <option value={5}>5</option>
   </select>
   <button onClick={SendReview}>Send</button>
   {data?.review&&
    data?.review.map((review)=>{
      return <><h1>{review.content}</h1>
      <h2>{review.stars}</h2></>
    })
   }
   </>
}