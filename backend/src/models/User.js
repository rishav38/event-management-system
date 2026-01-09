const mongoose=require("mongoose");

const userSchema=new mongoose.Schema(
    {name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    passwordHash:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:["OWNER","VIEWER","EDITOR"],
        default:"OWNER"
    },
    weddingId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Wedding"
    }

},
{timestamps:true}
);

module.exports=mongoose.model("User",userSchema);