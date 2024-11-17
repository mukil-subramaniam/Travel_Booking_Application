import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

function StateDestinations() {
  const { state } = useParams(); // Get state name from URL
  const [destinations, setDestinations] = useState([]);
  const [destinationSearchQuery, setDestinationSearchQuery] = useState('');
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch destinations when component mounts or `state` changes
  useEffect(() => {
    fetchDestinations(state);
  }, [state]);

  // Filter destinations based on search query
  useEffect(() => {
    setFilteredDestinations(
      destinations.filter((dest) =>
        dest.name.toLowerCase().includes(destinationSearchQuery.toLowerCase())
      )
    );
  }, [destinations, destinationSearchQuery]);

  // Function to fetch destinations for the given state
  const fetchDestinations = async (state) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/destinations/state/${state}`);
      setDestinations(response.data); // Set destinations from API response
    } catch (error) {
      console.error('Error fetching destinations:', error);
      setError('Failed to load destinations. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Display loading or error messages if necessary
  if (loading) return <div className="text-center text-xl text-gray-500">Loading destinations...</div>;
  if (error) return <div className="text-center text-xl text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">Explore Tourist Spots in {state}</h1>

      {/* Search Bar */}
      <div className="mb-6 max-w-xl mx-auto">
        <input
          type="text"
          placeholder="Search destinations..."
          value={destinationSearchQuery}
          onChange={(e) => setDestinationSearchQuery(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
        />
      </div>

      {/* No Destinations Message */}
      {filteredDestinations.length === 0 ? (
        <p className="text-center text-lg text-gray-600">No tourist spots found for {state}.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDestinations.map((dest) => (
            <Link
              to={`/state/${state}/${dest.name}`} // Link to PlaceDetails page
              key={dest._id} // Use unique _id as key
              className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300"
            >
              <img
                src={dest.images?.[0] || 'placeholder.jpg'} // Fallback to placeholder if no image is available
                alt={dest.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">{dest.name}</h2>
                {/* <p className="text-gray-600">{dest.description}</p> */}
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Back Button */}
      <div className="text-center mt-8">
        <button
          className="text-lg text-blue-600 hover:text-blue-800 font-medium"
          onClick={() => window.history.back()}
        >
          &#8592; Back to Destinations
        </button>
      </div>
    </div>
  );
}

export default StateDestinations;
