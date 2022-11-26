import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { login } from '../Components/Redux/apiCall'

export default function Login() {
  const dispatch = useDispatch()
  const {isFetching, error} = useSelector((state)=>state.user)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleClick = (e) => {
    e.preventDefault()
    login(dispatch, { email, password })
  }

  return (
    <div className="loginMainContainer">
      <div className="loginMainContainer_sub">
        <div className="loginMainContainer_sub_header">
          <h1>
            _Lin<span className="part">_ked</span>
          </h1>
          <span>
            Connect with your <span className="part">family and friends</span>
          </span>
        </div>
        <div className="loginMainContainer_sub_body">
          <span>Login Account</span>
          <input
            type="email"
            name=""
            id="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name=""
            id="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleClick}>login</button>
          <NavLink to={'/forgot/password'} className="loginMainContainer_sub_body_link">
            <p>Forgot Password</p>
          </NavLink>
          <NavLink to={'/signup'} className="loginMainContainer_sub_body_link">
            <p>Create New Account</p>
          </NavLink>
        </div>
      </div>
    </div>
  )
}
