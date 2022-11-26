import React from "react"
import Navbar from "../Components/Navbar"
import ProfileLeftBar from "../Components/ProfileLeftBar"
import ProfileMainPost from "../Components/ProfileMainPost"
import ProfileRightBar from "../Components/ProfileRightBar"
import { useSelector } from "react-redux"


export default function Profile() {

  const userDetails = useSelector((state)=>state.user)
  let user = userDetails.user
  //console.log(user)

  return (
    <div className="ProfileContainer">
      <Navbar />
      <div className="subProfileContainer">
        <ProfileLeftBar />
        <ProfileMainPost />
        <ProfileRightBar />
      </div>
    </div>
  )
}
