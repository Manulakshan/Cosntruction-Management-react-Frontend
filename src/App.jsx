import { BrowserRouter as Router, Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
// import SupervisorsTable from './pages/admin/Supervisorstable';
import SupervisorRegistration from './pages/admin/SupervisorRegistration';
import WorkforceManagement from './pages/supervisor/WorkforceManagement';
// import MaterialManagement from './pages/admin/MaterialManagement';
import ProjectReport from './pages/admin/ProjectReport';
import ProfileManagement from './pages/admin/ProfileManagement';

// Supervisor Components
import SupervisorDashboard from './pages/supervisor/Dashboard';
import SupervisorHome from './pages/supervisor/Home';
import MaterialManagement from './pages/supervisor/MaterialManagement';

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login page with the return URL
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

// Admin Layout with Navbar
const AdminLayout = () => (
  <>
    <Navbar logo={logo} navItems={adminNavItems} isAdmin={true} />
    <Outlet />
  </>
);

// Layout component for public routes (with Navbar)
const PublicLayout = () => (
  <>
    <Navbar logo={logo} navItems={navItems} />
    <Outlet />
  </>
);

// Navigation items for public users
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
          {/* <Route path="/admin/supervisors" element={<SupervisorsTable />} /> */}
          <Route path="/admin/supervisor/registration" element={<SupervisorRegistration />} />
          <Route path="/admin/workforce" element={<WorkforceManagement />} />
          {/* <Route path="/admin/materials" element={<MaterialManagement />} /> */}
          <Route path="/admin/project-reports" element={<ProjectReport />} />
          <Route path="/admin/profile" element={<ProfileManagement />} />

          {/* Supervisor Routes */}
          <Route path="/supervisor" element={<SupervisorDashboard />}>
            <Route index element={<SupervisorHome />} />
            <Route path="dashboard" element={<SupervisorHome />} />
            <Route path="materials" element={
              <ProtectedRoute>
                <MaterialManagement />
              </ProtectedRoute>
            } />
            <Route path="workforce" element={
              <ProtectedRoute>
                <WorkforceManagement />
              </ProtectedRoute>
            } />
          </Route>

          {/* 404 Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      <ToastContainer />
    </Router>
  );
}

export default App;