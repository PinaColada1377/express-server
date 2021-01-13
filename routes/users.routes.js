const express = require('express');
const router = express.Router();

const controller = require('../controllers/user.controll');

router
    .get('/', controller.get)
    .post('/', controller.post) 
    .put('/:id', controller.update)
    .delete('/:id', controller.delete)

module.exports = router;