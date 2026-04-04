import React from 'react'
import { Link } from 'react-router-dom'
import './Nav.css'

function Nav() {
  const status = JSON.parse(localStorage.getItem('loggedInUser'))

  return (
    <div className="nav-container">
      <h2 className="logo">Finance Dashboard</h2>

      <div className="nav-links">
        {status ? (
          <Link to="/" className="nav-btn">Home</Link>
        ) : (
          <>
            <Link to="/Login" className="nav-btn">Login</Link>
            <Link to="/Register" className="nav-btn primary">Register</Link>
          </>
        )}
      </div>
    </div>
  )
}

export default Nav