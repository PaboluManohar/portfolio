/**
 * Pabolu Manohar - Dynamic Portfolio
 * STRICTLY Vanilla JavaScript (Zero External Libraries / CDNs)
 * Features:
 *  - HTML5 Canvas Looping Interconnected Nodes Background
 *  - Terminal-style Recursive setTimeout Typing Animation
 *  - Native IntersectionObserver Scroll Reveal Animations
 *  - Native Zero-Dependency YAML Parser
 *  - Dynamic Container Population & Interactive Utilities
 */

// SVG Icon dictionary for 100% self-contained iconography (No FontAwesome CDN needed)
const SVG_ICONS = {
  user: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>',
  code: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>',
  server: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>',
  brain: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.04z"></path><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.04z"></path></svg>',
  cloud: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path></svg>',
  chart: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>',
  database: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>',
  network: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="2" width="6" height="6" rx="1"></rect><rect x="16" y="16" width="6" height="6" rx="1"></rect><rect x="2" y="16" width="6" height="6" rx="1"></rect><path d="M5 16v-4h14v4"></path><line x1="12" y1="8" x2="12" y2="12"></line></svg>',
  briefcase: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>',
  building: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="9" y1="22" x2="9" y2="22.01"></line><line x1="15" y1="22" x2="15" y2="22.01"></line><line x1="9" y1="6" x2="9.01" y2="6"></line><line x1="15" y1="6" x2="15.01" y2="6"></line><line x1="9" y1="10" x2="9.01" y2="10"></line><line x1="15" y1="10" x2="15.01" y2="10"></line><line x1="9" y1="14" x2="9.01" y2="14"></line><line x1="15" y1="14" x2="15.01" y2="14"></line><line x1="9" y1="18" x2="9.01" y2="18"></line><line x1="15" y1="18" x2="15.01" y2="18"></line></svg>',
  location: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>',
  calendar: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>',
  check: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',
  github: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>',
  linkedin: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>',
  email: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>',
  phone: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>',
  copy: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>',
  external: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>',
  graduation: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>',
  download: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>',
  send: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>'
};

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize HTML5 Canvas Drifting Interconnected Nodes Background
  initCanvasBackground();

  // 2. Load Portfolio configuration and render dynamic content
  initPortfolio();
});

/**
 * ==========================================================================
 * SECTION 1: HTML5 Canvas Looping Drifting Interconnected Nodes Background
 * ==========================================================================
 */
function initCanvasBackground() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let nodes = [];
  let mouse = { x: null, y: null, radius: 160 };

  const colors = ['#38bdf8', '#818cf8', '#34d399', '#c084fc'];
  const maxDistance = 145;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;

    // Scale node density according to viewport size
    const nodeCount = Math.min(65, Math.max(28, Math.floor((width * height) / 22000)));
    nodes = [];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 2 + 1.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        baseAlpha: Math.random() * 0.16 + 0.1
      });
    }
  }

  resize();
  window.addEventListener('resize', resize);

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  function animate() {
    // Light background trail clearing
    ctx.fillStyle = 'rgba(255, 255, 255, 0.26)';
    ctx.fillRect(0, 0, width, height);

    const nodeLength = nodes.length;

    for (let i = 0; i < nodeLength; i++) {
      const node = nodes[i];

      // Update position
      node.x += node.vx;
      node.y += node.vy;

      // Bounce smoothly off boundaries
      if (node.x <= 0 || node.x >= width) node.vx *= -1;
      if (node.y <= 0 || node.y >= height) node.vy *= -1;

      // Subtle interaction with mouse cursor
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (1 - dist / mouse.radius) * 0.015;
          node.x -= dx * force;
          node.y -= dy * force;
        }
      }

      // Draw node circle
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      ctx.fillStyle = node.color;
      ctx.globalAlpha = node.baseAlpha;
      ctx.fill();

      // Interconnect with neighboring nodes
      for (let j = i + 1; j < nodeLength; j++) {
        const nodeB = nodes[j];
        const dx = node.x - nodeB.x;
        const dy = node.y - nodeB.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDistance) {
          const lineAlpha = (1 - dist / maxDistance) * 0.08;
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(nodeB.x, nodeB.y);
          ctx.strokeStyle = '#38bdf8';
          ctx.globalAlpha = lineAlpha;
          ctx.lineWidth = 0.85;
          ctx.stroke();
        }
      }
    }

    ctx.globalAlpha = 1.0;
    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}

/**
 * ==========================================================================
 * SECTION 2: Terminal-style Recursive setTimeout Typing Animation
 * ==========================================================================
 */
function startTerminalTyping(element, titles, titleIdx = 0, charIdx = 0, isDeleting = false) {
  if (!element || !titles || titles.length === 0) return;

  const currentTitle = titles[titleIdx % titles.length];

  if (isDeleting) {
    element.textContent = currentTitle.substring(0, charIdx - 1);
    charIdx--;
  } else {
    element.textContent = currentTitle.substring(0, charIdx + 1);
    charIdx++;
  }

  // Speed variance for organic terminal feel
  let delay = isDeleting ? 35 : 75 + Math.random() * 30;

  if (!isDeleting && charIdx === currentTitle.length) {
    // Finished typing full title, pause before backspacing
    delay = 2200;
    isDeleting = true;
  } else if (isDeleting && charIdx === 0) {
    // Finished backspacing, advance to next title
    isDeleting = false;
    titleIdx++;
    delay = 450;
  }

  // Recursive setTimeout invocation
  setTimeout(() => {
    startTerminalTyping(element, titles, titleIdx, charIdx, isDeleting);
  }, delay);
}

/**
 * ==========================================================================
 * SECTION 3: Native IntersectionObserver for Smooth Slide Up & Fade In
 * ==========================================================================
 */
function setupNativeScrollObserver() {
  const elements = document.querySelectorAll('.reveal-on-scroll');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

/**
 * ==========================================================================
 * SECTION 4: Pure Vanilla YAML Parser (Zero External Libraries)
 * ==========================================================================
 */
function parseVanillaYAML(yamlString) {
  const lines = yamlString.split(/\r?\n/);
  const root = {};
  const stack = [{ indent: -1, obj: root, key: null, isArray: false }];

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    if (!trimmed || trimmed.startsWith('#')) continue;

    const indent = rawLine.search(/\S/);
    const line = trimmed;

    while (stack.length > 1 && indent <= stack[stack.length - 1].indent) {
      stack.pop();
    }

    const current = stack[stack.length - 1];

    if (line.startsWith('- ')) {
      const itemContent = line.slice(2).trim();
      let targetArray;

      if (Array.isArray(current.obj)) {
        targetArray = current.obj;
      } else if (current.key && Array.isArray(current.obj[current.key])) {
        targetArray = current.obj[current.key];
      } else {
        targetArray = [];
        if (current.key) current.obj[current.key] = targetArray;
      }

      if (itemContent.includes(':')) {
        const firstColon = itemContent.indexOf(':');
        const k = itemContent.slice(0, firstColon).trim();
        const v = parseValue(itemContent.slice(firstColon + 1).trim());
        const newObj = { [k]: v };
        targetArray.push(newObj);
        stack.push({ indent, obj: newObj, key: k, isArray: false });
      } else {
        targetArray.push(parseValue(itemContent));
      }
    } else if (line.includes(':')) {
      const colonIdx = line.indexOf(':');
      const key = line.slice(0, colonIdx).trim();
      const valStr = line.slice(colonIdx + 1).trim();

      const targetObj = Array.isArray(current.obj) ? current.obj[current.obj.length - 1] : current.obj;

      if (valStr === '') {
        let nextIsArray = false;
        for (let j = i + 1; j < lines.length; j++) {
          const nextTrim = lines[j].trim();
          if (!nextTrim || nextTrim.startsWith('#')) continue;
          if (nextTrim.startsWith('- ')) nextIsArray = true;
          break;
        }

        if (nextIsArray) {
          targetObj[key] = [];
          stack.push({ indent, obj: targetObj, key, isArray: true });
        } else {
          targetObj[key] = {};
          stack.push({ indent, obj: targetObj[key], key, isArray: false });
        }
      } else {
        targetObj[key] = parseValue(valStr);
      }
    }
  }

  function parseValue(val) {
    if (val === 'true') return true;
    if (val === 'false') return false;
    if (val === 'null' || val === '~') return null;
    if (/^-?\d+(\.\d+)?$/.test(val)) return Number(val);
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      return val.slice(1, -1);
    }
    return val;
  }

  return root;
}

// Expose jsyaml namespace for compatibility
window.jsyaml = {
  load: parseVanillaYAML
};

/**
 * ==========================================================================
 * SECTION 5: Dynamic Portfolio Fetch & Render Controller
 * ==========================================================================
 */
async function initPortfolio() {
  const loadingEl = document.getElementById('loading-state');
  const errorEl = document.getElementById('error-state');
  const errorMessageEl = document.getElementById('error-message');
  const mainContent = document.getElementById('main-content');

  try {
    const response = await fetch('new-config.yaml');
    if (!response.ok) {
      throw new Error(`HTTP error fetching configuration! Status: ${response.status} (${response.statusText})`);
    }

    const yamlText = await response.text();
    const data = parseVanillaYAML(yamlText);

    if (!data || !data.personal) {
      throw new Error('Parsed configuration is missing required personal profile data.');
    }

    // Populate DOM sections
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

    // Start terminal-style typing animation for the main title
    const typingTarget = document.getElementById('typing-title');
    const titlesToType = [
      'Software Engineer',
      'Python Developer',
      'Backend & Agentic AI Developer',
      'Distributed Systems',
      'Cloud & Docker & Kubernetes'
    ];
    startTerminalTyping(typingTarget, titlesToType);

    // Fade in content
    if (loadingEl) loadingEl.style.display = 'none';
    if (mainContent) mainContent.style.opacity = '1';

    // Initialize native scroll observer
    setupNativeScrollObserver();
  } catch (err) {
    console.error('Portfolio initialization error:', err);
    if (loadingEl) loadingEl.style.display = 'none';
    if (errorEl) {
      errorEl.style.display = 'flex';
      if (errorMessageEl) errorMessageEl.textContent = err.message;
    }
  }
}

/**
 * Render Hero Section with Terminal Typing Target and Blinking Cursor
 */
function renderHero(personal = {}, contact = {}, summary = {}) {
  const heroContainer = document.getElementById('hero-section');
  if (!heroContainer) return;

  const stats = summary.stats || [];
  const statsHtml = stats.map(stat => `
    <div class="stat-card glass-card">
      <span class="stat-value">${escapeHtml(stat.value)}</span>
      <span class="stat-label">${escapeHtml(stat.label)}</span>
    </div>
  `).join('');

  heroContainer.innerHTML = `
    <div class="container hero-container">
      <div class="hero-badge-wrapper">
        <span class="status-indicator">
          <span class="status-dot pulse"></span>
          ${escapeHtml(personal.availability || 'Available for full-time opportunities')}
        </span>
      </div>

      <div class="hero-grid">
        <div class="hero-text-content">
          <p class="hero-greeting">Hi, my name is</p>
          <h1 class="hero-name">${escapeHtml(personal.name || 'Pabolu Manohar')}</h1>
          
          <!-- Terminal-style typing headline with CSS blinking cursor -->
          <div class="hero-headline">
            <span class="terminal-prompt">&gt;</span>
            <span id="typing-title" class="typing-target"></span><span class="terminal-cursor">_</span>
          </div>
          
          <p class="hero-bio">
            ${escapeHtml(summary.bio || 'Software Engineer specializing in Python, FastAPI, distributed backend systems, Agentic AI, and Kubernetes cloud infrastructure.')}
          </p>

          <div class="hero-cta-group">
            <a href="#experience-section" class="btn btn-primary">
              ${SVG_ICONS.briefcase} View Work Experience
            </a>
            <a href="${escapeHtml(personal.resume || 'resume/Pabolu_Manohar_Resume.docx')}" download class="btn btn-secondary" title="Download Pabolu Manohar Resume (.docx)">
              ${SVG_ICONS.download} Download Resume
            </a>
            <a href="#contact-section" class="btn btn-secondary">
              ${SVG_ICONS.send} Contact Me
            </a>
            <div class="hero-social-links">
              ${contact.github ? `
                <a href="${escapeHtml(contact.github)}" target="_blank" rel="noopener noreferrer" class="social-btn" title="GitHub">
                  ${SVG_ICONS.github}
                </a>
              ` : ''}
              ${contact.linkedin ? `
                <a href="${escapeHtml(contact.linkedin)}" target="_blank" rel="noopener noreferrer" class="social-btn" title="LinkedIn">
                  ${SVG_ICONS.linkedin}
                </a>
              ` : ''}
              ${contact.email ? `
                <button class="social-btn copy-email-btn" data-email="${escapeHtml(contact.email)}" title="Copy Email">
                  ${SVG_ICONS.email}
                </button>
              ` : ''}
            </div>
          </div>
        </div>

        <div class="hero-visual-card">
          <div class="profile-card glass-card">
            <div class="avatar-ring">
              <div class="avatar-circle">
                ${personal.profile_pic ? `
                  <img src="${escapeHtml(personal.profile_pic)}" alt="${escapeHtml(personal.name)}" class="avatar-img" />
                ` : `
                  <span class="avatar-initials">${escapeHtml(personal.avatar_initials || 'PM')}</span>
                `}
              </div>
            </div>
            <div class="profile-info">
              <h3 class="profile-name">${escapeHtml(personal.name)}</h3>
              <p class="profile-role">${SVG_ICONS.code} ${escapeHtml(personal.title)}</p>
              <p class="profile-loc">${SVG_ICONS.location} ${escapeHtml(personal.location || 'India')}</p>
            </div>
            <div class="profile-chips">
              <span class="mini-chip">${SVG_ICONS.code} Python & FastAPI</span>
              <span class="mini-chip">${SVG_ICONS.cloud} Docker & Kubernetes</span>
              <span class="mini-chip">${SVG_ICONS.brain} Agentic AI & LangChain EcoSystem & MCP</span>
            </div>
          </div>
        </div>
      </div>

      ${stats.length ? `<div class="hero-stats-row">${statsHtml}</div>` : ''}
    </div>
  `;
}

/**
 * Render About Section
 */
function renderAbout(summary = {}, leadership = []) {
  const aboutContainer = document.getElementById('about-section');
  if (!aboutContainer) return;

  const leadershipHtml = (leadership || []).map(item => `
    <li class="leadership-item">
      ${SVG_ICONS.check}
      <span>${escapeHtml(item)}</span>
    </li>
  `).join('');

  aboutContainer.innerHTML = `
    <div class="container">
      <div class="section-header">
        <span class="section-tag">${SVG_ICONS.user} Overview</span>
        <h2 class="section-title">About & Core Focus</h2>
        <p class="section-subtitle">${escapeHtml(summary.headline || 'Architecting scalable backend platforms & intelligent agent workflows')}</p>
      </div>

      <div class="about-grid">
        <div class="about-card primary-focus-card glass-card">
          <div class="card-icon-header">
            <div class="icon-bubble cyan">${SVG_ICONS.server}</div>
            <h3>Backend & Cloud Engineering</h3>
          </div>
          <p>
            Engineering robust distributed systems using Python (FastAPI), microservices, and asynchronous event streams (Redis, Kafka). Production experience packaging and scaling services on <strong>Kubernetes (GKE)</strong> and Google Cloud Platform with automated telemetry.
          </p>
        </div>

        <div class="about-card primary-focus-card glass-card">
          <div class="card-icon-header">
            <div class="icon-bubble purple">${SVG_ICONS.brain}</div>
            <h3>Agentic AI & Orchestration</h3>
          </div>
          <p>
            Pioneering multi-agent collaborative workflows with <strong>LangChain, LangGraph, Model Context Protocol (MCP)</strong>, and LiteLLM gateways. Implementing full LLM observability with Langfuse to analyze latency, token economics, and multi-step tool execution.
          </p>
        </div>

        <div class="about-card primary-focus-card glass-card">
          <div class="card-icon-header">
            <div class="icon-bubble emerald">${SVG_ICONS.network}</div>
            <h3>Systems & Tunneling Protocols</h3>
          </div>
          <p>
            Invented real-world hardware tunneling solutions (USB-over-WebSocket, TCP/IP, ADB encapsulation) and real-time media streams (WebRTC STUN/TURN) enabling remote orchestration of physical mobile device fleets.
          </p>
        </div>
      </div>

      ${leadership.length ? `
        <div class="leadership-box glass-card">
          <div class="leadership-header">
            ${SVG_ICONS.code}
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
 * Render Work Experience (FlintLab Timeline with Glassmorphic Cards)
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
      <div class="timeline-item ${index === 0 ? 'current-role' : ''}">
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
                  ${SVG_ICONS.building} ${escapeHtml(exp.company)}
                </span>
                <span class="role-location">
                  ${SVG_ICONS.location} ${escapeHtml(exp.location)}
                </span>
              </div>
            </div>
            <div class="period-badge">
              ${SVG_ICONS.calendar} ${escapeHtml(exp.period)}
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
      <div class="section-header">
        <span class="section-tag">${SVG_ICONS.briefcase} Career Journey</span>
        <h2 class="section-title">Work Experience</h2>
        <p class="section-subtitle">Real-world production engineering, distributed systems, and AI infrastructure at FlintLab</p>
      </div>

      <div class="timeline">
        ${timelineHtml}
      </div>
    </div>
  `;
}

/**
 * Render Technical Skills
 */
function renderSkills(categories = []) {
  const skillsContainer = document.getElementById('skills-section');
  if (!skillsContainer) return;

  const categoryIcons = {
    'Agentic AI & LLMs': SVG_ICONS.brain,
    'Backend & Distributed Systems': SVG_ICONS.server,
    'Cloud & Infrastructure': SVG_ICONS.cloud,
    'Observability & DevOps': SVG_ICONS.chart,
    'Databases & Protocols': SVG_ICONS.database
  };

  const cardsHtml = (categories || []).map(cat => {
    const itemsHtml = (cat.items || []).map(skill => {
      const isKey = ['Python', 'FastAPI', 'Kubernetes (GKE)', 'LangChain', 'LangGraph', 'Model Context Protocol (MCP)'].includes(skill);
      return `<span class="skill-badge ${isKey ? 'skill-featured' : ''}">${escapeHtml(skill)}</span>`;
    }).join('');

    const iconSvg = categoryIcons[cat.category] || SVG_ICONS.code;

    return `
      <div class="skill-category-card glass-card" data-category="${escapeHtml(cat.category)}">
        <div class="category-header">
          <div class="cat-icon-wrap">
            ${iconSvg}
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
      <div class="section-header">
        <span class="section-tag">${SVG_ICONS.code} Tooling</span>
        <h2 class="section-title">Technical Skills</h2>
        <p class="section-subtitle">Specialized in high-concurrency backends, agent systems, and cloud native stacks</p>
      </div>

      <div class="skills-filter-tabs" id="skills-tabs">
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
 * Render Projects Section (Glassmorphic Cards with Keyframes Glowing Gradient Border)
 */
function renderProjects(projects = []) {
  const projContainer = document.getElementById('projects-section');
  if (!projContainer) return;

  const cardsHtml = (projects || []).map(proj => {
    const techPills = (proj.tech_stack || []).map(t => `<span class="tech-pill">${escapeHtml(t)}</span>`).join('');

    return `
      <div class="project-card glass-card">
        <div class="project-top">
          <span class="project-category-tag">${escapeHtml(proj.category || 'Engineering Project')}</span>
          ${proj.github_link ? `
            <a href="${escapeHtml(proj.github_link)}" target="_blank" rel="noopener noreferrer" class="project-link-btn" title="View Source on GitHub">
              ${SVG_ICONS.github}
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
      <div class="section-header">
        <span class="section-tag">${SVG_ICONS.code} Architecture</span>
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
 * Render Education & Certifications
 */
function renderEducation(education = [], certifications = []) {
  const eduContainer = document.getElementById('education-section');
  if (!eduContainer) return;

  const eduHtml = (education || []).map(edu => `
    <div class="education-card glass-card">
      <div class="edu-icon-bubble">
        ${SVG_ICONS.graduation}
      </div>
      <div class="edu-details">
        <div class="edu-header-row">
          <h3 class="edu-degree">${escapeHtml(edu.degree)}</h3>
          <span class="edu-period">${escapeHtml(edu.period)}</span>
        </div>
        <h4 class="edu-institution">${escapeHtml(edu.institution)}</h4>
        <div class="edu-meta">
          <span class="edu-score">${SVG_ICONS.check} ${escapeHtml(edu.score || '')}</span>
          <span class="edu-loc">${SVG_ICONS.location} ${escapeHtml(edu.location || '')}</span>
        </div>
        ${edu.highlights ? `<p class="edu-highlights">${escapeHtml(edu.highlights)}</p>` : ''}
      </div>
    </div>
  `).join('');

  const certsHtml = (certifications || []).map(cert => `
    <div class="cert-item glass-card">
      <div class="cert-badge-icon">
        ${SVG_ICONS.check}
      </div>
      <div class="cert-content">
        <h4 class="cert-name">${escapeHtml(cert.name)}</h4>
        <p class="cert-issuer">${escapeHtml(cert.issuer)} · <span class="cert-date">${escapeHtml(cert.date)}</span></p>
      </div>
    </div>
  `).join('');

  eduContainer.innerHTML = `
    <div class="container">
      <div class="section-header">
        <span class="section-tag">${SVG_ICONS.graduation} Credentials</span>
        <h2 class="section-title">Education & Certifications</h2>
        <p class="section-subtitle">Academic foundations in Computer Science and continuous technical upskilling</p>
      </div>

      <div class="edu-cert-layout">
        <div class="edu-column">
          <h3 class="column-subtitle">${SVG_ICONS.graduation} Academic Background</h3>
          <div class="edu-list">
            ${eduHtml}
          </div>
        </div>

        <div class="cert-column">
          <h3 class="column-subtitle">${SVG_ICONS.check} Specialized Certifications</h3>
          <div class="cert-grid">
            ${certsHtml}
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Render Contact Section
 */
function renderContact(contact = {}, personal = {}) {
  const contactContainer = document.getElementById('contact-section');
  if (!contactContainer) return;

  contactContainer.innerHTML = `
    <div class="container">
      <div class="contact-card glass-card">
        <div class="contact-header">
          <span class="section-tag">${SVG_ICONS.send} Communication</span>
          <h2 class="section-title">Let's Connect</h2>
          <p class="section-subtitle">
            Interested in building high-scale distributed backends, resilient Kubernetes infrastructure, or autonomous Agentic AI systems? My inbox is always open.
          </p>
        </div>

        <div class="contact-methods-grid">
          ${contact.email ? `
            <div class="contact-method-box">
              <div class="method-icon">${SVG_ICONS.email}</div>
              <div class="method-info">
                <span class="method-label">Email Address</span>
                <a href="mailto:${escapeHtml(contact.email)}" class="method-value">${escapeHtml(contact.email)}</a>
              </div>
              <button class="btn-copy copy-email-btn" data-email="${escapeHtml(contact.email)}" title="Copy Email">
                ${SVG_ICONS.copy}
              </button>
            </div>
          ` : ''}

          ${contact.phone ? `
            <div class="contact-method-box">
              <div class="method-icon">${SVG_ICONS.phone}</div>
              <div class="method-info">
                <span class="method-label">Phone</span>
                <a href="tel:${escapeHtml(contact.phone)}" class="method-value">${escapeHtml(contact.phone)}</a>
              </div>
            </div>
          ` : ''}

          ${contact.github ? `
            <div class="contact-method-box">
              <div class="method-icon">${SVG_ICONS.github}</div>
              <div class="method-info">
                <span class="method-label">GitHub</span>
                <a href="${escapeHtml(contact.github)}" target="_blank" rel="noopener noreferrer" class="method-value">
                  github.com/PaboluManohar
                </a>
              </div>
              <a href="${escapeHtml(contact.github)}" target="_blank" rel="noopener noreferrer" class="btn-copy" title="Open GitHub">
                ${SVG_ICONS.external}
              </a>
            </div>
          ` : ''}

          ${contact.linkedin ? `
            <div class="contact-method-box">
              <div class="method-icon">${SVG_ICONS.linkedin}</div>
              <div class="method-info">
                <span class="method-label">LinkedIn</span>
                <a href="${escapeHtml(contact.linkedin)}" target="_blank" rel="noopener noreferrer" class="method-value">
                  linkedin.com/in/pabolumanohar
                </a>
              </div>
              <a href="${escapeHtml(contact.linkedin)}" target="_blank" rel="noopener noreferrer" class="btn-copy" title="Open LinkedIn">
                ${SVG_ICONS.external}
              </a>
            </div>
          ` : ''}

          <div class="contact-method-box">
            <div class="method-icon">${SVG_ICONS.download}</div>
            <div class="method-info">
              <span class="method-label">Curriculum Vitae</span>
              <a href="${escapeHtml(personal.resume || 'resume/Pabolu_Manohar_Resume.docx')}" download class="method-value">
                Pabolu_Manohar_Resume.docx
              </a>
            </div>
            <a href="${escapeHtml(personal.resume || 'resume/Pabolu_Manohar_Resume.docx')}" download class="btn-copy" title="Download Resume (.docx)">
              ${SVG_ICONS.download}
            </a>
          </div>
        </div>

        <div class="contact-cta-wrapper">
          <a href="mailto:${escapeHtml(contact.email || '')}" class="btn btn-primary btn-large">
            ${SVG_ICONS.send} Send Direct Email
          </a>
        </div>
      </div>
    </div>
  `;
}

/**
 * Interactive Utilities
 */
function setupNavigation() {
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
      });
    });
  }

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
      } else {
        card.style.display = 'none';
      }
    });
  });
}

function setupClipboardActions() {
  document.addEventListener('click', (e) => {
    const copyBtn = e.target.closest('.copy-email-btn');
    if (!copyBtn) return;

    const email = copyBtn.getAttribute('data-email');
    if (!email) return;

    navigator.clipboard.writeText(email).then(() => {
      showToast(`Copied ${email} to clipboard!`);
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
