import Listing from "../models/listingSchema.js";

export const filteramenities = (req, res) => {
    try {
        let amenities = [];

        // Try to get enum values from schema dynamically
        const path = Listing.schema.path('selectedAmenities');
        if (path && path.enumValues) {
            amenities = path.enumValues;
        } else if (path && path.caster && path.caster.enumValues) {
            // For array fields, enum is on the caster
            amenities = path.caster.enumValues;
        } else {
            // Fallback to your schema's enum list (hardcoded)
            amenities = [
                "Parking", "Gym", "24*7", "Powerbackup", "Lift",
                "Swimmingpool", "Garden", "Playground", "CCTV",
                "Water Supply", "Internet/Wifi", "Air-Conditioning"
            ];
        }

        console.log('Sending amenities:', amenities);
        res.json(amenities);
    } catch (error) {
        console.error('Error fetching amenities:', error);
        // Even on error, send fallback so frontend doesn't break
        const fallback = [
            "Parking", "Gym", "24*7", "Powerbackup", "Lift",
            "Swimmingpool", "Garden", "Playground", "CCTV",
            "Water Supply", "Internet/Wifi", "Air-Conditioning"
        ];
        res.json(fallback);
    }
};

// controllers/filterController.js
export const getPropertyTypes = (req, res) => {
  try {
    // Agar enum hai to directly le lo
    const types = Listing.schema.path('propertyType').enumValues || 
                  ["Apartment", "Villa", "PG/Hostel", "Office Space"]; // fallback
    res.json(types);
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch property types' });
  }
};

export const getAvailabilityOptions = (req, res) => {
  try {
    const options = Listing.schema.path('availability').enumValues ||
                    ["immediate", "within15", "within30"]; // fallback
    res.json(options);
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch availability options' });
  }
};