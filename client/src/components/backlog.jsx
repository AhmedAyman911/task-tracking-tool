import { useState,useEffect} from "react"; // Import React and useState
import axios from "axios";
import "./backlog.css";

const Backlog = () => {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/backlog/")
      .then((response) => {
        setTableData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching issues:", error);
      });
  }, [])

  const handleBacklogSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/backlog/add', {
      title,
      description,
      priority,
      dueDate,
    })
      .then((response) => {
        setTableData((prevData) => [...prevData, response.data]);
        setShowForm(false); // Close the form
      })
      .catch((error) => {
        console.error("Error adding issue:", error);
      });
};

const Backlog = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
 
  const openModal = () => {
    setIsModalOpen(true);
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
            <h2>project</h2>
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
            <button className="create-issue-btn" onClick={() => setShowForm(!showForm)}>+ Create issue</button>
            <div className="">
              {showForm && (
                <form
                  onSubmit={handleBacklogSubmit}
                  className="mt-6 bg-gray-100 p-6 rounded shadow-md space-y-4 max-w-lg mx-auto"
                >
                  <h2 className="text-xl font-semibold text-gray-700">Create New Issue</h2>

                  <div>
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-gray-600"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400 focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="backlog-description"
                      className="block text-sm font-medium text-gray-600"
                    >
                      Description
                    </label>
                    <textarea
                      id="backlog-description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400 focus:outline-none"
                      rows="4"
                    ></textarea>
                  </div>

                  <div>
                    <label
                      htmlFor="backlog-priority"
                      className="block text-sm font-medium text-gray-600"
                    >
                      Priority
                    </label>
                    <input
                      type="text"
                      id="backlog-priority"
                      value={priority}
                      onChange={(e) => setPriority(e.target.value)}
                      className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="backlog-due-date"
                      className="block text-sm font-medium text-gray-600"
                    >
                      Due Date
                    </label>
                    <input
                      type="date"
                      id="backlog-due-date"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    />
                  </div>

                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="py-2 px-4 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    >
                      Add to Backlog
                    </button>
                  </div>
                </form>
              )}</div>
          </div>
        </div>

        {/* Backlog Section */}
        <div className="backlog-section">
        <h2 className="text-xl font-bold mb-4">Backlog ({tableData.length} issues)</h2>
        <div className="backlog-content">
          {tableData.length > 0 ? (
            <table className="w-full table-auto border-collapse border border-gray-300 bg-white shadow-md rounded">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left">Title</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Priority</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Due Date</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((issue, index) => (
                  <tr
                    key={index}
                    className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                  >
                    <td className="border border-gray-300 px-4 py-2">{issue.title}</td>
                    <td className="border border-gray-300 px-4 py-2">{issue.description}</td>
                    <td className="border border-gray-300 px-4 py-2">{issue.priority}</td>
                    <td className="border border-gray-300 px-4 py-2">{issue.dueDate ? new Date(issue.dueDate).toISOString().split("T")[0] : "N/A"}</td>
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


      <div className="modal-content">
        <h2>Start Sprint</h2>

      </div>
    </div>
  );
};

export default Backlog;
