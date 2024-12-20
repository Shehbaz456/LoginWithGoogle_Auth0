const mongoose = require("mongoose");
const DB = process.env.MONGO_URI
mongoose.connect(DB).then(()=>console.log("database connected")).catch((error)=>console.log("error",error))