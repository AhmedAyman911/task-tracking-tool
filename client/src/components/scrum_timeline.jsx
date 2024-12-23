import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHourglassHalf,
  faChalkboard,
  faCode,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import timelineImage from "../assets/timeline.jpg";
import backlogImage from "../assets/backlog.jpg";
import codeImage from "../assets/code.jpg";


const ScrumTimeline = () => {
  const [tasks, setTasks] = useState(
    Array.from({ length: 10 }, (_, i) => ({ [`Sprint ${i + 1}`]: [] })).reduce(
      (acc, curr) => ({ ...acc, ...curr }),
      {}
    )
  );

  const addTask = (week) => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      [week]: [
        ...prevTasks[week],
        { role: "", name: "", from: null, to: null },
      ],
    }));
  };

  const handleTaskChange = (week, index, key, value) => {
    const updatedTasks = [...tasks[week]];
    updatedTasks[index][key] = value;
    setTasks((prevTasks) => ({
      ...prevTasks,
      [week]: updatedTasks,
    }));
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
            <h2 className="text-xl font-semibold">SPM</h2>
            <p className="text-lg text-gray-600">Software project</p>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium text-gray-900">PLANNING</h3>
            <nav className="space-y-1">
              <a href="#" className="block p-2 rounded bg-gray-200 text-base flex items-center">
              <img src={timelineImage} alt="Timeline" className="w-7 h-7 mr-2" />
                Timeline
              </a>
              <a href="#" className="block p-2 hover:bg-blue-200 rounded text-base flex items-center">
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
          <h1 className="text-xl font-bold mb-6">Timeline</h1>

          {/* Timeline Table */}
          <div className="grid grid-cols-2 gap-4 px-2 py-7">
            {Object.keys(tasks).map((week) => (
              <div key={week} className="bg-gray-200 shadow rounded p-4 h-auto">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">{week}</h2>
                  <button
                    onClick={() => addTask(week)}
                    className="bg-blue-400 text-white p-2 rounded hover:bg-blue-600"
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                </div>
                <div className="mt-4 space-y-4">
                  {tasks[week].map((task, index) => (
                    <div key={index} className="space-y-2">
                      {index > 0 && <hr className="border-t border-gray-700 my-2" />}
                      <div className="flex space-x-2">
                        <select
                          value={task.role}
                          onChange={(e) =>
                            handleTaskChange(week, index, "role", e.target.value)
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
                          value={task.name}
                          onChange={(e) =>
                            handleTaskChange(week, index, "name", e.target.value)
                          }
                          className="w-2/4 p-2 border rounded"
                          placeholder="Task name..."
                        />
                      </div>
                      <div className="flex space-x-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-900">
                            From:
                          </label>
                          <DatePicker
                            selected={task.from}
                            onChange={(date) =>
                              handleTaskChange(week, index, "from", date)
                            }
                            className="w-full p-2 border rounded"
                            placeholderText="Select date"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-900">
                            To:
                          </label>
                          <DatePicker
                            selected={task.to}
                            onChange={(date) =>
                              handleTaskChange(week, index, "to", date)
                            }
                            className="w-full p-2 border rounded"
                            placeholderText="Select date"
                          />
                        </div>
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

export default ScrumTimeline;
