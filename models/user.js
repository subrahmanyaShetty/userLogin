const Joi = require('joi');
const passwordComplexity = require("joi-password-complexity");
const mongoose = require('mongoose');
const config=require("config");
const jwt=require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  last_name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  email:{
    type:String,
    required:true,
    minlength:5,
    maxlength:255,
    unique:true
  },
  password:{
    type:String,
    required:true,
    minlength:5,
    maxlength:1024,
  },
  mobileNo:{
    type: Number,
    required:true,
    unique:true,
  },
  address: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 255
  },
  isAdmin:Boolean
});

userSchema.methods.generateAuthToken=function (){
  const token=jwt.sign({_id:this._id,isAdmin:this.isAdmin},config.get('jwtPrivateKey'));
  return token;
}
const User = mongoose.model('User', userSchema);

function validateUser(user) {

      const schema = {
        first_name: Joi.string().min(5).max(50).required(),
        last_name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
         password: Joi.string().regex(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])")).min(8).max(255).required(),
         mobileNo:Joi.number().integer().min(1000000000).max(9999999999).required(),
         address :Joi.string().min(10).max(255).required()
      };
      return Joi.validate(user,schema); // NOT >> Joi.validate(user, schema);  !!!!!
    }


exports.User = User;
exports.validate = validateUser;
