import { useEffect, useState, type FormEvent } from 'react'
import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
  Code2,
  Github,
  GraduationCap,
  Mail,
  Menu,
  Shield,
  X,
} from 'lucide-react'
import './App.css'

const emailAddress = 'nabaradirector@gmail.com'
const navItems = [
  { label: 'About', id: 'about' },
  { label: 'Work', id: 'portfolio' },
  { label: 'Experience', id: 'resume' },
  { label: 'Contact', id: 'contact' },
]

const projects = [
  {
    number: '01',
    name: 'FindFood',
    type: 'Food delivery platform',
    role: 'Collaborative full-stack developer',
    description:
      'A food delivery platform connecting customers, restaurants and delivery riders through role-based experiences.',
    problem:
      'Food orders involve several different participants. FindFood brings customer ordering, restaurant management and rider workflows together in one platform.',
    features: [
      'User authentication and account management',
      'Role-based access for customers, restaurants, riders and administrators',
      'Restaurant management and food ordering',
      'Backend API, database and payment integrations',
      'Paystack payment and Google authentication integrations',
    ],
    technologies: ['Python', 'FastAPI', 'Flutter', 'Dart', 'SQLAlchemy', 'SQLite / PostgreSQL', 'Paystack'],
    motif: 'findfood',
  },
  {
    number: '02',
    name: 'EcoBin Ghana',
    type: 'Waste management & recycling',
    role: 'Full-stack web developer',
    description:
      'A subscription-based web platform encouraging waste separation and helping households and institutions arrange collections.',
    problem:
      'EcoBin Ghana supports more organised waste collection with subscription options and incentives for responsible waste segregation.',
    features: [
      'Individual, household and institutional packages',
      'Custom packages based on customer requirements',
      'Colour-coded bins to encourage waste separation',
      'On-demand collection requests and recurring schedules',
      'Reward points redeemable for discounts, airtime and coupons',
    ],
    technologies: ['Python', 'Django', 'HTML', 'CSS', 'JavaScript'],
    motif: 'ecobin',
  },
  {
    number: '03',
    name: 'DataHub',
    type: 'Digital data marketplace',
    role: 'Independent developer',
    description:
      'An online marketplace that makes it easier for customers to purchase mobile data bundles.',
    problem:
      'DataHub brings bundle management, customer accounts and online payment into a single digital purchasing experience.',
    features: [
      'User accounts with email OTP verification',
      'Google authentication',
      'Data bundle management',
      'Paystack payment integration',
      'Backend and database operations',
    ],
    technologies: ['Python', 'Django', 'HTML', 'CSS', 'JavaScript', 'SQLite', 'Paystack'],
    motif: 'datahub',
  },
  {
    number: '04',
    name: 'Campus Event Notification System',
    type: 'University communications',
    role: 'Independent developer',
    description:
      'A web-based event management and notification platform for sharing campus events with students and staff.',
    problem:
      'The system helps university management organise event information and notify the groups who need to know about it.',
    features: [
      'Create and schedule campus events',
      'Assign venues and manage event information',
      'Target students, Heads of Departments, teaching and non-teaching staff',
      'Publish events and send notifications to selected groups',
    ],
    technologies: ['Python', 'Django', 'HTML', 'CSS', 'JavaScript', 'SQLite'],
    motif: 'campus',
  },
  {
    number: '05',
    name: 'Project Archive',
    type: 'Academic resource platform',
    role: 'Developer',
    description:
      'A web platform for storing and organising university projects so final-year students can explore previous academic work.',
    problem:
      'The archive makes past student research and project documents easier to browse and access for research and guidance.',
    features: [
      'Central storage for past academic projects',
      'Browse and access project work',
      'Organised academic documents',
    ],
    technologies: ['Python', 'HTML', 'CSS', 'JavaScript', 'SQLite'],
    motif: 'archive',
  },
  {
    number: '06',
    name: 'Bendu Village Resort',
    type: 'Hospitality website',
    role: 'Web developer',
    description:
      'A website introducing visitors to Bendu Village Resort and its setting around the Kitase and Aburi Hills area.',
    problem:
      'The website gives visitors an online place to learn about the resort, its environment and services.',
    features: ['Resort information', 'Location and environment overview', 'Service presentation'],
    technologies: ['HTML', 'CSS', 'JavaScript'],
    motif: 'resort',
    liveUrl: 'https://caddilac1.github.io/Bendu-Resort/index.html',
  },
]

const skillGroups = [
  {
    label: 'Programming',
    skills: [
      ['Python', 'Intermediate'],
      ['JavaScript', 'Intermediate'],
      ['C++', 'Beginner'],
      ['C#', 'Beginner'],
      ['Java', 'Beginner'],
      ['Dart', 'Beginner'],
    ],
  },
  {
    label: 'Web development',
    skills: [
      ['HTML', 'Intermediate'],
      ['CSS', 'Intermediate'],
      ['JavaScript', 'Intermediate'],
      ['Django', 'Intermediate'],
      ['FastAPI', 'Beginner'],
      ['Flutter', 'Beginner'],
      ['.NET', 'Basic experience'],
    ],
  },
  {
    label: 'Data & tools',
    skills: [
      ['SQLite', 'Intermediate'],
      ['MySQL', 'Beginner'],
      ['SQL', 'Working knowledge'],
      ['Git & GitHub', ''],
      ['Visual Studio Code', ''],
      ['Linux', ''],
    ],
  },
]

const certificates = [
  {
    organisation: 'FATA',
    title: 'Coding Challenge',
    description: 'Placed third in an overall coding challenge.',
    marker: '03',
  },
  {
    organisation: 'FATA',
    title: 'Security Awareness',
    description: 'Course covering security awareness and basic cybersecurity practices.',
    marker: 'SEC',
  },
  {
    organisation: 'Alison',
    title: 'Machine Learning in Python Environment',
    description: 'Training in machine learning concepts and their application using Python.',
    marker: 'ML',
  },
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [photoLoaded, setPhotoLoaded] = useState(true)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActiveSection(visible.target.id)
      },
      { rootMargin: '-25% 0px -60% 0px', threshold: [0, 0.2, 0.5] },
    )
    document.querySelectorAll<HTMLElement>('main section[id]').forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const name = String(formData.get('name') ?? '').trim()
    const email = String(formData.get('email') ?? '').trim()
    const message = String(formData.get('message') ?? '').trim()
    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`)
    const body = encodeURIComponent(`From: ${name}\nEmail: ${email}\n\n${message}`)
    window.location.href = `mailto:${emailAddress}?subject=${subject}&body=${body}`
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(emailAddress)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${emailAddress}`
    }
  }

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="wordmark" href="#home" aria-label="Caddilac Akoto, home">
          <span className="wordmark-mark">CK</span>
          <span>Caddilac Akoto</span>
        </a>
        <nav className={`main-nav${menuOpen ? ' is-open' : ''}`} aria-label="Main navigation">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={activeSection === item.id ? 'active' : ''}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a className="nav-cta" href={`mailto:${emailAddress}?subject=${encodeURIComponent('Request for CV')}`}>
            Request CV <ArrowUpRight size={14} />
          </a>
        </nav>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </header>

      <main>
        <section className="hero section-wrap" id="home">
          <div className="hero-copy">
            <p className="eyebrow"><span className="status-dot" /> Computer Science · Accra, Ghana</p>
            <h1>
              Building useful
              <br />
              things with <span>technology.</span>
            </h1>
            <p className="hero-name">I’m Caddilac Kwasi Akoto</p>
            <p className="hero-summary">
              Computer Science student, software developer and cybersecurity enthusiast. I build web and
              mobile applications, and keep learning by solving practical problems with code.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#portfolio">
                Explore my projects <ArrowDownRight size={17} />
              </a>
              <a className="button button-quiet" href="#contact">
                Get in touch <ArrowUpRight size={16} />
              </a>
            </div>
            <div className="hero-socials">
              <a href="https://github.com/caddilac1" target="_blank" rel="noreferrer">
                <Github size={16} /> GitHub <ArrowUpRight size={12} />
              </a>
              <span className="hero-social-separator" />
              <span>Open to learning and collaboration</span>
            </div>
          </div>
          <div className="hero-visual" aria-label="Portrait of Caddilac Kwasi Akoto">
            <div className="portrait-frame">
              {photoLoaded ? (
                <img
                  src={`${import.meta.env.BASE_URL}images/profile.jpeg`}
                  alt="Caddilac Kwasi Akoto"
                  onError={() => setPhotoLoaded(false)}
                />
              ) : (
                <div className="portrait-placeholder">
                  <span>CKA</span>
                  <small>Portrait goes here</small>
                </div>
              )}
              <span className="portrait-index">PROFILE / 001</span>
            </div>
            <div className="hero-note">
              <span className="note-icon"><Code2 size={17} /></span>
              <span><strong>Curious by nature.</strong><br />Practical by design.</span>
            </div>
            <span className="visual-coordinate">05°36' N &nbsp; 00°11' W</span>
          </div>
          <a className="scroll-cue" href="#about"><span>Scroll to explore</span><ArrowDown size={15} /></a>
          <div className="hero-index">PORTFOLIO <span>—</span> 2026</div>
        </section>

        <section className="intro-strip" aria-label="Areas of interest">
          <div className="section-wrap strip-inner">
            <span className="strip-label">FOCUSED ON</span>
            <span>Software engineering</span><i />
            <span>Web & mobile</span><i />
            <span>Cybersecurity</span><i />
            <span>Emerging technology</span>
          </div>
        </section>

        <section className="content-section section-wrap about-section" id="about">
          <div className="section-heading">
            <p className="eyebrow">01 / A little about me</p>
            <h2>Grounded in learning.<br /><span>Driven to build.</span></h2>
          </div>
          <div className="about-content">
            <p className="about-lead">
              I’m a Computer Science student at Ghana Communication Technology University with hands-on
              experience building web and mobile applications.
            </p>
            <div className="about-detail">
              <p>
                I enjoy taking an idea from a problem to a useful digital tool. My projects have ranged
                from a food delivery platform to a campus events system, and I’ve contributed to both
                independent and collaborative development work.
              </p>
              <p>
                I’m growing my skills in software engineering while exploring cybersecurity, networking,
                AI and machine learning, and embedded systems. I value thoughtful problem-solving, steady
                learning and technology that serves a real purpose.
              </p>
              <a className="text-link" href="#resume">More about my journey <ArrowRight size={15} /></a>
            </div>
          </div>
          <div className="about-facts">
            <div><span className="fact-number">400</span><span className="fact-label">Level · final year</span></div>
            <div><span className="fact-number">06</span><span className="fact-label">Projects featured</span></div>
            <div><span className="fact-number">2027</span><span className="fact-label">Expected completion</span></div>
            <div className="fact-mark"><Shield size={23} /><span>Always learning<br />with purpose</span></div>
          </div>
        </section>

        <section className="work-section" id="portfolio">
          <div className="section-wrap">
            <div className="section-heading work-heading">
              <div>
                <p className="eyebrow">02 / Selected work</p>
                <h2>Projects with a<br /><span>purpose behind them.</span></h2>
              </div>
              <p className="heading-aside">A selection of independent and collaborative projects. Open a project to see what it does and the technologies behind it.</p>
            </div>
            <div className="project-grid">
              {projects.map((project, index) => (
                <article className={`project-card project-${project.motif}`} key={project.name}>
                  <div className="project-art" aria-hidden="true">
                    <span className="project-art-no">{project.number} / PROJECT</span>
                    <div className="art-graphic">
                      <span className="art-orbit orbit-one" />
                      <span className="art-orbit orbit-two" />
                      <span className="art-core">{index === 0 ? 'F' : index === 1 ? 'E' : index === 2 ? 'D' : index === 3 ? 'C' : index === 4 ? 'P' : 'B'}</span>
                      <span className="art-line" />
                    </div>
                    <span className="project-art-type">{project.type}</span>
                  </div>
                  <div className="project-body">
                    <div className="project-title-line">
                      <div><p className="project-role">{project.role}</p><h3>{project.name}</h3></div>
                      {project.liveUrl ? (
                        <a className="project-open" href={project.liveUrl} target="_blank" rel="noreferrer" aria-label={`Visit ${project.name} live website`}>
                          <ArrowUpRight size={17} />
                        </a>
                      ) : <span className="project-number">{project.number}</span>}
                    </div>
                    <p className="project-description">{project.description}</p>
                    <div className="tech-tags">{project.technologies.slice(0, 4).map((tech) => <span key={tech}>{tech}</span>)}{project.technologies.length > 4 && <span>+{project.technologies.length - 4}</span>}</div>
                    <details className="project-details">
                      <summary>Project details <ArrowDown size={14} /></summary>
                      <div className="details-content">
                        <h4>What it addresses</h4>
                        <p>{project.problem}</p>
                        <h4>Key features</h4>
                        <ul>{project.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
                        <h4>Built with</h4>
                        <p>{project.technologies.join(' · ')}</p>
                      </div>
                    </details>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="content-section section-wrap journey-section" id="resume">
          <div className="section-heading">
            <p className="eyebrow">03 / The journey so far</p>
            <h2>Learning through<br /><span>study & practice.</span></h2>
          </div>
          <div className="journey-grid">
            <div className="journey-column">
              <h3 className="column-title"><BriefcaseBusiness size={17} /> Experience</h3>
              <article className="journey-entry">
                <span className="entry-marker" />
                <p className="entry-meta">SOFTWARE DEVELOPMENT</p>
                <h4>Software Developer</h4>
                <p className="entry-place">Office of the Executive Secretary to the Former Vice President of Ghana</p>
                <p className="entry-copy">Contributed to software development activities and helped create digital solutions.</p>
              </article>
              <article className="journey-entry">
                <span className="entry-marker" />
                <p className="entry-meta">INTERNSHIP · FIVE PROJECTS</p>
                <h4>Software Developer Intern</h4>
                <p className="entry-place">CodeSoft</p>
                <p className="entry-copy">Applied programming, problem-solving and debugging while completing practical projects:</p>
                <ul className="compact-list">
                  <li>Contact Management and To-Do List apps (Python, Django)</li>
                  <li>Interactive JavaScript game</li>
                  <li>Command-line calculator and password generator (Python)</li>
                </ul>
              </article>
            </div>
            <div className="journey-column education-column">
              <h3 className="column-title"><GraduationCap size={18} /> Education & training</h3>
              <article className="journey-entry">
                <span className="entry-marker" />
                <p className="entry-meta">EXPECTED COMPLETION · 2027</p>
                <h4>BSc Computer Science</h4>
                <p className="entry-place">Ghana Communication Technology University</p>
                <p className="entry-copy">Level 400 — final year. Studying software engineering, programming, databases, computer networks and information technology.</p>
              </article>
              <article className="journey-entry">
                <span className="entry-marker" />
                <p className="entry-meta">SIX-MONTH PROGRAMME</p>
                <h4>Professional Software Engineering Training</h4>
                <p className="entry-place">IPMC Ghana</p>
                <p className="entry-copy">Programming methods, Python, C++, HTML, Microsoft SQL Server, and Systems Analysis and Design. Training completed; certificate not yet received.</p>
              </article>
              <article className="journey-entry">
                <span className="entry-marker" />
                <p className="entry-meta">FOUR-WEEK PROGRAMME</p>
                <h4>Arduino Fundamentals</h4>
                <p className="entry-place">International Focus</p>
                <p className="entry-copy">Fundamentals of Arduino, basic electronics, microcontrollers and practical hardware projects.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="skills-section">
          <div className="section-wrap">
            <div className="section-heading skills-heading">
              <div><p className="eyebrow">04 / Tools of the trade</p><h2>Skills I’m <span>growing.</span></h2></div>
              <p className="heading-aside">A practical toolkit built through coursework, training and hands-on projects.</p>
            </div>
            <div className="skills-grid">
              {skillGroups.map((group) => (
                <div className="skill-group" key={group.label}>
                  <p className="skill-group-label">{group.label}</p>
                  {group.skills.map(([skill, level]) => (
                    <div className="skill-row" key={skill}>
                      <span>{skill}</span><span className="skill-level">{level || 'Tools'}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div className="interest-row">
              <span className="interest-label">EXPLORING</span>
              {['Software engineering', 'Cybersecurity', 'AI & machine learning', 'Networking', 'Embedded systems & IoT'].map((interest) => <span key={interest}>{interest}</span>)}
            </div>
          </div>
        </section>

        <section className="content-section section-wrap recognition-section">
          <div className="section-heading recognition-heading">
            <div><p className="eyebrow">05 / Recognition & learning</p><h2>Curiosity, put<br /><span>into practice.</span></h2></div>
            <p className="heading-aside">Courses and recognition that reflect a continued interest in technology and problem-solving.</p>
          </div>
          <div className="recognition-grid">
            {certificates.map((certificate) => (
              <article className="recognition-card" key={certificate.title}>
                <span className="recognition-mark">{certificate.marker}</span>
                <p className="entry-meta">{certificate.organisation}</p>
                <h3>{certificate.title}</h3>
                <p>{certificate.description}</p>
                <span className="verification-note">Verification link to be added</span>
              </article>
            ))}
            <article className="recognition-card freecodecamp-card">
              <span className="recognition-mark">300<span>h</span></span>
              <p className="entry-meta">FREECODECAMP · DEC 10, 2024</p>
              <h3>Responsive Web Design</h3>
              <p>Approximately 300 hours of practical HTML, CSS and responsive design training, completed with five projects.</p>
              <a className="text-link" href="https://freecodecamp.org/certification/caddilac1/responsive-web-design" target="_blank" rel="noreferrer">
                Verify certification <ArrowUpRight size={14} />
              </a>
            </article>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="section-wrap contact-wrap">
            <div className="contact-copy">
              <p className="eyebrow">06 / Start a conversation</p>
              <h2>Have something<br />in <span>mind?</span></h2>
              <p>I’m always glad to connect about software, learning opportunities and thoughtful projects.</p>
              <button className="email-copy" type="button" onClick={copyEmail}>
                <Mail size={17} /> {emailAddress} {copied ? <Check size={15} /> : <ArrowUpRight size={14} />}
              </button>
              <div className="contact-links">
                <a href="tel:0557468828">055 746 8828</a>
                <span>Accra, Ghana</span>
                <a href="https://github.com/caddilac1" target="_blank" rel="noreferrer"><Github size={15} /> GitHub <ArrowUpRight size={12} /></a>
              </div>
            </div>
            <form className="contact-form" onSubmit={handleContactSubmit}>
              <p className="form-intro">Send a note <span>—</span> I’ll get back to you by email.</p>
              <label htmlFor="contact-name">Your name</label>
              <input id="contact-name" name="name" type="text" autoComplete="name" required placeholder="Name" />
              <label htmlFor="contact-email">Email address</label>
              <input id="contact-email" name="email" type="email" autoComplete="email" required placeholder="you@example.com" />
              <label htmlFor="contact-message">What would you like to talk about?</label>
              <textarea id="contact-message" name="message" rows={4} required placeholder="Write your message..." />
              <button className="button button-primary form-submit" type="submit">Open email to send <ArrowUpRight size={16} /></button>
              <p className="form-note">Your email app will open with your message ready to send.</p>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer section-wrap">
        <a className="wordmark footer-wordmark" href="#home"><span className="wordmark-mark">CK</span><span>Caddilac Akoto</span></a>
        <p>Computer Science student · Software developer · Always learning</p>
        <a href="#home" className="back-top">Back to top <ArrowUpRight size={14} /></a>
        <span className="footer-copy">© {new Date().getFullYear()} Caddilac Kwasi Akoto</span>
      </footer>
    </div>
  )
}

export default App
