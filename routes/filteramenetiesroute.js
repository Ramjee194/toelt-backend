import express from 'express'
import { filteramenities, getAvailabilityOptions, getPropertyTypes } from "../controller/filterController.js";


const filteramenitiesroutes = express.Router();

filteramenitiesroutes.get("/amenities",filteramenities)
filteramenitiesroutes.get('/property-types', getPropertyTypes);
filteramenitiesroutes.get('/availability', getAvailabilityOptions);

export default filteramenitiesroutes;