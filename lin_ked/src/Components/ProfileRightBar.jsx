import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Follow from './Follow'
import { useSelector } from "react-redux"
import { useLocation } from 'react-router-dom'

export default function ProfileRightBar() {

  const userDetails = useSelector((state)=>state.user)
  //console.log(userDetails)
  let user = userDetails.user
  //console.log(user)
  let location = useLocation();
  let id = location.pathname.split("/")[2];
  let idforSuggest = user.others._id
  const [Followinguser , setFollowinguser] = useState([]);
  
  useEffect(() => {
    const getFollowing = async()=>{
      try {
        const res = await axios.get(`http://localhost:5000/api/post/followers/${id}`);
        setFollowinguser(res.data);
      } catch (error) {
        console.log("Error")
      }
    }
    getFollowing();
  }, [])

  //console.log(Followinguser)

  const [users , setUsers] = useState([]);
  useEffect(() => {
    const getuser = async()=>{
      try {
        const res  = await axios.get(`http://localhost:5000/api/user/alluser/${idforSuggest}`)
        setUsers(res.data);
      } catch (error) {
        console.log("Some error occured")
      }
    }
    getuser();
  }, [])
  //console.log(users)
  return (
    <div className="ProfileRightBar">
      <div className="ProfileRightBar_container">
        <h3>Followers</h3>
        <div className="ProfileRightBar_container_followers">
          
          {Followinguser.map((item) => (
            <div className="ProfileRightBar_container_followers_content">
              <img src={`${item.profile}`} alt="" />
              <span>{item.username}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="ProfileRightBar_container2">
        <h3>Suggested for you</h3>
        {users.map((item)=>(
          <Follow userdetails={item}/>
        ))}
      </div>
    </div>
  )
}
