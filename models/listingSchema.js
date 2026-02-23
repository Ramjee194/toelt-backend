
import mongoose from "mongoose";

const listingSchema = new mongoose.Schema({
  listingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  location: [String],
  

  images: [String], 
  name:{
    type:String,
  },
  ownerId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
  } ,
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",   
  },

 
  roomType: {
    type: String,
    enum: ["PG", "Hostel", "Room", "Flat", "villa"],
  },
}, { timestamps: true });


const Listing = mongoose.model("Listing",listingSchema);

export default Listing;