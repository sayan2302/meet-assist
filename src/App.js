import { ToastContainer } from 'react-toastify';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './page/Dashboard';
import Protected from './components/Protected';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Protected component={<Dashboard />} />} />
          <Route path="/dashboardx" element={<Protected component={<Dashboard />} />} />
        </Routes>
        <ToastContainer />
      </Router>
    </div>
  );
}

export default App;
