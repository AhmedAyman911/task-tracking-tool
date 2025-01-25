import axios from "axios";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Alert, Snackbar } from "@mui/material";

const AuthPage = () => {
  const [isSignup, setIsSignup] = useState(false);

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600"
    >
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-center mb-6 border-b pb-4">
          <button
            onClick={() => setIsSignup(false)}
            className={`px-6 py-2 text-lg font-bold transition ${
              !isSignup
                ? "text-blue-600 border-b-4 border-blue-600"
                : "text-gray-500"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsSignup(true)}
            className={`px-6 py-2 text-lg font-bold transition ${
              isSignup
                ? "text-blue-600 border-b-4 border-blue-600"
                : "text-gray-500"
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
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("error");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/users/login", { password, email })
      .then((response) => {
        const { token, user } = response.data;
        if (token && user) {
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));
          navigate(user.role === "manager" ? "/Mprojects" : "/DevProjects");
          setAlertMessage("Login successful!");
          setAlertSeverity("success");
          setAlertOpen(true);
        } else {
          setAlertMessage("Token or user data missing in response.");
          setAlertSeverity("error");
          setAlertOpen(true);
        }
      })
      .catch(() => {
        setAlertMessage(
          "Error logging in. Please check your credentials and try again."
        );
        setAlertSeverity("error");
        setAlertOpen(true);
      });
  };

  const handleClose = () => setAlertOpen(false);

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Welcome Back
      </h2>
      <div>
        <label className="block text-gray-700 font-semibold">Email</label>
        <input
          type="email"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter your email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="relative">
        <label className="block text-gray-700 font-semibold">Password</label>
        <input
          type={showPassword ? "text" : "password"}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter your password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
        className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition"
      >
        Login
      </button>
      <Snackbar
        open={alertOpen}
        autoHideDuration={2500}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity={alertSeverity} sx={{ width: "100%" }}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </form>
  );
};

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("error");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/users/signup", { name, password, email, role })
      .then(() => {
        setAlertMessage("Signup successful!");
        setAlertSeverity("success");
        setAlertOpen(true);
        navigate("/");
      })
      .catch((err) => {
        setAlertMessage(
          err.response?.data.message || "Error signing up. Please try again."
        );
        setAlertSeverity("error");
        setAlertOpen(true);
      });
  };

  const handleClose = () => setAlertOpen(false);

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Create Account
      </h2>
      <div>
        <label className="block text-gray-700 font-semibold">Name</label>
        <input
          type="text"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter your name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-gray-700 font-semibold">Email</label>
        <input
          type="email"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter your email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="relative">
        <label className="block text-gray-700 font-semibold">Password</label>
        <input
          type={showPassword ? "text" : "password"}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter your password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
        <label className="block text-gray-700 font-semibold">Role</label>
        <select
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
          value={role}
          onChange={(e) => setRole(e.target.value)}
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
        className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition"
      >
        Sign Up
      </button>
      <Snackbar
        open={alertOpen}
        autoHideDuration={2500}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity={alertSeverity} sx={{ width: "100%" }}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </form>
  );
};

export default AuthPage;
