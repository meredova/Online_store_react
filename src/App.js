import './App.css';
import Home from './pages/home/Home'
import Header from './components/header/Header'
import Basket from './pages/basket/Basket'
import Card from './pages/card/Card'
// import Counter from './components/Counter'
import {
  Route,
  Routes,
} from "react-router-dom";

function App() {

  return (
    <div className='Container'>
      {/* <Counter/> */}
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path='/basket/*' element = {<Basket/>}/>
        <Route path='/card/:id' element = {<Card/>}/>
      </Routes>
    </div>
  );
}

export default App