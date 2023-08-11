const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();


const path = require("path");
const cors = require("cors")
dotenv.config();


const mongoUri = process.env.MONGODB
const PORT = process.env.PORT  || 4000
app.use(cors());
app.use(express.json());

const userSchema = mongoose.Schema({
    name : String , 
    age : Number , 
    value : Number
})
const User = mongoose.model("employees",userSchema);

app.get("api/result",async (req,res)=>{
    
    try{
        const data = await User.find();
        res.status(200).json(data);
    }catch(err){
        console.log("error retriving data backend")
    }


})

app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});





const connectDb = async()=>{
    
    try{
        await mongoose.connect(mongoUri);
        console.log("mongo connected")

    }catch(err){
        console.log(err);
    }


}
connectDb();
app.listen(PORT,(err)=>{
    if(err){
        console.log("server started error");
    }else{
        console.log("server  started");
    }
})


