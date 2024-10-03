const { User } = require('discord.js');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userId: Number,
    globalName: String,
    cash: Number,
    lastDaily: Number,
})

module.exports = mongoose.model('usuario', UserSchema);
