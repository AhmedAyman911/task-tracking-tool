import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import Navbar from "./Nav";
import SideBar from "./ScrumSide";
const ScrumTimeline = () => {
  const [sprints, setSprints] = useState([]);
  const projectId = localStorage.getItem("projectId");
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(""); 
  const [showDropdown, setShowDropdown] = useState(null);
  const availableTasks = tasks.filter(
    (task) => !task.sprint && task.projectId === projectId
  );
  const [showModal, setShowModal] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const openEditModal = (task) => {
    setCurrentTask(task); 
    setShowModal(true); 
  };
  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:3001/sprints/tasks");
      setTasks(response.data);
      availableTasks;
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);


  const fetchSprints = async () => {
    const storedProjectId = localStorage.getItem("projectId");
    if (storedProjectId) {
      try {
        const response = await axios.get(`http://localhost:3001/sprints/tasks?projectId=${storedProjectId}`);
        const data = response.data;

        const groupedSprints = data.reduce((acc, task) => {
          const sprintIndex = task.sprint - 1;
          if (!acc[sprintIndex]) {
            acc[sprintIndex] = { name: `Sprint ${task.sprint}`, tasks: [] };
          }
          acc[sprintIndex].tasks.push(task);
          return acc;
        }, []);

        setSprints(groupedSprints);
      } catch (error) {
        console.error("Error fetching sprints:", error);
      }
    }
  };

  useEffect(() => {
    fetchSprints();
  }, []);

  const addSprint = () => {
    const newSprint = {
      name: `Sprint ${sprints.length + 1}`,
      tasks: [],
    };
    setSprints((prevSprints) => [...prevSprints, newSprint]);
  };

  const addTaskToSprint = async (sprintIndex) => {
    if (!selectedTask) {
      alert("Please select a task to add!");
      return;
    }

    // Get the selected sprint's number
    const sprintNumber = sprintIndex + 1;

    try {
      // Update the task's sprint attribute in the backend
      await axios.put(`http://localhost:3001/sprints/tasks/${selectedTask}`, {
        sprint: sprintNumber,
      });

      // Update the UI: add the task to the sprint and re-fetch tasks
      setSprints((prevSprints) =>
        prevSprints.map((sprint, index) =>
          index === sprintIndex
            ? {
              ...sprint,
              tasks: [...sprint.tasks, tasks.find((task) => task._id === selectedTask)],
            }
            : sprint
        )
      );

      // Reset dropdown
      setSelectedTask("");
      setShowDropdown(null);
      fetchSprints();
      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const [users, setUsers] = useState([]);
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
  /*
    const saveTask = async (sprintIndex, taskIndex) => {
      const task = sprints[sprintIndex].tasks[taskIndex];
  
      if (!task.name || !task.role || !task.from || !task.to) {
        alert("Please fill out all fields before saving.");
        return;
      }
  
      try {
        const response = await axios.post("http://localhost:3001/sprints/", {
          sprint: sprintIndex + 1,
          task_name: task.name,
          role: task.role,
          from: task.from.toISOString(),
          to: task.to.toISOString(),
          projectId: projectId
        });
  
        if (response.status === 201) {
          fetchSprints(); // Refresh data after saving
          alert("Task saved successfully!");
        }
      } catch (error) {
        console.error("Error saving task:", error.response || error.message);
        alert("Failed to save task. Please try again later.");
      }
    };
    const deleteTask = async (sprintIndex, taskIndex, taskID) => {
      const task = sprints[sprintIndex].tasks[taskIndex];
  
      if (!task.isNew) {
        try {
          await axios.delete(`http://localhost:3001/api/sprints/delete/${taskID}`);
          fetchSprints();
        } catch (error) {
          console.error("Error deleting task:", error);
          alert("Failed to delete task. Please try again later.");
        }
      } else {
        const updatedSprints = [...sprints];
        updatedSprints[sprintIndex].tasks.splice(taskIndex, 1);
        setSprints(updatedSprints);
      }
    };
    const deleteSprint = async (sprintIndex) => {
      const sprint = sprints[sprintIndex];
  
      try {
        await axios.delete(`http://localhost:3001/api/sprints/deleteSprint/${sprint.name}`);
        fetchSprints();
      } catch (error) {
        console.error("Error deleting sprint:", error);
        alert("Failed to delete sprint. Please try again later.");
      }
    };*/
  const resetSprintTask = async (taskId) => {
    try {
      axios.put(`http://localhost:3001/sprints/tasks/${taskId}`, {
        sprint: 0,
      });
      fetchSprints();
      fetchTasks();
    } catch (error) {
      console.error("Error resetting sprint:", error);
    }
  };
  const handleEditTask = async (taskId) => {
    try {
      await axios.put(
        `http://localhost:3001/sprints/tasks/${taskId}`,
        currentTask
      );
      setShowModal(false);
      fetchSprints();
      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
      alert("Failed to update task. Please try again.");
    }
  };

  return (
    <div className="bg-white h-screen">
      <Navbar/>
      <SideBar/>
      <div className="flex" style={{ marginTop: '100px', marginLeft: '230px' }}>
        <main className="flex-1 p-6">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold mb-6">Sprints</h1>
            <button
              onClick={addSprint}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              <FontAwesomeIcon icon={faPlus} /> Add Sprint
            </button>
          </div>

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
                    {sprint?.tasks && sprint.tasks.length > 0 && (
                      <p className="text-sm text-gray-600 mt-2">
                        <strong>Start Date:</strong>{" "}
                        {new Date(
                          Math.min(...sprint.tasks.map((task) => new Date(task.from).getTime()))
                        ).toLocaleDateString()}
                        {" - "}
                        <strong>End Date:</strong>{" "}
                        {new Date(
                          Math.max(...sprint.tasks.map((task) => new Date(task.to).getTime()))
                        ).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  <div>
                    <button
                      onClick={() =>
                        setShowDropdown(showDropdown === sprintIndex ? null : sprintIndex)
                      }
                      className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 transition ease-in-out"
                    >
                      <FontAwesomeIcon icon={faPlus} /> Add Task
                    </button>
                  </div>
                </div>
                {/* Task Dropdown */}
                {showDropdown === sprintIndex && (
                  <div className="mt-4">
                    <select
                      value={selectedTask}
                      onChange={(e) => setSelectedTask(e.target.value)}
                      className="p-2 border rounded w-full"
                    >
                      <option value="">Select a Task</option>
                      {availableTasks.map((task) => (
                        <option key={task._id} value={task._id}>
                          {task.task_name}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => addTaskToSprint(sprintIndex)}
                      className="bg-green-500 text-white px-4 py-2 rounded mt-2 hover:bg-green-700"
                    >
                      Add Task to Sprint
                    </button>
                  </div>
                )}
                {showModal && currentTask && (
                  <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded shadow-lg w-1/2">
                      <h2 className="text-xl font-bold mb-4">Edit Task</h2>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleEditTask(currentTask._id);
                        }}
                      >
                        <div className="mb-4">
                          <label className="block text-gray-700">Task Name</label>
                          <input
                            type="text"
                            value={currentTask.task_name}
                            onChange={(e) =>
                              setCurrentTask({ ...currentTask, task_name: e.target.value })
                            }
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div className="mb-4">
                          <label className="block text-gray-700">Description</label>
                          <textarea
                            value={currentTask.description}
                            onChange={(e) =>
                              setCurrentTask({ ...currentTask, description: e.target.value })
                            }
                            className="w-full p-2 border rounded"
                          ></textarea>
                        </div>
                        <div className="mb-4">
                          <label className="block text-gray-700">Priority</label>
                          <select
                            value={currentTask.priority}
                            onChange={(e) =>
                              setCurrentTask({ ...currentTask, priority: e.target.value })
                            }
                            className="w-full p-2 border rounded"
                          >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                          </select>
                        </div>
                        <div className="mb-4">
                          <label className="block text-gray-700">Sprint</label>
                          <input
                            type="number"
                            value={currentTask.sprint || ""}
                            onChange={(e) =>
                              setCurrentTask({ ...currentTask, sprint: e.target.value })
                            }
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700">Role</label>
                          <select
                            name="role"
                            value={currentTask.role || ""}
                            onChange={(e) =>
                              setCurrentTask({ ...currentTask, role: e.target.value })
                            }
                            className="w-full border rounded p-2"
                            required
                          >
                            <option value="">Select Role</option>
                            <option value="Frontend Developer">Frontend Developer</option>
                            <option value="Backend Developer">Backend Developer</option>
                            <option value="Tester">Tester</option>
                            <option value="UI/UX Designer">UI/UX Designer</option>
                          </select>
                        </div>
                        <div className="mb-4">
                          <label className="block text-gray-700">Assignee</label>
                          <select
                            value={currentTask.assignee || ""}
                            onChange={(e) =>
                              setCurrentTask({ ...currentTask, assignee: e.target.value })
                            }
                            className="w-full p-2 border rounded"
                          >
                            <option value="">Select Assignee</option>
                            {users.map((user) => (
                              <option key={user._id} value={user.name}>
                                {user.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="flex justify-end">
                          <button
                            type="button"
                            onClick={() => setShowModal(false)}
                            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                          >
                            Save Changes
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}


                {/* Display Tasks in the Sprint */}
                {sprint?.tasks && sprint.tasks.length > 0 ? (
                  sprint.tasks.map((task, taskIndex) => (
                    <div key={taskIndex} className="space-y-2">
                      <div className="flex justify-between items-center p-4 border-b border-gray-300 bg-gray-100 rounded-lg hover:shadow-md transition-shadow duration-200">
                        <div className="space-y-2">
                          <p>
                            <strong>Task Name:</strong> {task.task_name || "No Task Name"}
                          </p>
                          <p>
                            <strong>Description:</strong>{" "}
                            {task.description || "No Description Available"}
                          </p>
                          <p>
                            <strong>Role:</strong> {task.role || "No Role"}
                          </p>
                          <p>
                            <strong>Assignee:</strong>{" "}
                            {task.assignee || "Not Assigned Yet"}
                          </p>
                          <p>
                            <strong>From:</strong>{" "}
                            {task.from ? new Date(task.from).toLocaleDateString() : "Not Set"}
                          </p>
                          <p>
                            <strong>To:</strong>{" "}
                            {task.to ? new Date(task.to).toLocaleDateString() : "Not Set"}
                          </p>
                          <p>
                            <strong>Priority:</strong>{" "}
                            <span
                              className={`${{
                                High: "text-red-500 font-bold",
                                Medium: "text-yellow-500 font-bold",
                                Low: "text-green-500 font-bold",
                                Default: "text-gray-500",
                              }[task.priority || "Default"]
                                }`}
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
                              }[task.status || "Default"]
                                }`}
                            >
                              {task.status || "Not Set"}
                            </span>
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => resetSprintTask(task._id)}
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition-all duration-200"
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                          <button
                            onClick={() => openEditModal(task)}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition-all duration-200"
                          >
                            <FontAwesomeIcon icon={faPen} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600">No tasks added yet.</p>
                )}

              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ScrumTimeline;
