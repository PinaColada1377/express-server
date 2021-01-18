const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth')
const controller = require('../controllers/user.controll');


router
    .get('/', controller.get)
    .post('/', controller.post) 
    .put('/:id', controller.update)
    .put('/', auth('admin'), controller.login)
    .delete('/:id', controller.delete)

module.exports = router;