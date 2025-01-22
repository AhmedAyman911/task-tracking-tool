import axios from 'axios';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Alert, Snackbar } from '@mui/material';

const AuthPage = () => {
  const [isSignup, setIsSignup] = useState(false);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setIsSignup(false)}
            className={`px-4 py-2 text-sm font-semibold ${!isSignup ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
          >
            Login
          </button>
          <button
            onClick={() => setIsSignup(true)}
            className={`px-4 py-2 text-sm font-semibold ${isSignup ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
          >
            Sign Up
          </button>
        </div>
        {isSignup ? <SignupForm /> : <LoginForm />}
      </div>
    </div>
  );
};

const LoginForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('error');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:3001/users/login', { password, email })
      .then((response) => {
        const { token, user } = response.data;
        if (token && user) {
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(user));
          if (user.role === 'manager') {
            navigate('/choose');
          } else {
            navigate('/devBoard'); // Navigate to the choose.jsx page
          }
          setAlertMessage('Login successful!');
          setAlertSeverity('success');
          setAlertOpen(true);
        } else {
          setAlertMessage('Token or user data missing in response.');
          setAlertSeverity('error');
          setAlertOpen(true);
        }
      })
      .catch((error) => {
        setAlertMessage('Error logging in. Please check your credentials and try again.');
        setAlertSeverity('error');
        setAlertOpen(true);
      });
  };

  const handleClose = () => {
    setAlertOpen(false);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
      <div>
        <label className="block text-gray-700">Email</label>
        <input
          type="email"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Your Email"
          required
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
        />
      </div>
      <div className="relative">
        <label className="block text-gray-700">Password</label>
        <input
          type={showPassword ? 'text' : 'password'}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Password"
          required
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-9 text-gray-600"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
      <Snackbar
        open={alertOpen}
        autoHideDuration={2500}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert onClose={handleClose} severity={alertSeverity} sx={{ width: '100%' }}>
          {alertMessage}
        </Alert>
      </Snackbar>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
      >
        Login
      </button>
    </form>
  );
};

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('error');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:3001/users/signup', { name, password, email, role })
      .then(() => {
        setAlertMessage('Signup successful!');
        setAlertSeverity('success');
        setAlertOpen(true);
        navigate('/'); // Navigate to the login page after successful 
        
      })
      .catch((err) => {
        setAlertMessage(err.response?.data.message || 'Error signing up. Please try again.');
        setAlertSeverity('error');
        setAlertOpen(true);
      });
  };

  const handleClose = () => {
    setAlertOpen(false);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
      <div>
        <label className="block text-gray-700">Name</label>
        <input
          type="text"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Your Name"
          required
          value={name}
          onChange={(ev) => setName(ev.target.value)}
        />
      </div>
      <div>
        <label className="block text-gray-700">Email</label>
        <input
          type="email"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Your Email"
          required
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
        />
      </div>
      <div className="relative">
        <label className="block text-gray-700">Password</label>
        <input
          type={showPassword ? 'text' : 'password'}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Password"
          required
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-9 text-gray-600"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
      <div>
        <label className="block text-gray-700">Role</label>
        <select
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          required
          value={role}
          onChange={(ev) => setRole(ev.target.value)}
        >
          <option value="">Select Role</option>
          <option value="manager">Manager</option>
          <option value="Frontend developer">Frontend Developer</option>
          <option value="Backend developer">Backend Developer</option>
          <option value="UI/UX developer">UI/UX Developer</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
      >
        Sign Up
      </button>
      <Snackbar
        open={alertOpen}
        autoHideDuration={2500}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert onClose={handleClose} severity={alertSeverity} sx={{ width: '100%' }}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </form>
  );
};

export default AuthPage;
