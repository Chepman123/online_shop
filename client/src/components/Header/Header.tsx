import classes from './Header.module.scss';
import img from '../../../public/iconWB.png';
import { ShoppingCart } from "lucide-react";
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
export default function Header(){
    const[numberCart,setNumber] = useState<number>(0);
    const[profile,setProfile] = useState<string>('');
    const[money,setMoney] = useState<number>(0);
     const[isMobile,setMobile] = useState<boolean>(false);
       useEffect(()=>{
       const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
       setMobile(isMobile);
   },[])
    const GetData = async()=>{
       const response = await fetch('http://localhost:5000/header',{credentials:'include'});
       const result = await response.json();
       setNumber(result.count);
       setProfile(result.username);
       setMoney(result.money);
       console.log(result.count);
    }
    useEffect(()=>{
        GetData();
    },[])
    return <header>
        <div>
            <img src={img}/>
            <Link to={'/'}><h2>{isMobile?<i className="fa-solid fa-house"></i>:'Shopfinity'}</h2></Link>
        </div>
        <div className={classes.links}>
            <Link to={`/newProduct`}>{isMobile?<i className="fa-solid fa-cart-plus"></i>:'Add product'}</Link>
            <Link to={`/profile/${profile}`}>{isMobile?<i className="fa-solid fa-user"></i>:'Profile'}</Link>
        </div>
        <div>
            <Link to={'/addMoney'}>${money}</Link>
            <Link to={'/cart'}>
            <ShoppingCart size={24} />
            <p>Cart</p>
            <p className={classes.count}>{numberCart}</p>
            </Link>
        </div>
    </header>
}