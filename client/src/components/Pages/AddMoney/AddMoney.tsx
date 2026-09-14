import IsLogined from "../../IsLogined";
import Money from "../../Money/Money";
import classes from './AddMoney.module.scss'
export default function AddMoney(){
    const numbers = [50,100,200,400,800];
return <main className={classes.main}>
    <IsLogined/>
    <h1>Add money to your pocket</h1>
    {numbers.map((number)=>{
        return <Money key={number} count={number}/>
    })}
</main>
}