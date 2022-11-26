const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")
//const { isEmail } = require("validator")


const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    Followers:{
      type: Array,
   
    },
    Following:{
        type: Array,
        
    },
    phonenumber:{
      type: Number,
      required:true, 
    },
    profile:{
        type:String,
    },
    verifed:{
      type:Boolean,
      required:true,
      default:false,
    }
    },

  { timestamps: true } //Permet  d 'enregister l' heure de création
)

userSchema.plugin(uniqueValidator)
module.exports = mongoose.model('users', userSchema)
