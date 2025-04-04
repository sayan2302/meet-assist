import { ToastContainer } from 'react-toastify';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './page/Dashboard';
import Protected from './components/Protected';
import Login from './page/Login';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* <Route path="/" element={<Navigate to="/dashboard" replace />} /> */}
          <Route path="/" element={<Protected component={<Dashboard />} />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <ToastContainer />
      </Router>
    </div>
  );
}

export default App;
