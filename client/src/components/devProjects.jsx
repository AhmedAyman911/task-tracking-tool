import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Nav";

const DevProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await axios.get(`http://localhost:3001/projects`);
          setProjects(response.data);
        } else {
          setError("No token found. Please log in.");
        }
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError("Failed to fetch projects. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-600 text-lg font-medium">Loading projects...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 font-semibold text-lg">{error}</p>;
  }

  const handleNavigate = (projectId, projectType) => {
    localStorage.setItem("projectId", projectId);
    if (projectType === "Kanban") {
      navigate(`/devBoard`);
    } else if (projectType === "Scrum") {
      navigate(`/devSprints`);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <Navbar />
      <div className="mt-16">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-8 tracking-tight leading-tight">Your Projects</h1>
        {projects.length === 0 ? (
          <p className="text-center text-gray-600 text-lg font-medium">No projects found for this manager.</p>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <li
                key={project._id}
                className="bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 p-6"
              >
                <h2 className="text-2xl font-bold text-gray-700 mb-2 tracking-tight">{project.name}</h2>
                <p className="text-sm text-gray-600 mb-1">
                  <strong className="font-semibold">Type:</strong> {project.type}
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  <strong className="font-semibold">Description:</strong> {project.description}
                </p>
                <button
                  onClick={() => handleNavigate(project._id, project.type)}
                  className={`w-full text-sm font-medium py-2 px-4 rounded text-white transition duration-300 ${
                    project.type === "Kanban"
                      ? "bg-blue-500 hover:bg-blue-600"
                      : "bg-green-500 hover:bg-green-600"
                  }`}
                >
                  {project.type === "Kanban" ? "View Kanban" : "View Scrum"}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DevProjects;
