import { useState } from "react";

export default function Log(){
    const[login,setLogin] = useState<string>();
        const[password,setPasswod] = useState<string>();
        async function Log(){
            const response = await fetch('http://localhost:5000/login',{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({login:login,password:password})
            });
        }
        return <>
        <input type="text" value={login} onChange={(e)=>setLogin(e.target.value)}/>
        <input type="password" value={password} onChange={(e)=>setPasswod(e.target.value)}/>
        <button onClick={Log}>Log in</button>
        </>
}