import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
const Projects = () => {
    const [projects, setProjects] = useState([]); // State to store projects
    const [loading, setLoading] = useState(true); // State to manage loading
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchManagerIdAndProjects = async () => {
            try {
                // Step 1: Get and decode the token
                const token = localStorage.getItem("token");
                if (token) {
                    const decodedToken = jwtDecode(token);
                    // Step 2: Fetch projects using managerId
                    const response = await axios.get(`http://localhost:3001/projects/${decodedToken.id}`);
                    setProjects(response.data);
                } else {
                    setError("No token found. Please log in.");
                }
            } catch (err) {
                console.error("Error fetching projects:", err);
                setError("Failed to fetch projects. Please try again.");
            } finally {
                setLoading(false); // Stop loading after all operations
            }
        };

        fetchManagerIdAndProjects();
    }, []);


    if (loading) {
        return <p>Loading projects...</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }
    const handleNavigate = (projectId) => {
        // Navigate to ListKanban while passing the project ID
        localStorage.setItem("projectId", projectId); 
        navigate(`/ListKanban`, { state: { projectId } });
      };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Manager Projects</h1>
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
                            <p>
                                <strong>Created At:</strong> {new Date(project.createdAt).toLocaleDateString()}
                            </p>
                            <button
                                onClick={() => handleNavigate(project._id)}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                View Kanban
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Projects;
