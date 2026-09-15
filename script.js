/**
 * Pabolu Manohar - Dynamic Portfolio
 * Loads configuration.yaml using js-yaml CDN, renders content dynamically,
 * and initializes tsParticles and AOS (Animate on Scroll) animations.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize cinematic particle background
  initCinematicBackground();

  // Initialize AOS animation library
  initAOS();

  // Load and render portfolio content
  initPortfolio();
});

/**
 * Cinematic Looping Abstract Background using tsParticles CDN
 */
function initCinematicBackground() {
  if (typeof tsParticles === 'undefined') {
    console.warn('tsParticles library not detected.');
    return;
  }

  tsParticles.load('tsparticles', {
    fullScreen: { enable: false },
    fpsLimit: 60,
    particles: {
      number: {
        value: 45,
        density: {
          enable: true,
          area: 800
        }
      },
      color: {
        value: ['#38bdf8', '#818cf8', '#34d399', '#c084fc']
      },
      shape: {
        type: 'circle'
      },
      opacity: {
        value: { min: 0.12, max: 0.4 },
        animation: {
          enable: true,
          speed: 0.6,
          minimumValue: 0.1,
          sync: false
        }
      },
      size: {
        value: { min: 1.5, max: 3.5 },
        animation: {
          enable: true,
          speed: 1.5,
          minimumValue: 1,
          sync: false
        }
      },
      links: {
        enable: true,
        distance: 140,
        color: '#38bdf8',
        opacity: 0.16,
        width: 1
      },
      move: {
        enable: true,
        speed: 0.65,
        direction: 'none',
        random: true,
        straight: false,
        outModes: {
          default: 'out'
        }
      }
    },
    interactivity: {
      detectsOn: 'window',
      events: {
        onHover: {
          enable: true,
          mode: 'grab'
        },
        resize: true
      },
      modes: {
        grab: {
          distance: 170,
          links: {
            opacity: 0.45,
            color: '#38bdf8'
          }
        }
      }
    },
    detectRetina: true
  }).catch(err => {
    console.warn('Error loading tsParticles configuration:', err);
  });
}

/**
 * Initialize AOS (Animate On Scroll)
 */
function initAOS() {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 650,
      easing: 'ease-out-cubic',
      once: true,
      offset: 50
    });
  }
}

/**
 * Asynchronously fetch and parse configuration.yaml
 */
async function initPortfolio() {
  const loadingEl = document.getElementById('loading-state');
  const errorEl = document.getElementById('error-state');
  const errorMessageEl = document.getElementById('error-message');
  const mainContent = document.getElementById('main-content');

  try {
    // Asynchronously fetch configuration.yaml
    const response = await fetch('configuration.yaml');
    if (!response.ok) {
      throw new Error(`HTTP error while fetching configuration! Status: ${response.status} (${response.statusText})`);
    }

    const yamlText = await response.text();
    
    // Parse using jsyaml loaded via CDN
    if (typeof jsyaml === 'undefined') {
      throw new Error('js-yaml library is not loaded. Please verify the CDN link in index.html.');
    }

    const data = jsyaml.load(yamlText);
    if (!data) {
      throw new Error('Parsed YAML is empty or invalid.');
    }

    // Populate dynamic sections
    renderHero(data.personal, data.contact, data.summary);
    renderAbout(data.summary, data.leadership);
    renderExperience(data.experience);
    renderSkills(data.skills);
    renderProjects(data.projects);
    renderEducation(data.education, data.certifications);
    renderContact(data.contact, data.personal);

    // Setup interactive features
    setupNavigation();
    setupSkillFilters();
    setupClipboardActions();
    setupFooterYear();

    // Hide loading, show content with smooth transition
    if (loadingEl) loadingEl.style.display = 'none';
    if (mainContent) {
      mainContent.style.opacity = '1';
    }

    // Refresh AOS layout calculations for newly rendered DOM nodes
    if (typeof AOS !== 'undefined') {
      AOS.refresh();
    }
  } catch (error) {
    console.error('Failed to load portfolio configuration:', error);
    if (loadingEl) loadingEl.style.display = 'none';
    if (errorEl) {
      errorEl.style.display = 'flex';
      if (errorMessageEl) {
        errorMessageEl.textContent = error.message;
      }
    }
  }
}

/**
 * 1. Render Hero Section
 */
function renderHero(personal = {}, contact = {}, summary = {}) {
  const heroContainer = document.getElementById('hero-section');
  if (!heroContainer) return;

  const stats = summary.stats || [];
  const statsHtml = stats.map((stat, idx) => `
    <div class="stat-card" data-aos="fade-up" data-aos-delay="${150 + idx * 75}">
      <span class="stat-value">${escapeHtml(stat.value)}</span>
      <span class="stat-label">${escapeHtml(stat.label)}</span>
    </div>
  `).join('');

  heroContainer.innerHTML = `
    <div class="container hero-container">
      <div class="hero-badge-wrapper" data-aos="fade-down">
        <span class="status-indicator">
          <span class="status-dot pulse"></span>
          ${escapeHtml(personal.availability || 'Available for opportunities')}
        </span>
      </div>

      <div class="hero-grid">
        <div class="hero-text-content" data-aos="fade-right">
          <p class="hero-greeting">Hi, my name is</p>
          <h1 class="hero-name">${escapeHtml(personal.name || 'Pabolu Manohar')}</h1>
          <h2 class="hero-headline">${escapeHtml(personal.tagline || 'Software Engineer · Backend & Agentic AI')}</h2>
          
          <p class="hero-bio">
            ${escapeHtml(summary.bio || 'Software Engineer specializing in Python, FastAPI, distributed backend systems, Agentic AI, and Kubernetes cloud infrastructure.')}
          </p>

          <div class="hero-cta-group">
            <a href="#experience-section" class="btn btn-primary">
              <i class="fa-solid fa-briefcase"></i> View Work Experience
            </a>
            <a href="#contact-section" class="btn btn-secondary">
              <i class="fa-solid fa-paper-plane"></i> Contact Me
            </a>
            <div class="hero-social-links">
              ${contact.github ? `
                <a href="${escapeHtml(contact.github)}" target="_blank" rel="noopener noreferrer" class="social-btn" title="GitHub">
                  <i class="fa-brands fa-github"></i>
                </a>
              ` : ''}
              ${contact.linkedin ? `
                <a href="${escapeHtml(contact.linkedin)}" target="_blank" rel="noopener noreferrer" class="social-btn" title="LinkedIn">
                  <i class="fa-brands fa-linkedin-in"></i>
                </a>
              ` : ''}
              ${contact.email ? `
                <button class="social-btn copy-email-btn" data-email="${escapeHtml(contact.email)}" title="Copy Email">
                  <i class="fa-solid fa-envelope"></i>
                </button>
              ` : ''}
            </div>
          </div>
        </div>

        <div class="hero-visual-card" data-aos="fade-left">
          <div class="profile-card">
            <div class="avatar-ring">
              <div class="avatar-circle">
                <span class="avatar-initials">${escapeHtml(personal.avatar_initials || 'PM')}</span>
              </div>
            </div>
            <div class="profile-info">
              <h3 class="profile-name">${escapeHtml(personal.name)}</h3>
              <p class="profile-role"><i class="fa-solid fa-code"></i> ${escapeHtml(personal.title)}</p>
              <p class="profile-loc"><i class="fa-solid fa-location-dot"></i> ${escapeHtml(personal.location || 'India')}</p>
            </div>
            <div class="profile-chips">
              <span class="mini-chip"><i class="fa-brands fa-python"></i> Python / FastAPI</span>
              <span class="mini-chip"><i class="fa-solid fa-dharmachakra"></i> Kubernetes (GKE)</span>
              <span class="mini-chip"><i class="fa-solid fa-brain"></i> Agentic AI / MCP</span>
            </div>
          </div>
        </div>
      </div>

      ${stats.length ? `<div class="hero-stats-row">${statsHtml}</div>` : ''}
    </div>
  `;
}

/**
 * 2. Render About Section
 */
function renderAbout(summary = {}, leadership = []) {
  const aboutContainer = document.getElementById('about-section');
  if (!aboutContainer) return;

  const leadershipHtml = (leadership || []).map(item => `
    <li class="leadership-item">
      <i class="fa-solid fa-circle-check item-bullet"></i>
      <span>${escapeHtml(item)}</span>
    </li>
  `).join('');

  aboutContainer.innerHTML = `
    <div class="container">
      <div class="section-header" data-aos="fade-up">
        <span class="section-tag"><i class="fa-solid fa-compass"></i> Overview</span>
        <h2 class="section-title">About & Core Focus</h2>
        <p class="section-subtitle">${escapeHtml(summary.headline || 'Architecting scalable backend platforms & intelligent agent workflows')}</p>
      </div>

      <div class="about-grid">
        <div class="about-card primary-focus-card glass-card" data-aos="fade-up" data-aos-delay="100">
          <div class="card-icon-header">
            <div class="icon-bubble cyan"><i class="fa-solid fa-server"></i></div>
            <h3>Backend & Cloud Engineering</h3>
          </div>
          <p>
            Engineering robust distributed systems using Python (FastAPI), microservices, and asynchronous event streams (Redis, Kafka). Extensive production experience packaging and scaling services on <strong>Kubernetes (GKE)</strong> and Google Cloud Platform with automated telemetry.
          </p>
        </div>

        <div class="about-card primary-focus-card glass-card" data-aos="fade-up" data-aos-delay="200">
          <div class="card-icon-header">
            <div class="icon-bubble purple"><i class="fa-solid fa-brain"></i></div>
            <h3>Agentic AI & Orchestration</h3>
          </div>
          <p>
            Pioneering multi-agent collaborative workflows with <strong>LangChain, LangGraph, Model Context Protocol (MCP)</strong>, and LiteLLM gateways. Implementing full LLM observability with Langfuse to analyze latency, token economics, and multi-step tool execution.
          </p>
        </div>

        <div class="about-card primary-focus-card glass-card" data-aos="fade-up" data-aos-delay="300">
          <div class="card-icon-header">
            <div class="icon-bubble emerald"><i class="fa-solid fa-network-wired"></i></div>
            <h3>Systems & Tunneling Protocols</h3>
          </div>
          <p>
            Invented real-world hardware tunneling solutions (USB-over-WebSocket, TCP/IP, ADB encapsulation) and real-time media streams (WebRTC STUN/TURN) enabling remote orchestration of physical mobile device fleets.
          </p>
        </div>
      </div>

      ${leadership.length ? `
        <div class="leadership-box" data-aos="fade-up" data-aos-delay="250">
          <div class="leadership-header">
            <i class="fa-solid fa-users-gear"></i>
            <h3>Engineering Culture & Leadership</h3>
          </div>
          <ul class="leadership-list">
            ${leadershipHtml}
          </ul>
        </div>
      ` : ''}
    </div>
  `;
}

/**
 * 3. Render Work Experience (FlintLab) with AOS Scroll Reveals
 */
function renderExperience(experiences = []) {
  const expContainer = document.getElementById('experience-section');
  if (!expContainer) return;

  const timelineHtml = (experiences || []).map((exp, index) => {
    const bulletsHtml = (exp.bullets || []).map(b => `
      <li class="bullet-item">
        <span class="bullet-indicator"></span>
        <span class="bullet-text">${escapeHtml(b)}</span>
      </li>
    `).join('');

    const tagsHtml = (exp.tags || []).map(tag => `
      <span class="tag-pill">${escapeHtml(tag)}</span>
    `).join('');

    return `
      <div class="timeline-item ${index === 0 ? 'current-role' : ''}" data-aos="fade-up" data-aos-delay="${index * 150}">
        <div class="timeline-marker">
          <div class="marker-dot"></div>
          <div class="marker-line"></div>
        </div>
        <div class="timeline-content glass-card">
          <div class="timeline-header">
            <div>
              <div class="role-badge-row">
                <h3 class="role-title">${escapeHtml(exp.role)}</h3>
                <span class="role-type-badge">${escapeHtml(exp.type || 'Full-Time')}</span>
              </div>
              <div class="company-subline">
                <span class="company-name">
                  <i class="fa-solid fa-building"></i> ${escapeHtml(exp.company)}
                </span>
                <span class="role-location">
                  <i class="fa-solid fa-location-dot"></i> ${escapeHtml(exp.location)}
                </span>
              </div>
            </div>
            <div class="period-badge">
              <i class="fa-regular fa-calendar"></i> ${escapeHtml(exp.period)}
            </div>
          </div>

          ${exp.overview ? `<p class="company-overview">${escapeHtml(exp.overview)}</p>` : ''}

          <ul class="achievements-list">
            ${bulletsHtml}
          </ul>

          ${tagsHtml ? `<div class="tech-tags-group">${tagsHtml}</div>` : ''}
        </div>
      </div>
    `;
  }).join('');

  expContainer.innerHTML = `
    <div class="container">
      <div class="section-header" data-aos="fade-up">
        <span class="section-tag"><i class="fa-solid fa-timeline"></i> Career Journey</span>
        <h2 class="section-title">Work Experience</h2>
        <p class="section-subtitle">Real-world production engineering, distributed systems, and AI infrastructure</p>
      </div>

      <div class="timeline">
        ${timelineHtml}
      </div>
    </div>
  `;
}

/**
 * 4. Render Technical Skills with AOS Scroll Reveals
 */
function renderSkills(categories = []) {
  const skillsContainer = document.getElementById('skills-section');
  if (!skillsContainer) return;

  const cardsHtml = (categories || []).map((cat, catIdx) => {
    const itemsHtml = (cat.items || []).map(skill => {
      const isKey = ['Python', 'FastAPI', 'Kubernetes (GKE)', 'LangChain', 'LangGraph', 'Model Context Protocol (MCP)'].includes(skill);
      return `<span class="skill-badge ${isKey ? 'skill-featured' : ''}">${escapeHtml(skill)}</span>`;
    }).join('');

    return `
      <div class="skill-category-card glass-card" data-category="${escapeHtml(cat.category)}" data-aos="fade-up" data-aos-delay="${(catIdx % 2) * 120}">
        <div class="category-header">
          <div class="cat-icon-wrap">
            <i class="${escapeHtml(cat.icon || 'fa-solid fa-code')}"></i>
          </div>
          <div>
            <h3 class="category-title">${escapeHtml(cat.category)}</h3>
            <p class="category-desc">${escapeHtml(cat.description || '')}</p>
          </div>
        </div>
        <div class="skill-badges-container">
          ${itemsHtml}
        </div>
      </div>
    `;
  }).join('');

  skillsContainer.innerHTML = `
    <div class="container">
      <div class="section-header" data-aos="fade-up">
        <span class="section-tag"><i class="fa-solid fa-sliders"></i> Tooling</span>
        <h2 class="section-title">Technical Skills</h2>
        <p class="section-subtitle">Specialized in high-concurrency backends, agent systems, and cloud native stacks</p>
      </div>

      <div class="skills-filter-tabs" id="skills-tabs" data-aos="fade-up" data-aos-delay="100">
        <button class="filter-tab active" data-filter="all">All Disciplines</button>
        ${(categories || []).map(cat => `
          <button class="filter-tab" data-filter="${escapeHtml(cat.category)}">${escapeHtml(cat.category)}</button>
        `).join('')}
      </div>

      <div class="skills-grid" id="skills-grid">
        ${cardsHtml}
      </div>
    </div>
  `;
}

/**
 * 5. Render Projects Section with AOS Scroll Reveals
 */
function renderProjects(projects = []) {
  const projContainer = document.getElementById('projects-section');
  if (!projContainer) return;

  const cardsHtml = (projects || []).map((proj, idx) => {
    const techPills = (proj.tech_stack || []).map(t => `<span class="tech-pill">${escapeHtml(t)}</span>`).join('');

    return `
      <div class="project-card glass-card" data-aos="fade-up" data-aos-delay="${idx * 120}">
        <div class="project-top">
          <span class="project-category-tag">${escapeHtml(proj.category || 'Engineering Project')}</span>
          ${proj.github_link ? `
            <a href="${escapeHtml(proj.github_link)}" target="_blank" rel="noopener noreferrer" class="project-link-btn" title="View Source on GitHub">
              <i class="fa-brands fa-github"></i>
            </a>
          ` : ''}
        </div>
        <h3 class="project-title">${escapeHtml(proj.title)}</h3>
        <p class="project-desc">${escapeHtml(proj.description)}</p>
        <div class="project-tech-stack">
          ${techPills}
        </div>
      </div>
    `;
  }).join('');

  projContainer.innerHTML = `
    <div class="container">
      <div class="section-header" data-aos="fade-up">
        <span class="section-tag"><i class="fa-solid fa-cubes"></i> Architecture</span>
        <h2 class="section-title">Notable Projects</h2>
        <p class="section-subtitle">Systems designed with scalability, clean APIs, and production standards</p>
      </div>

      <div class="projects-grid">
        ${cardsHtml}
      </div>
    </div>
  `;
}

/**
 * 6. Render Education & Certifications
 */
function renderEducation(education = [], certifications = []) {
  const eduContainer = document.getElementById('education-section');
  if (!eduContainer) return;

  const eduHtml = (education || []).map((edu, idx) => `
    <div class="education-card glass-card" data-aos="fade-up" data-aos-delay="${idx * 100}">
      <div class="edu-icon-bubble">
        <i class="fa-solid fa-graduation-cap"></i>
      </div>
      <div class="edu-details">
        <div class="edu-header-row">
          <h3 class="edu-degree">${escapeHtml(edu.degree)}</h3>
          <span class="edu-period">${escapeHtml(edu.period)}</span>
        </div>
        <h4 class="edu-institution">${escapeHtml(edu.institution)}</h4>
        <div class="edu-meta">
          <span class="edu-score"><i class="fa-solid fa-award"></i> ${escapeHtml(edu.score || '')}</span>
          <span class="edu-loc"><i class="fa-solid fa-location-dot"></i> ${escapeHtml(edu.location || '')}</span>
        </div>
        ${edu.highlights ? `<p class="edu-highlights">${escapeHtml(edu.highlights)}</p>` : ''}
      </div>
    </div>
  `).join('');

  const certsHtml = (certifications || []).map((cert, idx) => `
    <div class="cert-item glass-card" data-aos="fade-up" data-aos-delay="${idx * 100}">
      <div class="cert-badge-icon">
        <i class="${escapeHtml(cert.badge || 'fa-solid fa-certificate')}"></i>
      </div>
      <div class="cert-content">
        <h4 class="cert-name">${escapeHtml(cert.name)}</h4>
        <p class="cert-issuer">${escapeHtml(cert.issuer)} · <span class="cert-date">${escapeHtml(cert.date)}</span></p>
      </div>
    </div>
  `).join('');

  eduContainer.innerHTML = `
    <div class="container">
      <div class="section-header" data-aos="fade-up">
        <span class="section-tag"><i class="fa-solid fa-award"></i> Credentials</span>
        <h2 class="section-title">Education & Certifications</h2>
        <p class="section-subtitle">Academic foundations in Computer Science and continuous technical upskilling</p>
      </div>

      <div class="edu-cert-layout">
        <div class="edu-column">
          <h3 class="column-subtitle"><i class="fa-solid fa-book-bookmark"></i> Academic Background</h3>
          <div class="edu-list">
            ${eduHtml}
          </div>
        </div>

        <div class="cert-column">
          <h3 class="column-subtitle"><i class="fa-solid fa-certificate"></i> Specialized Certifications</h3>
          <div class="cert-grid">
            ${certsHtml}
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * 7. Render Contact Section
 */
function renderContact(contact = {}, personal = {}) {
  const contactContainer = document.getElementById('contact-section');
  if (!contactContainer) return;

  contactContainer.innerHTML = `
    <div class="container">
      <div class="contact-card glass-card" data-aos="zoom-in">
        <div class="contact-header">
          <span class="section-tag"><i class="fa-solid fa-paper-plane"></i> Communication</span>
          <h2 class="section-title">Let's Connect</h2>
          <p class="section-subtitle">
            Interested in building high-scale distributed backends, resilient Kubernetes infrastructure, or autonomous Agentic AI systems? My inbox is always open.
          </p>
        </div>

        <div class="contact-methods-grid">
          ${contact.email ? `
            <div class="contact-method-box">
              <div class="method-icon"><i class="fa-solid fa-envelope"></i></div>
              <div class="method-info">
                <span class="method-label">Email Address</span>
                <a href="mailto:${escapeHtml(contact.email)}" class="method-value">${escapeHtml(contact.email)}</a>
              </div>
              <button class="btn-copy copy-email-btn" data-email="${escapeHtml(contact.email)}" title="Copy Email">
                <i class="fa-regular fa-copy"></i>
              </button>
            </div>
          ` : ''}

          ${contact.phone ? `
            <div class="contact-method-box">
              <div class="method-icon"><i class="fa-solid fa-phone"></i></div>
              <div class="method-info">
                <span class="method-label">Phone</span>
                <a href="tel:${escapeHtml(contact.phone)}" class="method-value">${escapeHtml(contact.phone)}</a>
              </div>
            </div>
          ` : ''}

          ${contact.github ? `
            <div class="contact-method-box">
              <div class="method-icon"><i class="fa-brands fa-github"></i></div>
              <div class="method-info">
                <span class="method-label">GitHub</span>
                <a href="${escapeHtml(contact.github)}" target="_blank" rel="noopener noreferrer" class="method-value">
                  github.com/PaboluManohar
                </a>
              </div>
              <a href="${escapeHtml(contact.github)}" target="_blank" rel="noopener noreferrer" class="btn-copy" title="Open GitHub">
                <i class="fa-solid fa-arrow-up-right-from-square"></i>
              </a>
            </div>
          ` : ''}

          ${contact.linkedin ? `
            <div class="contact-method-box">
              <div class="method-icon"><i class="fa-brands fa-linkedin-in"></i></div>
              <div class="method-info">
                <span class="method-label">LinkedIn</span>
                <a href="${escapeHtml(contact.linkedin)}" target="_blank" rel="noopener noreferrer" class="method-value">
                  linkedin.com/in/pabolumanohar
                </a>
              </div>
              <a href="${escapeHtml(contact.linkedin)}" target="_blank" rel="noopener noreferrer" class="btn-copy" title="Open LinkedIn">
                <i class="fa-solid fa-arrow-up-right-from-square"></i>
              </a>
            </div>
          ` : ''}
        </div>

        <div class="contact-cta-wrapper">
          <a href="mailto:${escapeHtml(contact.email || '')}" class="btn btn-primary btn-large">
            <i class="fa-solid fa-paper-plane"></i> Send Direct Email
          </a>
        </div>
      </div>
    </div>
  `;
}

/**
 * Interactive Features & Event Listeners
 */

function setupNavigation() {
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');

  // Sticky navbar shadow on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const icon = navToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });

    // Close mobile menu on click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        const icon = navToggle.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-xmark');
        }
      });
    });
  }

  // Scroll spy active links
  const sections = document.querySelectorAll('main > header, main > section');
  const navItems = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navItems.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, { rootMargin: '-20% 0px -60% 0px' });

  sections.forEach(sec => observer.observe(sec));
}

function setupSkillFilters() {
  const tabsContainer = document.getElementById('skills-tabs');
  const cards = document.querySelectorAll('.skill-category-card');

  if (!tabsContainer || !cards.length) return;

  tabsContainer.addEventListener('click', (e) => {
    const tab = e.target.closest('.filter-tab');
    if (!tab) return;

    tabsContainer.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    const filter = tab.getAttribute('data-filter');

    cards.forEach(card => {
      const category = card.getAttribute('data-category');
      if (filter === 'all' || filter === category) {
        card.style.display = 'flex';
        card.style.animation = 'fadeIn 0.3s ease-in-out';
      } else {
        card.style.display = 'none';
      }
    });

    if (typeof AOS !== 'undefined') {
      AOS.refresh();
    }
  });
}

function setupClipboardActions() {
  document.addEventListener('click', (e) => {
    const copyBtn = e.target.closest('.copy-email-btn');
    if (!copyBtn) return;

    const email = copyBtn.getAttribute('data-email');
    if (!email) return;

    navigator.clipboard.writeText(email).then(() => {
      showToast(`Copied email (${email}) to clipboard!`);
    }).catch(() => {
      showToast(`Email: ${email}`);
    });
  });
}

function setupFooterYear() {
  const yearEl = document.getElementById('footer-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

function escapeHtml(str) {
  if (typeof str !== 'string') return str ?? '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
