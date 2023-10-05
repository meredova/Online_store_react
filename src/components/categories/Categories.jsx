import { useEffect, useState } from 'react';
import './Categories.css';
import { useSelector, useDispatch } from 'react-redux';
import { getCategories, setSelectedCategory } from '../../redux/slices/categoriesSlice';

const Categories = () => {

    const [selCategory, setSelCategory] = useState('')

    const dispatch = useDispatch()

    const categories = useSelector((state) => state.categories.items)

    useEffect(() => {
        dispatch (getCategories())
    }, [])

    const handleCategory = (category) => {
        setSelCategory(category)
        dispatch(setSelectedCategory(category))
    } 

    const categoriesList = categories.map((category, idx) => (
        <option
            key = {idx}
            value = {category}
            >
            {category}
        </option>
    ))

    return (
        <select
        className='Category'
        value={selCategory}
        onChange={(e) => handleCategory(e.target.value)}>
            <option default>all</option>
            {categoriesList}
        </select>
    )
}

export default Categories