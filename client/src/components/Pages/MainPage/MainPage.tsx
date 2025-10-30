import { useEffect, useState } from "react"
import type{ item } from "../AddItem/AddItem"
import Item from "../../Item/Item";

interface Filter{
  minPrice?:number,
  maxPrice?:number,
  sort?:number
}

export default function MainPage(){
    const[searchValue,setValue] = useState<string>();
    const[items,setItem] = useState<item[]>();
    const[filter,setFilter] = useState<Filter>({minPrice:0,maxPrice:999999999,sort:1});
    
    const[filtersWindow,setWindow] = useState<boolean>(false);
    async function Search() {
      const response = await fetch('http://localhost:5000/',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({value:searchValue,filter:filter})
      });
      setItem(await response.json());  
    }
    async function GetItems() {
      const response = await fetch('http://localhost:5000/');
      setItem(await response.json());  
    }
    useEffect(()=>{
      GetItems();
    },[])
    return <>
    {filtersWindow&&
    <>
    <input type="number" placeholder="min price" onChange={(e)=>setFilter({...filter,minPrice:Number(e.target.value)})} value={filter?.minPrice}/>
    <input type="number" placeholder="max price" onChange={(e)=>setFilter({...filter,maxPrice:Number(e.target.value)})} value={filter?.maxPrice}/>
    <select value={filter?.sort} onChange={(e)=>setFilter({...filter,sort:Number(e.target.value)})}>
      <option value={1}>Sort A-Z</option>
      <option value={-1}>Sort Z-A</option>
    </select>
    <button onClick={()=>setWindow(false)}>Close</button>
    </>
    }
    {!filtersWindow&&
      <button onClick={()=>setWindow(true)}>Filters</button>}
    <input type="text" value={searchValue} onChange={(e)=>setValue(e.target.value)}/>
    <button onClick={Search}>Search</button>
        {items?.map((item)=>{
            return <Item data={item}/>
        })}
    </>
}