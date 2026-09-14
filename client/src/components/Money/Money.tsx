import { useNavigate } from 'react-router-dom'
import classes from './Money.module.scss'
export default function Money({count}:{count:number}){
    const navigate = useNavigate();
     async function AddMoney() {
        await fetch('http://localhost:5000/addMoney',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            credentials:'include',
            body:JSON.stringify({count:count})
        });
        navigate('/addMoney');
     }
    return <div className={classes.div}>
        <h1>Add ${count}</h1>
        <div className={classes.buttons}>
            <h3>${count}</h3>
        <button onClick={AddMoney} >Add</button>
        </div>
    </div>
}