import express from 'express'
import {  cancelbooking, createBooking } from '../controller/bookingcontroller.js';
import { createlisting, deletelisting, updatelisting} from '../controller/listingController.js';

const bookingroutes = express.Router();

// Booking routes
bookingroutes.post("/bookings", createBooking);
bookingroutes.delete("/bookings/:id", cancelbooking);

// Listing routes
bookingroutes.post("/listings", createlisting);
bookingroutes.put("/listings/:id", updatelisting);
bookingroutes.delete("/listings/:id", deletelisting);


export default bookingroutes;

