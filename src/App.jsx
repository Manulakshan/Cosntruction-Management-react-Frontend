import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import logo from './assets/logo.png';
import Overview from './pages/Overview';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import LatestProjects from './pages/LatestProjects';
import Login from './Login';
import Contact from './pages/Contact';
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/admin/Dashboard';

// Sample navigation items
const navItems = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/services', label: 'Services' },
  { path: '/overview', label: 'Overview' },
  { path: '/latest', label: 'Latest Projects' },
  { path: '/contact', label: 'Contact' },
  { path: '/login', label: 'Login' },
  { path: '/admin', label: 'Admin' },
];

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar logo={logo} navItems={navItems} />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About/>} />
          <Route path="/services" element={<Services/>} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/latest" element={<LatestProjects/>} />
          <Route path="/contact" element={<Contact/>} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            {/* Add more admin routes here as needed */}
            <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
          </Route>
          
          {/* 404 Route - Keep this at the end */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;