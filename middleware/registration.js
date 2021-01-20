const bcrypt = require('bcrypt');

const User = require('../services/json/users.json');

const registration = () => async (req, res, next) => {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        const candidate = await User.some(e => e.login === req.body.login);
        if(!candidate){
            const user = {email: req.body.email, role: req.body.role, login: req.body.login, password: hashPassword};
            req.user = user
        }
        else {
            res.status(401).send({message:"User exist"})
        }

        next();
    } catch (e) {
        res.status(401).send({message: 'Error'})
    }
}

module.exports = registration();