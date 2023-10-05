import './Header.css'
import React from 'react';
import { Link } from "react-router-dom";
import basket from '../../assets/icons/basket-icon.svg'
import { useDispatch, useSelector } from 'react-redux';
import { setSearchWord } from '../../redux/slices/productsSlice';

const Header = () => {

    const dispatch = useDispatch()
    const totalBasketCount = useSelector((state) => state.basketShop.totalBasketCount)
    
    const handleChange = (event) => {
        dispatch(setSearchWord(event.target.value))
    }
    
    return (
        <div className='Header'>
            <div className='Header-header'><Link className='Go-home' to='/'>Online Shop</Link></div>
            <div className='Header-links'>
                <input className='Input-search' 
                placeholder='Search..'
                onChange={handleChange}
                ></input>
                <div className='Header-basket'>
                    {totalBasketCount}
                    <Link to='basket'><img className='Basket' src={basket} alt='basket'/></Link>
                    </div>
                </div>
                
        </div>
    )
}

export default Header