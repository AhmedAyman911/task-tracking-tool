import { useState, useEffect } from "react";

import searchImage from "../assets/search.jpg";
import { Link } from "react-router-dom";

import axios from "axios";

const KanbanBoard = () => {
  // State to store all tasks
  const [alltasks, setAllTasks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/tasks/")
      .then((response) => {
        setAllTasks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  }, []);

  // Filter tasks based on status
  const filterTasksByStatus = (status) => {
    return alltasks.filter((task) => task.status === status);
  };

  return (
    <div className="bg-white h-screen">
      {/* Header */}
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
          <span className="notification-icon">🔔</span>
        </div>
      </nav>

      {/* Sidebar */}
      <div className="sidebar">
        <h2>Workio</h2>
        <ul>
        <li>
          <Link to="/goal">
            <img src="client/src/assets/goals.jpg" alt="Board Icon" className="sidebar-icon" /> Goal
          </Link>
        </li>
        <li>
          <Link to="/kanbanBoard">
            <img src="src/assets/board.png" alt="Board Icon" className="sidebar-icon" /> Board
          </Link>
        </li>
          <li>
            <Link to ="/ListKanban">
              <img src="client/src/assets/list.jpg" alt="List Icon" className="sidebar-icon" /> List
              </Link>
          </li>
         
        </ul>
      </div>


      {/* Main Content */}
      <main className="flex-1 p-6 "style={{ marginLeft: '230px' }}>
        {/* Kanban Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold">Kan Board</h1>
        </div>

        {/* Search Bar */}
        <div className="flex items-center">
          <img src={searchImage} alt="Search" className="w-7 h-7 mr-2" />
          <input
            type="text"
            placeholder="Search"
            className="border-2 border-gray-400 rounded px-4 py-2"
          />
        </div>

        {/* Kanban Columns */}
        <div className="grid grid-cols-3 gap-4 px-2 py-7">
          {/* To Do Column */}
          <div className="bg-gray-200 shadow rounded p-4 h-auto">
            <h2 className="text-lg font-semibold">To Do</h2>
            <div className="mt-4 space-y-2">
              {filterTasksByStatus("To Do").map((task) => (
                <div
                  key={task._id}
                  className="bg-white p-2 rounded shadow hover:bg-blue-100 hover:shadow-lg transition-all duration-200"
                >
                  <h3 className="font-medium">{task.key}</h3>
                  <p className="text-sm text-gray-600">{task.summary}</p>
                  <p className="text-sm text-gray-600">Assignee: {task.assignee}</p>
                  <p className="text-sm text-gray-600">
                    Due: {task.dueDate
                      ? new Date(task.dueDate).toLocaleDateString()
                      : "No due date"}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* In Progress Column */}
          <div className="bg-gray-200 shadow rounded p-4 h-auto">
            <h2 className="text-lg font-semibold">In Progress</h2>
            <div className="mt-4 space-y-2">
              {filterTasksByStatus("In Progress").map((task) => (
                <div
                  key={task._id}
                  className="bg-white p-2 rounded shadow hover:bg-blue-100 hover:shadow-lg transition-all duration-200"
                >
                  <h3 className="font-medium">{task.key}</h3>
                  <p className="text-sm text-gray-600">{task.summary}</p>
                  <p className="text-sm text-gray-600">Assignee: {task.assignee}</p>
                  <p className="text-sm text-gray-600">
                    Due: {task.dueDate
                      ? new Date(task.dueDate).toLocaleDateString()
                      : "No due date"}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Done Column */}
          <div className="bg-gray-200 shadow rounded p-4 h-auto">
            <h2 className="text-lg font-semibold">Done</h2>
            <div className="mt-4 space-y-2">
              {filterTasksByStatus("Done").map((task) => (
                <div
                  key={task._id}
                  className="bg-white p-2 rounded shadow hover:bg-blue-100 hover:shadow-lg transition-all duration-200"
                >
                  <h3 className="font-medium">{task.key}</h3>
                  <p className="text-sm text-gray-600">{task.summary}</p>
                  <p className="text-sm text-gray-600">Assignee: {task.assignee}</p>
                  <p className="text-sm text-gray-600">
                    Due: {task.dueDate
                      ? new Date(task.dueDate).toLocaleDateString()
                      : "No due date"}
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
