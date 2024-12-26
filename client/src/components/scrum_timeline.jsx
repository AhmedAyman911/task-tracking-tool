import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import timelineImage from "../assets/timeline.jpg";
import backlogImage from "../assets/backlog.jpg";
import codeImage from "../assets/code.jpg";
import spmImage from "../assets/spm.jpg";

const ScrumTimeline = () => {
  const [sprints, setSprints] = useState([]);

  // Fetch tasks from the backend
  const fetchSprints = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/sprints/tasks");
      const data = response.data;

      // Group tasks by sprint number
      const groupedSprints = data.reduce((acc, task) => {
        const sprintIndex = task.sprint - 1; // Sprint number starts from 1
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
  };

  useEffect(() => {
    fetchSprints();
  }, []);

  const addSprint = () => {
    const newSprint = {
      name: `Sprint ${sprints.length + 1}`,
      tasks: [{ role: "", name: "", from: null, to: null, isNew: true }],
    };
    setSprints([...sprints, newSprint]);
  };

  const addTaskFields = (sprintIndex) => {
    const updatedSprints = [...sprints];
    updatedSprints[sprintIndex].tasks.push({
      role: "",
      name: "",
      from: null,
      to: null,
      isNew: true,
    });
    setSprints(updatedSprints);
  };

  const handleTaskChange = (sprintIndex, taskIndex, key, value) => {
    const updatedSprints = [...sprints];
    updatedSprints[sprintIndex].tasks[taskIndex][key] = value;
    setSprints(updatedSprints);
  };

  const saveTask = async (sprintIndex, taskIndex) => {
    const task = sprints[sprintIndex].tasks[taskIndex];

    if (!task.name || !task.role || !task.from || !task.to) {
      alert("Please fill out all fields before saving.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/api/sprints/add", {
        sprint: sprintIndex + 1,
        task_name: task.name,
        role: task.role,
        from: task.from.toISOString(),
        to: task.to.toISOString(),
      });

      if (response.status === 201) {
        fetchSprints(); // Refresh data after saving
        //alert("Task saved successfully!");
      }
    } catch (error) {
      console.error("Error saving task:", error.response || error.message);
      alert("Failed to save task. Please try again later.");
    }
  };

  return (
    <div className="bg-white h-screen">
      {/* Header */}
      <header className="bg-blue-200 p-4 flex justify-between items-center">
        <div>
          <h1 className="text-lg font-bold text-2xl">Workio</h1>
        </div>
        <div>
          <nav className="space-x-10 text-xl">
            <a href="#" className="text-gray-900 hover:text-gray-900 font-semibold">
              Create New Project
            </a>
          </nav>
        </div>
        <div className="flex items-center space-x-4 text-xl">
          <button className="text-gray-600">🔔</button>
          <button className="text-gray-900">Login/Signup</button>
        </div>
      </header>

      {/* Sidebar + Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-1/5 bg-white p-4 space-y-6 border-gray-300 rounded border-2 h-full">
          <div>
            <h2 className="text-xl font-semibold block p-2 flex items-center"> <img src={spmImage} alt="SPM" className="w-7 h-7 mr-2" /> SPM</h2>
            <p className="text-base text-gray-700 ">Software project</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium text-gray-900">PLANNING</h3>
            <nav className="space-y-1">
              <a href="#" className="block p-2 rounded bg-gray-200 text-base flex items-center">
                <img src={timelineImage} alt="Timeline" className="w-7 h-7 mr-2" />
                Timeline
              </a>
              <a href="#" className="block p-2 rounded hover:bg-blue-200 text-base flex items-center">
                <img src={backlogImage} alt="Backlog" className="w-7 h-7 mr-2" />
                Backlog
              </a>
            </nav>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium text-gray-900">DEVELOPMENT</h3>
            <a href="#" className="block p-2 rounded hover:bg-blue-200 text-base flex items-center">
              <img src={codeImage} alt="Code" className="w-7 h-7 mr-2" />
              Code
            </a>
          </div>
        </aside>

        {/* Main Content */}
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
              <div key={sprintIndex} className="bg-gray-200 shadow rounded p-4 space-y-4 w-3/4 mx-auto">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">{sprint.name}</h2>
                  <button
                    onClick={() => addTaskFields(sprintIndex)}
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
                  >
                    <FontAwesomeIcon icon={faPlus} /> Add Task
                  </button>
                </div>

                {sprint.tasks.map((task, taskIndex) =>
                  task.isNew ? (
                    <div key={taskIndex} className="space-y-2">
                      <div className="flex space-x-2">
                        <select
                          value={task.role}
                          onChange={(e) => handleTaskChange(sprintIndex, taskIndex, "role", e.target.value)}
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
                          value={task.name}
                          onChange={(e) => handleTaskChange(sprintIndex, taskIndex, "name", e.target.value)}
                          className="w-2/4 p-2 border rounded"
                          placeholder="Task name..."
                        />
                      </div>
                      <div className="flex space-x-4">
                        <DatePicker
                          selected={task.from}
                          onChange={(date) => handleTaskChange(sprintIndex, taskIndex, "from", date)}
                          className="w-full p-2 border rounded"
                          placeholderText="From"
                        />
                        <DatePicker
                          selected={task.to}
                          onChange={(date) => handleTaskChange(sprintIndex, taskIndex, "to", date)}
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
                    <div key={taskIndex} className="p-2 border-b border-gray-400">
                      <p><strong>Task Name:</strong> {task.task_name}</p>
                      <p><strong>Role:</strong> {task.role}</p>
                      <p><strong>From:</strong> {new Date(task.from).toLocaleDateString()}</p>
                      <p><strong>To:</strong> {new Date(task.to).toLocaleDateString()}</p>
                    </div>
                  )
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
