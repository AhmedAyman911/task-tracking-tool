import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Nav";
import SideBar from "./ScrumSide";

const DevSprints = () => {
    const [sprints, setSprints] = useState([]);
    const projectId = localStorage.getItem("projectId");
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    const userName = loggedInUser?.name;

    const fetchSprints = async () => {
        if (projectId) {
            try {
                const response = await axios.get(`http://localhost:3001/sprints/tasks?projectId=${projectId}`);
                const data = response.data;

                // Group all tasks into sprints
                const groupedSprints = data.reduce((acc, task) => {
                    const sprintIndex = task.sprint - 1;
                    if (!acc[sprintIndex]) {
                        acc[sprintIndex] = { name: `Sprint ${task.sprint}`, tasks: [] };
                    }
                    acc[sprintIndex].tasks.push(task);
                    return acc;
                }, []);

                // Filter tasks for the logged-in user while keeping all sprints
                const filteredSprints = groupedSprints.map((sprint) => ({
                    ...sprint,
                    tasks: sprint.tasks.filter((task) => task.assignee === userName),
                    allTasks: sprint.tasks,
                }));

                setSprints(filteredSprints);
            } catch (error) {
                console.error("Error fetching sprints:", error);
            }
        }
    };


    useEffect(() => {
        fetchSprints();
    }, [projectId, userName]);

    const handleStatusChange = async (taskId, newStatus) => {
        try {
            await axios.put(`http://localhost:3001/sprints/tasks/${taskId}`, {
                status: newStatus,
            });
            fetchSprints(); 
        } catch (error) {
            console.error("Error updating task status:", error);
        }
    };

    return (
        <div className="bg-white h-screen">
            <Navbar />
            <SideBar />
            <div className="flex" style={{ marginTop: "100px", marginLeft: "230px" }}>
                <main className="flex-1 p-6">
                    <div className="space-y-4">
                        {sprints.map((sprint, sprintIndex) => (
                            <div
                                key={sprintIndex}
                                className="bg-white shadow-lg rounded-lg p-6 space-y-6 w-4/5 mx-auto border border-gray-300"
                            >
                                {/* Sprint Header */}
                                <div className="flex justify-between items-center border-b pb-4">
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-800">
                                            {sprint?.name || `Sprint ${sprintIndex + 1}`}
                                        </h2>
                                        <p className="text-sm text-gray-600 mt-2">
                                            {sprint?.allTasks && sprint.allTasks.length > 0 ? (
                                                <>
                                                    <strong>Start Date:</strong>{" "}
                                                    {new Date(
                                                        Math.min(
                                                            ...sprint.allTasks.map((task) =>
                                                                new Date(task.from).getTime()
                                                            )
                                                        )
                                                    ).toLocaleDateString()}
                                                    {" - "}
                                                    <strong>End Date:</strong>{" "}
                                                    {new Date(
                                                        Math.max(
                                                            ...sprint.allTasks.map((task) =>
                                                                new Date(task.to).getTime()
                                                            )
                                                        )
                                                    ).toLocaleDateString()}
                                                </>
                                            ) : (
                                                "Sprint Duration: Not Available"
                                            )}
                                        </p>
                                    </div>
                                </div>
                                {/* Display Tasks in the Sprint */}
                                {sprint?.tasks && sprint.tasks.length > 0 ? (
                                    sprint.tasks.map((task, taskIndex) => (
                                        <div
                                            key={taskIndex}
                                            className="space-y-2"
                                        >
                                            <div className="flex justify-between items-center p-4 border-b border-gray-300 bg-gray-100 rounded-lg hover:shadow-md transition-shadow duration-200">
                                                <div className="space-y-2">
                                                    <p>
                                                        <strong>Task Name:</strong>{" "}
                                                        {task.task_name || "No Task Name"}
                                                    </p>
                                                    <p>
                                                        <strong>Description:</strong>{" "}
                                                        {task.description || "No Description Available"}
                                                    </p>
                                                    <p>
                                                        <strong>Role:</strong> {task.role || "No Role"}
                                                    </p>
                                                    <p>
                                                        <strong>Due:</strong>{" "}
                                                        {task.to
                                                            ? new Date(task.to).toLocaleDateString()
                                                            : "Not Set"}
                                                    </p>
                                                    <p>
                                                        <strong>Priority:</strong>{" "}
                                                        <span
                                                            className={`${{
                                                                High: "text-red-500 font-bold",
                                                                Medium: "text-yellow-500 font-bold",
                                                                Low: "text-green-500 font-bold",
                                                                Default: "text-gray-500",
                                                            }[task.priority || "Default"]}`}
                                                        >
                                                            {task.priority || "Not Set Yet"}
                                                        </span>
                                                    </p>
                                                    <p>
                                                        <strong>Status:</strong>{" "}
                                                        <span
                                                            className={`${{
                                                                Done: "text-green-500 font-bold",
                                                                "In Progress": "text-yellow-500 font-bold",
                                                                "To Do": "text-red-500 font-bold",
                                                                Default: "text-gray-500",
                                                            }[task.status || "Default"]}`}
                                                        >
                                                            {task.status || "Not Set"}
                                                        </span>
                                                    </p>
                                                    {/* Status Dropdown */}
                                                    <div className="mt-2">
                                                        <select
                                                            value={task.status}
                                                            onChange={(e) =>
                                                                handleStatusChange(task._id, e.target.value)
                                                            }
                                                            className="border rounded p-1"
                                                        >
                                                            <option value="To Do">To Do</option>
                                                            <option value="In Progress">In Progress</option>
                                                            <option value="Done">Done</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-600">
                                        No tasks assigned to you in this sprint.
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );

};

export default DevSprints;
