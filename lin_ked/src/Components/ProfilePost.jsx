import React, { useState, useEffect } from "react"
import ProfileImg from "./Images/image4.jpg"
import CommentIcon from "./Images/speech-bubble.png"
import ShareIcon from "./Images/share-from-square-solid.svg"
import MoreOptions from "./Images/ellipsis-solid.svg"
import axios from "axios"

export default function Post({ detail }) {
   //console.log(detail)

  const [count, setCount] = useState(0)
  const [Comments, setComments] = useState([])
  const [CommentWriting, setCommentWriting] = useState("")
  const [show, setshow] = useState(false)
 
  const [user, setUser] = useState([])

  useEffect(() => {
    const getuser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/user/userdetails/${detail.user}`
        )
        setUser(res.data)
      } catch (error) {
        //console.log("Some error occured")
      }
    }
    getuser()
  }, [detail.user])
//console.log(user)

  const handleLike = async() => {
    /*if (like == LikeIcon) {
      await fetch(`http://localhost:5000/api/post/${post._id}/like`, {method:"PUT", headers:{'Content-type':"application/Json", token:accessToken}})
      setLike(LikedIcon)
      setCount(count + 1)
    } else {
      await fetch(`http://localhost:5000/api/post/${post._id}/like`, {method:"PUT", headers:{'Content-type':"application/Json", token:accessToken}})
      setLike(LikeIcon)
      setCount(count - 1)
    }*/
  }

  const addComment = () => {
    const comment = {
      id: "myFakeId",
      username: "sam",
      title: `${CommentWriting}`,
    }
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
           
              <img
                src={`${user.profile}`}
                alt=""
                className="PostContainer_sub_post_full_content_header_profileImg"
              />
           

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
          <p>{detail.title}</p>
          <img
            src={`${detail.image}`}
            alt=""
            className="PostContainer_sub_post_full_content_post_img"
          />

          <div className="PostContainer_sub_post_full_content_footer">
            <div className="PostContainer_sub_post_full_content_footer_container">
              {/*<img
                src={`${like}`}
                alt=""
                className="PostContainer_sub_post_full_content_footer_icons"
                onClick={handleLike}
  />*/}
              <span>{detail.like.length} Likes</span>
            </div>
            <div className="PostContainer_sub_post_full_content_footer_container">
              <img
                src={`${CommentIcon}`}
                alt=""
                className="PostContainer_sub_post_full_content_footer_icons"
                onClick={handleshow}
              />
              <span>{detail.comments.length} Comments</span>
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
                <img src={`${ProfileImg}`} alt="" className="Bottom_img" />
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
                  <img src={`${ProfileImg}`} alt="" className="Bottom_img" />
                  <span>{item.username}</span>
                  <p>{item.title}</p>
                </div>
              ))}
              <div className="Bottom_reply">
                <p>Reply</p>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  )
}
