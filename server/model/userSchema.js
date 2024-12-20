const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    googleId:String,
    displayName:String,
    email:String,
    image:String,
},{timestamps:true})


const UserDB = new mongoose.model("users",userSchema);

module.exports = UserDB;