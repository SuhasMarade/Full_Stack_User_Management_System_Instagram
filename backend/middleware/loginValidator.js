

const loginValidator = (req, res, next) => {
    const {username, password} = req.body;
    if(username && password && req.body){
        return next();
    }
    else{
        return res.status(404).json({
            success: false,
            message: "All details required"
        })
    }
}

module.exports = loginValidator;