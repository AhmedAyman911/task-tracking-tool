import { useState, useEffect } from "react"; // Import React hooks
import axios from "axios";
import "./backlog.css";
import { Link } from "react-router-dom";

const Backlog = () => {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [tableData, setTableData] = useState([]);

  // Fetch backlog data from the server
  useEffect(() => {
    axios
      .get("http://localhost:3001/backlog/")
      .then((response) => {
        setTableData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching issues:", error);
      });
  }, []);

  // Handle form submission for adding backlog issues
  const handleBacklogSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/backlog/add", {
        title,
        description,
        priority,
        dueDate,
      })
      .then((response) => {
        setTableData((prevData) => [...prevData, response.data]);
        setShowForm(false); // Close the form
        setTitle("");
        setDescription("");
        setPriority("");
        setDueDate("");
      })
      .catch((error) => {
        console.error("Error adding issue:", error);
      });
  };

  return (
    <div className="app">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-brand">Workio</div>
        <div className="navbar-links">
          <a href="#">Your work</a>
          <a href="/choose">Projects</a>
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
          <Link to="/backlog">
            <img src="client/src/assets/backlog.png" alt="Board Icon" className="sidebar-icon" /> Backlog
          </Link>
        </li>
        <li>
          <Link to="/scrumtime">
            <img src="client/src/assets/timeline.jpg" alt="Board Icon" className="sidebar-icon" /> Timeline
          </Link>
        </li>
          
         
        </ul>
      </div>

      {/* Main Content */}
      <div className="content">
        {/* Backlog Header */}
        <div className="backlog-header">
          <h1>Backlog</h1>
          <br />
          <div className="search-bar">
            <input type="text" placeholder="Search..." />
          </div>
          <br />
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

        <br />
        <div className="sprint-section">
          <div className="sprint-header">
            <h2>Project</h2>
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
            <button className="create-issue-btn" onClick={() => setShowForm(!showForm)}>
              + Create issue
            </button>
            {showForm && (
              <form onSubmit={handleBacklogSubmit} className="backlog-form">
                <h2>Create New Issue</h2>
                <label>
                  Title
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </label>
                <label>
                  Description
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </label>
                <label>
                  Priority
                  <input
                    type="text"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                  />
                </label>
                <label>
                  Due Date
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                </label>
                <div className="form-actions">
                  <button type="button" onClick={() => setShowForm(false)}>
                    Cancel
                  </button>
                  <button type="submit">Add to Backlog</button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Backlog Section */}
        <div className="backlog-section">
          <h2>Backlog ({tableData.length} issues)</h2>
          {tableData.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Priority</th>
                  <th>Due Date</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((issue, index) => (
                  <tr key={index}>
                    <td>{issue.title}</td>
                    <td>{issue.description}</td>
                    <td>{issue.priority}</td>
                    <td>{issue.dueDate ? new Date(issue.dueDate).toLocaleDateString() : "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Your backlog is empty</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Backlog;
