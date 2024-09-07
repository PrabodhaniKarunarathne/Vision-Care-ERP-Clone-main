const express = require('express');

const router = express.Router();

const { 
    createCustomer, getCustomers
} = require('../controllers/customerController');

//Get all 
router.get('/', getCustomers);

// //Get a single
// router.get('/:id', getUser);

//Post a new
router.post('/create', createCustomer);

// //Delete a new
// router.delete('/:id', deleteUser);

// //update a new
// router.patch('/:id', updateUser);

module.exports = router;