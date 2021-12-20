/*
==========================
Title: Capstone
Author: Evan Durkin
Date: December 18, 2021
==========================
*/

// require statements
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// team model schema
let teamSchema = new Schema({
    name: { type: String },
    mascot: { type: String },
    players: [ playerSchema ]
});

// player schema
let playerSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    salary: { type: Number }
});

module.exports = mongoose.model("Team", teamSchema)