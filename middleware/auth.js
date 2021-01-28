const jwt = require('jsonwebtoken');


const auth = (role) => async (req, res, next) => {
    try{        
        const token = req.headers['authorization'].split(' ');
        req.user = [token, role];
        next();
    } catch (e) {
        res.status(401).send(e.message)
    }
}


module.exports = auth;