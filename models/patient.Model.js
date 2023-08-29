const mongoose = require('mongoose')

const patientSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add the contact name."]
    },
    email: {
        type: String,
        required: [true, "Please add the email address."]
    },
    phone: {
        type: String,
        required: [true, "Please add the contact Phone."]
    },
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        default: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date(),
        required: [true],
        default: Date.now,
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [false],
        default: null  
    },
    updatedAt: { 
        type: Date,
        required: [false],
        default: null  
    },
    deltedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [false],
        default: null  
    },
    deletedAt: { 
        type: Date,
        required: [false],
        default: null  
    },
})

module.exports = mongoose.model("Patient", patientSchema);