import React from 'react'
import ImageIcon from './Images/gallery.png'
import EmojiIcon from './Images/cat-face.png'
import VideoIcon from './Images/video.png'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import app from '../firebase'
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage'

export default function ContentPost() {
  const userDetails = useSelector((state) => state.user)
  let user = userDetails.user
  //console.log(user)
  //let id = user.others._id
  const [file, setFile] = useState(null)
  const [file2, setFile2] = useState(null)
  const [title, setTitle] = useState('')
  const [imagePrev, setImagePrev] = useState(null)
  const [videoPrev, setVideoPrev] = useState(null)
  const accessToken = user.accessToken

  const handlePost = (e) => {
    e.preventDefault()
    if (file !== null) {
      const filename = new Date().getTime() + file?.name
      const storage = getStorage(app)
      const StorageRef = ref(storage, filename)

      const uploadTask = uploadBytesResumable(StorageRef, file)

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
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
            fetch(`http://localhost:5000/api/post/createpost`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/JSON',
                token: accessToken,
              },
              body: JSON.stringify({
                title: title,
                video: '',
                image: downloadURL,
              }),
            })
            alert('Your post was upload successfully !')
            window.location.reload(true)
          })
        }
      )
    } else if (file2 !== null) {
      const filename = new Date().getTime() + file2?.name
      const storage = getStorage(app)
      const StorageRef = ref(storage, filename)

      const uploadTask = uploadBytesResumable(StorageRef, file2)

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
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
            fetch(`http://localhost:5000/api/post/createpost`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/JSON',
                token: accessToken,
              },
              body: JSON.stringify({
                title: title,
                video: downloadURL,
                image: '',
              }),
            })
            alert('Your post was upload successfully !')
            window.location.reload(true)
          })
        }
      )
    } else {
      fetch(`http://localhost:5000/api/post/createpost`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/JSON', token: accessToken },
        body: JSON.stringify({ title: title, video: '', image: '' }),
      })
      alert('Your post was upload successfully !')
      window.location.reload(true)
    }
  }

  return (
    <div className="ContentUploadContainer">
      <div className="ContentUploadContainer_content">
        <img
          src={`${user?.others.profile}`}
          alt=""
          className="ContentUploadContainer_profileimg"
        />
        <input
          type="text"
          className="ContentUploadContainer_writingPart"
          placeholder="What'up bro ?"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="ContentUploadContainer_icons">
        <div className="ContentUploadContainer_footer">
          <label htmlFor="file">
            <img
              src={`${ImageIcon}`}
              alt=""
              className="ContentUploadContainer_icon"
            />
            <input
              type="file"
              name="file"
              id="file"
              onChange={(e) => [
                setFile(e.target.files[0]),
                setImagePrev(URL.createObjectURL(e.target.files[0])),
              ]}
            />
          </label>
          <img
            src={`${EmojiIcon}`}
            alt=""
            className="ContentUploadContainer_icon"
          />
          <label htmlFor="file2">
            <img
              src={`${VideoIcon}`}
              alt=""
              className="ContentUploadContainer_icon"
            />
            <input
              type="file"
              name="file2"
              id="file2"
              onChange={(e) => [
                setFile2(e.target.files[0]),
                setVideoPrev(URL.createObjectURL(e.target.files[0])),
              ]}
            />
          </label>
          <button
            className="ContentUploadContainer_icons_btn"
            onClick={handlePost}
          >
            Post
          </button>
        </div>
      </div>
      {imagePrev !== null ? (
        <img
          src={imagePrev}
          alt=""
          className="ContentUploadContainer_imagePrev"
        />
      ) : videoPrev !== null ? (
    
          <video
            controls
            className="PostContainer_sub_post_full_content_post_video"
          >
            <source src={videoPrev} type="video/mp4" />
          </video>
      ) : (
        ''
      )}
    </div>
  )
}
