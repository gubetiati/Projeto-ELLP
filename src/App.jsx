import { useState } from 'react'
import './App.css'
import TextField from './components/TextField/TextField'
import Form from './components/Form/Form'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Form/>
      </div>
     
    </>
  )
}

export default App
