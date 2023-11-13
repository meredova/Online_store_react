import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import './Card.css'

const Card = () => {

    const {id} = useParams()

    type TProduct = {
        id:number,
        title:string,
        category:string,
        image:string,
        price:number,
        description:string,
        rating:{
            count:number,
            rate:number
        }
    }

    const [product, setProduct] = useState<TProduct | null>(null)

    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${id}`)
            .then(res=>res.json())
            .then(json => setProduct(json))
            .catch((err) => console.log(err))
    }, [])

    return(
        <div className="Card-container">
            <img className='Card-img' width='200px' src={product?.image} alt='{product.title}'/>  
            <div className='Card-wrapper'>
                <h2 className='Card-title'>{product?.title}</h2>
                <div className='Card-descr'>{product?.description}</div>
                <div className='Card-rating'>Rating: {product?.rating?.rate}</div>
                <div className='Card-remain'>Remaining quantity: {product?.rating?.count} pcs</div>
                <h3>Price: {product?.price} $</h3>
            </div>
        </div>
    )
}

export default Card