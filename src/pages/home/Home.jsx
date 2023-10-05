import { useEffect } from 'react'
import './Home.css'
import Product from '../../components/products/Product'
import Categories from '../../components/categories/Categories'
import { getProductsByCategory, getSearchProducts } from '../../redux/slices/productsSlice'
import { useSelector, useDispatch } from 'react-redux'

const Home = () => {

    const dispatch = useDispatch()

    const products = useSelector((state) => state.items.items)
    const category = useSelector((state)=> state.categories.selectedCategory)
    const searchProduct = useSelector((state) => state.items.searchItems)

    useEffect(() => {
        dispatch (getProductsByCategory())
    }, [])

    const productsData = products.map(({title, price, id, image}) => (
        <Product 
        title = {title}
        price = {price}
        product_ph = {image}
        key = {id}
        id = {id}
        />
    ))
   
  useEffect(() => {
    category === 'all' ? dispatch (getProductsByCategory()) :
    dispatch(getProductsByCategory(category))
  }, [category])

    
    useEffect(() => {
        if(searchProduct === '') {
            dispatch (getProductsByCategory())
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