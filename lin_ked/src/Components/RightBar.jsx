import React, { useEffect,useState } from 'react'
import adds from './Images/image3.jpg'
import axios from 'axios'
import { useSelector } from 'react-redux'
import Follow from './Follow'

export default function RightBar() {
  const userDetails = useSelector ((state) => state.user)
  let user = userDetails.user
  const id = user.others._id
  const [users, setUsers] = useState([])
  useEffect(() => {
    const getuser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/user/alluser/${id}`
        )
        setUsers(res.data)
      } catch (error) {
        console.log('Some error occured')
      }
    }
    getuser()
  }, [])
  //console.log(users)

  return (
    <div className="RightBar">
      <div className="RightBar_container">
        <div className="RightBar_container_adds">
          <img src={`${adds}`} alt="" className="RightBar_container_adds_img" />
          <div className="RightBar_container_titles">
            <span>Codedemy</span>
            <p>Buy codedemy course</p>
          </div>
        </div>
        <div className="RightBar_container_adds">
          <img src={`${adds}`} alt="" className="RightBar_container_adds_img" />
          <div className="RightBar_container_titles">
            <span>Codedemy</span>
            <p>Buy codedemy course</p>
          </div>
        </div>
        <div className="RightBar_container_adds">
          <img src={`${adds}`} alt="" className="RightBar_container_adds_img" />
          <div className="RightBar_container_titles">
            <span>Codedemy</span>
            <p>Buy codedemy course</p>
          </div>
        </div>
      </div>

      <div className="RightBar_container2">
        <h3>Suggested for you</h3>

        {users.map((item) => (
          <Follow userdetails={item} />
        ))}
      </div>
    </div>
  )
}
