import { useEffect, useState } from "react"
import type{ item } from "../AddItem/AddItem"
import Item from "../../Item/Item"
import classes from './Cart.module.scss'
import IsLogined from "../../IsLogined"
import { useNavigate } from "react-router-dom"
export default function Cart(){
    const navigate = useNavigate();
    const[sum,setSum] = useState<number>(0);
    const[items,setItems] = useState<item[]>([])
    const[status,setStatus] = useState<string>('');
    async function GetData() {
        const response = await fetch(`http://localhost:5000/cart`,{credentials:'include'});
        setItems(await response.json());
    }
    async function Buy() {
        const response = await fetch(`http://localhost:5000/buy`,{credentials:'include'});
        const result = await response.json();
        setStatus(result);
      if (result === 'success') {
    navigate('/cart');
    window.location.reload();
}
    }
    useEffect(()=>{
       GetData();
       let count = 0;
       for(let i=0;i<items!.length;i++){
          if(items)count+=items[i].price;
       }
       setSum(count);
    },[items?.length])
    return <main className={classes.main}>
        <IsLogined/>
        <h1 className={classes.h1}>Your cart:</h1>
        <div className={classes.border}/>
        <section className={classes.div}>
    {items?.map((item)=>{
        return <Item data={item}/>})
    }
    </section>
    <div className={classes.border}/>
    <h1 className={classes.h1}>${sum}</h1>
    <p style={{color:'red',marginLeft:'50px'}}>{status}</p>
    <button className={classes.button} onClick={Buy}> Buy</button>
    </main>
}