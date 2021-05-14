const {User, validate} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const _=require('lodash');
const bcrypt=require("bcrypt");
const config=require("config");
const jwt=require("jsonwebtoken");
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', async (req, res) => {
  const genres = await User.find().sort('name');
  res.send(genres);
});
router.get('/me', auth,async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);
});
router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
let user = await User.findOne().or({mobileNo:req.body.mobileNo},{email:req.body.email});// Checks if the user with this email is already present
if(user) return res.status(400).send("User already registered");
   user =new User({
    first_name:req.body.first_name,
    last_name:req.body.last_name,
    email:req.body.email,
    password:req.body.password,
    mobileNo:req.body.mobileNo,
    address:req.body.address
  });
  const salt = await bcrypt.genSalt();
   user.password=await bcrypt.hash(user.password,salt)

    await user.save();
    const token = user.generateAuthToken();

     res.header('x-auth-token',token).send(_.pick(user,['_id','name','email']));


});

router.put('/me',auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findByIdAndUpdate(req.user._id, req.body, {
    new: true
  });

  if (!user) return res.status(404).send('The genre with the given ID was not found.');

  res.send(_.pick(user,['_id','first_name','last_name','email','mobileNo','address']));
});

// router.delete('/:id', async (req, res) => {
//   const genre = await Genre.findByIdAndRemove(req.params.id);
//
//   if (!genre) return res.status(404).send('The genre with the given ID was not found.');
//
//   res.send(genre);
// });
//
// router.get('/:id', async (req, res) => {
//   const genre = await Genre.findById(req.params.id);
//
//   if (!genre) return res.status(404).send('The genre with the given ID was not found.');
//
//   res.send(genre);
// });

module.exports = router;
