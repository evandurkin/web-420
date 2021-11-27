/*
==========================
Title: Assignment 6.2
Author: Evan Durkin
Date: November 27, 2021
==========================
*/

// require statements
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userSchema = new Schema({
    userName: { type: String },
    Password: { type: String },
    emailAddress: { type: Array }
});

module.exports = mongoose.model("User", userSchema);
