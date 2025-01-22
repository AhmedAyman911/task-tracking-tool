import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ListKanban = () => {
    const [tableData, setTableData] = useState([]);
    const [users, setUsers] = useState([]);
    const [id, setId] = useState(null);
    useEffect(() => {
        axios
            .get("http://localhost:3001/users/team")
            .then((response) => {
                setUsers(response.data);
            })
            .catch((error) => {
                console.error("Error fetching users:", error);
            });
    }, []);
    // Fetch tasks from the backend
    useEffect(() => {
        axios
            .get("http://localhost:3001/tasks/")
            .then((response) => {
                setTableData(response.data);
            })
            .catch((error) => {
                console.error("Error fetching tasks:", error);
            });
    }, []);
    const [showForm, setShowForm] = useState(false);
    const [type, setType] = useState("");
    const [key, setKey] = useState("");
    const [summary, setSummary] = useState("");
    const [status, setStatus] = useState("To Do");
    const [assignee, setAssignee] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [testing, setTesting] = useState("");
    const [uid, setUid] = useState("");
    const handleSubmit = (e) => {
        const resetForm = () => {
            setType('');
            setKey('');
            setSummary('');
            setStatus('');
            setAssignee('');
            setDueDate('');
            setTesting('');
            setId(null); // Clear the ID
        };
        e.preventDefault();

        if (id) {
            // Update existing task
            axios
                .put(`http://localhost:3001/tasks/${id}`, {
                    type,
                    key,
                    summary,
                    status,
                    assignee,
                    uid, // Assuming `uid` is a required field
                    dueDate,
                    testing,
                })
                .then((response) => {
                    // Update the tableData with the edited task
                    setTableData((prevData) =>
                        prevData.map((task) =>
                            task.key === key ? { ...task, ...response.data } : task
                        )
                    );
                    setShowForm(false);
                    resetForm();
                })
                .catch((error) => {
                    console.error("Error updating task:", error);
                });
        } else {
            // Add new task
            axios
                .post("http://localhost:3001/tasks/", {
                    type,
                    key,
                    summary,
                    status,
                    assignee,
                    uid,
                    dueDate,
                    testing,
                })
                .then((response) => {
                    // Add the new task to tableData
                    setTableData((prevData) => [...prevData, response.data]);
                    setShowForm(false);
                    resetForm();
                })
                .catch((error) => {
                    console.error("Error adding task:", error);
                });
        }
    };

    const handleAssigneeChange = (e) => {
        const selectedId = e.target.value; // This is the _id from the dropdown
        const selectedUser = users.find((user) => user._id === selectedId);

        if (selectedUser) {
            setUid(selectedUser._id); // Save the user ID
            setAssignee(selectedUser.name); // Save the user name
        } else {
            console.error("Selected user not found in users array");
        }
    };

    const handleEdit = (task) => {
        setType(task.type);
        setKey(task.key)
        setSummary(task.summary);
        setStatus(task.status);
        setAssignee(task.assignee);
        setDueDate(task.dueDate ? new Date(task.dueDate).toISOString().split("T")[0] : "");
        setTesting(task.testing);
        setId(task._id);
        setShowForm(true);
    };
    const handleDelete = (id) => {
        axios
            .delete(`http://localhost:3001/tasks/${id}`)
            .then(() => {
                // Remove the task from tableData
                setTableData((prevData) => prevData.filter((task) => task._id !== id));
            })
            .catch((error) => {
                console.error("Error deleting task:", error);
            });
    };

    return (

        <div className="flex h-screen">
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
                </ul>
            </div>


            {/* Main Content */}
            <main className="flex-1 bg-white flex flex-col pt-16" style={{ marginLeft: '250px' }}>
                {/* Header */}

                {/* Search Bar */}
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
                            alt="Avatar 1"
                        />
                        <img
                            className="w-8 h-8 rounded-full border-2 border-white"
                            src="https://image.shutterstock.com/image-photo/young-handsome-man-beard-wearing-260nw-1768126784.jpg"
                            alt="Avatar 2"
                        />
                    </div>
                </div>
                {/* Table Section */}
                {/* Table Section */}
                <section className="p-4 flex-grow">
                    <div className="overflow-x-auto rounded-lg shadow">
                        <table className="w-full border-collapse bg-white rounded-lg">
                            <thead>
                                <tr className="bg-blue-500 text-white">
                                    <th
                                        className="p-3 text-center cursor-pointer hover:bg-blue-600 transition"
                                        onClick={() => setShowForm(true)} // Show form on click
                                        title="Add New Entry"
                                    >
                                        +
                                    </th>
                                    <th className="p-3 text-left">Type</th>
                                    <th className="p-3 text-left"># Key</th>
                                    <th className="p-3 text-left">Summary</th>
                                    <th className="p-3 text-left">Status</th>
                                    <th className="p-3 text-left">@ Assignee</th>
                                    <th className="p-3 text-left">Due Date</th>
                                    <th className="p-3 text-left">Testing</th>
                                    <th className="p-3 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableData.map((row, index) => (
                                    <tr
                                        key={index}
                                        className={`hover:bg-gray-100 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                                            }`}
                                    >
                                        <td className="p-3 text-center"></td>
                                        <td className="p-3">{row.type}</td>
                                        <td className="p-3">{row.key}</td>
                                        <td className="p-3">{row.summary}</td>
                                        <td className="p-3">{row.status}</td>
                                        <td className="p-3">{row.assignee}</td>
                                        <td className="p-3">
                                            {row.dueDate ? new Date(row.dueDate).toISOString().split("T")[0] : "N/A"}
                                        </td>
                                        <td className="p-3">{row.testing}</td>
                                        <td className="p-3 flex justify-center space-x-2">
                                            <button
                                                onClick={() => handleEdit(row)}
                                                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(row._id)}
                                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
                {/* Form Section */}
                {showForm && (
                    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-md p-6 relative">
                            {/* Close Button */}
                            <button
                                onClick={() => setShowForm(false)}
                                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                            >
                                ✖
                            </button>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <h2 className="text-lg font-bold text-gray-700">Add / Edit Task</h2>
                                <div>
                                    <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                                        Type
                                    </label>
                                    <input
                                        type="text"
                                        id="type"
                                        value={type}
                                        onChange={(e) => setType(e.target.value)}
                                        className="border rounded-md px-4 py-2 w-full"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="key" className="block text-sm font-medium text-gray-700">
                                        Key
                                    </label>
                                    <input
                                        type="text"
                                        id="key"
                                        value={key}
                                        onChange={(e) => setKey(e.target.value)}
                                        className="border rounded-md px-4 py-2 w-full"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="summary" className="block text-sm font-medium text-gray-700">
                                        Summary
                                    </label>
                                    <input
                                        type="text"
                                        id="summary"
                                        value={summary}
                                        onChange={(e) => setSummary(e.target.value)}
                                        className="border rounded-md px-4 py-2 w-full"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                                        Status
                                    </label>
                                    <select
                                        id="status"
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                        className="border rounded-md px-4 py-2 w-full"
                                    >
                                        <option value="To Do">To Do</option>
                                        <option value="In Progress">In Progress</option>
                                        <option value="Done">Done</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="assignee" className="block text-sm font-medium text-gray-700">
                                        Assignee
                                    </label>
                                    <select
                                        id="assignee"
                                        value={uid}
                                        onChange={handleAssigneeChange}
                                        className="border rounded-md px-4 py-2 w-full"
                                    >
                                        <option value="">Select a user</option>
                                        {users.map((user) => (
                                            <option key={user._id} value={user._id}>
                                                {user.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
                                        Due Date
                                    </label>
                                    <input
                                        type="date"
                                        id="dueDate"
                                        value={dueDate}
                                        onChange={(e) => setDueDate(e.target.value)}
                                        className="border rounded-md px-4 py-2 w-full"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="testing" className="block text-sm font-medium text-gray-700">
                                        Testing
                                    </label>
                                    <input
                                        type="text"
                                        id="testing"
                                        value={testing}
                                        onChange={(e) => setTesting(e.target.value)}
                                        className="border rounded-md px-4 py-2 w-full"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
                                >
                                    Save Task
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default ListKanban;
