const User = require('../model/userModel.js');
const bcrypt = require('bcrypt');
const emailValidator = require('email-validator');

const signup = async (req, res, next) => {
    const {name, username, bio, email, password} = req.body;
    if(!name || !username || !bio || !email || !password){
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        });
    }
    const usernameExist = await User.findOne({username});
    if(usernameExist){
        return res.status(400).json({
            success: false,
            message: "Username is taken"
        })
    }
    const userEmailExist = await User.findOne({email});
    if(userEmailExist){
        return res.status(400).json({
            success: false,
            message: "User already exist with this email id"
        })
    }
    const isEmailValid = emailValidator.validate(email);
    if(!isEmailValid){
        return res.status(400).json({
            success: false,
            message: "Please provide a valid email id"
        });
    }
    if(password.length < 8){
        return res.status(400).json({
            success: false,
            message: "Password length must be greater than 7"
        })
    }
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/
    const result = regex.test(password);
    if(!result){
        return res.status(400).json({
            success: false,
            message: "Password at least contain one special character,one lowercase letter, one uppercase letter and one number"
        })
    }
    try {
        const userInfo = User(req.body);
        const user = await userInfo.save();
        return res.status(200).json({
            success: true,
            data: user
        })
    } catch (e) {
        if(e.code === 11000){
            return res.status(400).json({
                success: false,
                message: "Account already exist"
            })
        }
        return res.status(400).json({
            success: false,
            message: e.message
        })
    }
}

const login = async (req, res) => {
    const {username, password} = req.body;
    if(!username || !password){
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        })
    }
    try {
        const user = await User.findOne({
            username
        })
        .select("+password");
        if(!user || !(await bcrypt.compare(password, user.password))){
            return res.status(400).json({
                success: false,
                message: "Invalid Credentials"
            })
        }
        const token = user.jwtToken();
        user.password = undefined
        const cookieOption = {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true
        }
        res.cookie("token",token,cookieOption);
        return res.status(200).json({
            success: true,
            data: user
        })
    } catch (e) {
        return res.status(400).json({
            success: false,
            message: e.message
        })
    }
}

const getuser = async(req, res) => {
    const userId = req.user.id
    try {
        const user = await User.findById(userId);
        return res.status(200).json({
            success: true,
            data: user
        })
    } catch (e) {
        return res.status(400).json({
            success: false,
            message: e.message
        })
    }
}

const logout = (req, res) => {
    try {
        const cookieOption = {
            expires: new Date(),
            httpOnly: true
        }
        res.cookie('token',null,cookieOption);
        return res.status(200).json({
            success: true,
            message: "Logged out successfully"
        })
    } catch (e) {
        return res.status(400).json({
            success: false,
            message: e.message
        })
    }
}
module.exports = {
    signup,
    login,
    getuser,
    logout
}