
import mongoose from "mongoose";

const listingSchema = new mongoose.Schema({
    listingId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    location:[String],
 Image:[String],
    
   
    ownerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    roomType:{
        type:String,
        enum:["PG","Hostel","Room","Flat","villa"]
    },
},{timestamps:true})

const Listing = mongoose.model("Listing",listingSchema);

export default Listing;