import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";
import Signup from "./Pages/Signup";
import {useSelector} from "react-redux"
import ResetPassword from "./Pages/ResetPassword";
import Verifyemail from "./Pages/VerifyEmail";
import ForgotPassword from "./Pages/ForgotPassword";


function App() {
  const userDetails = useSelector((state)=>state.user)
  let user = userDetails.user
  //console.log(user)

  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={ user?.others?.verifed === true ? <Home/> : <Navigate to={"/login"} replace={true}/>}></Route>
        <Route path="/profile/:id" element={<Profile/>}></Route>
        <Route path="/login" element={ user?.others?.verifed === true ? <Navigate to={"/"} replace={true}/> : <Login />}></Route>
        <Route path="/signup" element={ <Signup/>}></Route>
        <Route path="/verify/email" element={user?.Status === 'Pending' ? <Verifyemail/> : user?.others.verifed === true ? <Navigate to={"/"} replace={true}/> : <Login/>}></Route>
        <Route path="/forgot/password" element={<ForgotPassword/>}></Route>
        <Route path="/reset/password" element={<ResetPassword/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
