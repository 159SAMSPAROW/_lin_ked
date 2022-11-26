const User = require('../Models/user')
const { validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config({ path: './config/.env' })
const Post = require('../Models/post')
const { generateOTP } = require('./Extra/mail')
const VerificationToken = require('../Models/VerificationToken')
const nodemailer = require('nodemailer')
const ResetToken = require('../Models/ResetToken')
const JWTSEC = "#2@!@$ndja45883 r7##";
const crypto = require("crypto")


exports.signup = async (req, res) => {
  
  const error = validationResult(req)
  if (!error.isEmpty()) {
    return res.status(400).json('informations no correct')
  }
  //try {
    let user = await User.findOne({ email: req.body.email })
    if (user) {
      return res.status(200).json('password no correct')
    }
    const salt = await bcrypt.genSalt(10)
    const secpass = await bcrypt.hash(req.body.password, salt)
    const secret_token = process.env.SECRET_TOKEN

    user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: secpass,
      profile: req.body.profile,
      phonenumber: req.body.phonenumber,
    })

    const accessToken = jwt.sign({
      id:user._id,
      username:user.username
}, JWTSEC);

    const OTP = generateOTP()
    const verificationToken = await VerificationToken.create({
      user:user._id,
      token:OTP
    })

    verificationToken.save()
    await user.save()
    const transport = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASS
      }
    });        
    transport.sendMail({
      from:"_lin_ked@gmail.com",
      to:user.email,
      subject:"Verify your email using OTP",
      html:`<h1>Your OTP CODE ${OTP}</h1>`
    })
    res.status(200).json({
      Status:"Pending",
    msg:"please check your email",
    user:user._id 
    })
 // } catch (error) {
   // return res.status(400).json('Internal error occured')
  //}
}
exports.verifyEmail = async (req, res) =>{

  const {user, OTP} = req.body
  const mainuser = await User.findById(user)
  if(!mainuser) return res.status(400).json("User not found !")
  if(mainuser.verifed === true){
    return res.status(400).json("User already verified")
  }
  const token = await VerificationToken.findOne({user:mainuser._id})
  if(!token){
    return res.status(400).json("Sorry token not found")
  }
  const isMatch = await bcrypt.compareSync(OTP, token.token)
  if(!isMatch){
    return res.status(400).json("Token is not valid")}

    mainuser.verifed = true
    await VerificationToken.findByIdAndDelete(token._id)
    await mainuser.save()
    const accessToken = jwt.sign({
      id:mainuser._id,
      username:mainuser.username
    },JWTSEC)
    const {password, ...others} = mainuser._doc
    const transport = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASS
      }
    });        
    transport.sendMail({
      from:"_lin_ked@gmail.com",
      to:mainuser.email,
      subject:"Your email was successfully verify",
      html:"You can login now !"
    })
    return res.status(200).json({others, accessToken})
}
exports.login = async (req, res) => {
  const error = validationResult(req)
  if (!error.isEmpty()) {
    return res.status(400).json('informations no correct')
  }

  //try {
    const user = await User.findOne({ email: req.body.email })
    const secret_token = process.env.SECRET_TOKEN

    if (!user) {
      return res.status(400).json('User unknow')
    }
    const ComparePassword = await bcrypt.compare(
      req.body.password,
      user.password,
    )

    if (!ComparePassword) {
      return res.status(400).json('Password Error')
    }
    const accessToken = jwt.sign(
      {
        id: user._id,
        username: user.username,
      },
      JWTSEC
    )

    const { password, ...others } = user._doc
    res.status(200).json({ others, accessToken })
  //} catch (error) {
    //return res.status(500).json('Internal error occured')
  //}
}
exports.forgotPassword = async (req, res) =>{
  const {email} = req.body
  const user = await User.findOne({email:email})
  if(!user){
    return res.status(400).json("User not found")
  }
  const token = await ResetToken.findOne({user:user._id})
  if(token){
    return res.status(400).json("You can request again after 1 hour")
  }
  const RandomTxt = crypto.randomBytes(20).toString('hex')
  const resetToken = new ResetToken({
    user:user._id,
    token:RandomTxt
  })
  await resetToken.save()
  const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.MAILER_USER,
      pass: process.env.MAILER_PASS
    }
  });        
  transport.sendMail({
    from:"_lin_ked@gmail.com",
    to:user.email,
    subject:"Reset Token",
    html:`http://localhost:3000/reset/password?token=${RandomTxt}&_id=${user._id}` 
  })
  return res.status(200).json("Check your email to reset password")
}
exports.resetPassword = async (req, res) =>{
  const {token, _id} = req.query
  if(!token || !_id){
      return res.status(400).json("Invalid req");
  }
  const user = await User.findOne({_id:_id});
  if(!user){
      return res.status(400).json("user not found")
  }
  const resetToken = await ResetToken.findOne({user:user._id});
  if(!resetToken){
      return res.status(400).json("Reset token is not found")
  }
  //console.log(resetToken.token)
  const isMatch = await bcrypt.compareSync(token , resetToken.token);
  if(!isMatch){
      return res.status(400).json("Token is not valid");
  }

  const {password} = req.body;
  const secpass = await bcrypt.hash(password , 10);
  user.password = secpass;
  await user.save();
  const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.MAILER_USER,
      pass: process.env.MAILER_PASS
    }
  });        
  transport.sendMail({
    from:"_lin_ked@gmail.com",
    to:user.email,
    subject:"Your password reset successfully",
    html:`Now you can login with new password` 
  })
    return res.status(200).json("Email has been send")

}
exports.following = async (req, res) => {
  if (req.params.id !== req.body.user) {
    const user = await User.findById(req.params.id)
    const otheruser = await User.findById(req.body.user)

    if (!user.Followers.includes(req.body.user)) {
      await user.updateOne({ $push: { Followers: req.body.user } })
      await otheruser.updateOne({ $push: { Following: req.params.id } })
      return res.status(200).json('User has followed')
    } else {
      await user.updateOne({ $pull: { Followers: req.body.user } })
      await otheruser.updateOne({ $pull: { Following: req.params.id } })
      return res.status(200).json('User has Unfollowed')
    }
  } else {
    return res.status(400).json("You can't follow yourself")
  }
}
exports.followersPost = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    const followersPost = await Promise.all(
      user.Following.map((item) => {
        return Post.find({ user: item })
      }),
    )
    const userPost = await Post.find({ user: user._id })
    res.status(200).json(userPost.concat(...followersPost))
  } catch (error) {
    return res.status(500).json('internal server error')
  }
}
exports.updateUser = async (req, res) => {
  try {
    if (req.params.id === req.user.id) {
      if (req.body.password) {
        const salt = await bcrypt.genSalt(10)
        const secpass = await bcrypt.hash(req.body.password, salt)
        req.body.password = secpass
        const updateuser = await User.findByIdAndUpdate(req.params.id, {
          $set: req.body,
        })
        res.status(200).json(updateuser)
      }
    } else {
      return res.status(400).json('You are not allowed to update')
    }
  } catch (error) {
    return res.status(500).json('internal server error')
  }
}
exports.deleteUser = async (req, res) => {
  try {
    if (req.params.id !== req.user.id) {
      return res.status(400).json("Account doesn't match")
    } else {
      await User.findByIdAndDelete(req.params.id)
      return res.status(200).json('User account has been deleted')
    }
  } catch (error) {
    return res.status(500).json('internal server error')
  }
}
//Get user details for post
exports.userDetails = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(400).json('User not found')
    }
    const { email, password, phonenumber, ...others } = user._doc
    res.status(200).json(others)
  } catch (error) {
    return res.status(500).json('internal server error')
  }
}
//get user  to follow
exports.getAllUser = async (req, res) => {
  try {
   
      const allUser = await User.find()
      const user = await User.findById(req.params.id)
      const followinguser = await Promise.all(
        user.Following.map((item) => {
          return item
        }),
      )
      let UserToFollow = allUser.filter((value) => {
        return !followinguser.find((item) => {
          return value._id.toString() === item
        })
      })
      let filteruser = await Promise.all(
        UserToFollow.map((item) => {
          const {
            email,
            phonenumber,
            password,
            ...others
          } = item._doc
          return others
        }),
      )

      res.status(200).json(filteruser)

  } catch (error) {
    return res.status(500).json('internal server error')
  }
}
