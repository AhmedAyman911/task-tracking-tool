import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import timelineImage from "../assets/timeline.jpg";
import backlogImage from "../assets/backlog.jpg";
import codeImage from "../assets/code.jpg";
import spmImage from "../assets/spm.jpg";
import { Link } from "react-router-dom";


const ScrumTimeline = () => {
  const [sprints, setSprints] = useState([]);
  const projectId = localStorage.getItem("projectId");

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

  const addTaskFields = (sprintIndex) => {
    setSprints((prevSprints) =>
      prevSprints.map((sprint, index) =>
        index === sprintIndex
          ? {
            ...sprint,
            tasks: [
              ...sprint.tasks,
              { role: "", name: "", from: null, to: null, isNew: true },
            ],
          }
          : sprint
      )
    );
  };

  const handleTaskChange = (sprintIndex, taskIndex, key, value) => {
    setSprints((prevSprints) =>
      prevSprints.map((sprint, sIndex) =>
        sIndex === sprintIndex
          ? {
            ...sprint,
            tasks: sprint.tasks.map((task, tIndex) =>
              tIndex === taskIndex ? { ...task, [key]: value } : task
            ),
          }
          : sprint
      )
    );
  };

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
  };

  return (
    <div className="bg-white h-screen">
      <nav className="navbar">
        <div className="navbar-brand">Workio</div>
        <div className="navbar-links">
          <a href="#">Your work</a>
          <a href="/choose">Projects</a>
          <a href="#">Filters</a>
          <a href="#">Dashboards</a>
          <a href="#">Teams</a>
          <a href="#">Plan</a>
          <a href="#">Apps</a>
        </div>
        <div className="navbar-actions">
          <span className="notification-icon">🔔</span>
        </div>
      </nav>

      <div className="flex" style={{ marginTop: '100px', marginLeft: '230px' }}>
        <div className="sidebar">
          <h2>Workio</h2>
          <ul>
            <li>
              <Link to="/backlog">
                <img src="client/src/assets/backlog.png" alt="Board Icon" className="sidebar-icon" /> Backlog
              </Link>
            </li>
            <li>
              <Link to="/scrumtime">
                <img src="client/src/assets/timeline.jpg" alt="Board Icon" className="sidebar-icon" /> Timeline
              </Link>
            </li>


          </ul>
        </div>

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
                className="bg-gray-200 shadow rounded p-4 space-y-4 w-3/4 mx-auto"
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">{sprint?.name || `Sprint ${sprintIndex + 1}`}</h2>
                  <div>
                    <button
                      onClick={() => addTaskFields(sprintIndex)}
                      className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 mr-2"
                    >
                      <FontAwesomeIcon icon={faPlus} /> Add Task
                    </button>
                  </div>
                </div>

                {sprint?.tasks && sprint.tasks.length > 0 ? (
                  sprint.tasks.map((task, taskIndex) => (
                    <div key={taskIndex} className="space-y-2">
                      {task.isNew ? (
                        <div>
                          <div className="flex space-x-2">
                            <select
                              value={task.role}
                              onChange={(e) =>
                                handleTaskChange(sprintIndex, taskIndex, "role", e.target.value)
                              }
                              className="p-2 border rounded w-1/4"
                            >
                              <option value="">Select Role</option>
                              <option value="Frontend Developer">Frontend Developer</option>
                              <option value="Backend Developer">Backend Developer</option>
                              <option value="Tester">Tester</option>
                              <option value="UI/UX Designer">UI/UX Designer</option>
                            </select>
                            <input
                              type="text"
                              value={task.name || ""}
                              onChange={(e) =>
                                handleTaskChange(sprintIndex, taskIndex, "name", e.target.value)
                              }
                              className="w-2/4 p-2 border rounded"
                              placeholder="Task name..."
                            />
                          </div>
                          <div className="flex space-x-4">
                            <DatePicker
                              selected={task.from || null}
                              onChange={(date) =>
                                handleTaskChange(sprintIndex, taskIndex, "from", date)
                              }
                              className="w-full p-2 border rounded"
                              placeholderText="From"
                            />
                            <DatePicker
                              selected={task.to || null}
                              onChange={(date) =>
                                handleTaskChange(sprintIndex, taskIndex, "to", date)
                              }
                              className="w-full p-2 border rounded"
                              placeholderText="To"
                            />
                          </div>
                          <button
                            onClick={() => saveTask(sprintIndex, taskIndex)}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                          >
                            Save
                          </button>
                        </div>
                      ) : (
                        <div className="flex justify-between items-center p-2 border-b border-gray-400">
                          <div>
                            <p><strong>Task Name:</strong> {task.task_name || "No Task Name"}</p>
                            <p><strong>Role:</strong> {task.role || "No Role"}</p>
                            <p><strong>From:</strong> {task.from ? new Date(task.from).toLocaleDateString() : "Not Set"}</p>
                            <p><strong>To:</strong> {task.to ? new Date(task.to).toLocaleDateString() : "Not Set"}</p>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => deleteTask(sprintIndex, taskIndex, task._id)}
                              className="bg-red-500 text-white p-2 rounded hover:bg-red-700"
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                          </div>
                        </div>
                      )}
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
