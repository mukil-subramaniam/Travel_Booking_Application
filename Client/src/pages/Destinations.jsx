import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Destinations() {
  const [states, setStates] = useState([]);
  const [stateSearchQuery, setStateSearchQuery] = useState('');
  const [filteredStates, setFilteredStates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchStates();
  }, []);

  useEffect(() => {
    setFilteredStates(
      states.filter((state) =>
        state.state.toLowerCase().includes(stateSearchQuery.toLowerCase())
      )
    );
  }, [states, stateSearchQuery]);

  const fetchStates = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/states');
      setStates(response.data);
      setFilteredStates(response.data);
    } catch (error) {
      console.error('Error fetching states:', error);
      setError('Failed to load states. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleStateClick = (state) => {
    navigate(`/state/${state}`); // Navigate to the state destinations page
  };

  return (
    <div className="container mx-auto px-4 py-8">


      <h1 className="text-3xl font-bold mb-8">Explore Indian States</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <input
        type="text"
        placeholder="Search states..."
        value={stateSearchQuery}
        onChange={(e) => setStateSearchQuery(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded"
      />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredStates.map((state) => (
            <div
              key={state.state}
              className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleStateClick(state.state)} // Updated onClick
            >
              <img 
                src={state.image} 
                alt={state.state} 
                className="w-full h-32 object-cover rounded-t-md mb-4"
              />
              <h2 className="text-xl font-semibold">{state.state}</h2>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Destinations;
