import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ContentPost from './ContentPost'
import Post from './Post'
import { useSelector } from "react-redux"

export default function MainPost() {
  const userDetails = useSelector((state) => state.user)
  let user = userDetails.user
  console.log(user)
  let id = user.others._id
  const accessToken = user.accessToken
  //console.log(accessToken)
  
  const [post, setPost] = useState([])

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/user/followerspost/${id}`,
          {
            headers: {
              token: accessToken,
            },
          }
        )
        setPost(res.data)
      } catch (error) {}
    }
    getPost()
  }, [])
  //console.log(post)

  return (
    <div className="MainPost">
      <ContentPost />
      {post.map((item) => (
        <Post post={item} />
      ))}
    </div>
  )
}
