const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    
    role: {
        type: String,
        required: true
    },
    organizationId: {
        type: String,
        required: true
    }
});

const agent = mongoose.model('agent', schema);

module.exports = agent;
