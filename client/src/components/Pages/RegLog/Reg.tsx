import { useState } from "react"
import classes from './RegLog.module.scss';
import { Link, useNavigate } from "react-router-dom";

export type status = 'success'|'password is too short'|'login is used'|`password doesn't match`|`login doesn't exist`|'all fields are required';
export default function Reg(){
    const navigate = useNavigate();
    const[login,setLogin] = useState<string>('');
    const[username,setUsername] = useState<string>('');
    const[password,setPasswod] = useState<string>('');
    const[status,setStatus] = useState<status>('success');
    async function Reg(){
        if(username==''||password==''||login=='') {
            setStatus('all fields are required');
            return;
        }
        const response = await fetch('http://localhost:5000/registration',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({login:login,password:password,username:username}),
            credentials:'include'
        });
        const result = await response.json();
        setStatus(result);
        if(result == 'success') navigate('/');
    }
    return <main className={classes.main}>
    <form className={classes.form}>
        <h1>Hello there</h1>
        <h3>Join to our family!</h3>
    <input type="text" value={login} onChange={(e)=>setLogin(e.target.value)} placeholder="Login"/>
    <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="Username" />
    <input type="password" value={password} onChange={(e)=>setPasswod(e.target.value)} placeholder="Password"/>
    {status!='success'&&
    <p style={{color:'red'}}>{status}</p>}
    <button type="button" onClick={Reg}>Create account</button>
     <div className={classes.border}/>
        <div className={classes.div}>
            <p>Do you have an account?</p>
        <Link to={'/login'}>Log in</Link>
        </div>
    </form>
    </main>
}