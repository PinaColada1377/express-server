const express = require('express');
const router = express.Router();

const valid = require('../middleware/validation');
const UserShema = require('../validation-schemes/user.scheme');;
const auth = require('../middleware/auth');
const controller = require('../controllers/user.controll');
const multer = require('../middleware/multer');


router
    .get('/', controller.get)
    .post('/', valid.validForCreate(UserShema.createUserSchema), controller.post) 
    .put('/:id',  multer, controller.update)
    .put('/', auth('admin'), controller.login)
    .delete('/:id', controller.delete)

module.exports = router;