import { useState } from 'react'
import "../style.css"

const Counter = () => {
    const [count, setCount ] = useState(0);

    const handleIncrement = () => {
        setCount(count + 1)
    }

    const handleDecrement = () => {
        setCount(count - 1)
    }
  return (
    <div className='container'>
        <div>
            <h1 className='number'>{count}</h1>
        </div>
        <div className='btns-container'>
            <button className='increment' onClick={handleIncrement}>+</button>
            <button className='increment' onClick={handleDecrement}>-</button>

        </div>
    </div>
  )
}

export default Counter