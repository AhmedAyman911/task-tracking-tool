import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons

const AuthPage = () => {
  const [isSignup, setIsSignup] = useState(false);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setIsSignup(false)}
            className={`px-4 py-2 text-sm font-semibold ${
              !isSignup ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsSignup(true)}
            className={`px-4 py-2 text-sm font-semibold ${
              isSignup ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'
            }`}
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
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form className="space-y-4">
      <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
      <div>
        <label className="block text-gray-700">Email</label>
        <input
          type="email"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Your Email"
          required
        />
      </div>
      <div className="relative">
        <label className="block text-gray-700">Password</label>
        <input
          type={showPassword ? 'text' : 'password'}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Password"
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-9 text-gray-600"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
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

  return (
    <form className="space-y-4">
      <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
      <div>
        <label className="block text-gray-700">Name</label>
        <input
          type="text"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Your Name"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700">Email</label>
        <input
          type="email"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Your Email"
          required
        />
      </div>
      <div className="relative">
        <label className="block text-gray-700">Password</label>
        <input
          type={showPassword ? 'text' : 'password'}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Password"
          required
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
      >
        <option value="">Select Role</option>
        <option value="manager">Manager</option>
        <option value="Frontend developer">Frontend developer</option>
        <option value="Backend developer">Backend developer</option>
        <option value="Ui/Ux developer">Ui/Ux developer</option>
      </select>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
      >
        Sign Up
      </button>
    </form>
  );
};

export default AuthPage;
