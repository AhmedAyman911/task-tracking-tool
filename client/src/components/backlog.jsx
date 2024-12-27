import { useState } from "react"; // Import React and useState
import axios from "axios";
import "./backlog.css";
const [showForm, setShowForm] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setpriority] = useState("");
    const [dueDate, setDueDate] = useState("");

const handleSubmit = (e) => {
  e.preventDefault();
  // Backend API call
  axios.post('http://localhost:3001/tasks/', {
      title,
      description,
      priority,
      dueDate,
  })
      .then((response) => {
          // Update table data with the new task
          setTableData((prevData) => [...prevData, response.data]);
          setShowForm(false); // Close the form
      })
      .catch((error) => {
          console.error("Error adding task:", error);
      });
};

const Backlog = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
 
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleStartSprint = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    closeModal();
  };

  return (
    <div className="app">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-brand">Workio</div>
        <div className="navbar-links">
          <a href="#">Your work</a>
          <a href="#">Projects</a>
          <a href="#">Filters</a>
          <a href="#">Dashboards</a>
          <a href="#">Teams</a>
          <a href="#">Plan</a>
          <a href="#">Apps</a>
        </div>
        <div className="navbar-actions">
          <a href="#">Login/Signup</a>
          <span className="notification-icon">🔔</span>
        </div>
      </nav>

      {/* Sidebar */}
      <div className="sidebar">
        <h2>Workio</h2>
        <ul>
          
          <li>
            <a href="#">
              <img src="src/assets/progress.png" alt="Timeline Icon" className="sidebar-icon" /> Timeline
            </a>
          </li>
          <li>
            <a href="#">
              <img src="src/assets/board.png" alt="Board Icon" className="sidebar-icon" /> Board
            </a> 
          </li>
          <li>
            <a href="#">
              <img src="src/assets/backlog.png" alt="List Icon" className="sidebar-icon" /> Backlog
            </a>
          </li>
          
          <li>
            <a href="#">
              <img src="src/assets/target.png" alt="Code Icon" className="sidebar-icon" /> Code
            </a>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="content">
        {/* Backlog Header */}
        <div className="backlog-header">
          <h1>Backlog</h1>
          <br></br><br></br>
          {/* Search Bar */}
          <div className="search-bar">
            <input type="text" placeholder="Search..." />
          </div>
          <br></br>
          {/* User Photos and Action Buttons */}
          <div className="user-actions">
            <div className="user-photos">
              <img src="src/assets/user.png" alt="User 1" className="user-photo" />
              <img src="src/assets/user (1).png" alt="User 2" className="user-photo" />
              <img src="src/assets/download.jpeg" alt="User 3" className="user-photo" />
            </div>
            <div className="action-buttons">
              <button className="insights-btn">Insights</button>
              <button className="settings-btn">Settings</button>
              <button className="epic-btn">Epic</button>
            </div>
          </div>
        </div>
<br></br><br></br>
        {/* Sprint Section */}
        <div className="sprint-section">
          <div className="sprint-header">
            <h2>Sprint 1 (0 issues)</h2>
            <div className="sprint-actions">
              <button className="add-dates-btn">Add dates</button>
              <button className="start-sprint-btn" onClick={openModal}>
                Start sprint
              </button>
            </div>
          </div>
          <div className="sprint-content">
            <div className="sprint-plan">
              <img src="src/assets/agile.png" alt="Agile" className="sprintimg" />
              <div className="sprint-plan-text">
                <p>
                  <strong>Plan your sprint</strong>
                  <br />
                  Drag issues from the <strong>Backlog</strong> section, or create new issues, to plan the work for this sprint.
                  <br />
                  Select <strong>Start sprint</strong> when you are ready.
                </p>
              </div>
            </div>
            <button className="create-issue-btn">+ Create issue</button>
          </div>
        </div>

        {/* Backlog Section */}
        <div className="backlog-section">
          <h2>Backlog (0 issues)</h2>
          <div className="backlog-content">
            <p>Your backlog is empty</p>
            <br></br>
            <button className="create-issue-btn">+ Create issue</button>
          </div>
        </div>
      </div>

      {/* Modal for Start Sprint */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Start Sprint</h2>
            <form onSubmit={handleStartSprint}>
              <label htmlFor="sprint-name">Sprint Name</label>
              <input type="text" id="sprint-name" required />

              <label htmlFor="start-date">Start Date</label>
              <input type="date" id="start-date" required />

              <label htmlFor="end-date">End Date</label>
              <input type="date" id="end-date" required />

              <label htmlFor="sprint-goal">Sprint Goal</label>
              <textarea id="sprint-goal" rows="4"></textarea>

              <div className="modal-actions">
                <button type="button" onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit">Start</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Backlog;
