import './choose.css'; // Importing a separate CSS file for styles

const Choose = () => {
  return (
    <div className="choose-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-brand">Workio</div>
        <div className="navbar-links">
          <a href="#">Your work</a>
          <a href="#">Projects</a>
          <a href="#">Filters</a>
          <a href="#">Dashboards</a>
          <a href="#">Teams</a>
          <a href="#">Plan</a>
          <a href="#">Apps</a>
        </div>
        <div className="navbar-actions">
          <a href="#">Login/Signup</a>
          <span className="notification-icon">🔔</span>
        </div>
      </nav>

      {/* Main Content */}
      <div className="choose-content">
        <h1>Select Your Workflow Method</h1>
        <p>
          Choose a workflow method that best fits your project needs.
          <br></br> Each
          method is tailored to different approaches for task management and
          team collaboration.
        </p>

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
              <h3>1. Kanban</h3>
              <p>
                Visualize your workflow with a board-based system that focuses
                on continuous delivery and 
                
                flexibility.<br></br> Ideal for teams needing
                a visual overview.
              </p>
            </div>
            <button className="create-btn">Create</button>
          </div>

          {/* Scrum Option */}
          <div className="workflow-card">
            <img
              src="src/assets/scrum.png"
              alt="Scrum Icon"
              className="workflow-icon"
            />
            <div className="workflow-details">
              <h3>2. Scrum</h3>
              <p>
                Break down work into time-boxed sprints and focus on iterative
                delivery. 
                <br></br>Perfect for agile teams.
              </p>
            </div>
            <button className="create-btn">Create</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Choose;
