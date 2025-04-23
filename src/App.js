import { ToastContainer } from 'react-toastify';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
// import Dashboard from './page/Dashboard';
import Protected from './components/Protected';
import Login from './page/Login';
import Dashboard from './page/Dashboard';
import TranscriptLive from './page/TranscriptLive';
import TranscriptRecord from './page/TranscriptRecord';
import Poc from './page/Poc';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* <Route path="/" element={<Navigate to="/dashboard" replace />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Protected component={<Dashboard />} />} />
          <Route path="/transcript-live" element={<Protected component={<TranscriptLive />} />} />
          <Route path="/transcript-record" element={<Protected component={<TranscriptRecord />} />} />
          <Route path="/" element={<Protected component={<Poc />} />} />
        </Routes>
        <ToastContainer />
      </Router>
    </div>
  );
}

export default App;



// http://localhost:3000/transcript-live