import { useState, useEffect } from "react";
import axios from "axios";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import "chartjs-adapter-date-fns";
import { Link } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend, TimeScale
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend, TimeScale
);

const KanbanDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedAssignee, setSelectedAssignee] = useState("");

  useEffect(() => {
    const storedProjectId = localStorage.getItem("projectId");
    if (storedProjectId) {
      axios.get(`http://localhost:3001/tasks?projectId=${storedProjectId}`).then((response) => {
        setTasks(response.data);
      });
    }
  }, []);

  // Data Preparation
  const taskStatusData = {
    labels: ["To Do", "In Progress", "Done"],
    datasets: [
      {
        label: "Tasks by Status",
        data: [
          tasks.filter((task) => task.status === "To Do").length,
          tasks.filter((task) => task.status === "In Progress").length,
          tasks.filter((task) => task.status === "Done").length,
        ],
        backgroundColor: ["#4caf50", "#ff9800", "#f44336"],
      },
    ],
  };

  const uniqueAssignees = [...new Set(tasks.map((task) => task.assignee))];

  const assigneeTaskData = selectedAssignee
    ? {
      labels: ["To Do", "In Progress", "Done"],
      datasets: [
        {
          data: [
            tasks.filter(
              (task) => task.assignee === selectedAssignee && task.status === "To Do"
            ).length,
            tasks.filter(
              (task) => task.assignee === selectedAssignee && task.status === "In Progress"
            ).length,
            tasks.filter(
              (task) => task.assignee === selectedAssignee && task.status === "Done"
            ).length,
          ],
          backgroundColor: ["#4caf50", "#ff9800", "#f44336"],
        },
      ],
    }
    : null;
  const doneTasks = tasks.filter((task) => task.status === "Done");

  const allDates = doneTasks.flatMap((task) => [
    new Date(task.dueDate).getTime(),
    task.completedDate ? new Date(task.completedDate).getTime() : null,
  ]);

  const minDate = Math.min(...allDates.filter((date) => date));
  const maxDate = Math.max(...allDates.filter((date) => date));

  const data = {
    labels: doneTasks.map((task) => task.key || `Task ${task._id}`), // X-axis labels
    datasets: [
      {
        label: "Due Date",
        data: doneTasks.map((task) => new Date(task.dueDate).getTime()), // Due dates
        borderColor: "#4bc0c0",
        backgroundColor: "#4bc0c0",
        pointStyle: "circle",
        pointRadius: 5,
        fill: false,
      },
      {
        label: "Completed Date",
        data: doneTasks.map((task) =>
          task.completedDate ? new Date(task.completedDate).getTime() : null
        ), // Completed dates
        borderColor: "#ff6384",
        backgroundColor: "#ff6384",
        pointStyle: "triangle",
        pointRadius: 5,
        fill: false,
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const date = new Date(tooltipItem.raw).toLocaleDateString();
            return `${tooltipItem.dataset.label}: ${date}`;
          },
        },
      },
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        type: "time",
        time: {
          unit: "day",
        },
        min: minDate - 86400000,
        max: maxDate + 86400000,
        title: {
          display: true,
          text: "Dates",
        },
      },
      x: {
        title: {
          display: true,
          text: "Tasks (Done)",
        },
      },
    },
  };


  return (
    <div className="p-6">
      {/* Navbar */}
      <nav className="bg-[#c6e6fd] px-10 py-4 flex justify-between items-center border-b border-gray-300 fixed top-0 left-0 w-full shadow-md z-50">
        {/* Brand */}
        <div className="text-2xl font-bold text-gray-800">
          Workio
        </div>

        {/* Links */}
        <div className="space-x-6">
          <a href="#" className="text-lg font-bold text-black hover:text-[#66b0ff] transition">
            Your work
          </a>
          <a href="/choose" className="text-lg font-bold text-black hover:text-[#66b0ff] transition">
            Projects
          </a>
          <a href="#" className="text-lg font-bold text-black hover:text-[#66b0ff] transition">
            Filters
          </a>
          <a href="#" className="text-lg font-bold text-black hover:text-[#66b0ff] transition">
            Dashboards
          </a>
          <a href="#" className="text-lg font-bold text-black hover:text-[#66b0ff] transition">
            Teams
          </a>
          <a href="#" className="text-lg font-bold text-black hover:text-[#66b0ff] transition">
            Plan
          </a>
          <a href="#" className="text-lg font-bold text-black hover:text-[#66b0ff] transition">
            Apps
          </a>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <span className="text-2xl cursor-pointer">🔔</span>
        </div>
      </nav>

      {/* Sidebar */}
      <div className="fixed top-[57px] mt-2 left-0 h-[calc(100vh-60px)] w-[250px] bg-[#dde6f4] text-black p-5 font-sans shadow-md z-50">
        <h2 className="text-lg font-bold mb-5">Workio</h2>
        <ul className="space-y-4">
          <li>
            <Link
              to="/goal"
              className="flex items-center text-black text-base no-underline p-2 rounded-md hover:bg-[#0052cc] hover:text-white transition"
            >
              <img
                src="client/src/assets/goals.jpg"
                alt="Board Icon"
                className="w-6 h-6 mr-2"
              />
              Goal
            </Link>
          </li>
          <li>
            <Link
              to="/kanbanBoard"
              className="flex items-center text-black text-base no-underline p-2 rounded-md hover:bg-[#0052cc] hover:text-white transition"
            >
              <img
                src="src/assets/board.png"
                alt="Board Icon"
                className="w-6 h-6 mr-2"
              />
              Board
            </Link>
          </li>
          <li>
            <Link
              to="/ListKanban"
              className="flex items-center text-black text-base no-underline p-2 rounded-md hover:bg-[#0052cc] hover:text-white transition"
            >
              <img
                src="client/src/assets/list.jpg"
                alt="List Icon"
                className="w-6 h-6 mr-2"
              />
              List
            </Link>
          </li>
          <li>
            <Link
              to="/kanbanDashboard"
              className="flex items-center text-black text-base no-underline p-2 rounded-md hover:bg-[#0052cc] hover:text-white transition"
            >
              <img
                src="client/src/assets/list.jpg"
                alt="List Icon"
                className="w-6 h-6 mr-2"
              />
              Dashboard
            </Link>
          </li>
        </ul>
      </div>
      <div style={{ marginLeft: '250px' }}>
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Kanban Dashboard</h1>
        <div className="grid grid-cols-2 gap-6">
          {/* Doughnut Chart for Selected Assignee */}
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-bold mb-4">Tasks by Assignee</h2>
            <select
              value={selectedAssignee}
              onChange={(e) => setSelectedAssignee(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            >
              <option value="">Select Assignee</option>
              {uniqueAssignees.map((assignee) => (
                <option key={assignee} value={assignee}>
                  {assignee}
                </option>
              ))}
            </select>
            <div className="h-64">
              {selectedAssignee ? (
                <Doughnut data={assigneeTaskData} options={{ maintainAspectRatio: false }} />
              ) : (
                <p className="text-gray-500">Select an assignee to view task distribution.</p>
              )}
            </div>
          </div>

          {/* Task Due Dates vs Completed Dates */}
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-bold mb-4">Done Tasks: Due Dates vs Completed Dates</h2>
            <div className="h-80">
              {doneTasks.length > 0 ? (
                <Line data={data} options={options} />
              ) : (
                <p className="text-gray-500">No Done tasks available for this project.</p>
              )}
            </div>
          </div>
        </div>

        {/* Centered Task Status Distribution */}
        <div className="flex justify-center mt-8">
          <div className="bg-white shadow-md rounded-lg p-4 w-1/3">
            <h2 className="text-xl font-bold mb-4">Task Status Distribution</h2>
            <div className="h-80">
              <Bar data={taskStatusData} options={{ maintainAspectRatio: false }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KanbanDashboard;
