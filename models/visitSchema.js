import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
     listingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Listing",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  
//   senderId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },

//   receiverId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },

//   listingId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Listing",
//   },

  message: {
    type: String,
    required: true,
  },

  date: {
    type: String,
    default: () => new Date().toLocaleDateString(),
  },

  time: {
    type: String,
    default: () => new Date().toLocaleTimeString(),
  },

  duration: {
    type: Number, // in minutes
    default: 0,
  },

}, { timestamps: true });

const Visit = mongoose.model("Visit", messageSchema);

export default Visit;