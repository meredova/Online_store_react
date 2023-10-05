import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import './Card.css'

const Card = () => {
    const [productCount, setProductCount] = useState(0)

    const {id} = useParams()

    const [product, setProduct] = useState('')

    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${id}`)
            .then(res=>res.json())
            .then(json => setProduct(json))
    }, [])

    return(
        <div className="Card-container">
            <img className='Card-img' width='200px' src={product.image} alt='{product.title}'/>  
            <div className='Card-wrapper'>
                <h2 className='Card-title'>{product.title}</h2>
                <div className='Card-descr'>{product.description}</div>
                <div className='Card-rating'>Rating: {product.rating?.rate}</div>
                <div className='Card-remain'>Remaining quantity: {product.rating?.count} pcs</div>
                <h3>{product.price} $</h3>
                <div className='Btns-container'>
                    <button className='Btn-add'
                        onClick={() => productCount > 0 && setProductCount(productCount-1)}>-</button>
                    <span>{productCount}</span>
                    <button className='Btn-add' 
                        onClick={() => setProductCount(productCount+1)}>+</button>
                </div>
            </div>
        </div>
    )
}

export default Card