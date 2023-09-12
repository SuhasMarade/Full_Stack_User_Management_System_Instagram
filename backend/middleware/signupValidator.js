const signupValidator = (req, res, next) => {
   
    const {name, username, bio, email, password} = req.body;
    if(name && username && bio && email && password && req.body){
        return next();
    }
    else{
        return res.status(404).json({
            success: false,
            message: "All details required"
        })
    }
    
}

module.exports = signupValidator;