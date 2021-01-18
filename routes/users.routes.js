const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const registr = require('../middleware/registration')
const controller = require('../controllers/user.controll');


router
    .get('/', controller.get)
    .post('/',registr, controller.post) 
    .put('/:id', controller.update)
    .put('/', auth('user'), controller.login)
    .delete('/:id', controller.delete)

module.exports = router;