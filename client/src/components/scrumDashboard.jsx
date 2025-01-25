import { useEffect, useState } from "react";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
} from "chart.js";
import Navbar from "./Nav";
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);
import SideBar from "./ScrumSide";
const ScrumGanttChart = () => {
    const [tasks, setTasks] = useState([]);

    // Fetch tasks grouped by sprint
    useEffect(() => {
        const fetchTasks = async () => {
            const storedProjectId = localStorage.getItem("projectId");
            if (storedProjectId) {
                try {
                    const response = await fetch(
                        `http://localhost:3001/sprints/tasks?projectId=${storedProjectId}`
                    );
                    const data = await response.json();
                    setTasks(data);
                } catch (error) {
                    console.error("Error fetching tasks:", error);
                }
            }
        };

        fetchTasks();
    }, []);

    const validTasks = tasks.filter(
        (task) =>
            task.from && !isNaN(new Date(task.from)) &&
            task.to && !isNaN(new Date(task.to)) &&
            task.assignee &&
            task.sprint > 0
    );

    if (validTasks.length === 0) {
        return (
            <div className="p-6 bg-white shadow rounded">
                <h2 className="text-xl font-bold mb-4">Gantt Chart</h2>
                <p>No valid tasks available for the Gantt chart.</p>
            </div>
        );
    }

    // Group tasks by sprint
    const groupedTasks = validTasks.reduce((acc, task) => {
        if (!acc[task.sprint]) acc[task.sprint] = [];
        acc[task.sprint].push(task);
        return acc;
    }, {});

    // Find the earliest and latest dates for the chart range
    const allDates = validTasks.flatMap((task) => [new Date(task.from), new Date(task.to)]);
    const minDate = new Date(Math.min(...allDates));
    const maxDate = new Date(Math.max(...allDates));

    // Prepare chart data
    const data = {
        labels: Object.keys(groupedTasks).map((sprint) => `Sprint ${sprint}`),
        datasets: Object.values(groupedTasks).flatMap((tasks, index) =>
            tasks.map((task) => ({
                label: `${task.task_name} (${task.assignee})`,
                data: [
                    {
                        x: task.from ? new Date(task.from).toISOString() : minDate.toISOString(),
                        y: `Sprint ${Object.keys(groupedTasks)[index]}`, // Sprint label
                    },
                    {
                        x: task.to ? new Date(task.to).toISOString() : maxDate.toISOString(),
                        y: `Sprint ${Object.keys(groupedTasks)[index]}`, // Sprint label
                    },
                ],
                backgroundColor: "#4caf50",
                borderColor: "#4caf50",
                borderWidth: 1,
            }))
        ),
    };

    // Chart options
    const options = {
        scales: {
            x: {
                type: "time",
                time: {
                    unit: "day",
                    tooltipFormat: "MMM dd, yyyy",
                },
                min: minDate.toISOString(),
                max: maxDate.toISOString(),
            },
            y: {
                type: "category",
                labels: data.labels,
            },
        },
        plugins: {
            legend: {
                display: true,
            },
        },
    };

    // 1. Sprint Progress Chart
    const sprintLabels = [
        ...new Set(tasks.map((task) => `Sprint ${task.sprint}`).filter((label) => label !== "Sprint 0" && label !== "Sprint null")),
    ];
    const sprintProgressData = {
        labels: sprintLabels,
        datasets: [
            {
                label: "To Do",
                backgroundColor: "#4caf50",
                data: sprintLabels.map(
                    (label) => tasks.filter((task) => `Sprint ${task.sprint}` === label && task.status === "To Do").length
                ),
            },
            {
                label: "In Progress",
                backgroundColor: "#ff9800",
                data: sprintLabels.map(
                    (label) => tasks.filter((task) => `Sprint ${task.sprint}` === label && task.status === "In Progress").length
                ),
            },
            {
                label: "Done",
                backgroundColor: "#f44336",
                data: sprintLabels.map(
                    (label) => tasks.filter((task) => `Sprint ${task.sprint}` === label && task.status === "Done").length
                ),
            },
        ],
    };
    //2
    const taskPriorityData = {
        labels: ["High", "Medium", "Low"],
        datasets: [
            {
                data: [
                    tasks.filter((task) => task.priority === "High").length,
                    tasks.filter((task) => task.priority === "Medium").length,
                    tasks.filter((task) => task.priority === "Low").length,
                ],
                backgroundColor: ["#f44336", "#ff9800", "#4caf50"],
            },
        ],
    };

    // 3. Assignee Workload per Sprint
    const assignees = [...new Set(tasks.map((task) => task.assignee))];
    const assigneeWorkloadData = {
        labels: sprintLabels,
        datasets: assignees.map((assignee, index) => ({
            label: assignee || "Unassigned",
            data: sprintLabels.map(
                (label) =>
                    tasks.filter(
                        (task) => `Sprint ${task.sprint}` === label && task.assignee === assignee
                    ).length
            ),
            backgroundColor: `hsl(${(index * 360) / assignees.length}, 70%, 50%)`,
        })),
    };

    // 4. Burndown Chart
    const burndownData = {
        labels: [...new Set(tasks.map((task) => task.from))]
            .map((date) => new Date(date))
            .sort((a, b) => a - b) // Sort dates in ascending order
            .map((date) => date.toISOString().split("T")[0]),
        datasets: [
            {
                label: "Remaining Tasks",
                data: [...new Set(tasks.map((task) => task.from))]
                    .map((date) =>
                        tasks.filter(
                            (task) =>
                                new Date(task.from) <= new Date(date) &&
                                ["To Do", "In Progress"].includes(task.status)
                        ).length
                    ),
                borderColor: "#4caf50",
                backgroundColor: "rgba(76, 175, 80, 0.2)",
                fill: true,
                tension: 0.4,
            },
        ],
    };

    const options2 = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1,
                    precision: 0,
                },
                title: {
                    display: true,
                    text: "Remaining Tasks",
                },
            },
            x: {
                title: {
                    display: true,
                    text: "Dates",
                },
            },
        },
    };
    return (

        <div className="p-6 bg-white shadow rounded">
            <Navbar />
            <SideBar />
            <div style={{ marginLeft: '250px' }}>
                <h1 className="text-3xl font-bold text-gray-800 mb-6 mt-16">Scrum Dashboard</h1>
                {/* Gantt Chart (First Row) */}
                <div className="bg-white shadow-md rounded-lg p-4 mb-6">
                    <h2 className="text-lg font-bold mb-4">Gantt Chart</h2>
                    <div className="h-80 flex justify-center">
                        <Line data={data} options={options} />
                    </div>
                </div>

                {/* Other Charts in Grid */}
                <div className="grid grid-cols-2 gap-6">
                    {/* Sprint Progress Chart */}
                    <div className="bg-white shadow-md rounded-lg p-4">
                        <h2 className="text-lg font-bold mb-4">Sprint Progress</h2>
                        <div className="h-64">
                            <Bar data={sprintProgressData} options={{ maintainAspectRatio: false }} />
                        </div>
                    </div>

                    {/* Task Priority Distribution */}
                    <div className="bg-white shadow-md rounded-lg p-4">
                        <h2 className="text-lg font-bold mb-4">Task Priority Distribution</h2>
                        <div className="h-64">
                            <Doughnut data={taskPriorityData} options={{ maintainAspectRatio: false }} />
                        </div>
                    </div>

                    {/* Assignee Workload */}
                    <div className="bg-white shadow-md rounded-lg p-4">
                        <h2 className="text-lg font-bold mb-4">Assignee Workload</h2>
                        <div className="h-64">
                            <Bar data={assigneeWorkloadData} options={{ maintainAspectRatio: false }} />
                        </div>
                    </div>

                    {/* Burndown Chart */}
                    <div className="bg-white shadow-md rounded-lg p-4">
                        <h2 className="text-xl font-bold mb-4">Burndown Chart</h2>
                        <div className="h-80">
                            <Line data={burndownData} options={options2} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default ScrumGanttChart;
