import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import classes from './Profile.module.scss';
import IsLogined from "../../IsLogined";
import type { item } from "../AddItem/AddItem";
import Item from "../../Item/Item";
interface User{
    login:string,
    username:string,
    password:string,
    _id?:string,
    description?:string,
    created?:item[],
    root:boolean
}
export default function Profile(){
  const [editmode,setMode] = useState<boolean>(false);
    const {username} = useParams();
    const[user,setUser] = useState<User>();
     const[items,setItems] = useState<item[]>([])
    async function getUser() {
      let response = await fetch(`http://localhost:5000/profile/${username}`,{credentials:'include'});
      let result = await response.json();
      setUser(result);  

      response = await fetch(`http://localhost:5000/profile/${username}/likes`,{credentials:'include'});
         result = await response.json();
        setItems(result);
    }
    useEffect(()=>{console.log(user)},[user])
    async function Edit() {
      await fetch(`http://localhost:5000/profile/${username}`,{
        method:"POST",
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({description:user?.description}),
        credentials:'include'
      })
    }
    useEffect(()=>{
      getUser();
    },[username])
    return<main className={classes.main}>
      <IsLogined/>
      <div className={classes.mainDiv}>
    {!editmode&&
    <>
    <h1>{user?.username}</h1>
    <p>{user?.description}</p>
    {user?.root&&<button onClick={()=>setMode(true)}>Edit</button>}
    </>
    }
    {editmode&&
    <>
    <textarea value={user?.description} onChange={(e)=>setUser({...user!,description:e.target.value})}/><br/>
    <button onClick={()=>{setMode(false); Edit()}}>Submit</button>
    </>
    }
    </div>
    {user?.root&& <>
    <h1 className={classes.title}>Liked products:</h1>
    <div className={classes.divLiked}>
      
    {items.map((item)=>{
            return <Item data={item}/>
        })}
        </div>
        </>
}
         <h1 className={classes.title}>{user?.root?'Your':`${user?.username}'s`} products:</h1>
      <div className={classes.divLiked}>
        
    {user?.created?.map((item)=>{
            return <Item data={item}/>
        })}
        </div>
    </main>
}