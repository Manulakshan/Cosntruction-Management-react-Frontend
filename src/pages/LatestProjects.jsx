import React from 'react';
import { FaMapMarkerAlt, FaCalendarAlt, FaBuilding, FaRulerCombined, FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import './LatestProjects.css';

const LatestProjects = () => {
  const projects = [
    {
      id: 1,
      title: 'Hospital Renovation',
      location: 'Kandy Base Hospital',
      description:
        'We constructed 3 buildings with 5 floors in each, featuring state-of-the-art medical facilities and patient care units. The project was completed in 2024 with minimal disruption to hospital operations.',
      details: [
        { label: 'Buildings', value: '3' },
        { label: 'Floors Each', value: '5' },
        { label: 'Completed', value: '2024' },
      ],
      image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1350&q=80',
      status: 'Completed',
      category: 'Healthcare',
    },
    {
      id: 2,
      title: 'Cinnamon Residential Tower',
      location: 'Colombo 7',
      description:
        '30-story luxury apartment building with premium amenities including swimming pool, gym, and 24/7 security. The project was completed on June 2025 and has become a landmark in the area.',
      details: [
        { label: 'Stories', value: '30' },
        { label: 'Units', value: '120' },
        { label: 'Completed', value: '2025' },
      ],
      image: 'https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1350&q=80',
      status: 'Completed',
      category: 'Residential',
    },
    {
      id: 3,
      title: 'Commercial Office Complex',
      location: 'Nugegoda',
      description:
        'Modern commercial office building with 10 floors featuring flexible workspace solutions, conference facilities, and retail spaces on the ground floor. Completed in 2024, it now hosts several prominent businesses.',
      details: [
        { label: 'Floors', value: '10' },
        { label: 'SQ. FT', value: '45,000' },
        { label: 'Completed', value: '2024' },
      ],
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1350&q=80',
      status: 'Completed',
      category: 'Commercial',
    },
    {
      id: 4,
      title: 'City Center Mall',
      location: 'Galle',
      description:
        'Three-story shopping mall with retail spaces, food court, cinema complex, and parking facility. The project is 80% complete and scheduled to open in Q4 2023.',
      details: [
        { label: 'Stories', value: '3' },
        { label: 'Stores', value: '120' },
        { label: 'Ongoing', value: '2023' },
      ],
      image: 'https://images.unsplash.com/photo-1529429611273-4e8e94cf9f92?auto=format&fit=crop&w=1350&q=80',
      status: 'Ongoing',
      category: 'Commercial',
    },
    {
      id: 5,
      title: 'International School Campus',
      location: 'Negombo',
      description:
        'New campus building for an international school featuring classrooms, science labs, library, and sports facilities. The project was completed in 2023 and can accommodate 800 students.',
      details: [
        { label: 'Buildings', value: '4' },
        { label: 'Students', value: '800' },
        { label: 'Completed', value: '2023' },
      ],
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1350&q=80',
      status: 'Completed',
      category: 'Healthcare',
    },
    {
      id: 6,
      title: 'Highway Bridge Construction',
      location: 'Kurunegala',
      description:
        'Construction of a 250-meter bridge as part of the Central Highway expansion project. The bridge will feature four lanes and modern safety systems. Completion is scheduled for mid-2024.',
      details: [
        { label: 'Length', value: '250m' },
        { label: 'Lanes', value: '4' },
        { label: 'Ongoing', value: '2024' },
      ],
      image: 'https://images.unsplash.com/photo-1509475826633-fed577a2c71b?auto=format&fit=crop&w=1350&q=80',
      status: 'Ongoing',
      category: 'Infrastructure',
    },
  ];

  const filters = ['All Projects', 'Residential', 'Commercial', 'Healthcare', 'Completed', 'Ongoing'];
  const [activeFilter, setActiveFilter] = React.useState('All Projects');
  const [filteredProjects, setFilteredProjects] = React.useState(projects);

  React.useEffect(() => {
    if (activeFilter === 'All Projects') {
      setFilteredProjects(projects);
    } else if (activeFilter === 'Completed' || activeFilter === 'Ongoing') {
      setFilteredProjects(projects.filter((p) => p.status === activeFilter));
    } else {
      setFilteredProjects(projects.filter((p) => p.category === activeFilter));
    }
  }, [activeFilter]);

  return (
    <div className="latest-projects">
      {/* Hero Section */}
      <section className="projects-hero">
        <div className="overlay">
          <h1>Our Latest Projects</h1>
          <p>Home / Latest Projects</p>
        </div>
      </section>

      {/* Projects Section */}
      <section className="projects-section">
        <div className="container">
          {/* Filters */}
          <div className="filters">
            {filters.map((filter) => (
              <button
                key={filter}
                className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="projects-grid">
            {filteredProjects.map((project) => (
              <div key={project.id} className="project-card">
                <div className="project-image">
                  <img src={project.image} alt={project.title} />
                  <span
                    className={`status-badge ${
                      project.status === 'Completed' ? 'completed' : 'ongoing'
                    }`}
                  >
                    {project.status}
                  </span>
                </div>
                <div className="project-content">
                  <h3>{project.title}</h3>
                  <h4>{project.location}</h4>
                  <p>{project.description}</p>
                  <div className="project-stats">
                    {project.details.map((detail, index) => (
                      <div key={index} className="stat-item">
                        <h5>{detail.value}</h5>
                        <span>{detail.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-cta">
          <h2>Have a Project in Mind?</h2>
          <p>Contact us today to discuss your construction needs and get a free consultation</p>
        </div>

        <div className="footer-content">
          <div className="footer-container">
            {/* About */}
            <div className="footer-column">
              <h3>About Us</h3>
              <p>
                SOLIDCORE CONSTRUCTIONS provides industry-leading construction solutions
                with a focus on reliability, efficiency, and innovation.
              </p>
              <div className="footer-socials">
                <a href="#"><FaFacebookF /></a>
                <a href="#"><FaTwitter /></a>
                <a href="#"><FaLinkedinIn /></a>
                <a href="#"><FaInstagram /></a>
              </div>
            </div>

            {/* Links */}
            <div className="footer-column">
              <h3>Quick Links</h3>
              <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Services</a></li>
                <li><a href="#">Projects</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>

            {/* Services */}
            <div className="footer-column">
              <h3>Services</h3>
              <ul>
                <li><a href="#">Building Construction</a></li>
                <li><a href="#">Renovations & Extensions</a></li>
                <li><a href="#">Civil Engineering</a></li>
                <li><a href="#">Structural Works</a></li>
                <li><a href="#">Project Management</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div className="footer-column">
              <h3>Contact Us</h3>
              <ul className="contact-info">
                <li>
                  <FaMapMarkerAlt className="icon" />
                  <span>123 Construction Ave,<br />Maharagama, Sri Lanka</span>
                </li>
                <li>
                  <FaPhoneAlt className="icon" />
                  <span>+94 11 234 5678</span>
                </li>
                <li>
                  <FaEnvelope className="icon" />
                  <span>info@solidcoreconstructions.com</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2024 SolidCore Constructions. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LatestProjects;
