import React ,{ useEffect,  useState }from 'react'
import img2 from './Images/image2.jpg'
import axios from 'axios'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from "react-redux"

export default function ProfileLeftBar() {
  
  let location = useLocation()
  let id = location.pathname.split('/')[2]
  //console.log(id)
  const userDetails = useSelector((state)=>state.user)
  let user = userDetails.user

  const [Follow , setUnFollow] = useState([user.others.Following.includes(id) ? "Unfollow" : "Follow"]);
  const accessToken = user.accessToken;
  //console.log(accessToken)
//const id = user.others._id
  let username = user.others.username

   const [users, setUser] = useState([])
  useEffect(() => {
    const getuser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/user/userdetails/${id}`
        )
        setUser(res.data)
      } catch (error) {
        console.log('Some error occured')
      }
    }
    getuser()
  }, [])
  //console.log(users) 

 let followersCounter = users?.Followers?.length
 let followingCounter = users?.Following?.length

  //console.log(followersCounter)
  const [Followinguser, setFollowinguser] = useState([])
  useEffect(() => {
    const getFollowing = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/post/following/${id}`
        )
        setFollowinguser(res.data)
      } catch (error) {
        console.log('error')
      }
    }
    getFollowing()
  }, [])

  //console.log(Followinguser)

  const handleFollow = async()=>{
    if(Follow === "Follow"){
      await fetch(`http://localhost:5000/api/user/following/${id}` , {method:'PUT', headers:{'Content-Type':"application/JSON" , token:accessToken} , body:JSON.stringify({user:`${user.others._id}`})})
      setUnFollow("UnFollow")
    }else{
      await fetch(`http://localhost:5000/api/user/following/${id}` , {method:'PUT', headers:{'Content-Type':"application/JSON" , token:accessToken} , body:JSON.stringify({user:`${user.others._id}`})})
      setUnFollow("Follow")
    }
  }

  return (
    <div className="ProfileLeftBar">
      <div className="ProfileLeftBar_Container">
        <img
          src={`${img2}`}
          alt=""
          className="ProfileLeftBar_Container_ProfilePageCover"
        />
        <div className="ProfileLeftBar_Container_profile">
          <img src={`${users.profile}`} alt="" className="ProfileImg" />
          <div className="ProfileLeftBar_Container_profile_info">
            <span>{users.username}</span>
            <p>Développeur web</p>
          </div>
        </div>

        <div className="ProfileLeftBar_Container_profile_views">
          <span>Following</span>
          <p>{followingCounter}</p>
        </div>

        <div className="ProfileLeftBar_Container_friends">
          <span>Followers</span>
          <p>{followersCounter}</p>
        </div>

        <div className="ProfileLeftBar_Container_user_bio">
          <h3>User Bio</h3>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptates
            officiis doloremque voluptatem natus dolorum qui earum animi,
            reprehenderit, magnam enim et quasi voluptas sequi, exercitationem
            molestiae corporis. Laudantium, harum eaque.
          </p>
        </div>
        {user.others._id !== id ? 
          <div onClick={handleFollow}>
            <button>{Follow}</button>
          </div>
         : 
          <div>
            <button>Edit Bio</button>
          </div>
        }
      </div>

      <div className="ProfileLeftBar_Container">
        <h3>Following</h3>
        <div className="ProfileLeftBar_Container_friends_title">
          <span>My friends</span>
          <span>See All</span>
        </div>

        <div className="ProfileLeftBar_Container_friends_container">
          {Followinguser.map((item) => (
            <Link to={`/profile/${item._id}`}>
              <div className="ProfileLeftBar_Container_friends" key={item._id}>
                <img
                  src={`${item.profile}`}
                  alt=""
                  className="ProfileLeftBar_Container_friends_img"
                />
                <span>{item.username}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
