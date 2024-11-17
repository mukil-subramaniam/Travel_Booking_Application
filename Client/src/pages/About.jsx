import React from 'react';

function AboutUs() {
  return (
    <div className="container mx-auto px-4 py-8 bg-gradient-t from-blue-400">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">About Us</h1>
      <div className="space-y-6">
        <p className="text-gray-700 text-lg">
          Welcome to <span className="font-semibold">India Travel Planner</span> – your trusted companion for exploring the beauty, culture, and vibrancy of India. We’re here to make your travel dreams come true by offering you insights, planning tools, and information to explore India’s most beautiful destinations.
        </p>

        <p className="text-gray-700 text-lg">
          Our travel platform provides detailed information on destinations across India, from the serene backwaters of Kerala to the bustling streets of Delhi, from the majestic forts of Rajasthan to the tranquil beaches of Goa. Whether you’re planning a solo adventure, a family trip, or a romantic getaway, we’re here to make it all possible.
        </p>

        <h2 className="text-2xl font-semibold text-blue-600">What We Offer</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 text-lg">
          <li>Detailed information on popular and offbeat destinations in India.</li>
          <li>Weather updates for each location to help you plan your trips accordingly.</li>
          <li>Personalized dashboard where you can track your favorite destinations.</li>
          <li>Booking assistance for hotels, attractions, and travel packages.</li>
          <li>Real-time travel tips, safety information, and cultural insights.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-blue-600">Our Mission</h2>
        <p className="text-gray-700 text-lg">
          At India Travel Planner, our mission is to inspire, inform, and simplify travel experiences across India. We aim to foster a deeper appreciation for India’s diversity, heritage, and natural beauty by helping travelers experience it first-hand in a way that is both fulfilling and seamless.
        </p>

        <h2 className="text-2xl font-semibold text-blue-600">Get in Touch</h2>
        <p className="text-gray-700 text-lg">
          We love hearing from travelers! Whether you have a question, feedback, or just want to share your experience with us, feel free to reach out. Our team is here to help you make the most of your Indian journey.
        </p>

        <p className="text-gray-700 text-lg">
          Happy travels, and let’s explore India together!
        </p>
      </div>
    </div>
  );
}

export default AboutUs;
