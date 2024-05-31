//Users.js
const mongoose = require('mongoose');
//definir el schema
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
});

const UserModel = mongoose.model('Users',UserSchema,'user');
module.exports = UserModel;
