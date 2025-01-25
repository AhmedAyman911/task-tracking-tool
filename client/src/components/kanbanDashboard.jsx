import { useState, useEffect } from "react";
import axios from "axios";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import "chartjs-adapter-date-fns";
import Navbar from "./Nav";
import SideBar from "./KanbanSide"
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
      <Navbar />
      <SideBar/>
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
