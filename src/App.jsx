import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import './App.css';
import Navbar from './components/Navbar';
import Contact from './pages/Contact';
import logo from './assets/logo.png';
import Overview from './pages/Overview';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import LatestProjects from './pages/LatestProjects';
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
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/latest" element={<LatestProjects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;