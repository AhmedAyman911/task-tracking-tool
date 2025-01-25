import { useState, useEffect } from "react";
import searchImage from "../assets/search.jpg";
import axios from "axios";
import Navbar from "./Nav";
import Sidebar from "./KanbanSide";
const KanbanBoard = () => {

    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    const userUid = loggedInUser ? loggedInUser.id : null;
    const [alltasks, setAllTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const storedProjectId = localStorage.getItem("projectId");
    useEffect(() => {

        const fetchUserTasks = async () => {
            if (storedProjectId && userUid) {
                try {
                    const response = await axios.get(`http://localhost:3001/tasks?projectId=${storedProjectId}`);
                    // Filter tasks for the logged-in user
                    const userTasks = response.data.filter((task) => task.uid === userUid);
                    setAllTasks(userTasks);
                } catch (error) {
                    console.error("Error fetching tasks:", error);
                    setError("Failed to fetch tasks. Please try again later.");
                } finally {
                    setIsLoading(false);
                }
            } else {
                setError("Missing projectId or userUid.");
                setIsLoading(false);
            }
        };

        fetchUserTasks();
    }, [storedProjectId, userUid]);

    // Filter tasks based on status
    const filterTasksByStatus = (status) => {
        return alltasks.filter((task) => task.status === status);
    };

    if (isLoading) return <div>Loading tasks...</div>;
    if (error) return <div>{error}</div>;

    const handleStatusChange = async (taskId, newStatus) => {
        try {
            const updatedTask = { status: newStatus };

            // Automatically set completedDate if the new status is "Done"
            if (newStatus === "Done") {
                updatedTask.completedDate = new Date();
            } else {
                // Remove completedDate if status is changed from "Done"
                updatedTask.completedDate = null;
            }

            await axios.put(`http://localhost:3001/tasks/${taskId}`, updatedTask);

            // Update tasks in state
            setAllTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task._id === taskId ? { ...task, ...updatedTask } : task
                )
            );
        } catch (error) {
            console.error("Error updating task status:", error);
            alert("Failed to update task status.");
        }
    };
    return (
        <div className="bg-white h-screen">
            {/* Header */}
            <Navbar/>
            <Sidebar/>
            <div className="flex mt-16" style={{ marginLeft: '240px' }}>
                {/* Main Content */}
                <main className="flex-1 p-6">
                    {/* Kanban Header */}
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-xl font-bold">Kanban Board</h1>
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
                        {/* Status Columns */}
                        {["To Do", "In Progress", "Done"].map((status) => (
                            <div key={status} className="bg-gray-200 shadow rounded p-4 h-auto">
                                <h2 className="text-lg font-semibold">{status}</h2>
                                <div className="mt-4 space-y-2">
                                    {filterTasksByStatus(status).map((task) => (
                                        <div
                                            key={task._id}
                                            className="bg-white p-2 rounded shadow hover:bg-blue-100 hover:shadow-lg transition-all duration-200"
                                        >
                                            <h3 className="font-medium">{task.key}</h3>
                                            <p className="text-sm text-gray-600">{task.summary}</p>
                                            <p className="text-sm text-gray-600">Assignee: {task.assignee}</p>
                                            <p className="text-sm text-gray-600">
                                                Due:{" "}
                                                {task.dueDate
                                                    ? new Date(task.dueDate).toLocaleDateString()
                                                    : "No due date"}
                                            </p>
                                            {task.status === "Done" && task.completedDate && (
                                                <p className="text-sm text-gray-600">
                                                    Completed: {new Date(task.completedDate).toLocaleDateString()}
                                                </p>
                                            )}
                                            <div className="mt-2">
                                                <select
                                                    value={task.status}
                                                    onChange={(e) => handleStatusChange(task._id, e.target.value)}
                                                    className="border rounded p-1"
                                                >
                                                    <option value="To Do">To Do</option>
                                                    <option value="In Progress">In Progress</option>
                                                    <option value="Done">Done</option>
                                                </select>
                                            </div>
                                        </div>

                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default KanbanBoard;
