const express = require('express');
const userRouter = express.Router();

const {signup, login, getuser, logout} = require('../controller/userController.js');
const userAuthenticate = require('../middleware/userAuthenticate.js');
const signupValidator = require('../middleware/signupValidator.js');
const loginValidator = require('../middleware/loginValidator.js');

userRouter.post('/signup',signupValidator,signup);
userRouter.post('/login',loginValidator,login);
userRouter.get('/',userAuthenticate,getuser);
userRouter.get('/logout',userAuthenticate,logout);

module.exports = userRouter;
