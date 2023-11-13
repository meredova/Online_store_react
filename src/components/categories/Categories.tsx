import { ChangeEvent, useEffect, useState } from 'react';
import './Categories.css';
import { useSelector, useDispatch } from 'react-redux';
import { getCategories, setSelectedCategory } from '../../redux/slices/categoriesSlice.ts';

const Categories = () => {

    const [selCategory, setSelCategory] = useState<string>('')

    const dispatch = useDispatch()

    const categories = useSelector((state) => state.categories.items)

    useEffect(() => {
        dispatch (getCategories())
    }, [])

    const handleCategory = (category:string) => {
        setSelCategory(category)
        dispatch(setSelectedCategory(category))
    } 

    const categoriesList = categories.map((category:string, idx:number) => (
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
        onChange={(e:ChangeEvent<HTMLSelectElement>) => handleCategory(e.target.value)}>
            <option default>all</option>
            {categoriesList}
        </select>
    )
}

export default Categories