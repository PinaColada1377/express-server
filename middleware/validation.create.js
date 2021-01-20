const validForCreate = (schema) => async (req, res, next) => {
    try{
        await schema.validate({username: req.body.email, password: req.body.password})
        next();
    } 
    catch (err) {
        res.status(400).send(err);
    }
}

module.exports = validForCreate;