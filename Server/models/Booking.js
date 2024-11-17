
// mongoose.Schema.Types.ObjectId
import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  destination: { type: String, ref: 'Destination', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  tripType: { type: String, required: true },
  adults: { type: Number, required: true },
  children: { type: Number, default: 0 },
  totalPrice: { type: Number, required: true },
  status: { type: String, default: 'confirmed' }
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
