import KanbanBoard from "./components/kanban_board";
import ScrumTimeline from "./components/scrum_timeline"
import AuthPage from "./components/AuthPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ListKanban from "./components/ListKanban";
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/scrumtime" element={<ScrumTimeline />} />
          <Route path="/" element={<ListKanban />} />
          <Route path="/kanbanBoard" element={<KanbanBoard />} />
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
