const express = require('express')
const app = express();
const env = require("./config/envConfig");
const connect = require("./config/db")
const userRoutes = require("./routes/users/userRoutes");
require('dotenv').config();

// Db Connect
connect();
app.use(express.json())
app.use("/api",userRoutes);
app.get("/",(req,res)=>{
    res.json({message:"Hello Nikunj"});
})


app.listen(env.PORT,()=>{
    console.log(`Listenig on PORT ${env.PORT}`);
})