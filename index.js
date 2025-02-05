const express = require("express")
require("dotenv").config()
const app = express();
const connectDB = require("./util/db")
const router = require("./Router/user_router")


app.use(express.json())
app.use("/api/user",router)


connectDB().then(()=>{
    app.listen(3000,()=>{
        console.log("server connected")
    })
})




