import './Basket.css'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Basket = () => {

    const basket = useSelector((state) => state.basketShop.basket)
    const totalSum = useSelector((state) => state.basketShop.totalSum)

    
    const basketUI = basket.map(({id, title, count, price}) =>(
        <div className='Basket-group'>
            <Link to={`/card/${id}`} className='Product-title'>{title}</Link>
            <div className='Price-container'>
                <div key = {id}>{count}</div>
                <div key = {id}>{price} $</div>
            </div>
        </div>
    ))
    
    
    return(
        <div className="Basket-container">
            <div className='Basket-group'>
                <h3>Title</h3> 
                <div className='Price-container'>
                    <h3>Count</h3>
                    <h3>Price</h3>
                </div>
            </div>
            {basketUI.length > 0 ? basketUI : <h1>EMPTY</h1>}
            <h3>Total: {totalSum} $</h3>
        </div>
    )
}

export default Basket