import { useState, useEffect } from "react";
import Navbar from "./Nav";
import searchImage from "../assets/search.jpg";
import SideBar from "./KanbanSide"
import axios from "axios";

const KanbanBoard = () => {
  // State to store all tasks
  const [alltasks, setAllTasks] = useState([]);

  useEffect(() => {
    const storedProjectId = localStorage.getItem("projectId");
    if (storedProjectId) {
      axios.get(`http://localhost:3001/tasks?projectId=${storedProjectId}`).then((response) => {
        setAllTasks(response.data);
      });
    }
  }, []);

  // Filter tasks based on status
  const filterTasksByStatus = (status) => {
    return alltasks.filter((task) => task.status === status);
  };

  return (
    <div className="bg-white h-screen">
      {/* Header */}
      <Navbar />

      <SideBar/>


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
