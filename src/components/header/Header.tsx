import './Header.css'
import React, { ChangeEvent } from 'react';
import { Link } from "react-router-dom";
import basket from '../../assets/icons/basket-icon.svg'
import { useDispatch, useSelector } from 'react-redux';
import { setSearchWord } from '../../redux/slices/productsSlice.ts';

const Header = () => {

    const dispatch = useDispatch()
    
    const handleChange = (event : ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchWord(event.target.value))
    }

    const totalCount = useSelector((state) => state.basketShop.totalBasketCount )

    return (
        <div className='Header'>
            <div className='Header-header'><Link className='Go-home' to='/'>Online Shop</Link></div>
            <div className='Header-links'>
                <input className='Input-search' 
                placeholder='Search..'
                onChange={handleChange}
                ></input>
                <div className='Header-basket'>
                    {totalCount}
                    <Link to='basket'><img className='Basket' src={basket} alt='basket'/></Link>
                    </div>
                </div>
                
        </div>
    )
}

export default Header