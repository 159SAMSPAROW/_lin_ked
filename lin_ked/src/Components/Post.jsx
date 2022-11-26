import React, { useState, useEffect } from 'react'
import ProfileImg from './Images/image4.jpg'
import LikeIcon from './Images/like.png'
import CommentIcon from './Images/speech-bubble.png'
import ShareIcon from './Images/share-from-square-solid.svg'
import MoreOptions from './Images/ellipsis-solid.svg'
import LikedIcon from './Images/setLike.png'
import axios from 'axios'
import { useSelector } from 'react-redux'

export default function Post({ post }) {
  const [user, setUser] = useState([])
  const userDetails = useSelector((state) => state.user)
  let users = userDetails.user
  useEffect(() => {
    const getuser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/user/userdetails/${post.user}`
        )
        setUser(res.data)
      } catch (error) {
        console.log('Some error occured')
      }
    }
    getuser()
  }, [])
  //console.log(post)

  const userId = users.others._id
  const accessToken = users.accessToken
  const [like, setLike] = useState([
    post.like.includes(userId) ? LikedIcon : LikeIcon,
  ])
  const [count, setCount] = useState(post.like.length)
  const [Comments, setComments] = useState(post.comments)
  const [CommentWriting, setCommentWriting] = useState('')
  const [show, setshow] = useState(false)

  const handleLike = async () => {
    if (like == LikeIcon) {
      await fetch(`http://localhost:5000/api/post/${post._id}/like`, {
        method: 'PUT',
        headers: { 'Content-type': 'application/Json', token: accessToken },
      })
      setLike(LikedIcon)
      setCount(count + 1)
    } else {
      await fetch(`http://localhost:5000/api/post/${post._id}/like`, {
        method: 'PUT',
        headers: { 'Content-type': 'application/Json', token: accessToken },
      })
      setLike(LikeIcon)
      setCount(count - 1)
    }
  }

  const addComment = async() => {
    const comment = {
      "postid": `${post._id}`,
      "username": `${users.others.username}`,
      "comment": `${CommentWriting}`,
      "profile":`${users.others.profile}`
    }
   
    await fetch("http://localhost:5000/api/post/commentpost", {
        method: 'PUT',
        headers: { 'Content-type': 'application/Json', token: accessToken },
        body:JSON.stringify(comment)
      })
      console.log(comment)
      setComments(Comments.concat(comment))
  }
  
  const handleComment = () => {
    addComment()
  }

  //console.log(Comments)

  const handleshow = () => {
    if (show === false) {
      setshow(true)
    } else {
      setshow(false)
    }
  }

  //console.log(user)
  return (
    <div className="PostContainer">
      <div className="PostContainer_sub_post_">
        <div className="PostContainer_sub_post_full_content">
          <div className="PostContainer_sub_post_full_content_header">
            {user.profile === '' ? (
              <img
                src={`${ProfileImg}`}
                alt=""
                className="PostContainer_sub_post_full_content_header_profileImg"
              />
            ) : (
              <img
                src={user.profile}
                alt=""
                className="PostContainer_sub_post_full_content_header_profileImg"
              />
            )}

            <div className="PostContainer_sub_post_full_content_header_info">
              <span>{user.username}</span>
              <p>Following by elodie</p>

              <img
                src={`${MoreOptions}`}
                alt=""
                className="PostContainer_sub_post_full_content_header_more_options"
              />
            </div>
          </div>
          <p>{`${post.title}`}</p>
          {post.image !== '' ?
          
          <img
            src={`${post.image}`}
            alt=""
            className="PostContainer_sub_post_full_content_post_img"
          />: post.video !== '' ? <div > <video controls className="PostContainer_sub_post_full_content_post_video" >
            <source src={`${post.video}`} type="video/mp4" />
          </video></div>: ""
          }   
          <div className="PostContainer_sub_post_full_content_footer">
            <div className="PostContainer_sub_post_full_content_footer_container">
              <img
                src={`${like}`}
                alt=""
                className="PostContainer_sub_post_full_content_footer_icons"
                onClick={handleLike}
              />
              <span>{count} Likes</span>
            </div>
            <div className="PostContainer_sub_post_full_content_footer_container">
              <img
                src={`${CommentIcon}`}
                alt=""
                className="PostContainer_sub_post_full_content_footer_icons"
                onClick={handleshow}
              />
              <span>{Comments.length} Comments</span>
            </div>

            <div className="PostContainer_sub_post_full_content_footer_container_share">
              <img
                src={`${ShareIcon}`}
                alt=""
                className="PostContainer_sub_post_full_content_footer_icons"
              />
              <span>Share</span>
            </div>
          </div>

          {show === true ? (
            <div>
              <div className="Bottom">
                <img src={`${users.others.profile}`} alt="" className="Bottom_img" />
                {/*<span>Me</span>*/}
                <input
                  type="text"
                  placeholder="Write your Comment"
                  onChange={(e) => setCommentWriting(e.target.value)}
                />
                <button
                  className="Bottom_addCommentBtn"
                  onClick={handleComment}
                >
                  Add Comment
                </button>
              </div>
              {Comments.map((item) => (
                <div className="Bottom">
                  <img src={`${item.profile}`} alt="" className="Bottom_img" />
                  <span>{item.username}</span>
                  <p>{item.comment}</p>
                </div>
              ))}
              <div className="Bottom_reply">
                <p>Reply</p>
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  )
}
