import Listing from "../models/listingSchema.js";

//listing
export const createlisting = async (req,res,next) => {
  try {
    const { title, price, description, location, image } = req.body;
    if ( !title || !price || !location || !description || !image)
      return res.status(401).json({ message: "all listing are required" });

    const listings = await Listing.findOne({title});

    if (listings)
      return res.status(402).json({ message: "listing already exist" });
    
   
    //new listing create
    const listingss = new Listing({
      title,
      price,
      description,
      Image: [image],
      location,
      ownerId: req.userId,
    });
    await listingss.save();

    return res.status(200).json({ message: "listing created succesfully" });
  } catch (error) {
    console.error(error);
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
        const {id} = req.params;
        if(!id)
            return res.status(402).json({message:"id not found"});

        const updatelistings = await Listing.findByIdAndDelete(id)
        if(!updatelistings)
            return res.json(404).json({message:"listing not found"});

        return res.status(200).json({message:"listing deleted successfully"})

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
