import { useState, useEffect } from "react"; // Import React hooks
import axios from "axios";
import "./backlog.css";
import { Link } from "react-router-dom";

const Backlog = () => {
  const projectId = localStorage.getItem("projectId");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    sprint: "",
    task_name: "",
    role: "",
    from: "",
    to: "",
    projectId: projectId,
    description: "",
    priority: "Medium", // Default priority
  });
  const [tableData, setTableData] = useState([]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Fetch backlog data from the server
  useEffect(() => {
    const storedProjectId = localStorage.getItem("projectId");
    if (storedProjectId) {
      axios
        .get(`http://localhost:3001/sprints/tasks?projectId=${storedProjectId}`)
        .then((response) => {
          setTableData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching issues:", error);
        });
    }
  }, []);

  // Handle form submission for adding backlog issues
  const handleBacklogSubmit = (e) => {
    e.preventDefault();
    const payload = {
      sprint: "",
      task_name: formData.task_name,
      role: formData.role,
      from: formData.from,
      to: formData.to,
      projectId: projectId,
      description: formData.description,
      priority: formData.priority,
    };
    axios
      .post("http://localhost:3001/sprints/", payload)
      .then((response) => {
        setTableData((prevData) => [...prevData, response.data]);
        setShowForm(false); // Close the form
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
              <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                  <h2 className="text-lg font-bold mb-4">Create New Issue</h2>
                  <form onSubmit={handleBacklogSubmit}>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">Task Name</label>
                      <input
                        type="text"
                        name="task_name"
                        value={formData.task_name}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                        placeholder="Task Name"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">Role</label>
                      <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                        required
                      >
                        <option value="">Select Role</option>
                        <option value="Frontend Developer">Frontend Developer</option>
                        <option value="Backend Developer">Backend Developer</option>
                        <option value="Tester">Tester</option>
                        <option value="UI/UX Designer">UI/UX Designer</option>
                      </select>
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">From</label>
                      <input
                        type="date"
                        name="from"
                        value={formData.from}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">To</label>
                      <input
                        type="date"
                        name="to"
                        value={formData.to}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">Description</label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                        placeholder="Task Description"
                        required
                      ></textarea>
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">Priority</label>
                      <select
                        name="priority"
                        value={formData.priority}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                      >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                      </select>
                    </div>
                    <div className="flex justify-end space-x-4">
                      <button
                        type="button"
                        onClick={() => setShowForm(false)}
                        className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Backlog Section */}
        <div className="backlog-section p-6 bg-gray-50 rounded shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">
            Backlog ({tableData.length} issues)
          </h2>
          {tableData.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                <thead>
                  <tr className="bg-blue-500 text-white">
                    <th className="text-left px-4 py-2 font-medium">Title</th>
                    <th className="text-left px-4 py-2 font-medium">Description</th>
                    <th className="text-left px-4 py-2 font-medium">Priority</th>
                    <th className="text-left px-4 py-2 font-medium">Due Date</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((issue, index) => (
                    <tr
                      key={index}
                      className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"
                        } hover:bg-blue-100`}
                    >
                      <td className="px-4 py-2 border-t">{issue.task_name}</td>
                      <td className="px-4 py-2 border-t">{issue.description}</td>
                      <td
                        className={`px-4 py-2 border-t font-semibold ${issue.priority === "High"
                            ? "text-red-500"
                            : issue.priority === "Medium"
                              ? "text-yellow-500"
                              : "text-green-500"
                          }`}
                      >
                        {issue.priority}
                      </td>
                      <td className="px-4 py-2 border-t">
                        {issue.to ? new Date(issue.to).toLocaleDateString() : "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 mt-4">Your backlog is empty.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Backlog;
