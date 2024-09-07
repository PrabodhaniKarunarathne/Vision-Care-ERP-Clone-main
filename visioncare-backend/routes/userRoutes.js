const express = require('express');

const router = express.Router();

const { 
    createUser, getUsers, getUser, deleteUser, updateUser, loginUser
} = require('../controllers/userController');

//Get all 
router.get('/', getUsers);

//Get a single
router.get('/:id', getUser);

//Post a new
router.post('/create', createUser);

//Delete a new
router.delete('/:id', deleteUser);

//update a new
router.patch('/:id', updateUser);

//update a new
router.post('/login', loginUser);



module.exports = router;