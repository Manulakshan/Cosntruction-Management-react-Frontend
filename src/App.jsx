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
import SiteManagement from './pages/admin/SiteManagement';
import SupervisorsTable from './pages/admin/Supervisorstable';
import SupervisorRegistration from './pages/admin/SupervisorRegistration';
import WorkforceManagement from './pages/admin/WorkforceManagement';
import MaterialManagement from './pages/admin/MaterialManagement';
import ProjectReport from './pages/admin/ProjectReport';


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
          <Route path="/admin/sitemanagement" element={<SiteManagement />} />
          <Route path="/admin/supervisors" element={<SupervisorsTable />} />
          <Route path="/admin/supervisor/registration" element={<SupervisorRegistration />} />
          <Route path="/admin/workforce" element={<WorkforceManagement />} />
          <Route path="/admin/materials" element={<MaterialManagement />} />
          <Route path="/admin/project-reports" element={<ProjectReport />} />

          
          {/* 404 Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;