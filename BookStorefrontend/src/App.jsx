import { useState } from 'react'
import './App.css'
import MainPage from './MainPage'
import { Route,Routes } from 'react-router-dom'
import Login from './Login'
import Sign from './Sign'
import Body from './Body'
import AdminBody from './AdminBody'
import Cart from './Cart'

function App() {
 
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Sign/>}/>
        <Route path='/body' element={<Body/>}/>
        <Route path='/adminbody' element={<AdminBody/>}/>
        <Route path='/cart' element={<Cart/>}/>
      </Routes>
      
    </>
  )
}

export default App
