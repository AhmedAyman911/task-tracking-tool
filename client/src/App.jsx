import KanbanBoard from "./components/kanban_board";
import ScrumTimeline from "./components/scrum_timeline"
import AuthPage from "./components/AuthPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ListKanban from "./components/ListKanban";
import Backlog from "./components/backlog"
import Choose from "./components/choose"
import Goal from "./components/goal"
import Devboard from "./components/devKanban"
import Projects from "./components/projects";
import KanbanDashboard from "./components/kanbanDashboard";
import DevProjects from "./components/devProjects"
import ScrumDashboard from "./components/scrumDashboard"
import DevList from "./components/devList";
import DevSprints from "./components/devSprints";
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/devSprints" element={<DevSprints />} />
          <Route path="/devList" element={<DevList />} />
          <Route path="/scrumDashboard" element={<ScrumDashboard />} />
          <Route path="/DevProjects" element={<DevProjects />} />
          <Route path="/scrumtime" element={<ScrumTimeline />} />
          <Route path="/ListKanban" element={<ListKanban />} />
          <Route path="/kanbanBoard" element={<KanbanBoard />} />
          <Route path="/" element={<AuthPage />} />
          <Route path="/backlog" element={<Backlog />} />
          <Route path="/goal" element={<Goal />} />
          <Route path="/choose" element={<Choose />} />
          <Route path="/devBoard" element={<Devboard />} />
          <Route path="/Mprojects" element={<Projects />} />
          <Route path="/kanbanDashboard" element={<KanbanDashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
