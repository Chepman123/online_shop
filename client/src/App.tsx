import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Reg from './components/Pages/RegLog/Reg';
import Log from './components/Pages/RegLog/Log';
import Profile from './components/Pages/Profile/Profile';
import AddItem from './components/Pages/AddItem/AddItem';
import ItemPage from './components/Pages/ItemPage/ItemPage';
import MainPage from './components/Pages/MainPage/MainPage';
import Cart from './components/Pages/Cart/Cart';
import Likes from './components/Pages/Likes/Likes';


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/registration' element={<Reg/>}/>
        <Route path='/login' element={<Log/>}/>
        <Route path='/profile/:username' element={<Profile/>}/>
        <Route path='/profile/:username/likes' element={<Likes/>}/>
        <Route path='/newItem' element={<AddItem/>}/>
        <Route path='/item/:id' element={<ItemPage/>}/>
        <Route path='/' element={<MainPage/>}/>
        <Route path='/cart' element={<Cart/>}/>
      </Routes>
    </BrowserRouter>
  );

}

