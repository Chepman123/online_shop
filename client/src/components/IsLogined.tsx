import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function IsLogined(){
    const navigate = useNavigate();
    const GetData = async()=>{
          const response = await fetch('http://localhost:5000/header',{credentials:'include'});
           const result = await response.json();
           if(result.username=='') navigate('/login');
        }
        useEffect(()=>{
            GetData();
        },[])
    return <>
    </>
}