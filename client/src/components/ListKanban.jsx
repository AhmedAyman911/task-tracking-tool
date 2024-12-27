import { useState, useEffect } from "react";
import axios from "axios";

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
            {/* Sidebar */}
            <aside className="w-1/5 bg-gray-100 p-4">
                <h1 className="text-xl font-bold mb-6">Workio</h1>
                <div className="mb-6">
                    <h2 className="text-sm font-semibold text-gray-600">PLANNING</h2>
                    <ul className="mt-2">
                        <li className="py-2 px-2 hover:bg-blue-100 rounded-lg">
                            Getting started
                        </li>
                        <li className="py-2 px-2 hover:bg-blue-100 rounded-lg">Timeline</li>
                        <li className="py-2 px-2 hover:bg-blue-100 rounded-lg">Board</li>
                        <li className="py-2 px-2 bg-blue-500 text-white rounded-lg">
                            List
                        </li>
                        <li className="py-2 px-2 hover:bg-blue-100 rounded-lg">Goals</li>
                    </ul>
                </div>
                <div>
                    <h2 className="text-sm font-semibold text-gray-600">DEVELOPMENT</h2>
                    <ul className="mt-2">
                        <li className="py-2 px-2 hover:bg-blue-100 rounded-lg">Code</li>
                    </ul>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 bg-white flex flex-col">
                {/* Header */}
                <header className="bg-blue-100 p-4 flex justify-between items-center">
                    <h1 className="text-lg font-bold">List</h1>
                    <div className="flex gap-4 items-center">
                        <button className="hover:text-blue-600">Share</button>
                        <button className="hover:text-blue-600">Filter</button>
                        <button className="hover:text-blue-600">Format</button>
                        <button className="hover:text-blue-600">Chart</button>
                    </div>
                </header>
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
                <section className="p-4 flex-grow flex flex-col">
                    <table className="w-full border-collapse bg-gray-50 rounded-lg overflow-hidden">
                        <thead>
                            <tr className="bg-gray-100">
                                <th
                                    className="border bg-blue-500 text-white text-center cursor-pointer hover:bg-blue-600"
                                    onClick={() => setShowForm(true)} // Show form on click
                                    title="Add New Entry"
                                >
                                    +
                                </th>
                                <th className="border px-4 py-2">Type</th>
                                <th className="border px-4 py-2"># Key</th>
                                <th className="border px-4 py-2">Summary</th>
                                <th className="border px-4 py-2">Status</th>
                                <th className="border px-4 py-2">@ Assignee</th>
                                <th className="border px-4 py-2">Due Date</th>
                                <th className="border px-4 py-2">Testing</th>
                                <th className="border px-4 py-2">Actions</th> {/* New column for actions */}
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((row, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="border px-4 py-2"></td>
                                    <td className="border px-4 py-2">{row.type}</td>
                                    <td className="border px-4 py-2">{row.key}</td>
                                    <td className="border px-4 py-2">{row.summary}</td>
                                    <td className="border px-4 py-2">{row.status}</td>
                                    <td className="border px-4 py-2">{row.assignee}</td>
                                    <td className="border px-4 py-2">{row.dueDate ? new Date(row.dueDate).toISOString().split("T")[0] : "N/A"}</td>
                                    <td className="border px-4 py-2">{row.testing}</td>
                                    <td className="border px-4 py-2 flex space-x-2 justify-center">
                                        <button
                                            onClick={() => handleEdit(row)}
                                            className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 transition"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(row._id)}
                                            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>


                {/* Form Section */}
                {showForm && (
                    <div className="p-4 bg-gray-100">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
                                <input
                                    type="text"
                                    id="type"
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                    className="border rounded-md px-4 py-2 w-full"
                                />
                            </div>
                            <div>
                                <label htmlFor="key" className="block text-sm font-medium text-gray-700">Key</label>
                                <input
                                    type="text"
                                    id="key"
                                    value={key}
                                    onChange={(e) => setKey(e.target.value)}
                                    className="border rounded-md px-4 py-2 w-full"
                                />
                            </div>
                            <div>
                                <label htmlFor="summary" className="block text-sm font-medium text-gray-700">Summary</label>
                                <input
                                    type="text"
                                    id="summary"
                                    value={summary}
                                    onChange={(e) => setSummary(e.target.value)}
                                    className="border rounded-md px-4 py-2 w-full"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
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
                                <label htmlFor="assignee" className="block text-sm font-medium text-gray-700">Assignee</label>
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
                                <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">Due Date</label>
                                <input
                                    type="date"
                                    id="dueDate"
                                    value={dueDate}
                                    onChange={(e) => setDueDate(e.target.value)}
                                    className="border rounded-md px-4 py-2 w-full"
                                />
                            </div>
                            <div>
                                <label htmlFor="testing" className="block text-sm font-medium text-gray-700">Testing</label>
                                <input
                                    type="text"
                                    id="testing"
                                    value={testing}
                                    onChange={(e) => setTesting(e.target.value)}
                                    className="border rounded-md px-4 py-2 w-full"
                                />
                            </div>
                            <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-md">
                                Add Task
                            </button>
                        </form>
                    </div>
                )}
            </main>
        </div>
    );
};

export default ListKanban;
