// src/components/goal.jsx
import './goal.css';
import SideBar from "./KanbanSide"
import Navbar from "./Nav";
const Goal = () => {
  return (
    <div className="app">
      <Navbar/>
      <SideBar/>
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
