import classes from './Review.module.scss'
import profile from '../../../public/userIcon.png'
import Stars from '../Stars/Stars'
export default function Review({data}:{data:{content:string,stars?:number}}){
    return <div className={classes.div}>
        <div className={classes.top}>
            
        <img src={profile}/>
        <div className={classes.name}><h1>Customer</h1><Stars count={data.stars!}/></div>
        </div>
        <p>{data.content}</p>
    </div>
}