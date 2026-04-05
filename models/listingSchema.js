
import mongoose from "mongoose";

const listingSchema = new mongoose.Schema({
    name:{
    type:String,
    required:true,
  },
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
  additionalInfo:{
    type:String,
  },
  price: {
    type: Number,
    required: true,
  },
  location: [String],
  
  profileImage:{
    type:String,
  },
  images: [String],
  profile:[String] ,

 
  ownerId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true,
  } ,
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",   
  },

  furnishedStatus:["Furnished","SemiFurnished","UnFurnished"],
  
  propertyType:{
    type:String,
  },
  

selectedAmenities:{
  type:[String],
  enum:["Parking","Gym","24*7","Powerbackup","Lift","Swimmingpool","Garden","Playground","CCTV","Water Supply","Internet/Wifi","Air-Conditioning"],
  default:[],
},

 
  roomType: {
    type: String,
    enum: ["PG", "Hostel", "Room", "Flat", "villa"],
  },
}, { timestamps: true });


const Listing = mongoose.model("Listing",listingSchema);

export default Listing;