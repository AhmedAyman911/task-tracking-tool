import { useState } from 'react';
const ListKanban = () => {
    const [tableData, setTableData] = useState([
        {
            type: "Task",
            key: "SPM-001",
            summary: "Set up project structure",
            status: "In Progress",
            assignee: "John Doe",
            dueDate: "2024-12-30",
            labels: "High Priority",
        },
        {
            type: "Bug",
            key: "SPM-002",
            summary: "Fix login issue",
            status: "To Do",
            assignee: "Jane Smith",
            dueDate: "2024-12-25",
            labels: "Critical",
        },
    ]);
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
                                    onClick={() => {
                                        console.log("Add New Entry Clicked");
                                        // Add your functionality here
                                    }}
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
                                <th className="border px-4 py-2">Labels</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.length > 0 ? (
                                tableData.map((row, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="border px-4 py-2">{row.type}</td>
                                        <td className="border px-4 py-2">{row.key}</td>
                                        <td className="border px-4 py-2">{row.summary}</td>
                                        <td className="border px-4 py-2">{row.status}</td>
                                        <td className="border px-4 py-2">{row.assignee}</td>
                                        <td className="border px-4 py-2">{row.dueDate}</td>
                                        <td className="border px-4 py-2">{row.labels}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                <td colSpan="7" className="text-center py-20">
                                    <div className="flex flex-col items-center">
                                        <img
                                            src="https://as2.ftcdn.net/v2/jpg/03/76/41/01/1000_F_376410119_inQNd5QwQVW9SxL8vOinPJG10avzR200.jpg"
                                            alt="Calendar Icon"
                                            className="w-64 mb-4"
                                        />
                                        <h2 className="text-lg font-bold text-gray-600">
                                            View your work in a list
                                        </h2>
                                        <p className="text-gray-500 text-center mt-2">
                                            Manage and sort all your project’s work
                                            into a single list that can be easily
                                            scanned and sorted by category.
                                        </p>
                                        <button className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600">
                                            Create issue
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            )}
                        </tbody>
                    </table>
                </section>
            </main>
        </div>
    );
};

export default ListKanban;
