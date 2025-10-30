import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import type{ item } from "../AddItem/AddItem";
import Item from "../../Item/Item";

export default function Likes(){
    const{username} = useParams();
    const[items,setItems] = useState<item[]>([])
    async function GetLikes() {
        const response = await fetch(`http://localhost:5000/profile/${username}/likes`);
        const result = await response.json();
        setItems(result);
    }
    useEffect(()=>{
        GetLikes();
    },[])
    return <>
    {items.map((item)=>{
        return <Item data={item}/>
    })}
    </>
}