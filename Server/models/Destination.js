import mongoose from 'mongoose';

const destinationSchema = new mongoose.Schema({
  destinationId: {
    type: Number,
    required: true,
    unique: true
  },
  state: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  images: [String],
  googleMapLink: {
    type: String,
    required: true
  },
  hotels: [{
    name: String,
    rating: Number,
    priceRange: String,
    contact: String
  }],
  attractions: [{
    name: String,
    description: String,
    bestTimeToVisit: String,
    rating: Number,
    priceRange: String
  }]
}, { timestamps: true });

export default mongoose.model('Destination', destinationSchema);
