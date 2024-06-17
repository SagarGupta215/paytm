const express = require("express");
const cors = require('cors')
const dbconn = require('./config/db')
const mainRouter = require('./routes/index')
const app = express();
require('dotenv').config()

app.use(cors());
app.use(express.json());
dbconn();

app.use("/api/v1",mainRouter)

app.get('/',(req,res)=>{
    res.json({"message":"bhai"})
})

app.listen(3000,()=>{
    console.log('server is running on port 3000')
})