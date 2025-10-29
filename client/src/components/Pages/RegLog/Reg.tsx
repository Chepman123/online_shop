import { useState } from "react"

export default function Reg(){
    const[login,setLogin] = useState<string>();
    const[username,setUsername] = useState<string>();
    const[password,setPasswod] = useState<string>();
    async function Reg(){
        const response = await fetch('http://localhost:5000/registration',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({login:login,password:password,username:username})
        });
    }
    return <>
    <input type="text" value={login} onChange={(e)=>setLogin(e.target.value)}/>
    <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)}/>
    <input type="password" value={password} onChange={(e)=>setPasswod(e.target.value)}/>
    <button onClick={Reg}>Create account</button>
    </>
}