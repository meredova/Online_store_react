import { useEffect } from 'react'
import './Home.css'
import Product from '../../components/products/Product.jsx'
import Categories from '../../components/categories/Categories.tsx'
import { getProductsFromCategories, getSearchProducts } from '../../redux/slices/productsSlice.ts'
import { useSelector, useDispatch } from 'react-redux'
import { loadBasketFromLS } from '../../redux/slices/basketSlice.ts'

const Home = () => {

    const dispatch = useDispatch()

    const products = useSelector((state) => state.items.items)
    const category = useSelector((state)=> state.categories.selectedCategory)
    const searchProduct = useSelector((state) => state.items.searchItems)

    useEffect(() => {
        const asyncFn = async () => {
            dispatch (getProductsFromCategories(category))
            dispatch(loadBasketFromLS())
        }
        asyncFn()
    }, [])

    const productsData = products.map(({title, price, id, image, totalPrice}) => (
        <Product 
        title = {title}
        price = {price}
        product_ph = {image}
        key = {id}
        id = {id}
        totalPrice = {totalPrice}
        />
    ))
   
  useEffect(() => {
    dispatch(getProductsFromCategories(category))
  }, [category])

    
    useEffect(() => {
        if(searchProduct === '') {
            dispatch (getProductsFromCategories(category))
        } else {
            dispatch(getSearchProducts(searchProduct))
        }
    }, [searchProduct]);

    


    return(
        <div className='Home-container'>
            <Categories/>
            <div className='Product-container'>
                {products.length > 0 ? productsData : <h1>LOADING...</h1>}
            </div>
        </div>
    )
}

export default Home