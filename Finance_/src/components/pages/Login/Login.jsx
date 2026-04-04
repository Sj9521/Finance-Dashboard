import React, { useState } from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom'

function Login() {
  let nav = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function submitHandlerFun(e) {
    e.preventDefault()

    let allusers = JSON.parse(localStorage.getItem('users')) || []

    let loggedInUser = allusers.find(
      (x) => x.email === email && x.password === password
    )

    if (!loggedInUser) {
      alert("Invalid email or password")
      return
    }
    setEmail('')
    setPassword('')
    nav('/Main')
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 style={{color:'green'}}>Welcome Back !</h2>
        <p className="subtitle">Login to continue</p>

        <form className="login-form" onSubmit={submitHandlerFun}>
          
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login