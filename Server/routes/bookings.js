import express from 'express';
import Booking from '../models/Booking.js';
import auth from '../middleware/auth1.js'; 

const router = express.Router();

router.post('/', auth, async (req, res) => {
  try {
    console.log('Booking request body:', req.body); // Log the request body
    console.log('Authenticated user:', req.user); // Log the authenticated user

    const { destination, startDate, endDate, tripType, adults, children, transportMode, totalPrice } = req.body;
    const booking = await Booking.create({
      user: req.user.id,
      destination,
      startDate,
      endDate,
      tripType,
      adults,
      children,
      totalPrice,
      status: 'confirmed',
    });
    
    console.log('Booking created:', booking);
    res.status(201).json(booking);
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ message: 'Booking failed', error: error.message || error });
  }
});

router.get('/my-bookings', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch bookings', error });
  }
});

router.patch('/:bookingId/cancel', auth, async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.bookingId, { status: 'cancelled' }, { new: true });
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Failed to cancel booking', error });
  }
});

export default router;
