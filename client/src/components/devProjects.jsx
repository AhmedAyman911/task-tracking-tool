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
                    //const decodedToken = jwtDecode(token);
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
        return <p>Loading projects...</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }
    const handleNavigate = (projectId, projectType) => {
        localStorage.setItem("projectId", projectId);
        if (projectType === "Kanban") {
            navigate(`/devBoard`);
        } else if (projectType === "Scrum") {
            navigate(`/scrumtime`);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <Navbar/>
            <h1 className="text-2xl font-bold mb-4 mt-16">Projects</h1>
            {projects.length === 0 ? (
                <p>No projects found for this manager.</p>
            ) : (
                <ul className="space-y-4">
                    {projects.map((project) => (
                        <li key={project._id} className="border p-4 rounded shadow-sm">
                            <h2 className="text-xl font-semibold">{project.name}</h2>
                            <p>
                                <strong>Type:</strong> {project.type}
                            </p>
                            <p>
                                <strong>Description:</strong> {project.description}
                            </p>
                            <button
                                onClick={() => handleNavigate(project._id, project.type)}
                                className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${project.type === "Kanban" ? "btn-kanban" : "btn-scrum"
                                    }`}
                            >
                                {project.type === "Kanban" ? "View Kanban" : "View Scrum"}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default DevProjects;
