const mongoose = require("mongoose");


const LoginSchema = new mongoose.Schema(
    {

        username:{type:String, trim:true, required: true, unique:true},
        password:{type:String, trim:true, required: true}
   
    },
    {
        collection:"LoginUser",
    }
);

mongoose.model("LoginUser", LoginSchema);