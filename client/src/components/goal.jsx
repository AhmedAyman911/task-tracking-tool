// src/components/goal.jsx
import './goal.css';
import { Link } from "react-router-dom";

const Goal = () => {
  return (
    <div className="app">
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
          <a href="#">Login/Signup</a>
          <span className="notification-icon">🔔</span>
        </div>
      </nav>

      {/* Sidebar */}
       {/* Sidebar */}
       <div className="sidebar">
        <h2>Workio</h2>
        <ul>
        <li>
          <Link to="/goal">
            <img src="client/src/assets/goals.jpg" alt="Board Icon" className="sidebar-icon" /> Goal
          </Link>
        </li>
        <li>
          <Link to="/kanbanBoard">
            <img src="src/assets/board.png" alt="Board Icon" className="sidebar-icon" /> Board
          </Link>
        </li>
          <li>
            <Link to ="/ListKanban">
              <img src="client/src/assets/list.jpg" alt="List Icon" className="sidebar-icon" /> List
              </Link>
          </li>
         
        </ul>
      </div>

      {/* Main Content */}
      <div className="goal-container">
        <header className="header">
          <h1>Goals</h1>
          <p className="subtitle">Are your teams aligned on the why of their work?</p>
          <p className="description">
            Goals give teams a single place to track objectives, helping everyone connect the dots between their work and what it contributes to.<br></br> Goals will be free for all Jira users soon, but you can ask an admin to sign up and try it now in early access.
          </p>
          <a href="https://www.atlassian.com/" target="_blank" rel="noopener noreferrer" className="atlassian-link">Go to Atlassian Home</a>
        </header>

        <div className="cards">
          <div className="card">
            <img src="src/assets/management.png" alt="Create goal icon" className="card-icon" />
            <h2>Create a goal once and use it everywhere</h2>
            <p>Linking goals to Workio epics automatically syncs them. No more duplication or inconsistencies.</p>
          </div>

          <div className="card">
            <img src="src/assets/time (1).png" alt="Progress icon" className="card-icon" />
            <h2>Share progress with status updates</h2>
            <p>Goal owners share monthly updates, so everyone has the latest context.</p>
          </div>

          <div className="card">
            <img src="src/assets/material-management.png" alt="Framework icon" className="card-icon" />
            <h2>Use the goal framework that suits your company</h2>
            <p>From OKRs to KPIs, and smart goals - goals are flexible to support any framework that you love.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Goal;
