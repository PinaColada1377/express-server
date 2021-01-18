const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

const User = require('../services/json/users.json')

 const auth = (role) => async (req, res, next) => {
    try{        
        const token = req.headers['authorization'].split(' ');
        const result = jwt.verify(token[1], 'secret');
        //const salt = await bcrypt.genSalt(10)
        //const hashPassword = await bcrypt.hash(result.password, salt);
        if (result.role === role){
            const candidate = await User.some(e => e.login === result.login);
            if (candidate) {
                const passwordUser = await User.find(e => e.login === req.body.login).password
                const comparePassword = await bcrypt.compare(result.password, passwordUser);
                if (!comparePassword) {res.status(401).send(e.message)}; 
            }
        } else {res.status(401).send(e.message)}
        req.login = result.login;
        next();
    } catch (e) {
        res.status(401).send(e.message)
    }
}


module.exports = auth;