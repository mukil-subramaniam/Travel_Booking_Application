import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './home.css'; // Import custom CSS for animations


function Home() {
  const { isLoggedIn } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-200 to-gray-400 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl italic animate-fade-in">
            <span className="block text-gray-800">Discover the Beauty of</span>
            <span className="block text-blue-700">Incredible India</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-lg text-gray-700 italic sm:text-xl md:mt-5 md:text-2xl md:max-w-3xl animate-slide-up">
            Dive into the diversity of landscapes, vibrant culture, and timeless heritage that make India truly unique.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <Link
                to="/destinations"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium italic rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
              >
                Start Exploring
              </Link>
            </div>
            {!isLoggedIn && (
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                <Link
                  to="/register"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium italic rounded-md text-blue-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                >
                  Sign Up Now
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Popular Destinations Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center italic text-blue-900 animate-slide-up">
            Popular Destinations
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Destination Cards */}
            <div className="bg-gray-50 overflow-hidden shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300 animate-fade-in">
              <img
                className="h-48 w-full object-cover"
                src="https://cdn.pixabay.com/photo/2020/06/05/21/09/cultural-tourism-5264542_1280.jpg"
                alt="Taj Mahal"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-blue-700 italic">Taj Mahal</h3>
                <p className="mt-2 text-gray-700 italic">
                  One of the world's most iconic monuments, symbolizing eternal love.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 overflow-hidden shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300 animate-fade-in">
              <img
                className="h-48 w-full object-cover"
                src="https://cdn.pixabay.com/photo/2017/10/04/17/51/alleppey-2817032_640.jpg"
                alt="Kerala Backwaters"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-blue-700 italic">Kerala Backwaters</h3>
                <p className="mt-2 text-gray-700 italic">
                  Serene waterways surrounded by lush greenery and traditional houseboats.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 overflow-hidden shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300 animate-fade-in">
              <img
                className="h-48 w-full object-cover"
                src="https://cdn.pixabay.com/photo/2022/07/13/15/25/ganges-7319480_640.jpg"
                alt="Varanasi"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-blue-700 italic">Varanasi</h3>
                <p className="mt-2 text-gray-700 italic">
                  The spiritual capital of India, where tradition meets eternity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer Section */}
      <footer className="bg-gray-700 text-gray-300 py-8 mt-12 italic">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-100">Contact Us</h3>
          <p className="mt-2 text-gray-300">Email: support@tourstravel.com | Phone: +123-456-7890</p>
          <p className="mt-2 text-gray-300">Address: 123 Adventure Road, Travel City, Earth</p>
          <Link
            to="/contact"
            className="mt-4 inline-block text-gray-100 hover:text-gray-200 font-medium"
          >
            Contact Us Page
          </Link>
        </div>

        {/* Social Media Links */}
        <div className="flex justify-center space-x-6 mt-6">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white"
            aria-label="Facebook"
          >
            <FaFacebook size={24} />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white"
            aria-label="Instagram"
          >
            <FaInstagram size={24} />
          </a>
          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white"
            aria-label="Twitter"
          >
            <FaTwitter size={24} />
          </a>
        </div>

        <div className="text-center mt-4">
          <p className="text-gray-300">© 2024 Tours Travel. All rights reserved.</p>
        </div>
      </div>
    </footer>
    </div>
  );
}

export default Home;
