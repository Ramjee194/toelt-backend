import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    listingId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Listing"
    },
    bookingId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    createdAt:Date,
    checkIn:Date,
    checkOut:Date,
    status:["pending","approved","cancel","isBooked","available"]
},{timestamps:true});

const Booking = mongoose.model("Booking",bookingSchema);

export default Booking;