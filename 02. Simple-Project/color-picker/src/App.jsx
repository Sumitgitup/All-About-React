
import { useState } from 'react'
import './index.css'
import Callback from './Callback'

// Parent
function App() {
  const [color, setColor] = useState(null)

  const getColor = (color) => {
    setColor(color)
  }

  return (
    <>
      <div className='container'>
          <div type="text" className='input-box' style={{background: `${color}`}}/>
          <Callback getColor={getColor}/>
      </div>
    </>
  )
}


export default App
