import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './Login';
import logo from './assets/logo.png';

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
      <div className="App">
        <Navbar logo={logo} navItems={navItems} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<div>About Page</div>} />
          <Route path="/services" element={<div>Services Page</div>} />
          <Route path="/overview" element={<div>Overview</div>} />
          <Route path="/latest" element={<div>Latest Project</div>} />
          <Route path="/contact" element={<div>Contact Page</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;