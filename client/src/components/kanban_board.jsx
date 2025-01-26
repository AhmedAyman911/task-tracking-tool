import { useState, useEffect } from "react";
import Navbar from "./Nav";
import SideBar from "./KanbanSide";
import axios from "axios";

const KanbanBoard = () => {
  // State to store all tasks
  const [alltasks, setAllTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    const storedProjectId = localStorage.getItem("projectId");
    if (storedProjectId) {
      axios.get(`http://localhost:3001/tasks?projectId=${storedProjectId}`).then((response) => {
        setAllTasks(response.data);
        setFilteredTasks(response.data); // Initially show all tasks
      });
    }
  }, []);

  // Filter tasks based on search query
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (!query) {
      setFilteredTasks(alltasks); // If search is empty, show all tasks
    } else {
      const result = alltasks.filter((task) =>
        task.summary.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredTasks(result);
    }
  };

  // Filter tasks based on status
  const filterTasksByStatus = (status) => {
    return filteredTasks.filter((task) => task.status === status);
  };

  return (
    <div className="bg-white h-screen">
      <Navbar />
      <SideBar />
      <main className="flex-1 p-6" style={{ marginLeft: '230px' }}>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold">Kanban Board</h1>
        </div>

     {/* Search Bar */}
<div className="flex items-center bg-white border rounded-lg p-0.5 mb-6 w-full max-w-xl ml-2"> {/* Reduced padding */}
  <input
    type="text"
    placeholder="Search tasks..."
    value={searchQuery}
    onChange={(e) => handleSearch(e.target.value)}
    className="border-none outline-none w-full p-2 text-gray-700"
  />
</div>



        {/* Kanban Columns */}
        <div className="grid grid-cols-3 gap-4 px-2 py-7">
          {/* To Do Column */}
          <div className="bg-gray-100 shadow-lg rounded-lg p-4">
            <h2 className="text-lg font-semibold text-gray-800">To Do</h2>
            <div className="mt-4 space-y-4">
              {filterTasksByStatus("To Do").map((task) => (
                <div
                  key={task._id}
                  className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-all duration-200"
                >
                  <h3 className="font-semibold text-gray-800">{task.key}</h3>
                  <p className="text-sm text-gray-600">{task.summary}</p>
                  <p className="text-sm text-gray-600">Assignee: {task.assignee}</p>
                  <p className="text-sm text-gray-600">
                    Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No due date"}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* In Progress Column */}
          <div className="bg-gray-100 shadow-lg rounded-lg p-4">
            <h2 className="text-lg font-semibold text-gray-800">In Progress</h2>
            <div className="mt-4 space-y-4">
              {filterTasksByStatus("In Progress").map((task) => (
                <div
                  key={task._id}
                  className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-all duration-200"
                >
                  <h3 className="font-semibold text-gray-800">{task.key}</h3>
                  <p className="text-sm text-gray-600">{task.summary}</p>
                  <p className="text-sm text-gray-600">Assignee: {task.assignee}</p>
                  <p className="text-sm text-gray-600">
                    Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No due date"}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Done Column */}
          <div className="bg-gray-100 shadow-lg rounded-lg p-4">
            <h2 className="text-lg font-semibold text-gray-800">Done</h2>
            <div className="mt-4 space-y-4">
              {filterTasksByStatus("Done").map((task) => (
                <div
                  key={task._id}
                  className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-all duration-200"
                >
                  <h3 className="font-semibold text-gray-800">{task.key}</h3>
                  <p className="text-sm text-gray-600">{task.summary}</p>
                  <p className="text-sm text-gray-600">Assignee: {task.assignee}</p>
                  <p className="text-sm text-gray-600">
                    Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No due date"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default KanbanBoard;
