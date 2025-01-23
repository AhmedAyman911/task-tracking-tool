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
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/scrumtime" element={<ScrumTimeline />} />
          <Route path="/ListKanban" element={<ListKanban />} />
          <Route path="/kanbanBoard" element={<KanbanBoard />} />
          <Route path="/" element={<AuthPage />} />
          <Route path="/backlog" element={<Backlog />} />
          <Route path="/goal" element={<Goal />} />
          <Route path="/choose" element={<Choose />} />
          <Route path="/devBoard" element={<Devboard />}/>
          <Route path="/Mprojects" element={<Projects />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
