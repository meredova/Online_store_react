import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement, showMessage } from '../redux/slices/counterSlice'


const Counter = () => {
    const count = useSelector((state) => state.counter.value)
    const message = useSelector((state) => state.counter.message)
    const dispatch = useDispatch()

    const greeting = 'Hello'

    return (
        <>
            <span>{count}</span>
            <span>Message: {message}</span>
            <button onClick={() => dispatch(increment())}>Increment</button>
            <button onClick={() => count > 0 && dispatch(decrement())}>Decrement</button>
            <button 
            onClick={() => {
                dispatch(showMessage(greeting))
                }}>Send message</button>
        </>
    )
}

export default Counter