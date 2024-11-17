import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <nav className="bg-blue-500 shadow-md"> {/* Added background color here */}
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold text-white">
            India Travel Booking
          </Link>

          <div className="flex items-center space-x-4">
            <Link to="/destinations" className="text-white hover:text-black-600">
              Destinations
            </Link>

            {user ? (
              <>
                <Link to="/dashboard" className="text-white hover:text-blue-600">
                  Dashboard
                </Link>
                <Link
                  to="/About"
                  className="text-white hover:text-blue-600"
                >
                  About Us
                </Link>
                <Link
                  to="/Contact"
                  className="text-white hover:text-blue-600"
                >
                  Contact Us
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-white hover:text-blue-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-white hover:text-blue-600">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-white hover:text-blue-600"
                >
                  Sign Up
                </Link>
                <Link
                  to="/About"
                  className="text-white hover:text-blue-600"
                >
                  About Us
                </Link>
                <Link
                  to="/Contact"
                  className="text-white hover:text-blue-600"
                >
                  Contact Us
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
