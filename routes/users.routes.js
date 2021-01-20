const express = require('express');
const router = express.Router();

const validForCreate = require('../middleware/validation.create');
const createUserSchema = require('../validation-schemes/user.scheme.create');
const validForUpdate = require('../middleware/validation.update');
const updateUserSchema = require('../validation-schemes/user.scheme.update');
const auth = require('../middleware/auth');
const registr = require('../middleware/registration')
const controller = require('../controllers/user.controll');


router
    .get('/', controller.get)
    .post('/', validForCreate(createUserSchema), registr, controller.post) 
    .put('/:id', validForUpdate(updateUserSchema), controller.update)
    .put('/', auth('user'), controller.login)
    .delete('/:id', controller.delete)

module.exports = router;