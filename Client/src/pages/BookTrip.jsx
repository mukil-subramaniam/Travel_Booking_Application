import axios from 'axios';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function BookTrip() {
  const { name } = useParams(); 
  const navigate = useNavigate();
  const { user } = useAuth(); 

  const [formData, setFormData] = useState({
    startDate: null,
    endDate: null,
    tripType: 'family',
    adults: 1,
    children: 0,
    transportMode: 'bus',
  });
  const [dateError, setDateError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.startDate || !formData.endDate) {
      setDateError('Please select both start and end dates');
      return;
    }
    if (formData.endDate <= formData.startDate) {
      setDateError('End date should be after the start date');
      return;
    }
    setDateError(null);
    try {
      const token = localStorage.getItem('token'); 
      if (!token) throw new Error("Authorization token not found.");
      const destination = name;
      const totalPrice = calculatePrice();
      
      const requestBody = {
        destination: destination,
        ...formData,
        totalPrice: totalPrice
      };
      const response = await axios.post('http://localhost:5000/api/bookings', requestBody, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Booking successful:', response.data);
      alert('Booking successful!');
      navigate('/dashboard'); 
    } catch (error) {
      console.log('Error response:', error.response);
      if (error.response && error.response.status === 401) {
        alert("Authorization error: Please log in again.");
      } else {
        alert("Booking failed. Please try again.");
      }
    }
  };

  const calculatePrice = () => {
    const days = Math.ceil((formData.endDate - formData.startDate) / (1000 * 60 * 60 * 24));
    const basePrice = 1500;
    const discount = days > 7 ? 0.9 : 1; 

    return Math.round((basePrice * days * (formData.adults + formData.children * 0.5)) * discount);
  };

  return (
    <div className="container mx-auto px-4 py-8" style={{ backgroundImage: 'url(https://img.freepik.com/premium-photo/creative-cellphone-with-travel-items-online-trip-booking-concept-green-background_1199132-155681.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-4">
        <h1 className="text-2xl font-bold mb-6">Book Your Trip</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date</label>
            <DatePicker
              selected={formData.startDate}
              onChange={(date) => setFormData({ ...formData, startDate: date })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              dateFormat="yyyy/MM/dd"
              minDate={new Date()} // Disable past dates
            />
          </div>
          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">End Date</label>
            <DatePicker
              selected={formData.endDate}
              onChange={(date) => setFormData({ ...formData, endDate: date })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              dateFormat="yyyy/MM/dd"
              minDate={formData.startDate || new Date()} // Disable dates before start date
            />
          </div>

          {/* Show date error if dates are invalid */}
          {dateError && <p className="text-red-500 text-sm">{dateError}</p>}

          {/* Trip Type */}
          <div>
            <label htmlFor="tripType" className="block text-sm font-medium text-gray-700">Trip Type</label>
            <select
              id="tripType"
              value={formData.tripType}
              onChange={(e) => setFormData({ ...formData, tripType: e.target.value })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="family">Family</option>
              <option value="friends">Friends</option>
              <option value="solo">Solo</option>
            </select>
          </div>

          {/* Adults */}
          <div>
            <label htmlFor="adults" className="block text-sm font-medium text-gray-700">Adults</label>
            <input
              type="number"
              id="adults"
              value={formData.adults}
              onChange={(e) => setFormData({ ...formData, adults: Number(e.target.value) })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              min="1"
            />
          </div>

          {/* Children */}
          <div>
            <label htmlFor="children" className="block text-sm font-medium text-gray-700">Children</label>
            <input
              type="number"
              id="children"
              value={formData.children}
              onChange={(e) => setFormData({ ...formData, children: Number(e.target.value) })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              min="0"
            />
          </div>

          {/* Estimated Price */}
          {formData.startDate && formData.endDate && (
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="font-medium mb-2">Estimated Price</h3>
              <p className="text-2xl font-bold">₹{calculatePrice()}</p>
            </div>
          )}

          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Book Now
          </button>
        </form>
      </div>
    </div>
  );
}

export default BookTrip;
