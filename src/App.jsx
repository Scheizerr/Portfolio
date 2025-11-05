import React, { useState, useRef } from 'react';
import './App.css';


function App() {
  return (
    <div className="app">
      <PlasmaBackground />
      <div className="content">
        <Header />
        <Hero />
        <About />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}

function PlasmaBackground() {
  return (
    <div className="plasma-background">
      <div className="plasma-layer-1"></div>
      <div className="plasma-layer-2"></div>
      <div className="plasma-layer-3"></div>
    </div>
  );
}

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <span className="glitch-text" data-text="Portfolio">Portfolio</span>
        </div>
        
        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>
        
        <button 
          className="menu-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}

function Hero() {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Hi, I'm <span className="shiny-text">Russ</span>
            </h1>
            <h2 className="hero-subtitle">Video Editor</h2>
            <p className="hero-description">
              I create polished, effects-driven gaming montages that bring your best plays to life with a cinematic, high-impact style.
            </p>
            <div className="hero-buttons">
              <button 
                className="btn btn-primary"
                onClick={() => scrollToSection('projects')}
              >
                View My Work
              </button>
              <button 
                className="btn btn-secondary"
                onClick={() => scrollToSection('contact')}
              >
                Contact Me
              </button>
            </div>
          </div>
          <div className="hero-image">
            <div className="avatar-container">
              <div className="avatar-image">
                <img 
                  src="/images/avatar.jpg" 
                  alt="Jan Russel Laxa"
                  className="avatar-img"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  const skills = [
    'After Effects', 'Premiere','Photoshop', 
    'VFX', 'Color Grading & Correction', 'Visual Design', 'Motion Graphics'
  ];

  return (
    <section id="about" className="about">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <div className="about-content">
          <div className="about-text">
            <p>
              Freelance Video Editor focused on creating clean, engaging edits and dynamic video content. Skilled in motion graphics, advanced editing techniques, and sound design, with experience bridging raw footage and polished storytelling to create impactful and visually stunning projects.
            </p>
            
            <div className="skills">
              <h3>Skills & Softwares</h3>
              <div className="skills-grid">
                {skills.map((skill, index) => (
                  <span key={index} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const projects = [
    {
      id: 1,
      title: "Bad Vibes Highlights",
      description: "A first-person shooter highlight reel, weapon skin on a bright, tropical-themed map.",
      technologies: ["After Effects", "Premiere", "Effects", "Shiny"],
      video: "/videos/vid1.mp4",
      poster: "/images/img1.jpg"
    },
    {
      id: 2,
      title: "Golden Hour Highlights",
      description: "Gameplay moments in a distinct, stylized setting bathed in a purple and pink neon glow, with glowing particle effects",
      technologies: ["After Effects", "Premiere", "Effects", "Shiny"],
      video: "/videos/vid2.mp4",
      poster: "/images/img2.jpg"
    },
    {
      id: 3,
      title: "Fedup Highlights",
      description: "An intense, action-packed reel characterized by chaotic, fiery red and black particle effects",
      technologies: ["After Effects", "Premiere", "Effects", "Shiny"],
      video: "/videos/vid3.mp4",
      poster: "/images/img3.jpg"
    }
  ];

  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2 className="section-title">My Projects</h2>
        <div className="projects-grid">
          {projects.map(project => (
            <ProjectCardWithVideo key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCardWithVideo({ project }) {
  const [isHovering, setIsHovering] = useState(false);
  const [showPoster, setShowPoster] = useState(true);
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    setIsHovering(true);
    setShowPoster(false);
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("Video play failed:", error);
        setShowPoster(true);
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setTimeout(() => {
      setShowPoster(true);
    }, 100);
  };

  return (
    <div 
      className="project-card-video"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="project-video-container">
        <video
          ref={videoRef}
          className="project-video"
          poster={project.poster}
          muted
          loop
          playsInline
          preload="metadata"
          style={{ opacity: showPoster ? 0 : 1 }}
        >
          <source src={project.video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {showPoster && (
          <div 
            className="video-poster"
            style={{ backgroundImage: `url(${project.poster})` }}
          ></div>
        )}
        
        <div className={`video-overlay ${isHovering ? 'hidden' : ''}`}>
          <div className="play-indicator">
            <span>▶</span>
          </div>
        </div>
      </div>
      <div className="project-content">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="project-technologies">
          {project.technologies.map((tech, index) => (
            <span key={index} className="tech-tag">{tech}</span>
          ))}
        </div>
        <div className="project-links">
          <button className="btn btn-outline">View Tutorial</button>
          <button className="btn btn-outline">Timeline</button>
        </div>
      </div>
    </div>
  );
}

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your message!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="contact">
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        <div className="contact-content">
          <div className="contact-info">
            <h3>Let's work together</h3>
            <p>
              I'm always interested in new opportunities and exciting projects. 
              Feel free to reach out if you'd like to collaborate!
            </p>
            <div className="contact-details">
              <div className="contact-item">
                <div className="contact-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </div>
                <span>janrussellaxa11@gmail.com</span>
              </div>
              <div className="contact-item">
                <div className="contact-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                </div>
                <span>+63 915 5688 463</span>
              </div>
              <div className="contact-item">
                <div className="contact-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </div>
                <span>Porac, Pampanga</span>
              </div>
            </div>
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <textarea
                name="message"
                placeholder="Your Message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <p>&copy; 2025 Jan Russel Laxa. All rights reserved.</p>
          <div className="social-links">
            <a href="#" aria-label="GitHub">GitHub</a>
            <a href="#" aria-label="LinkedIn">Facebook</a>
            <a href="#" aria-label="Twitter">Twitter</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default App;