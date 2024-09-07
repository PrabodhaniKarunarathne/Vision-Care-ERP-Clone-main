const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    customerID: {
        type: String,
        required: [true, 'Please enter a customerID'],
        unique: true,
    },
    customerName: {
        type: String,
        required: [true, 'Please enter a customerName'],
    },
    address: {
        type: String,
        required: [true, 'Please enter a address'],
    },
    pNumber: {
        type: String,
        required: [true, 'Please enter a pNumber'],
    },
    birthDate: {
        type: String,
        required: [true, 'Please enter a birthDate'],
    },
    gender: {
        type: String,
        required: [true, 'Please enter a gender'],
    },
    nic: {
        type: String,
        required: [true, 'Please enter a nic'],
    },
    orders: {
        type: String,
        required: [true, 'Please enter a orders'],
    },
    channelling: {
        type: String,
        required: [true, 'Please enter a channelling'],
    },
    surgery: {
        type: String,
        required: [true, 'Please enter a surgery'],
    },
}, { timestamps: true });

module.exports = mongoose.model('Customer', customerSchema);