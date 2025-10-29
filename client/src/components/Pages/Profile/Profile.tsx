import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";

interface User{
    login:string,
    username:string,
    password:string,
    _id?:string,
    description?:string
}
export default function Profile(){
  const [editmode,setMode] = useState<boolean>(false);
    const {username} = useParams();
    const[user,setUser] = useState<User>();
    async function getUser() {
      const response = await fetch(`http://localhost:5000/profile/${username}`);
      setUser(await response.json());  
    }
    async function Edit() {
      await fetch(`http://localhost:5000/profile/${username}`,{
        method:"POST",
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({description:user?.description})
      })
    }
    useEffect(()=>{
      getUser();
    },[username])
    return<>
    {!editmode&&
    <>
    <h1>{user?.username}</h1>
    <p>{user?.description}</p>
    <button onClick={()=>setMode(true)}>Edit</button>
    </>
    }
    {editmode&&
    <>
    <textarea value={user?.description} onChange={(e)=>setUser({...user!,description:e.target.value})}/>
    <button onClick={()=>{setMode(false); Edit()}}>Submit</button>
    </>
    }

    </>
}