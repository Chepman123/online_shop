import { useState } from "react";
import classes from './RegLog.module.scss';
import { Link, useNavigate } from "react-router-dom";
import type { status } from "./Reg";

export default function Log(){
     const navigate = useNavigate();
    const[status,setStatus] = useState<status>('success');
    const[login,setLogin] = useState<string>('');
        const[password,setPasswod] = useState<string>('');
        async function Log(){
             if(password==''||login=='') {
            setStatus('all fields are required');
            return;
        }
            const response = await fetch('http://localhost:5000/login',{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({login:login,password:password}),
                credentials:'include'
            });
            const result = await response.json();
        setStatus(result);
        if(result == 'success') navigate('/');
        }
        return <main className={classes.main}>
            <form className={classes.form}>
                
                <h1>Welcome back</h1>
                <h3>Log in to your account</h3>
        <input type="text" value={login} onChange={(e)=>setLogin(e.target.value)} placeholder="Login" />
        <input type="password" value={password} onChange={(e)=>setPasswod(e.target.value)} placeholder="Password"required/>
        {status!='success'&&
    <p style={{color:'red'}}>{status}</p>}
        <button type="button" onClick={Log}>Log in</button>
        <div className={classes.border}/>
        <div className={classes.div}>
            <p>Don't have an account?</p>
        <Link to={'/registration'}>Sign up</Link>
        </div>
        </form>
        </main>
}