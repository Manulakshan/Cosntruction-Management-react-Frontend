import React from 'react';
import { FaMapMarkerAlt, FaCalendarAlt, FaBuilding, FaRulerCombined } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './LatestProjects.css';

const LatestProjects = () => {
  const projects = [
    {
      id: 1,
      title: 'Modern Office Complex',
      location: 'Colombo 03, Sri Lanka',
      date: 'Jan 2023 - Present',
      size: '45,000 sq.ft',
      type: 'Commercial',
      status: 'In Progress',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      category: 'Commercial',
      description: 'A state-of-the-art office complex with modern amenities and sustainable design features.'
    },
    {
      id: 2,
      title: 'Luxury Apartment Tower',
      location: 'Colombo 05, Sri Lanka',
      date: 'Mar 2023 - Present',
      size: '85,000 sq.ft',
      type: 'Residential',
      status: 'In Progress',
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      category: 'Residential',
      description: 'High-end residential tower offering luxury living spaces with panoramic city views.'
    },
    {
      id: 3,
      title: 'Shopping Mall Renovation',
      location: 'Kandy, Sri Lanka',
      date: 'Completed: Nov 2022',
      size: '120,000 sq.ft',
      type: 'Commercial',
      status: 'Completed',
      image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      category: 'Commercial',
      description: 'Complete renovation and modernization of a major shopping mall in Kandy.'
    },
    {
      id: 4,
      title: 'Luxury Villa Development',
      location: 'Galle, Sri Lanka',
      date: 'Completed: Sep 2022',
      size: '15,000 sq.ft',
      type: 'Residential',
      status: 'Completed',
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      category: 'Residential',
      description: 'Exclusive beachfront villa development with modern architecture and luxury finishes.'
    },
    {
      id: 5,
      title: 'Corporate Headquarters',
      location: 'Colombo 01, Sri Lanka',
      date: 'Completed: Jun 2022',
      size: '65,000 sq.ft',
      type: 'Commercial',
      status: 'Completed',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      category: 'Commercial',
      description: 'Modern corporate headquarters with smart building technology and sustainable features.'
    },
    {
      id: 6,
      title: 'Residential Complex',
      location: 'Negombo, Sri Lanka',
      date: 'Completed: Mar 2022',
      size: '95,000 sq.ft',
      type: 'Residential',
      status: 'Completed',
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      category: 'Residential',
      description: 'Luxury residential complex with world-class amenities and beautiful landscaping.'
    }
  ];

  const [activeFilter, setActiveFilter] = React.useState('All');
  const [filteredProjects, setFilteredProjects] = React.useState(projects);

  const filters = ['All', 'Commercial', 'Residential', 'In Progress', 'Completed'];

  React.useEffect(() => {
    if (activeFilter === 'All') {
      setFilteredProjects(projects);
    } else if (activeFilter === 'In Progress' || activeFilter === 'Completed') {
      setFilteredProjects(projects.filter(project => project.status === activeFilter));
    } else {
      setFilteredProjects(projects.filter(project => project.category === activeFilter));
    }
  }, [activeFilter]);

  return (
    <div className="latest-projects">
      {/* Hero Section */}
      <section className="projects-hero">
        <div className="container">
          <h1>Latest Projects</h1>
          <p>Explore our recent construction projects and architectural achievements</p>
        </div>
      </section>

      {/* Projects Section */}
      <section className="projects-section">
        <div className="container">
          {/* Filter Buttons */}
          <div className="filters">
            {filters.map((filter, index) => (
              <button
                key={index}
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
                  <div className={`project-status ${project.status.toLowerCase().replace(' ', '-')}`}>
                    {project.status}
                  </div>
                </div>
                <div className="project-details">
                  <h3>{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <div className="project-info">
                    <div className="info-item">
                      <FaMapMarkerAlt className="info-icon" />
                      <span>{project.location}</span>
                    </div>
                    <div className="info-item">
                      <FaCalendarAlt className="info-icon" />
                      <span>{project.date}</span>
                    </div>
                    <div className="info-item">
                      <FaRulerCombined className="info-icon" />
                      <span>{project.size}</span>
                    </div>
                    <div className="info-item">
                      <FaBuilding className="info-icon" />
                      <span>{project.type}</span>
                    </div>
                  </div>
                  <Link to={`/project/${project.id}`} className="view-details-btn">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="load-more">
            <button className="load-more-btn">Load More</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LatestProjects;
