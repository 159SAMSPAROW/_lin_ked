import React from 'react'

import img5 from './Images/image5.jpg'
import img1 from './Images/image1.jpg'
import img2 from './Images/image2.jpg'
import img3 from './Images/image3.jpg'
import img4 from './Images/image4.jpg'
import img6 from './Images/image6.jpg'
import { useEffect, useState } from 'react'
import axios from 'axios'
import {useSelector} from "react-redux"

export default function LeftBar() {
  const userDetails = useSelector((state)=>state.user)
  let user = userDetails.user
  //console.log(user)
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
  console.log(post)

  return (
    <div className="LeftBar">
      <div className="LeftBar_Notifications_Container">
        <div className="LeftBar_Notifications_Container_titles">
          <span>Notifications</span>
          <p>See all</p>
        </div>
        <div className="LeftBar_Notifications_Container_profile">
          <img
            src={`${img1}`}
            className="LeftBar_Notifications_Container_img"
            alt=""
          />
          <span>
            Sam like your post post postaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa post
          </span>
          <img
            src={`${img2}`}
            className="LeftBar_Notifications_Container_img_like"
            alt=""
          />
        </div>

        <div className="LeftBar_Notifications_Container_profile">
          <img
            src={`${img3}`}
            className="LeftBar_Notifications_Container_img"
            alt=""
          />
          <span>Sam like your post</span>
          <img
            src={`${img4}`}
            className="LeftBar_Notifications_Container_img_followers"
            alt=""
          />
        </div>

        <div className="LeftBar_Notifications_Container_profile">
          <img
            src={`${img5}`}
            className="LeftBar_Notifications_Container_img"
            alt=""
          />
          <span>Sam like your post</span>
          <img
            src={`${img6}`}
            className="LeftBar_Notifications_Container_img_like"
            alt=""
          />
        </div>

        <div className="LeftBar_Notifications_Container_profile">
          <img
            src={`${img1}`}
            className="LeftBar_Notifications_Container_img"
            alt=""
          />
          <span>Sam like your post</span>
          <img
            src={`${img2}`}
            className="LeftBar_Notifications_Container_img_followers"
            alt=""
          />
        </div>
        <div className="LeftBar_Notifications_Container_profile">
          <img
            src={`${img3}`}
            className="LeftBar_Notifications_Container_img"
            alt=""
          />
          <span>Sam like your post</span>
          <img
            src={`${img4}`}
            className="LeftBar_Notifications_Container_img_like"
            alt=""
          />
        </div>

        <div className="LeftBar_Notifications_Container_profile">
          <img
            src={`${img5}`}
            className="LeftBar_Notifications_Container_img"
            alt=""
          />
          <span>Sam like your post</span>
          <img
            src={`${img6}`}
            className="LeftBar_Notifications_Container_img_followers"
            alt=""
          />
        </div>

        <div className="LeftBar_Notifications_Container_profile">
          <img
            src={`${img1}`}
            className="LeftBar_Notifications_Container_img"
            alt=""
          />
          <span>Sam like your post</span>
          <img
            src={`${img2}`}
            className="LeftBar_Notifications_Container_img_like"
            alt=""
          />
        </div>

        <div className="LeftBar_Notifications_Container_profile">
          <img
            src={`${img3}`}
            className="LeftBar_Notifications_Container_img"
            alt=""
          />
          <span>Sam like your post</span>
          <img
            src={`${img4}`}
            className="LeftBar_Notifications_Container_img_followers"
            alt=""
          />
        </div>

        <div className="LeftBar_Notifications_Container_profile">
          <img
            src={`${img5}`}
            className="LeftBar_Notifications_Container_img"
            alt=""
          />
          <span>Sam like your post</span>
          <img
            src={`${img6}`}
            className="LeftBar_Notifications_Container_img_like"
            alt=""
          />
        </div>
      </div>

      <div className="LeftBar_Notifications_Container">
        <div className="LeftBar_Notifications_Container_explore_titles">
          <span>Explore</span>
          <p>See all</p>
        </div>
        <div className='LeftBar_Notifications_Container_explore_img'>
          {post.map((item) => [
            item.image === '' ? (
              ''
            ) : (
              <img src={`${item.image}`} alt="" />
            ),
          ])}
        </div>
      </div>
    </div>
  )
}
