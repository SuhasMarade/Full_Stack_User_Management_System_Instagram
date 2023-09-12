const JWT = require('jsonwebtoken');
require('dotenv').config();
const jwtAuth = (req, res, next) => {
    try {
        const token = (req.cookies && req.cookies.token);
        if(!token){
            return res(400).json({
                success: true,
                message: "Not authorized"
            })
        }
        const payload = JWT.verify(token,process.env.SECRET);
        req.user = {id: payload.id, email: payload.email}
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
    next();
}

module.exports = jwtAuth