import express from 'express'
import { cancelbooking, createBooking } from '../controller/bookingcontroller.js';
import { 
  createlisting, 
  deletelisting, 
  getAllListings,  getApprovedListings,  // Import the new function
  getListingById,  getOwnerListings,  getPendingListing,  // Optional: if you want single listing view
  ownerCheck, 
  updatelisting, 
  updateListingStatus
} from '../controller/listingController.js';

const bookingroutes = express.Router();

// Booking routes
bookingroutes.post("/bookings", createBooking);
bookingroutes.delete("/bookings/:id", cancelbooking);

// Listing routes
bookingroutes.get("/listings", getAllListings);           
bookingroutes.get("/listings/:id", getListingById,); 

bookingroutes.post("/listings", createlisting);           
bookingroutes.post("/owner", ownerCheck)                   
bookingroutes.put("/listings/:id", updatelisting);        
bookingroutes.delete("/listings/:id", deletelisting); 
bookingroutes.post("/listings", createlisting);
bookingroutes.put("/listings/:id", updatelisting);
bookingroutes.delete("/listings/:id", deletelisting);

bookingroutes.put("/listings/:id/status", updateListingStatus);

bookingroutes.get("/listings/approved", getApprovedListings);
bookingroutes.get("/listings/pending", getPendingListing);
bookingroutes.get("/owner/listings", getOwnerListings);

export default bookingroutes;