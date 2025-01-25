import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Navbar from "./Nav";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchManagerIdAndProjects = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const decodedToken = jwtDecode(token);
          const response = await axios.get(`http://localhost:3001/projects/${decodedToken.id}`);
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
    fetchManagerIdAndProjects();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-600 text-lg">Loading projects...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 font-medium">{error}</p>;
  }

  const handleNavigate = (projectId, projectType) => {
    localStorage.setItem("projectId", projectId);
    if (projectType === "Kanban") {
      navigate(`/ListKanban`);
    } else if (projectType === "Scrum") {
      navigate(`/scrumtime`);
    }
  };

  return (
    <div className="p-6">
      <Navbar />
      <div className="mt-16">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6">Manager Projects</h1>
        {projects.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">No projects found for this manager.</p>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <li
                key={project._id}
                className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition duration-300 p-6"
              >
                <h2 className="text-xl font-semibold text-gray-700 mb-2">{project.name}</h2>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Type:</strong> {project.type}
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  <strong>Description:</strong> {project.description}
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

export default Projects;
