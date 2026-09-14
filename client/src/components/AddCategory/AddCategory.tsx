import { useEffect, useState } from "react"
import classes from './AddCategory.module.scss';
export default function AddCategory({setCategories}:{setCategories:(cat:string[])=>void}){
    const[allCat,setAll] = useState<string[]>(['ipad','macbook']);
    const[categories,setCat] = useState<string[]>([]);
    const[selected,SetSelected] = useState<string[]>([]);
    async function ChangeText(text:string) {
        let catSel:string[] = [];
        if(text!=''){
        for(let i=0;i<allCat.length;i++){
            if(allCat[i].toLocaleLowerCase().includes(text.toLowerCase())) catSel.push(allCat[i]);
        }
    }
        setCat(catSel);
    }
    useEffect(()=>{setCategories(selected)},[selected])
    async function GetCat() {
        const response = await fetch('http://localhost:5000/Categories');
        const result = await response.json();
       setAll(result.map((cat: { title: string }) => cat.title));
    }
    useEffect(()=>{
       GetCat();
    },[])
    return <>
    <input type="text" onChange={(e)=>ChangeText(e.target.value)} placeholder="category"/><br/>
    {categories.map((cat)=>{
        return <button className={classes.select} type="button" onClick={()=>{if(!selected.includes(cat))SetSelected(prev=>[...prev,cat])}}>{cat}</button>
    })}<br/>
    <div className={classes.div}>
    {selected.map((sel)=>{
        return <button className={classes.selected} type="button" onClick={()=>{
            const categ:string[] = selected;
           const newCateg = categ.filter(cat => cat !== sel);
           SetSelected(newCateg);
           setCategories(newCateg);
        }}><h3>X</h3>{sel}</button>
    })}</div>
    </>
}