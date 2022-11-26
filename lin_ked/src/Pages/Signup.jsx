import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { signup } from '../Components/Redux/apiCall'
import app from '../firebase'
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage'

export default function Signup() {
  const dispatch = useDispatch()

  const { isFetching, error } = useSelector((state) => state.user)
  const user = useSelector((state) => state.user)
  const [email, setEmail] = useState('')
  const [phonenumber, setPhonenumber] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [file, setFile] = useState(null)
  const userDetails = user.user
  console.log(userDetails)
  const navigator = useNavigate()

  const handleClick = (e) => {
    e.preventDefault()

    const filename = new Date().getTime() + file?.name
    const storage = getStorage(app)
    const StorageRef = ref(storage, filename)

    const uploadTask = uploadBytesResumable(StorageRef, file)

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log('Upload is ' + progress + '% done')
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused')
            break
          case 'running':
            console.log('Upload is running')
            break
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          signup(dispatch, {
            email,
            password,
            username,
            phonenumber,
            profile:downloadURL,
          })
        })
      }
    )
  }

  if(userDetails?.Status === 'Pending'){
    navigator('/verify/email')
  }

  return (
    <div className="signupMainContainer">
      <div className="signupMainContainer_sub">
        <div className="signupMainContainer_sub_header">
          <h1>
            _Lin<span className="part">_ked</span>
          </h1>
          <span>
            Connect with your <span className="part">family and friends</span>
          </span>
        </div>
        <div className="signupMainContainer_sub_body">
          <span>Create New Account</span>
          <input
            type="text"
            placeholder="User Name"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder="Phone Number"
            onChange={(e) => setPhonenumber(e.target.value)}
          />
          <input
            type="email"
            name=""
            id=""
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name=""
            id=""
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="file"
            name="file"
            id="setfile"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button onClick={handleClick}>SignUp</button>
          <Link to={'/'} className="signupMainContainer_sub_body_link">
            <p>Already have Account</p>
          </Link>
        </div>
      </div>
    </div>
  )
}
