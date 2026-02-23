import Booking from "../models/bookingSchema.js";
import User from "../models/userSchema.js";

//
export const createBooking = async (req,res) =>{
    try{
    const {userId,checkIn,checkOut} = req.body;

    if(!userId || !checkIn || !checkOut)
        return res.status(401).json({message:"Booking id required"});

    const bookings = await Booking.findById(userId);
    if(bookings)
        return res.status(401).json({message:"all field are required"});

    //check overlapping booking

    const existingbooking = Booking.findOne({
       userId :User._id,
       checkIn: { $lt: new Date(checkOut) },
      checkOut: { $gt: new Date(checkIn) },

    });

    //create new booking 
    const booking = new Booking({
        userId:userId,
        checkIn:new Date(checkIn),
        checkOut :new Date(checkOut)

    });
    await booking.save();

    
return res.status(200).json({
  success:true,
  message:"booking created succesfully"});
    }
catch(error){
    console.error(error)
}
} 

//for booking cancel
 export const cancelbooking = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Booking id not found" });
    }

    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    await Booking.findByIdAndDelete(id);

    return res.status(200).json({
      success:true,
      message: "Booking cancelled successfully"
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error occured" });
  }
};
