import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
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
import Dashboard from './pages/admin/Dashboard';

// Layout component for public routes (with Navbar)
const PublicLayout = () => (
  <>
    <Navbar logo={logo} navItems={navItems} />
    <Outlet />
  </>
);

// Sample navigation items
const navItems = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/services', label: 'Services' },
  { path: '/overview', label: 'Overview' },
  { path: '/latest', label: 'Latest Projects' },
  { path: '/contact', label: 'Contact' },
  { path: '/login', label: 'Login' },
];

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          {/* Public Routes with Navbar */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/latest" element={<LatestProjects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
          </Route>

          {/* Admin Routes without Navbar */}
          <Route path="/admin/*" element={<Dashboard />} />
          
          {/* 404 Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;