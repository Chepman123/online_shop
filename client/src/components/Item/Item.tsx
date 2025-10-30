import { Link } from "react-router-dom";
import type { item } from "../Pages/AddItem/AddItem";

export default function Item({data}:{data:item}){
    return <>
    <Link to={`/item/`}>Link</Link>
    <h1>{data.title}</h1>
    <h2>{data.price}</h2>
    </>
}