import { useEffect, useState } from "react"
import type{ item } from "../AddItem/AddItem"
import Item from "../../Item/Item"

export default function Cart(){
    const[items,setItems] = useState<item[]>()
    async function GetData() {
        const response = await fetch(`http://localhost:5000/cart`);
        setItems(await response.json());
    }
    useEffect(()=>{
       GetData();
    },[items?.length])
    return <>
    {items?.map((item)=>{
        return <Item data={item}/>})
    }
    </>
}