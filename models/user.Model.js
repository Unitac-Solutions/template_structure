const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    username: {
        type: String,
        required: [true, "Please add the  username."]
    },
    email: {
        type: String,
        required: [true, "Please add the email address."],
        unique: [true, "Email already taken"]
    },
    password: {
        type: String,
        required: [true, "Please add the Password."]
    }, 
},{
    timestamps: true,
})

module.exports = mongoose.model("User", userSchema);