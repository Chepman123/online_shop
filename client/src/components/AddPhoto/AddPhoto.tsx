import { useId, useState } from 'react';
import image from '../../../public/image.jpg';
import classes from './AddPhoto.module.scss';
export default function AddPhoto({setFile}:{setFile:(file:File)=>void}){
    const[img,setImg] = useState<File|null>();
    const id = useId();
    return <article className={classes.article}>
    <label htmlFor={id}>
        <img src={img?URL.createObjectURL(img):image} className={classes.img}/>
    </label>
    <input type="file" id={id} style={{display:'none'}}  onChange={(e) => {
    const file = e.target.files?.[0];
    if (file) setImg(file);
    setFile(file!)
  }}/><br/>
  {img &&
  <button className={classes.button} onClick={()=>{setImg(null);}}>X</button>}
  </article>
}