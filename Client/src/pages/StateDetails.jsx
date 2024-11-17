// import { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import axios from 'axios';

// function StateDetails() {
//   const { stateId } = useParams();
//   const [destinations, setDestinations] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchStateDestinations();
//   }, [stateId]);

//   const fetchStateDestinations = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5000/api/destinations/state/${stateId}`);
//       setDestinations(response.data);
//     } catch (error) {
//       console.error('Error fetching state destinations:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) return <div>Loading...</div>;

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-8">Destinations in {stateId}</h1>
      
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {destinations.map((destination) => (
//           <div
//             key={destination._id}
//             className="bg-white rounded-lg shadow-md overflow-hidden"
//           >
//             {destination.images[0] && (
//               <img
//                 src={destination.images[0]}
//                 alt={destination.name}
//                 className="w-full h-48 object-cover"
//               />
//             )}
//             <div className="p-6">
//               <h2 className="text-xl font-semibold mb-2">{destination.name}</h2>
//               <p className="text-gray-600 mb-4 line-clamp-3">
//                 {destination.description}
//               </p>
//               <div className="space-y-2">
//                 <h3 className="font-medium">Popular Attractions:</h3>
//                 <ul className="list-disc list-inside text-gray-600">
//                   {destination.attractions.slice(0, 3).map((attraction, index) => (
//                     <li key={index}>{attraction.name}</li>
//                   ))}
//                 </ul>
//               </div>
//               <Link
//                 to={`/place/${destination._id}`}
//                 className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
//               >
//                 View Details
//               </Link>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default StateDetails;