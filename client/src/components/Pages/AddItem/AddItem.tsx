import { useState } from "react"
import IsLogined from "../../IsLogined";
import classes from './AddItem.module.scss';
import AddPhoto from "../../AddPhoto/AddPhoto";
import ConvertFileToURL from "../../../utils/ConvertFileToURL";
import { useNavigate } from "react-router-dom";
import AddCategory from "../../AddCategory/AddCategory";
export interface item{
   title:string,
   description:string,
   price:number,
   review?:review[],
   photos:string[],
   creator:string,
   _id:string,
   isInCart?:boolean
}
export interface review{
     content:string,
    creator:string,
    stars?:number
}
export default function AddItem(){
    const navigate = useNavigate();
    const [item,setItem] = useState<item>();
    const [status,setStatus] = useState<string>('');
    const[file1,setFile1] = useState<File|string>();
    const[file2,setFile2] = useState<File|string>();
    const[file3,setFile3] = useState<File|string>();
    const[file4,setFile4] = useState<File|string>();
    const[selected,SetSelected] = useState<string[]>([]);
    async function AddItem(){
        let photos:string[]=[];
        photos[0] = await ConvertFileToURL(file1 as File);
        photos[1] = await ConvertFileToURL(file2 as File);
        photos[2] = await ConvertFileToURL(file3 as File);
        photos[3] = await ConvertFileToURL(file4 as File);
        if(photos[0]==''||photos[1]==''||photos[2]==''||photos[3]==''||item?.description==''||item?.price==0||item?.title=='' || selected.length==0){
           setStatus('all fiedls are reqiered');
            return;
        }
        const response = await fetch('http://localhost:5000/newItem',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({item:item,photos:photos,categories:selected}),
            credentials:'include'
        })
        const result = await response.json();
        navigate(`/item/${result}`);
    }
    return<main className={classes.main}>
    <IsLogined/>
    
    <form>
        
    <div className={classes.inputs}>
        <h1>Product management & media upload</h1>
    <div className={classes.border}/>
    <label>Title:</label><br/>
    <input type="text"onChange={(e)=>setItem({...item!,title:e.target.value})} placeholder="title" value={item?.title}/><br/>
    <label>Description:</label><br/>
    <textarea onChange={(e)=>setItem({...item!,description:e.target.value})} placeholder="description" value={item?.description}/><br/>
    <label>Price:</label><br/>
    <input type="number"onChange={(e)=>setItem({...item!,price:Number(e.target.value)})} placeholder="price" value={item?.price}/><br/>
    <label>Category:</label><br/>
    <AddCategory setCategories={SetSelected}/>
   <p>{status}</p>
    <button className={classes.button} onClick={AddItem} type="button">Add product</button>
   </div>
   <div className={classes.photos}>
    <AddPhoto setFile={setFile1}/>
    <AddPhoto setFile={setFile2}/>
    <AddPhoto setFile={setFile3}/>
    <AddPhoto setFile={setFile4}/>
   
    </div>
   
    </form>
     

    </main>
}