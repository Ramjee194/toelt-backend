import dotenv from "dotenv";

dotenv.config();

//listing
import Listing from "../models/listingSchema.js";
import multer from "multer";
import pkg from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";


const { CloudinaryStorage } = pkg;

/*  CLOUDINARY CONFIG  */
console.log("CLOUD NAME:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("API KEY:", process.env.CLOUDINARY_API_KEY);
console.log("API SECRET:", process.env.CLOUDINARY_API_SECRET);
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});



/* MULTER STORAGE */
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "properties",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const upload = multer({ storage });

/*  CREATE LISTING */
export const createlisting = [
  upload.array("images", 5),  

  async (req, res) => {
    try {
    

      const { title, price, description, location } = req.body;
         console.log(" ROUTE HIT");
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);

      // Validate fields
      if (!title || !price || !location || !description) {
        return res.status(400).json({ message: "All fields are required" });
      }

      // Check images
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: "Images are required" });
      }

      console.log("Uploaded Files:", req.files);

      // Cloudinary URLs
      const imageUrls = req.files.map(file => file.path);

      // Check duplicate listing
      const existing = await Listing.findOne({ title });
      if (existing) {
        return res.status(400).json({ message: "Listing already exists" });
      }

      // Save in MongoDB
     const newListing = new Listing({
  title,
  price: Number(price),
  description,
  location: [location],
  images: imageUrls,
  ownerId: req.userId,
  
      status: "Pending",
});
      await newListing.save();

      return res.status(200).json({
        success: true,
        message: "Listing created successfully",
        data: newListing,
      });

    } catch (error) {
       console.error(" FULL ERROR OBJECT:");
  console.error(JSON.stringify(error, null, 2));
  console.error(" MESSAGE:", error.message);
  console.error(" STACK:", error.stack);

  return res.status(500).json({
    success: false,
    message: error.message,
  });
    }
  }
];

// Add this function to get all listings
export const getAllListings = async (req, res) => {
  try {
    console.log("GET ALL LISTINGS ROUTE HIT");
    
    // Fetch all listings from database
    const listings = await Listing.find({}).sort({ createdAt: -1 }); // Sort by newest first
    
    console.log(`Found ${listings.length} listings`);
    
    return res.status(200).json(listings);
    
  } catch (error) {
    console.error("Error fetching listings:", error);
    return res.status(500).json({ 
      message: "Failed to fetch listings",
      error: error.message 
    });
  }
};

// Optional: Get single listing by ID
export const getListingById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const listing = await Listing.findById(id);
    
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }
    
    return res.status(200).json(listing);
    
  } catch (error) {
    console.error("Error fetching listing:", error);
    return res.status(500).json({ 
      message: "Failed to fetch listing",
      error: error.message 
    });
  }
};

//update listing
export const updatelisting = async (req,res,next) =>{

    try {
        const {id} = req.params;
        if(!id)
            return res.status(402).json({message:"id not found"});

        const updatelistings = await Listing.findByIdAndUpdate(id,req.body,{new:true})
        if(!updatelistings)
            return res.json(404).json({message:"listing not found"});

        return res.status(200).json({message:"listing updated successfully"})
    } catch (error) {
        return res.status(500).json({message:"listing cannot found"})
        
    }
}

//delete listing
export const deletelisting = async (req,res) =>{

    try {
    const listing = await Listing.findByIdAndDelete(req.params.id);
        if(!listing)
            return res.status(402).json({message:"listing not found"});

       
        return res.status(200).json({
          success:true,
          message:"listing deleted successfully"})

    } catch (error) {
        return res.status(500).json({message:"listing cannot found"})
        
    }
}
//check owner
 export const ownerCheck = async (req, res) => {
   try {
     const { ownerId } = req.body;

     if (!ownerId) {
       return res.status(400).json({ message: "Owner ID required" });
     }

     const listings = await Listing.find({ ownerId });

     if (listings.length === 0) {
       return res.status(404).json({ message: "No listings found for this owner" });
     }

     return res.status(200).json({
       message: "Owner verified",
       listings
     });

   } catch (error) {
     return res.status(500).json({ message: error.message });
   }
 };

//get listing status
 export const getPendingListing = async (req,res)=>{
  try {
     const listing = await Listing.find({status:"pending"})
  .populate("ownerId")

 return  res.status(200).json(listing)
  } catch (error) {
    return res.status(500).json(error.message)
    
  }
 }
 export const updateListingStatus = async (req,res)=>{
  try {
    const {status} = req.body;
    const listing = await Listing.findByIdAndUpdate(
 req.params.id,
      { status },
      { new: true },
      res.json(listing)
    )
  } catch (error) {
    res.json(error.message)
    
  }
 };
//owner can only see update listing
 export const getOwnerListings = async (req, res) => {
  try {
    const listings = await Listing.find({
      ownerId: req.user._id,
      status: "Approved",
    });

    res.json(listings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//approved listing ca see in property page 
export const getApprovedListings = async (req, res) => {
  try {
    const listings = await Listing.find({ status: "Approved" });

    res.json(listings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};