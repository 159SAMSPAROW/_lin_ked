import React, { useState } from 'react'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')

  const handleClick = async (e) => {
    e.preventDefault()
    await fetch(`http://localhost:5000/api/user/forgot/password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/JSON' },
      body: JSON.stringify({ email: email }),
    })
      .then(() => {
        alert('We sent you a token email')
      })
      .catch(() => {
        alert('fail to proccess')
      })
  }

  return (
    <div className='forgotPasswordContainer'>
      <div className='forgotPasswordContainer_sub'>
        <span>Enter your Email</span>
        <form className='forgotPasswordContainer_sub_body'>
          <input
            type={'text'}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={handleClick}>Send</button>
        </form>
      </div>
    </div>
  )
}
