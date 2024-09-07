const Customer = require('../models/customerModel');
const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

//Create new Customer
const createCustomer = async (req, res) => {

    try{
        //Get Customer Input
        const { customerID, customerName,  address, pNumber, birthDate, gender, nic, orders, channelling, surgery } = req.body;

        // // Validate Customer input
        // if (!(username && password)) {
        //     res.status(400).json({message: "All input are required"});
        // }
        
        // Check if customerID already exists
        const existingCustomer = await Customer.findOne({ customerID });
        if (existingCustomer) {
        return res.status(409).json({ message: 'CustomerID already exists. Please Login' });
        }

        // // Hash the password before storing it
        // const hashedPassword = await bcrypt.hash(password, 10);

        const customer = await Customer.create({ customerID, customerName,  address, pNumber, birthDate, gender, nic, orders, channelling, surgery });

        // // Create token
        // const token = jwt.sign(
        //     { user_id: user._id, username },
        //     process.env.TOKEN_KEY,
        //     {
        //     expiresIn: "4h",
        //     }
        // );
        // // save user token
        // user.token = token;
  

        res.status(200).json({ customer, message: 'Customer created successfully' }); 
    } catch (err) {
        res.status(400).json({ message: 'Error creating user' });
    }
};

//Get All Customers
const getCustomers = async (req, res) => {

    try{
        const customers = await Customer.find({}).sort({ createdAt: -1 });
        res.status(200).json({ customers });
    } catch (err) {
        res.status(400).json({ message: 'Error getting all customers' });
    }
}

// //Get Single User
// const getUser = async (req, res) => {

//     try{
//         const { id } = req.params;
//         const user = await User.findById(id);
//         res.status(200).json({ user });
//     } catch (err) {
//         res.status(404).json({ message: 'Error, No such user' });
//     }
// }

// //Delete User
// const deleteUser = async (req, res) => {

//     try{
//         const { id } = req.params;
//         const user = await User.findOneAndDelete({ _id: id });
//         res.status(200).json({ user });
//     } catch (err) {
//         res.status(400).json({ message: 'Error, No such user, Delete user Unsuccessful' });
//     }
// }

//Update User
// const updateUser = async (req, res) => {

//     try{
//         const { id } = req.params;
//         const user = await User.findOneAndUpdate({ _id: id }, { ...req.body });
//         res.status(200).json({ user });
//     } catch (err) {
//         res.status(400).json({ message: 'Error, No such user, Update user Unsuccessful' });
//     }
// }

module.exports = {
    createCustomer,
    getCustomers
    // createUser,
    // getUsers,
    // getUser,
    // deleteUser,
    // updateUser,
    // loginUser
}