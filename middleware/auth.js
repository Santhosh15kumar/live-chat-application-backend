const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

function authenticateToken(req,res,next){
    const token = req.headers["authorization"];

    if(!token) {
        return res.status(401).send('unauthorized: Token not povided');
    }
    jwt.verify(token, 'MY_SECRET_TOKEN', async(error, user) => {
        if(err) {
            return res.status(403).send('Forbidden: Invalid Token');
        }else {
            next()
        }
    })
}

module.exports = authenticateToken;