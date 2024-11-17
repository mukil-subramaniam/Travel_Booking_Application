import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import img from '../assets/i.jpg';
import { useAuth } from '../context/AuthContext';

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });  
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password);
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${img})`,
        backgroundSize: 'cover', // Make the image cover the entire screen
        backgroundPosition: 'center', // Center the image
        minHeight: '100vh', // Ensure the div takes up the full height
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
      }}
    >
      <div
        style={{
          maxWidth: '400px',
          width: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.8)', // Light background overlay for contrast
          padding: '30px',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
        }}
      >
        <h2 style={{ marginBottom: '20px', fontSize: '24px', color: '#333', fontWeight: '600' }}>
          Sign in to your account
        </h2>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <input
              name="email"
              type="email"
              required
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '14px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                color: '#555',
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <input
              name="password"
              type="password"
              required
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '14px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                color: '#555',
              }}
            />
          </div>

          <div>
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: '#4C51BF',
                color: 'white',
                fontSize: '16px',
                fontWeight: '600',
                borderRadius: '5px',
                cursor: 'pointer',
                border: 'none',
                transition: 'background-color 0.3s ease',
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = '#434190')}
              onMouseOut={(e) => (e.target.style.backgroundColor = '#4C51BF')}
            >
              Sign in
            </button>
          </div>
        </form>

        <div style={{ marginTop: '20px' }}>
          <p style={{ fontSize: '14px', color: '#555' }}>
            Don't have an account?{' '}
            <Link
              to="/register"
              style={{
                color: '#4C51BF',
                textDecoration: 'none',
                fontWeight: '600',
              }}
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
