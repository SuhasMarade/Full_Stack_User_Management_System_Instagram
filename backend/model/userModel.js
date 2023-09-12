const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
require('dotenv').config();

const {Schema} = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        minLength: [6, "Name must be at least of 6 characters"],
        maxLength: [50, "Name must be less than 50 character"],
        trim: true
    },
    username: {
        type: String,
        required: [true, "username is required"],
        minLength: [5, "username must at least of 5 characters"],
        maxLength: [15, "username must be less than 15 characters"],
        trim: true,
        unique: [true, "username is taken"]
    },
    bio: {
        type: String,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "account already exist"],
        trim: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        select: false
    }
},
{
    timestamps: true
});

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    return next();
});

userSchema.methods = {
    jwtToken(){
        return JWT.sign(
            {id: this._id, email: this.email},
            process.env.SECRET,
            {expiresIn: "24h"}
        )
    }
}

const userModel = mongoose.model('User',userSchema);
module.exports = userModel;