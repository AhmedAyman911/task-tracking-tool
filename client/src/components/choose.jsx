import { useNavigate } from "react-router-dom";
import './choose.css'; // Importing a separate CSS file for styles

const Choose = () => {
  const navigate = useNavigate(); // Initialize navigation

  const handleKanbanClick = () => {
    navigate("/ListKanban"); // Navigate to the ListKanban route
  };
  const handleScrumClick = () => {
    navigate("/scrumtime"); // Navigate to the ListKanban route
  };

  return (
    <div className="choose-page">
      {/* Navbar */}
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

      {/* Main Content */}
      <div className="choose-content">
        <div className="title">
          <b><h1>Select Your Workflow Method</h1></b>
          <p>
            <br />
            Choose a workflow method that best fits your project needs.
            <br /> Each
            method is tailored to different approaches for task management and
            team collaboration.
          </p>
        </div>
        <br />
        {/* Workflow Options */}
        <div className="workflow-options">
          {/* Kanban Option */}
          <div className="workflow-card">
            <img
              src="src/assets/kanban.png"
              alt="Kanban Icon"
              className="workflow-icon"
            />
            <div className="workflow-details">
              <b><h3>1. Kanban</h3></b>
              <p>
                Visualize your workflow with a board-based system that focuses
                on continuous delivery and flexibility.<br /> Ideal for teams needing
                a visual overview.
              </p>
            </div>
            <button className="create-btn" onClick={handleKanbanClick}>
              Create
            </button>
          </div>

          {/* Scrum Option */}
          <div className="workflow-card">
            <img
              src="src/assets/scrum.png"
              alt="Scrum Icon"
              className="workflow-icon"
            />
            <div className="workflow-details">
              <b><h3>2. Scrum</h3></b>
              <p>
                Break down work into time-boxed sprints and focus on iterative
                delivery.<br /> Perfect for agile teams.
              </p>
            </div>
            <button className="create-btn" onClick={handleScrumClick}>
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Choose;
