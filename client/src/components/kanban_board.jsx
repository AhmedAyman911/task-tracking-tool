import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import timelineImage from "../assets/timeline.jpg";
import gettingstartedImage from "../assets/gettingstarted.jpg";
import goalsImage from "../assets/goals.jpg";
import boardImage from "../assets/board.jpg";
import listImage from "../assets/list.jpg";
import codeImage from "../assets/code.jpg";
import searchImage from "../assets/search.jpg";
import axios from "axios";
const KanbanBoard = () => {
  // State to store the list of tasks for each column
  const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    done: [],
  });

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

  // Function to add a task to a specific column
  const addTask = (column) => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      [column]: [...prevTasks[column], ""],
    }));
  };

  // Function to handle task input changes
  const handleTaskChange = (column, index, value) => {
    const updatedTasks = [...tasks[column]];
    updatedTasks[index] = value;
    setTasks((prevTasks) => ({
      ...prevTasks,
      [column]: updatedTasks,
    }));
  };

  return (
    <div className="bg-white h-screen">
      {/* Header */}
      <header className="bg-blue-200 p-4 flex justify-between items-center">
        <div>
          <h1 className="text-lg font-bold text-2xl">Workio</h1>
        </div>
        <div>
          <nav className="space-x-10 text-xl">
            <a href="#" className="text-gray-900 hover:text-gray-900 font-semibold">
              Create New Project
            </a>
          </nav>
        </div>
        <div className="flex items-center space-x-4 text-xl">
          <button className="text-gray-600">🔔</button>
          <button className="text-gray-900">Login/Signup</button>
        </div>
      </header>

      {/* Sidebar + Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-1/5 bg-white p-4 space-y-6 border-gray-300 rounded border-2 h-full">
          <div>
            <h2 className="text-xl font-semibold">SPM</h2>
            <p className="text-lg text-gray-600">Software project</p>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium text-gray-900">PLANNING</h3>
            <nav className="space-y-1">
              <a href="#" className="block p-2 rounded hover:bg-blue-200 text-base flex items-center">
                <img src={gettingstartedImage} alt="Timeline" className="w-7 h-7 mr-2" />
                Getting started
              </a>
              <a href="#" className="block p-2 rounded hover:bg-blue-200 text-base flex items-center">
                <img src={timelineImage} alt="Timeline" className="w-7 h-7 mr-2" />
                Timeline
              </a>
              <a href="#" className="block p-2 bg-gray-200 rounded text-base flex items-center">
                <img src={boardImage} alt="Timeline" className="w-7 h-7 mr-2" />
                Board
              </a>
              <a href="#" className="block p-2 rounded hover:bg-blue-200 text-base flex items-center">
                <img src={listImage} alt="Timeline" className="w-7 h-7 mr-2" />
                List
              </a>
              <a href="#" className="block p-2 rounded hover:bg-blue-200 text-base flex items-center">
                <img src={goalsImage} alt="Timeline" className="w-7 h-7 mr-2" />
                Goals
              </a>
            </nav>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium text-gray-900">DEVELOPMENT</h3>
            <a href="#" className="block p-2 rounded hover:bg-blue-200 text-base flex items-center">
              <img src={codeImage} alt="Code" className="w-7 h-7 mr-2" />
              Code
            </a>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Kanban Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-bold">Kan Board</h1>
          </div>

          {/* Search Bar */}
          <div className="flex items-center">
            <img src={searchImage} alt="Code" className="w-7 h-7 mr-2" />
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
                  <div key={task._id} className="bg-white p-2 rounded shadow hover:bg-blue-100 hover:shadow-lg transition-all duration-200">
                    <h3 className="font-medium">{task.key}</h3>
                    <p className="text-sm text-gray-600">{task.summary}</p>
                    <p className="text-sm text-gray-600">Assignee: {task.assignee}</p>
                    <p className="text-sm text-gray-600">
                      Due:{" "}
                      {task.dueDate
                        ? new Date(task.dueDate).toLocaleDateString() // Parse and format date
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
                  <div key={task._id} className="bg-white p-2 rounded shadow hover:bg-blue-100 hover:shadow-lg transition-all duration-200">
                    <h3 className="font-medium">{task.key}</h3>
                    <p className="text-sm text-gray-600">{task.summary}</p>
                    <p className="text-sm text-gray-600">Assignee: {task.assignee}</p>
                    <p className="text-sm text-gray-600">
                      Due:{" "}
                      {task.dueDate
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
                  <div key={task._id} className="bg-white p-2 rounded shadow hover:bg-blue-100 hover:shadow-lg transition-all duration-200">
                    <h3 className="font-medium">{task.key}</h3>
                    <p className="text-sm text-gray-600">{task.summary}</p>
                    <p className="text-sm text-gray-600">Assignee: {task.assignee}</p>
                    <p className="text-sm text-gray-600">
                      Due:{" "}
                      {task.dueDate
                        ? new Date(task.dueDate).toLocaleDateString() // Parse and format date
                        : "No due date"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default KanbanBoard;
