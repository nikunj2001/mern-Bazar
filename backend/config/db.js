const mongoose = require("mongoose");
const config = require("../config/envConfig");
 function  dbConnect(){
     const DB_URL = process.env.DB_URL;
     mongoose.connect(config.DB_URL,{
         useNewUrlParser:true,
         useUnifiedTopology:true,
     });
     const db = mongoose.connection;
     db.on('error',console.error.bind(console,"connection error:"));
     db.once('open',()=>{
         console.log("DB Connected....");
     })
}
module.exports = dbConnect;