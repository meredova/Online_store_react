import './Basket.css'
import { Link } from 'react-router-dom'
import Product from './../../components/products/Product.jsx'
import { useSelector, useDispatch } from 'react-redux'
import { loadBasketFromLS } from '../../redux/slices/basketSlice.ts'
import { useEffect } from 'react'

const Basket = () => {

    const totalSum = useSelector((state) => state?.basketShop.totalPrice)
    const basketLocalStor = useSelector((state) => state?.basketShop.basketLS)

    const dispatch = useDispatch()



    const  basketUI = basketLocalStor.map(
        ({id, title, itemPrice, image, totalItemPrice }) =>(
            <Product
                title = {title}
                price = {itemPrice}
                product_ph = {image}
                key = {id}
                id = {id}
                totalItemPrice = {totalItemPrice}
            />
   
        // <div  className='Basket-group'>
        //     <Link to={`/product/${id}`} className='Product-title'>{title}</Link>
        //     <div className='Price-container'>
        //         <div>
        //             <button>-</button>
        //             {count}
        //             <button>+</button>
        //         </div>
        //         <div>{price} $</div>
        //     </div>
        // </div>
    ))

    useEffect(() => {
        dispatch(loadBasketFromLS())
    }, [totalSum])
    
    return(
        <div className="Basket-container">
            <div className='Basket-wrapper'>
                {basketUI.length > 0 ? basketUI : <h1>EMPTY</h1>}
            </div>
            <h3>Total: {totalSum} $</h3>
        </div>
    )
}

export default Basket