import axios from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import img from '../assets/i.jpg'; // Import your image
import { useAuth } from '../context/AuthContext';

function Dashboard() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/bookings/my-bookings');
      setBookings(response.data);
    } catch (error) {
      toast.error('Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      await axios.patch(`http://localhost:5000/api/bookings/${bookingId}/cancel`);
      toast.success('Booking cancelled successfully');
      fetchBookings();
    } catch (error) {
      toast.error('Failed to cancel booking');
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="spinner-border animate-spin text-blue-500">Loading...</div>
      </div>
    );

  return (
    <div
      className="container mx-auto px-6 py-10"
      style={{
        backgroundImage: `url(${img})`, // Set image as background
        backgroundSize: 'cover',        // Ensure it covers the entire area
        backgroundPosition: 'center',   // Center the image
        backgroundRepeat: 'no-repeat',  // Don't repeat the image
        minHeight: '100vh',             // Make sure the container takes full viewport height
        backgroundAttachment: 'fixed',  // Keep the background fixed during scrolling
      }}
    >
      <h1 className="text-4xl font-semibold text-center text-blue-800 mb-8">
        Welcome, {user?.name}!
      </h1>

      <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Your Bookings</h2>
        {bookings.length === 0 ? (
          <p className="text-gray-500">No bookings found.</p>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="border border-gray-300 rounded-lg p-6 shadow-sm hover:shadow-lg transition-all"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-xl text-gray-800">{booking.destination}</h3>
                    <p className="text-sm text-gray-600">
                      {new Date(booking.startDate).toLocaleDateString()} -{' '}
                      {new Date(booking.endDate).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-600">{booking.numberOfPeople} people</p>
                    <p className="text-sm text-gray-600">Transport: {booking.transportMode}</p>
                    <p className="mt-2 font-semibold text-lg text-gray-800">
                      Total: ₹{booking.totalPrice}
                    </p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        booking.status === 'confirmed'
                          ? 'bg-green-100 text-green-700'
                          : booking.status === 'cancelled'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {booking.status}
                    </span>
                    {booking.status === 'confirmed' && (
                      <button
                        onClick={() => handleCancelBooking(booking._id)}
                        className="mt-3 text-sm text-red-600 hover:text-red-800 transition-colors"
                      >
                        Cancel Booking
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
