import Ownerform from "../models/ownerformSchema.js";

export const ownerform = async (req, res) => {
    try {
        // 1. Destructure text fields from req.body
       console.log("RECEIVED BODY:", req.body);
        const { 
            name, email, phone, location, 
            identityProofType, addressProofType, 
            ownershipDocType, propertyStatus 
        } = req.body;
        console.log("HEADERS:", req.headers);

console.log("FILES:", req.files);
        // 2. Validation
        if (!name || !email || !phone) {
            return res.status(400).json({
                success: false,
                message: "Basic details (Name, Email, Phone) are required."
            });
        }
        console.log("HEADERS2", req.headers);

        // 3. Check if owner already exists
        const existingOwner = await Ownerform.findOne({ email });
        if (existingOwner) {
            return res.status(400).json({ 
                success: false, 
                message: "Owner with this email already exists" 
            });
        }
        console.log(existingOwner)

        // 4. Handle Files (Getting paths from Multer)
        // This assumes you used upload.fields() in your route
        // const profilePhoto = req.files['profilePhoto'] ? req.files['profilePhoto'][0].path : null;
        // const ownershipDoc = req.files['ownershipDoc'] ? req.files['ownershipDoc'][0].path : null;
        // console.log(profilePhoto)
        // console.log(ownershipDoc)
        // ... add other file fields as needed

        // 5. Create and Save (Using .create is cleaner)
        const newOwner = await Ownerform.create({
            name,
            email,
            phone,
            location,
            identityProofType,
           addressProofType,
            ownershipDocType,
            propertyStatus,
            // profilePhoto, 
             
        });
        console.log(newOwner)

        return res.status(201).json({
            success: true,
            message: "Property registered successfully!",
            data: newOwner
        });

    } catch (error) {
        console.error("Controller Error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};