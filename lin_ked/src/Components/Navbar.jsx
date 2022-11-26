import React from "react"
import {useDispatch, useSelector } from 'react-redux'
import searchIcon from "./Images/search.png"
import Notifications from "./Images/bell.png"
import Message from "./Images/message.png"
import { Link } from "react-router-dom"
import { logout } from "../Components/Redux/userReducer"

export default function Navbar() {
  const userDetails = useSelector((state)=>state.user)
  let user = userDetails.user
  //console.log(user)
  let id = user.others._id
  //console.log(id)
  const dispatch = useDispatch()
  const handleLogout = () =>{
    dispatch(logout())
  }
  return (
    <div className="mainNavbar">
      <div className="mainNavbar_logo_container">
        <p>_Lin_Ked</p>
      </div>
      <div className="mainNavbar_search_input_container">
        <img src={`${searchIcon}`} className="mainNavbar_search_input_container_icons" alt="" />
        <input type="text" name="" id="" placeholder="Search your Friend or your Family Member"/>
      </div>
      <div className="mainNavbar_icons_container">
        <img src={`${Notifications}`} className="mainNavbar_icons_container_icons" alt="" />
        <img src={`${Message}`} className="mainNavbar_icons_container_icons" alt="" />
        
        <Link to={`/profile/${id}`}>
        <div className="mainNavbar_icons_container_profile">
            <img src={`${user.others.profile}`} className="mainNavbar_icons_container_profile_profileImg" alt="" />
            <p>{user.others.username}</p>
        </div>
        </Link>
        <div className="mainNavbar_icons_container_logout" onClick={handleLogout}>
          <span>Logout</span>          
        </div>
      </div>

    </div>
  )
}
