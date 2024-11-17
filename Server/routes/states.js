// routes/states.js

import express from 'express';
import { statesData } from '../data/statesData.js'; // Assuming you create a file for state data

const router = express.Router(); 

// Get all states with images
router.get('/', (req, res) => {
  res.json(statesData);
});

export default router;
