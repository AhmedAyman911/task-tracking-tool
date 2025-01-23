import { useNavigate } from "react-router-dom";
import './choose.css';
import { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const Choose = () => {
  const [showModal, setShowModal] = useState(false); // Modal visibility
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [managerId, setManagerId] = useState("");
  const [ptype, setPtype] = useState("");
  const decodeToken = (token) => {
    try {
      const decoded = jwtDecode(token); // jwtDecode is used here
      return decoded;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };
  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem("token");
    if (token) {
      // Decode the token
      const decodedToken = decodeToken(token);

      if (decodedToken) {
        setManagerId(decodedToken.id);
      } else {
        console.error("Failed to decode token.");
      }
    }
  }, []);

  const handleKanbanClick = () => {
    setPtype("Kanban");
    setShowModal(true); // Show the modal
  };

  const handleCloseModal = () => {
    setShowModal(false); // Hide the modal
  };
  
  const handleScrumClick = () => {
    setPtype("Scrum");
    setShowModal(true); // Show the modal
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const newProject = {
        name: projectName,
        type: ptype,
        description: projectDescription,
        managerId
      };
      const response = await axios.post("http://localhost:3001/projects/new", newProject);
      // Handle successful response
      console.log("Project created:", response.data);

      // Reset form and close modal
      setProjectName("");
      setProjectDescription("");
      setShowModal(false);
      navigate("/mprojects");
    } catch (err) {
      console.error("Error creating project:", err);
    }
  };

  const navigate = useNavigate();

  return (
    <div className="choose-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-brand">Workio</div>
        <div className="navbar-links">
          <a href="/choose">Your work</a>
          <a href="/Mprojects">Projects</a>
          <a href="#">Filters</a>
          <a href="#">Dashboards</a>
          <a href="#">Teams</a>
          <a href="#">Plan</a>
          <a href="#">Apps</a>
        </div>
        <div className="navbar-actions">
          <span className="notification-icon">🔔</span>
        </div>
      </nav>

      {/* Main Content */}
      <div className="choose-content">
        <div className="title">
          <b><h1>Select Your Workflow Method</h1></b>
          <p>
            <br />
            Choose a workflow method that best fits your project needs.
            <br /> Each
            method is tailored to different approaches for task management and
            team collaboration.
          </p>
        </div>
        <br />
        {/* Workflow Options */}
        <div className="workflow-options">
          {/* Kanban Option */}
          <div className="workflow-card">
            <img
              src="src/assets/kanban.png"
              alt="Kanban Icon"
              className="workflow-icon"
            />
            <div className="workflow-details">
              <b><h3>1. Kanban</h3></b>
              <p>
                Visualize your workflow with a board-based system that focuses
                on continuous delivery and flexibility.<br /> Ideal for teams needing
                a visual overview.
              </p>
            </div>
            <button className="create-btn" onClick={handleKanbanClick}>
              Create
            </button>
          </div>
          {/* Modal */}
          {showModal && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-md p-6 relative">
                {/* Close Button */}
                <button
                  onClick={handleCloseModal}
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                >
                  ✖
                </button>

                {/* Form */}
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <h2 className="text-lg font-bold text-gray-700">Create Kanban Project</h2>

                  <div>
                    <label htmlFor="projectName" className="block text-sm font-medium text-gray-700">
                      Project Name
                    </label>
                    <input
                      type="text"
                      id="projectName"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                      className="border rounded-md px-4 py-2 w-full"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="projectDescription" className="block text-sm font-medium text-gray-700">
                      Project Description
                    </label>
                    <textarea
                      id="projectDescription"
                      value={projectDescription}
                      onChange={(e) => setProjectDescription(e.target.value)}
                      className="border rounded-md px-4 py-2 w-full"
                      rows="4"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
                  >
                    Create Project
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Scrum Option */}
          <div className="workflow-card">
            <img
              src="src/assets/scrum.png"
              alt="Scrum Icon"
              className="workflow-icon"
            />
            <div className="workflow-details">
              <b><h3>2. Scrum</h3></b>
              <p>
                Break down work into time-boxed sprints and focus on iterative
                delivery.<br /> Perfect for agile teams.
              </p>
            </div>
            <button className="create-btn" onClick={handleScrumClick}>
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Choose;
