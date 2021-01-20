const validForUpdate = (schema) => async (req, res, next) => {
    try{
        await schema.validate({username: req.body.login, password: req.body.password})
        next();
    } 
    catch (err) {
        res.status(400).send(err);
    }
}

module.exports = validForUpdate;