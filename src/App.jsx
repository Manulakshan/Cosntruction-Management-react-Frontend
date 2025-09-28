import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import './App.css';
import Navbar from './components/Navbar';
import Contact from './pages/Contact';
import logo from './assets/logo.png';
import Overview from './pages/Overview';
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
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<div>Home Page Content</div>} />
          <Route path="/about" element={<div>About Page</div>} />
          <Route path="/services" element={<div>Services Page</div>} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/latest" element={<div>Latest Project</div>} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;