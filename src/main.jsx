import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
/*import Choose from './components/choose';*/
/*import Goal from './components/goal';*/
import Backlog from './components/backlog';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Backlog />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
