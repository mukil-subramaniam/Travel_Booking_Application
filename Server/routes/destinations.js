import express from 'express';
import { destinationsData } from '../data/destinations.js'; // Adjust the path as needed
import auth from '../middleware/auth.js';

const router = express.Router();

// Get all destinations
router.get('/', async (req, res) => {
  try {
    res.json(destinationsData);
  } catch (error) {
    console.error('Error fetching destinations:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get destinations by state (case-insensitive search)
router.get('/state/:state', async (req, res) => {
  try {
    // console.log("Received state:", req.params.state); // Debugging statement
    const destinations = destinationsData.filter(destination =>
      destination.state.toLowerCase() === req.params.state.toLowerCase()
    );
    // console.log("Destinations found:", destinations); // Debugging statement
    res.json(destinations);
  } catch (error) {
    console.error("Error in fetching destinations:", error); // Debugging statement
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single destination by ID (this can be an index or a unique identifier)
router.get('/:id', async (req, res) => {
  try {
    const destination = destinationsData.find(dest => dest.name.toLowerCase() === req.params.id.toLowerCase());
    if (!destination) {
      return res.status(404).json({ message: 'Destination not found' });
    }
    res.json(destination);
  } catch (error) {
    console.error('Error fetching destination:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


router.get('/state/:state/:name', async (req, res) => {
  try {
    const { state, name } = req.params;
    const destination = destinationsData.find(
      (dest) =>
        dest.state.toLowerCase() === state.toLowerCase() &&
        dest.name.toLowerCase() === name.toLowerCase()
    );
    
    if (!destination) {
      return res.status(404).json({ message: 'Destination not found' });
    }

    res.json(destination);
  } catch (error) {
    console.error("Error fetching destination:", error);
    res.status(500).json({ message: 'Server error' });
  }
});

// router.get('state/:name', async (req, res) => {
//   try {
//     // Searching by name instead of ID
//     const destination = destinationsData.find(dest => dest.name.toLowerCase() === req.params.name.toLowerCase());
    
//     if (!destination) {
//       return res.status(404).json({ message: 'Destination not found' });
//     }
    
//     res.json(destination);
//   } catch (error) {
//     console.error('Error fetching destination:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// Add new destination (admin only)
// router.post('/', auth, async (req, res) => {
//   try {
//     // Ideally, you would validate and sanitize input here
//     const newDestination = {
//       state: req.body.state,
//       name: req.body.name,
//       description: req.body.description,
//       images: req.body.images,
//       location: req.body.location,
//       hotels: req.body.hotels,
//       attractions: req.body.attractions
//     };
//     destinationsData.push(newDestination); // Simulating adding to a database
//     res.status(201).json(newDestination);
//   } catch (error) {
//     console.error('Error saving destination:', error);
//     res.status(500).json({ message: 'Server error' });
//   }

//   try {
//     const placeId = req.params.id;
    
//     // Fetch the place details from the database
//     const place = await Place.findById(placeId); // Assuming you are using Mongoose
//     if (!place) {
//       return res.status(404).json({ message: 'Place not found' });
//     }

//     // Return the place details as a response
//     res.json(place);
//   } catch (error) {
//     console.error('Error fetching place details:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

export default router;
