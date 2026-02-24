import express from 'express';
import multer from 'multer';  
import { ownerform } from '../controller/ownerformcontroller.js';

const ownerformroutes = express.Router();

const upload = multer({ dest: "uploads/" });

ownerformroutes.post("/register", upload.any(), ownerform);

export default ownerformroutes;