import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Reg from './components/Pages/RegLog/Reg';
import Log from './components/Pages/RegLog/Log';
import Profile from './components/Pages/Profile/Profile';


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/registration' element={<Reg/>}/>
        <Route path='/login' element={<Log/>}/>
        <Route path='/profile/:username' element={<Profile/>}/>
      </Routes>
    </BrowserRouter>
  );

}

