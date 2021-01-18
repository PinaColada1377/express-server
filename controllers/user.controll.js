const userService = require('../services/user.service')


class UserController {
    service = userService;
    get = (req, res) => {
        res
            .status(200)
            .send({
                user: this.service.getUser()      
            })
    }

    post = (req, res) => {
        res
            .status(200)
            .send(this.service.addUser(req.body))
    }

    update = (req, res) => {
       res 
            .status(200)
            .send(
                this.service.update(
                    req.body,
                    req.params.id)
            )
    }

    delete = (req, res) => {
        res
            .status(200)
            .send(this.service.deleteUser(req.params.id))
    }

    login = (req, res) => {
        res
            .status(200)
            .send(
                this.service.login(
                    req.login
                ))
    }
}

module.exports = new UserController();