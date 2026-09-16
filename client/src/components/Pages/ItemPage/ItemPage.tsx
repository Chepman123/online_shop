import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import type{ item,review } from "../AddItem/AddItem";
import IsLogined from "../../IsLogined";
import classes from './ItemPage.module.scss';
import Stars from "../../Stars/Stars";
import profile from '../../../../public/userIcon.png'
import Review from "../../Review/Review";
export default function ItemPage(){
  const[averageScore,setScore] = useState<number>(0);
    const[data,setData] = useState<item>();
    const[value,setValue] = useState<string>('')
    const[stars,setStars] = useState<number>(0);
    const[whichSelected,setImage] = useState<number>(0);
    const[isLiked,setLiked] = useState<boolean>(false);
    const[isInCart,setCart] = useState<boolean>(false);
    const{id} = useParams();

    async function getData(){
      const response = await fetch(`http://localhost:5000/item/${id}`,{credentials:'include'});
      const result = await response.json();
       setLiked(result.isLiked);
      let max:number = 0;
      
      for(let i = 0;i<result.review.length;i++){
         max+=result.review[i].stars;
      }
      setScore(max/result.review.length);
      setCart(result.isInCart);
     
      setData(result);
    }
    async function AddToCart(){
      await fetch(`http://localhost:5000/item/${id}/cart`,{'credentials':'include'});
    }
    async function Like() {
      await fetch(`http://localhost:5000/item/${id}/like`,{credentials:'include'});
    }
    async function SendReview() {
      await fetch(`http://localhost:5000/item/${id}/review`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({review:value,stars:stars})
      })
    }
    useEffect(()=>{
        getData();
    },[])
   return <main className={classes.main}>
   <IsLogined/>
   <main>
   <section> 
    <div className={classes.images}>
    <img className={classes.img}style={{border:whichSelected==0?'rgb(105, 102, 131) solid 5px':'none'}} src={data?.photos[0]} onClick={()=>setImage(0)}/>
    <img className={classes.img} style={{border:whichSelected==1?'rgb(105, 102, 131) solid 5px':'none'}}  src={data?.photos[1]} onClick={()=>setImage(1)}/>
   <img className={classes.img} style={{border:whichSelected==2?'rgb(105, 102, 131) solid 5px':'none'}}  src={data?.photos[2]} onClick={()=>setImage(2)}/>
   <img className={classes.img} style={{border:whichSelected==3?'rgb(105, 102, 131) solid 5px':'none'}}  src={data?.photos[3]} onClick={()=>setImage(3)}/>
   </div>
   <img className ={classes.mainImg}src={data?.photos[whichSelected]}/></section>
   <figure>
   <h1>{data?.title}</h1>
   <Stars count = {averageScore}/>
   
   <h2>${data?.price}</h2>
   <div className={classes.border}/>
   <p>{data?.description}</p>
   <Link to={`/profile/${data?.creator[0].username}`}><img src={profile}/><div><h2 className={classes.h2}>Sold by</h2> <h2>{data?.creator[0].username}</h2></div></Link>

   <button className={classes.like} style={{color:isLiked?'tomato':'white'}} onClick={()=>{Like();setLiked(!isLiked)}}>❤</button>
   <button  className={classes.cart} style={isInCart?{backgroundColor:'black',color:'white'}:{background:'white',color:'black'}} onClick={()=>{AddToCart();setCart(!isInCart)}}>{isInCart?'Remove from the cart':`Add to cart`}</button>
   </figure>
   </main>
   <div className={classes.review}>
    <h1>Share your experience</h1>
       <Stars count={stars} setNumber={setStars}/>
   <div className={classes.bottom}>
   <input type="text" onChange={(e)=>setValue(e.target.value)} value={value} placeholder="Write your review..."/>

   <button style={value==''?{opacity:'0.3'}:{opacity:'1'}} onClick={()=>{if(value!=''){SendReview();}}}>Send</button>
   </div>
   </div>
   <div className={classes.reviews}>
   {data?.review&&
    data?.review.map((review)=>{
      return <Review data={review}/>
    })
   }
   </div>
   </main>
}