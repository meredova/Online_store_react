import { useState } from 'react'
import './Product.css'
import { Link } from 'react-router-dom'
import { addProduct, deleteProduct } from '../../redux/slices/basketSlice'
import { useDispatch } from 'react-redux'

const Product = (props) => {

    const {
        title, 
        price, 
        product_ph, 
        id,
    } = props

    const dispatch = useDispatch()

    const [productCount, setProductCount] = useState(0)

    const addBasket = () => {
        setProductCount(productCount+1)
        const data = {title: title, price: price, id: id, count: 1}
        dispatch(addProduct(data))
    }

    const deleteBasket = () => {
        setProductCount(productCount-1)
        const data = {title: title, price: price, id: id, count: 1}
        dispatch(deleteProduct(data))
    }


    return(
        <div className='Product-item'>
            <Link to={`/card/${id}`} className='Product-title'>{title}</Link>
            <img className="Product-image" src={product_ph} alt="product_ph"/>
            <h3>{price} $</h3>
            <div className='Add-product'>
                <button className='Btn-add'
                onClick={() => productCount > 0 && deleteBasket()}>-</button>
                <span>{productCount}</span>
                <button className='Btn-add' 
                onClick={addBasket}>+</button>
            </div>
        </div>
    )
}

export default Product