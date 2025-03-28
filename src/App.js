import { ToastContainer } from 'react-toastify';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './Pages/Dashboard';
import Protected from './components/Protected';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Protected component={<Dashboard />} />} />
        </Routes>
        <ToastContainer />
      </Router>
    </div>
  );
}

export default App;
