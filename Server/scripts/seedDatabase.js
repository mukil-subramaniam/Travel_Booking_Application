// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import { destinationsData } from '../data/destinations.js';
// import Destination from '../models/Destination.js';

// dotenv.config();
// console.log('MongoDB URI:', process.env.MONGODB_URI);

// const seedDatabase = async () => {
//   try {
//     await mongoose.connect(process.env.MONGODB_URI);
//     console.log('Connected to MongoDB Atlas');

//     // Clear existing destinations
//     await Destination.deleteMany({});
//     console.log('Cleared existing destinations');

//     // Insert new destinations
//     await Destination.insertMany(destinationsData);
//     console.log('Destinations seeded successfully');

//     process.exit(0);
//   } catch (error) {
//     console.error('Error seeding database:', error);
//     process.exit(1);
//   }
// };

// seedDatabase();