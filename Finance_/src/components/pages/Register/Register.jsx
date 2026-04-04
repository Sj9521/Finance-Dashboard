import React, { useState } from 'react'
import './Register.css'
import { useNavigate } from 'react-router-dom'

function Register() {
  let nav = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function submitHandlerFun(e) {
    e.preventDefault()

    let allusers = JSON.parse(localStorage.getItem('users')) || []
    let newUsers = { name, email, password }
    allusers.push(newUsers)
    localStorage.setItem("users", JSON.stringify(allusers))

    alert("Registration done ✅")
    setName('')
    setEmail('')
    setPassword('')
    nav('/Login')
  }

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Create Account</h2>
        <p className="subtitle">Start your journey with us</p>

        <form className="register-form" onSubmit={submitHandlerFun}>
          
          <div className="input-group">
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter your name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

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

          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  )
}

export default Register