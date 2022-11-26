import React, { useEffect, useState } from 'react'
import ContentPost from './ContentPost'
import ProfilPost from './ProfilePost'
import CoverImg from "./Images/image3.jpg"
import axios from 'axios'
import { useLocation } from 'react-router-dom'

export default function ProfileMainPost() {
  const [post, setPost] = useState([])
  let location = useLocation()
  let id = location.pathname.split("/")[2] 

  useEffect(() => {
    const getPost = async()=>{
      try {
        const res = await axios.get(`http://localhost:5000/api/post/getpost/${id}`)
        setPost(res.data)
      } catch (error) {
        //console.log("error occured")
      }
    }
  getPost()
    
  }, [])
  
  return (
    <div className='ProfileMainPost'>
      <div className='ProfileMainPost_coverImg'>
        <img src={`${CoverImg}`} alt="" />
        <h2>Your profile</h2>
      </div>
        <ContentPost />
        {post.map((item)=>(
          <ProfilPost detail={item}/>
        ))}
        
    </div>
  )
}
