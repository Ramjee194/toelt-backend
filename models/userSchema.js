import mongoose from "mongoose";

const options = { discriminatorKey: "role" };

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
       
    },
    password:{
        type:String,
        required:true,
        unique:true,
    },

    role:{
        type:String,
        enum:["owner","admin","user"],
        default:"user"
    },
    
},{timestamps:true},options);

const User = mongoose.model("User",userSchema);
const Admin = User.discriminator("admin", new mongoose.Schema({}));
const Owner = User.discriminator("owner", new mongoose.Schema({}));
export default User;