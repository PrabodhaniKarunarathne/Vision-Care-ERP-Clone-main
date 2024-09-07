const User = require('../models/userModel');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Create new User
const createUser = async (req, res) => {

    try{
        //Get User Input
        const { username, password } = req.body;

        // Validate user input
        if (!(username && password)) {
            res.status(400).json({message: "All input are required"});
        }
        
        // Check if username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
        return res.status(409).json({ message: 'Username already exists. Please Login' });
        }

        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ username, password: hashedPassword });

        // Create token
        const token = jwt.sign(
            { user_id: user._id, username },
            process.env.TOKEN_KEY,
            {
            expiresIn: "4h",
            }
        );
        // save user token
        user.token = token;
  

        res.status(200).json({ user, message: 'User created successfully' }); 
    } catch (err) {
        res.status(400).json({ message: 'Error creating user' });
    }
};

//Get All Users
const getUsers = async (req, res) => {

    try{
        const users = await User.find({}).sort({ createdAt: -1 });
        res.status(200).json({ users });
    } catch (err) {
        res.status(400).json({ message: 'Error getting all users' });
    }
}

//Get Single User
const getUser = async (req, res) => {

    try{
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json({ user });
    } catch (err) {
        res.status(404).json({ message: 'Error, No such user' });
    }
}

//Delete User
const deleteUser = async (req, res) => {

    try{
        const { id } = req.params;
        const user = await User.findOneAndDelete({ _id: id });
        res.status(200).json({ user });
    } catch (err) {
        res.status(400).json({ message: 'Error, No such user, Delete user Unsuccessful' });
    }
}

//Update User
const updateUser = async (req, res) => {

    try{
        const { id } = req.params;
        const user = await User.findOneAndUpdate({ _id: id }, { ...req.body });
        res.status(200).json({ user });
    } catch (err) {
        res.status(400).json({ message: 'Error, No such user, Update user Unsuccessful' });
    }
}

//Login User
const loginUser = async (req, res) => {

    try{
        //Get User Input
        const { username, password } = req.body;

        // Validate user input
        if (!(username && password)) {
            res.status(400).json({message: "All input are required"});
        }
        
        // Check if username already exists
        const user = await User.findOne({ username });
        if (!user) {
        return res.status(409).json({ message: 'Username does not exists. Please create an Account' });
        }

        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            const token = jwt.sign(
              { user_id: user._id, username },
              process.env.TOKEN_KEY,
              {
                expiresIn: "5h",
              }
            );
      
            // save user token
            user.token = token;
      
            // user
            return res.status(200).json({user, message: 'User Login successfully'});
          }
          return res.status(400).json("Invalid Credentials");

    } catch (err) {
        res.status(400).json({ message: 'Error user Login' });
    }
};

module.exports = {
    createUser,
    getUsers,
    getUser,
    deleteUser,
    updateUser,
    loginUser
}