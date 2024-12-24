import React from "react";
import KanbanBoard from "./components/kanban_board";
import ScrumTimeline from "./components/scrum_timeline"
import AuthPage from "./components/AuthPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<ScrumTimeline />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
