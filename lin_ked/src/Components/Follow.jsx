import React from 'react'
import addFriend from './Images/add-user.png'
import UserToFollow from './Images/user-check-solid.svg'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export default function Follow({ userdetails }) {

  const userDetails = useSelector((state) => state.user)
  let user = userDetails.user

  const id = user.others._id
  
  //console.log(id)
  const accessToken = user.accessToken
  const [Follow, setFollow] = useState(addFriend)
  const handleFollow = async (e) => {
    await fetch(`http://localhost:5000/api/user/following/${userdetails._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/JSON', token: accessToken },
      body: JSON.stringify({ user:`${id}` }),
    })
    setFollow(UserToFollow)
  }

  return (
    <div className="RightBar_container2_bar" key={userdetails._id}>
      <Link to={`/profile/${userdetails._id}`}>
        <div className="RightBar_container2_friend">
          <img
            src={`${userdetails.profile}`}
            alt=""
            className="RightBar_container2_profile_img"
          />
          <div className="RightBar_container2_profile_text">
            <span>{userdetails.username}</span>
            <p>Suggested for you</p>
          </div>
        </div>
      </Link>
      <div
        className="RightBar_container2_icon"
        onClick={(e) => handleFollow(userdetails._id)}
      >
        <img
          src={`${Follow}`}
          alt=""
          className="RightBar_container2_addFriend"
        />
      </div>
    </div>
  )
}
