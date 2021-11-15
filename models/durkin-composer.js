/*
=========================
 Title: Assignment 4.2
 Author: Evan Durkin
 Date: November 14, 2021
 ========================
 */

 // require statements
 const mongoose = require("mongoose");
 const Schema = mongoose.Schema;

 // name fields
 let composerSchema = new Schema({
     firstName: { type: String, required: true},
     lastName: { type: String, required: true},
 });

// export statement
module.exports = mongoose.model("Composer", composerSchema)