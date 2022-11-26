import React, { useState } from 'react'
import { useLocation } from "react-router-dom"

export default function ResetPassword(){
    const location = useLocation()
    const code = location.search.split("?")[1]
    console.log(code)
    const [password, setPassword] = useState('')
    console.log(password)
    
    const handleClick = async(e)=>{
        e.preventDefault()
        await fetch(`http://localhost:5000/api/user/reset/password?${code}`,
        {method:"PUT", headers:{'Content-Type':"application/JSON"}, body:JSON.stringify({password:password})})
        .then((data)=>{
            alert('Your password reset successfully')
        })
    }

    return(
        <div className='resetPasswordContainer'>
            <div className='resetPasswordContainer_sub'>
                <span>Enter your new password</span>
                <form className='resetPasswordContainer_sub_body'>
                    <input type={password} placeholder="********" onChange={(e)=>setPassword(e.target.value)}/>
                    <button onClick={handleClick}>Set password</button>
                </form>
            </div>
        </div>
    )




}