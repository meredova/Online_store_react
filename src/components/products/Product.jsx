import { useEffect, useState } from 'react'
import './Product.css'
import { Link } from 'react-router-dom'
import { addProduct, deleteProduct } from '../../redux/slices/basketSlice.ts'
import { useDispatch, useSelector } from 'react-redux'

const Product = (props) => {

    const dispatch = useDispatch()
    const basketLS = useSelector((state) => state.basketShop.basketLS)

    const {
        title, 
        price, 
        product_ph, 
        id,
    } = props


    const [productCount, setProductCount] = useState(0)
    const [productPrice, setProductPrice] = useState(0)

    useEffect(() => {
        const findProductFromBasket = basketLS.find((item) => item.id == id)
        if (findProductFromBasket) {
            setProductCount(findProductFromBasket.count)
            setProductPrice(findProductFromBasket.totalItemPrice)
        }
    }, [])

    const addBasket = () => {
        setProductCount(productCount+1)
        setProductPrice(productPrice + price)
    }

    useEffect(() => {
        const data = {
            id: id, 
            totalItemPrice: productPrice, 
            count: productCount, 
            image: product_ph,
            title: title, 
            itemPrice: price,
        }
        productCount > 0 && dispatch(addProduct(data))
        
    }, [productCount])

    const deleteBasket = () => {
        setProductCount(productCount-1)
        setProductPrice(parseFloat((productPrice - price).toFixed(2)))
        const data = {title: title, totalItemPrice: productPrice, itemPrice: price, id: id, count: productCount, image: product_ph}
        dispatch(deleteProduct(data))
    }


    return(
        <div className='Product-item'>
            <Link to={`/product/${id}`} className='Product-title'>{title}</Link>
            <h3>{price} $</h3>
            <img className="Product-image" src={product_ph} alt="product_ph"/>
            <div className='Product-prices'>

                <div>Total Price: {productPrice} $</div>
            </div>
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