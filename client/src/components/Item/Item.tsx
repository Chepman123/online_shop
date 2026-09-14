import { Link } from "react-router-dom";
import type { item } from "../Pages/AddItem/AddItem";
import classes from './Item.module.scss'
import { useState } from "react";
export default function Item({data}:{data:item}){
    const[isInCart,setCart] = useState<boolean>(data.isInCart!);
    async function AddToCart(){
        setCart(!isInCart);
      await fetch(`http://localhost:5000/item/${data._id}/cart`,{credentials:'include'});
    }
    return <div className={classes.div}> 
    <Link to={`/item/${data._id}`}>
    <img src={data.photos[0]}/>
    <h1>{data.title}</h1>
    <h2>${data.price}</h2>
    </Link>
    {!isInCart && <button onClick={AddToCart}>Add to cart</button>
}
{isInCart && <button onClick={AddToCart} style={{background:'black',color:'white'}}>Remove from cart</button>
}
    </div>
}