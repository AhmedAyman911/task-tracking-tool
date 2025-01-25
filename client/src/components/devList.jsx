import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Nav";
import SideBar from "./KanbanSide";

const DevList = () => {
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

    return (
        <div className="flex h-screen">
            <Navbar />
            <SideBar />
            <main className="flex-1 bg-white flex flex-col pt-16" style={{ marginLeft: "250px" }}>
                {/* Header */}
                <div className="p-4 flex items-center">
                    <input
                        type="text"
                        placeholder="Search"
                        className="border rounded-md px-4 py-2 w-1/3 mr-5"
                    />
                    <div className="flex -space-x-2">
                        <img
                            className="w-8 h-8 rounded-full border-2 border-white"
                            src="https://static.vecteezy.com/system/resources/thumbnails/026/497/734/small_2x/businessman-on-isolated-png.png"
                            alt="Avatar"
                        />
                    </div>
                </div>

                {/* Task Table */}
                <section className="p-4 flex-grow">
                    {isLoading ? (
                        <p className="text-gray-500">Loading tasks...</p>
                    ) : error ? (
                        <p className="text-red-500">{error}</p>
                    ) : alltasks.length > 0 ? (
                        <div className="overflow-x-auto rounded-lg shadow ">
                            <table className="w-full border-collapse bg-white rounded-lg">
                                <thead>
                                    <tr className="bg-blue-500 text-white">
                                        <th className="p-3 text-left">Title</th>
                                        <th className="p-3 text-left"># Key</th>
                                        <th className="p-3 text-left">Summary</th>
                                        <th className="p-3 text-left">Status</th>
                                        <th className="p-3 text-left">Due Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {alltasks.map((row, index) => (
                                        <tr
                                            key={index}
                                            className={`hover:bg-gray-100 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                                                }`}
                                        >
                                            <td className="p-3">{row.type}</td>
                                            <td className="p-3">{row.key}</td>
                                            <td className="p-3">{row.summary}</td>
                                            <td className="p-3">{row.status}</td>
                                            <td className="p-3">
                                                {row.dueDate ? new Date(row.dueDate).toISOString().split("T")[0] : "N/A"}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-gray-500">No tasks found for you in this project.</p>
                    )}
                </section>
            </main>
        </div>
    );
};

export default DevList;
