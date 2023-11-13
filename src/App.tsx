import './App.css';
import Home from './pages/home/Home'
import Header from './components/header/Header.tsx'
import Basket from './pages/basket/Basket.jsx'
import Card from './pages/card/Card.tsx'
// import Product from './components/products/Product.tsx';
import {
  Route,
  Routes,
} from "react-router-dom";

function App() {

  return (
    <div className='Container'>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path='/basket/*' element = {<Basket/>}/>
        <Route path='/product/:id' element = {<Card/>}/>
      </Routes>
    </div>
  );
}

export default App