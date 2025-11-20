import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router'
import Homepage from './components/Home'
import { Signin } from './components/Signin'
import { Signup } from './components/Signup'
import Dash from './pages/dash'
import Health from './pages/health'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage/>}></Route>
        <Route path="/signin" element={<Signin/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/dash" element={<Dash/>}></Route>
        <Route path="/health" element={<Health/>}></Route>
      </Routes>
      {/* <p className='flex justify-center  text-amber-600'>in works</p> */}
    </>
  )
}

export default App
