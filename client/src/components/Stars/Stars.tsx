import classes from './Stars.module.scss'

export default function Stars({count,setNumber}:{count:number,setNumber?:(number:number)=>void}){
    const func = (number:number)=>{if(setNumber){setNumber(number)}};
return <div className={classes.div}>
<h3 onClick={()=>func(1)} style={{color:count>0?'#FFC107':'black'}}>★</h3>
<h3 onClick={()=>func(2)} style={{color:count>1?'#FFC107':'black'}}>★</h3>
<h3 onClick={()=>func(3)} style={{color:count>2?'#FFC107':'black'}}>★</h3>
<h3 onClick={()=>func(4)} style={{color:count>3?'#FFC107':'black'}}>★</h3>
<h3 onClick={()=>func(5)} style={{color:count>4?'#FFC107':'black'}}>★</h3>
</div>
}