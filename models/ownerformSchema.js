import mongoose from "mongoose";

const ownerformSchema = new mongoose.Schema({
    // Step 1: Personal Details
    name: {
        type: String,
        required: true,
        
    },
    email: {
        type: String,
        required: true,
        unique: true, 
        lowercase: true
    },
    phone: {
        type: String,
        required: true,
    },
    location: {
        type: String, 
       
    },
    profilePhoto: {
        type: String, 
    },

    // Step 2: Ownership Verification
    identityProofType: {
        type: String,
      
    },
    addressProofType: {
        type: String,
        required: true,
    },
    ownershipDocType: {
        type: String,
        
    },

    // Step 3: Property Status & Final Documents
    propertyStatus: {
        type: String,
        enum: ["owned", "co-owned", "loan"], 
        default: "owned"
    },
    
    // For multiple images of the property
    images: [String], 

    // Store paths for various legal documents
    documents: {
        type: Map, 
        of: String
    }

}, { timestamps: true });

const Ownerform = mongoose.model("Ownerform", ownerformSchema);
export default Ownerform;