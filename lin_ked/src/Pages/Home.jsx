import React from "react"
import { useSelector} from "react-redux"
import LeftBar from "../Components/LeftBar"
import MainPost from "../Components/MainPost"
import Navbar from "../Components/Navbar"
import RightBar from "../Components/RightBar"

export default function Home() {
  const userDetails = useSelector((state)=>state.user)
  let user = userDetails.user
  //console.log(user)

  return (
    <div className="home">
        <Navbar />
        <div className="ComponentContainer">
          <LeftBar />
          <MainPost />
          <RightBar />  
        </div>
    </div>
  )
}
