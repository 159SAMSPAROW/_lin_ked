import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { VerifyEmail } from '../Components/Redux/apiCall'
import { Link, useNavigate } from 'react-router-dom'

export default function Verifyemail(){

    const dispatch = useDispatch()
    const [OTP, setOTP] = useState('')
    const user = useSelector((state)=>state.user)
    
    const userDetails = user.user
    const id = userDetails.user
    console.log(id)

    const handleOTP = (e)=>{
        e.preventDefault()
        VerifyEmail(dispatch, {OTP:OTP, user:id})
    }

    return(
        <div className='verifyEmailContainer'>
            <div className='verifyEmailContainer_sub'>
                <span>Avelance Send email</span>
                <form className='verifyEmailContainer_sub_body'>
                    <input type={"number"} placeholder="Enter your OTP" onChange={(e)=>setOTP(e.target.value)} />
                    <button onClick={handleOTP}>Confirm OTP</button>
                    <Link to={"/signup"} className="verifyEmailContainer_sub_body_link">
                        <p>Check your email to get a OTP</p>
                    </Link>
                </form>
            </div>
        </div>
    )


}