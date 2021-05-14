const Joi = require('joi');
const config = require("config");
const {User} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const _ = require('lodash');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const router = express.Router();



router.post('/', async (req, res) => {
//  console.log("entering"+JSON.stringify(req.body));
  const {error} = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email});
  if (!user) return res.status(400).send("Email not registerd");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("invalid password");

  const token = user.generateAuthToken();
  res.header('x-auth-token',token).send("Logged in");
});


function validateUser(user) {

  const schema = {
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().regex(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])")).min(8).max(255).required(),
  };
  return Joi.validate(user, schema); // NOT >> Joi.validate(user, schema);  !!!!!
}


module.exports = router;
