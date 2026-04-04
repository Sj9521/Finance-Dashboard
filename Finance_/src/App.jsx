import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Nav from './components/pages/Nav/Nav'
import Home from './components/pages/Home/Home'
import Login from './components/pages/Login/Login'
import Register from './components/pages/Register/Register'
import Main from './Main_dashboard/Dashboard_phase/Main'

function App() {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/Login' element={<Login />}></Route>
        <Route path='/Register' element={<Register />}></Route>
        <Route path='/Main' element={<Main />}></Route>
      </Routes>
    </div>
  )
}

export default App