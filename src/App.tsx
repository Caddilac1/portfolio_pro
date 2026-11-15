import { useEffect, useState, type FormEvent } from 'react'
import {
  Download,
  ExternalLink,
  Github,
  Mail,
  MapPin,
  Menu,
  Moon,
  Phone,
  Sun,
  X,
} from 'lucide-react'

const emailAddress = 'nabaradirector@gmail.com'
const navItems = ['home', 'about', 'portfolio', 'resume', 'contact']

type PortfolioProject = {
  name: string
  role: string
  description: string
  technologies: string
  features: string[]
  mark: string
  theme: string
  liveUrl?: string
}

type Certification = {
  title: string
  organisation: string
  description: string
  verificationUrl?: string
}

const projects: PortfolioProject[] = [
  {
    name: 'FindFood',
    role: 'Collaborative Full-Stack Developer',
    description:
      'A food delivery platform connecting customers, restaurants and delivery riders.',
    technologies: 'Python, FastAPI, Flutter, Dart, SQLAlchemy, SQLite / PostgreSQL, Paystack',
    features: [
      'User authentication and account management',
      'Role-based access for customers, restaurants, riders and administrators',
      'Restaurant management and food ordering',
      'Backend API and database management',
      'Paystack payment and Google authentication integrations',
    ],
    mark: 'F',
    theme: 'from-blue-500/20 to-cyan-400/10',
  },
  {
    name: 'EcoBin Ghana',
    role: 'Full-Stack Web Developer',
    description:
      'A web-based, subscription waste management and recycling platform for households and institutions.',
    technologies: 'Python, Django, HTML, CSS, JavaScript',
    features: [
      'Individual, household, institutional and custom packages',
      'Colour-coded bins to encourage proper waste separation',
      'On-demand collection requests and recurring schedules',
      'Reward points redeemable for discounts, airtime and coupons',
    ],
    mark: 'E',
    theme: 'from-green-500/20 to-lime-400/10',
  },
  {
    name: 'DataHub',
    role: 'Independent Developer',
    description:
      'A digital marketplace developed to make it easier for customers to purchase mobile data bundles.',
    technologies: 'Python, Django, HTML, CSS, JavaScript, SQLite, Paystack',
    features: [
      'User authentication and email OTP verification',
      'Google authentication',
      'Data bundle and customer account management',
      'Paystack payment integration and database operations',
    ],
    mark: 'D',
    theme: 'from-violet-500/20 to-indigo-400/10',
  },
  {
    name: 'Campus Event Notification System',
    role: 'Independent Developer',
    description:
      'A university event management and notification platform for students and staff.',
    technologies: 'Python, Django, HTML, CSS, JavaScript, SQLite',
    features: [
      'Create and schedule campus events and assign venues',
      'Manage and publish event information',
      'Notify selected students, Heads of Departments, teaching and non-teaching staff',
    ],
    mark: 'C',
    theme: 'from-amber-500/20 to-orange-400/10',
  },
  {
    name: 'Project Archive System',
    role: 'Developer',
    description:
      'A web platform to organise past university academic projects for students preparing their final-year work.',
    technologies: 'Python, HTML, CSS, JavaScript, SQLite',
    features: [
      'Central storage for past academic projects',
      'Browse and access previous project documents',
      'Organised academic work for research and guidance',
    ],
    mark: 'P',
    theme: 'from-sky-500/20 to-blue-400/10',
  },
  {
    name: 'Bendu Village Resort Website',
    role: 'Web Developer',
    description:
      'A website showcasing Bendu Village Resort, located around the Kitase and Aburi Hills area.',
    technologies: 'HTML, CSS, JavaScript',
    features: ['Resort information', 'Environment and services overview'],
    mark: 'B',
    theme: 'from-teal-500/20 to-emerald-400/10',
    liveUrl: 'https://caddilac1.github.io/Bendu-Resort/index.html',
  },
]

const skillGroups = [
  { category: 'Programming Languages', skills: 'Python (Intermediate), JavaScript (Intermediate), C++ (Beginner), C# (Beginner), Java (Beginner), Dart (Beginner)' },
  { category: 'Web Development', skills: 'HTML (Intermediate), CSS (Intermediate), JavaScript (Intermediate)' },
  { category: 'Frameworks & Development', skills: 'Django (Intermediate), FastAPI (Beginner), Flutter (Beginner), .NET (Basic experience)' },
  { category: 'Databases', skills: 'SQLite (Intermediate), MySQL (Beginner), SQL (Working knowledge)' },
  { category: 'Development Tools', skills: 'Git, GitHub, Visual Studio Code, Linux' },
]

const certifications: Certification[] = [
  {
    title: 'Coding Challenge — Third Place',
    organisation: 'FATA',
    description: 'Placed third in an overall coding challenge, demonstrating programming and problem-solving skills.',
  },
  {
    title: 'Security Awareness',
    organisation: 'FATA',
    description: 'Completed a course covering security awareness and basic cybersecurity practices.',
  },
  {
    title: 'Machine Learning in Python Environment',
    organisation: 'Alison',
    description: 'Training in machine learning concepts and their application using Python.',
  },
  {
    title: 'Responsive Web Design',
    organisation: 'freeCodeCamp · December 10, 2024',
    description: 'Approximately 300 hours of HTML, CSS and responsive design training, completed with five projects.',
    verificationUrl: 'https://freecodecamp.org/certification/caddilac1/responsive-web-design',
  },
]

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [photoError, setPhotoError] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    setIsDarkMode(mediaQuery.matches)

    const handleSystemThemeChange = (event: MediaQueryListEvent) => {
      setIsDarkMode(event.matches)
    }

    mediaQuery.addEventListener('change', handleSystemThemeChange)
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode)
  }, [isDarkMode])

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100
      for (const section of navItems) {
        const element = document.getElementById(section)
        if (element && scrollPosition >= element.offsetTop && scrollPosition < element.offsetTop + element.offsetHeight) {
          setActiveSection(section)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
    setIsMenuOpen(false)
  }

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

  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button
              type="button"
              onClick={() => scrollToSection('home')}
              className="flex-shrink-0 text-xl font-semibold text-primary"
            >
              Caddilac Kwasi Akoto
            </button>

            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {navItems.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => scrollToSection(item)}
                    className={`px-3 py-2 text-sm font-medium transition-colors capitalize ${
                      activeSection === item
                        ? 'text-primary border-b-2 border-primary'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={() => setIsDarkMode((dark) => !dark)}
                className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <div className="md:hidden">
                <button
                  type="button"
                  onClick={() => setIsMenuOpen((open) => !open)}
                  className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                  aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                  aria-expanded={isMenuOpen}
                >
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background border-t border-border">
              {navItems.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => scrollToSection(item)}
                  className={`block px-3 py-2 text-base font-medium transition-colors capitalize w-full text-left ${
                    activeSection === item
                      ? 'text-primary bg-accent'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      <section id="home" className="min-h-screen flex items-center justify-center pt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up">
            <p className="text-sm font-medium tracking-wide text-primary mb-5">ACCRA, GHANA · COMPUTER SCIENCE</p>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6">
              Hi, I&apos;m <span className="text-primary">Caddilac Kwasi Akoto</span>
            </h1>
            <h2 className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground mb-8">
              Computer Science Student | Software Developer | Cybersecurity Enthusiast
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
              I&apos;m studying Computer Science at Ghana Communication Technology University and building
              web and mobile applications with Python, Django, FastAPI and Flutter. I enjoy learning
              through practical projects and using technology to solve real-world problems.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                type="button"
                onClick={() => scrollToSection('portfolio')}
                className="px-8 py-4 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
              >
                Explore My Projects
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('contact')}
                className="px-8 py-4 border border-border text-foreground font-medium rounded-lg hover:bg-accent transition-colors"
              >
                Contact Me
              </button>
              <a
                href={`mailto:${emailAddress}?subject=${encodeURIComponent('Request for CV')}`}
                className="px-8 py-4 border border-border text-foreground font-medium rounded-lg hover:bg-accent transition-colors inline-flex items-center gap-2"
              >
                <Download size={18} /> Request CV
              </a>
            </div>
            <div className="mt-10 flex justify-center">
              <a
                href="https://github.com/caddilac1"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Github size={19} /> GitHub <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 bg-secondary/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">About Me</h2>
            <p className="text-lg text-muted-foreground">A Computer Science student who enjoys building useful software</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-scale-in">
              <div className="aspect-square max-w-md mx-auto bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl overflow-hidden flex items-center justify-center">
                {!photoError ? (
                  <img
                    src={`${import.meta.env.BASE_URL}images/profile.jpeg`}
                    alt="Caddilac Kwasi Akoto"
                    className="w-full h-full object-cover"
                    onError={() => setPhotoError(true)}
                  />
                ) : (
                  <div className="w-48 h-48 bg-muted rounded-full flex items-center justify-center text-muted-foreground text-3xl font-semibold">
                    CKA
                  </div>
                )}
              </div>
            </div>

            <div className="animate-fade-in-up space-y-6">
              <div>
                <h3 className="text-2xl font-semibold text-foreground mb-4">Professional Background</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  I&apos;m a Level 400 Computer Science student at Ghana Communication Technology University.
                  Alongside my studies, I&apos;ve gained practical experience through software development
                  work, an internship and projects that range from web applications to a collaborative
                  food delivery platform.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  I&apos;m interested in software engineering, cybersecurity and emerging technologies.
                  I value continuous learning, clear problem-solving and building technology that is
                  useful to people.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-medium text-foreground mb-3">Areas of Interest</h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Software Engineering',
                    'Web Development',
                    'Mobile Applications',
                    'Cybersecurity',
                    'AI & Machine Learning',
                    'Networking',
                    'Embedded Systems & IoT',
                  ].map((interest) => (
                    <span key={interest} className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>

              <a
                href={`mailto:${emailAddress}?subject=${encodeURIComponent('Request for CV')}`}
                className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Mail size={19} className="mr-2" /> Request My CV
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="portfolio" className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">My Portfolio</h2>
            <p className="text-lg text-muted-foreground">Independent and collaborative projects</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <article
                key={project.name}
                className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 group"
              >
                <div className={`aspect-video bg-gradient-to-br ${project.theme} flex items-center justify-center`}>
                  <span className="text-6xl font-bold text-primary/70">{project.mark}</span>
                </div>
                <div className="p-6">
                  <p className="text-xs font-medium uppercase tracking-wide text-primary mb-2">{project.role}</p>
                  <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">{project.description}</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    <span className="font-medium text-foreground">Technologies:</span> {project.technologies}
                  </p>
                  <details className="border-t border-border pt-3">
                    <summary className="cursor-pointer text-sm font-medium text-primary">Project details and features</summary>
                    <ul className="mt-3 space-y-2 list-disc pl-5 text-sm text-muted-foreground">
                      {project.features.map((feature) => <li key={feature}>{feature}</li>)}
                    </ul>
                  </details>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors"
                    >
                      Visit Live Website <ExternalLink size={15} className="ml-2" />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="resume" className="py-20 bg-secondary/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">My Resume</h2>
            <p className="text-lg text-muted-foreground">Professional experience, education and technical skills</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="animate-fade-in-up">
              <h3 className="text-2xl font-semibold text-foreground mb-8">Experience</h3>
              <div className="space-y-8">
                <article className="relative pl-8 pb-8 border-l-2 border-primary/20">
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-primary rounded-full" />
                  <div className="bg-card border border-border rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-foreground">Software Developer</h4>
                    <p className="text-primary font-medium mb-3">
                      Office of the Executive Secretary to the Former Vice President of Ghana
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      Contributed to software development activities and helped create digital solutions.
                    </p>
                  </div>
                </article>
                <article className="relative pl-8 pb-8 border-l-2 border-primary/20">
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-primary rounded-full" />
                  <div className="bg-card border border-border rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-foreground">Software Developer Intern</h4>
                    <p className="text-primary font-medium mb-3">CodeSoft</p>
                    <p className="text-muted-foreground leading-relaxed mb-3">
                      Completed five practical programming projects, applying programming, problem-solving
                      and debugging skills:
                    </p>
                    <ul className="space-y-2 list-disc pl-5 text-muted-foreground">
                      <li>Contact Management and To-Do List applications using Python and Django</li>
                      <li>Interactive game using JavaScript</li>
                      <li>Command-line calculator and password generator using Python</li>
                    </ul>
                  </div>
                </article>
              </div>

              <h3 className="text-2xl font-semibold text-foreground mt-12 mb-6">Certifications & Achievements</h3>
              <div className="space-y-4">
                {certifications.map((certificate) => (
                  <article key={certificate.title} className="bg-card border border-border rounded-lg p-5">
                    <p className="text-sm font-medium text-primary">{certificate.organisation}</p>
                    <h4 className="font-semibold text-foreground mt-1">{certificate.title}</h4>
                    <p className="text-sm text-muted-foreground mt-2">{certificate.description}</p>
                    {certificate.verificationUrl ? (
                      <a
                        href={certificate.verificationUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center text-sm text-primary hover:text-primary/80 mt-3"
                      >
                        Verify Certification <ExternalLink size={14} className="ml-1" />
                      </a>
                    ) : (
                      <p className="text-xs text-muted-foreground mt-3">Verification link to be added</p>
                    )}
                  </article>
                ))}
              </div>
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <h3 className="text-2xl font-semibold text-foreground mb-8">Education & Training</h3>
              <div className="space-y-8 mb-12">
                <article className="relative pl-8 pb-8 border-l-2 border-accent/20">
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-accent rounded-full" />
                  <div className="bg-card border border-border rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-foreground">Bachelor of Science in Computer Science</h4>
                    <p className="text-accent font-medium mb-2">Ghana Communication Technology University</p>
                    <p className="text-sm text-muted-foreground mb-3">Level 400 — Final Year · Expected completion 2027</p>
                    <p className="text-muted-foreground leading-relaxed">
                      Academic focus includes software engineering, programming, database management,
                      computer networks and information technology.
                    </p>
                  </div>
                </article>
                <article className="relative pl-8 pb-8 border-l-2 border-accent/20">
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-accent rounded-full" />
                  <div className="bg-card border border-border rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-foreground">Professional Software Engineering Training</h4>
                    <p className="text-accent font-medium mb-2">IPMC Ghana · Six months</p>
                    <p className="text-muted-foreground leading-relaxed">
                      Programming methods, Python, C++, HTML, Microsoft SQL Server, and Systems Analysis
                      and Design. Training completed; certificate not yet received.
                    </p>
                  </div>
                </article>
                <article className="relative pl-8 pb-8 border-l-2 border-accent/20">
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-accent rounded-full" />
                  <div className="bg-card border border-border rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-foreground">Arduino Fundamentals</h4>
                    <p className="text-accent font-medium mb-2">International Focus · Four weeks</p>
                    <p className="text-muted-foreground leading-relaxed">
                      Fundamentals of Arduino, basic electronics, microcontrollers and practical hardware projects.
                    </p>
                  </div>
                </article>
              </div>

              <h3 className="text-2xl font-semibold text-foreground mb-6">Technical Skills</h3>
              <div className="space-y-4">
                {skillGroups.map((group) => (
                  <div key={group.category} className="bg-card border border-border rounded-lg p-4">
                    <h4 className="font-semibold text-foreground mb-2">{group.category}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{group.skills}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Get In Touch</h2>
            <p className="text-lg text-muted-foreground">I&apos;d be glad to hear from you</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="animate-fade-in-up">
              <form className="space-y-6" onSubmit={handleContactSubmit}>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    autoComplete="name"
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    autoComplete="email"
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors resize-none"
                    placeholder="Write your message..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors inline-flex items-center justify-center"
                >
                  <Mail size={20} className="mr-2" /> Send Message
                </button>
                <p className="text-xs text-muted-foreground text-center">Your email app will open with your message ready to send.</p>
              </form>
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-6">Contact Information</h3>
                  <div className="space-y-4">
                    <a href={`mailto:${emailAddress}`} className="flex items-center group">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                        <Mail className="text-primary" size={20} />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Email</p>
                        <p className="text-muted-foreground group-hover:text-primary transition-colors">{emailAddress}</p>
                      </div>
                    </a>
                    <a href="tel:0557468828" className="flex items-center group">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                        <Phone className="text-primary" size={20} />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Phone</p>
                        <p className="text-muted-foreground group-hover:text-primary transition-colors">0557468828</p>
                      </div>
                    </a>
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                        <MapPin className="text-primary" size={20} />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Location</p>
                        <p className="text-muted-foreground">Accra, Ghana</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-6">GitHub</h3>
                  <a
                    href="https://github.com/caddilac1"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-3 text-primary hover:text-primary/80 transition-colors"
                  >
                    <Github size={21} /> github.com/caddilac1 <ExternalLink size={15} />
                  </a>
                </div>

                <div className="bg-card border border-border rounded-xl p-6">
                  <h4 className="font-semibold text-foreground mb-3">Let&apos;s Connect</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    I&apos;m interested in software development opportunities, learning from others and
                    collaborating on useful projects. Feel free to get in touch.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-card border-t border-border py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-semibold text-foreground mb-4">Caddilac Kwasi Akoto</h3>
              <p className="text-muted-foreground">
                Computer Science student, software developer and cybersecurity enthusiast.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-4">Quick Links</h4>
              <div className="grid grid-cols-2 gap-2">
                {navItems.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => scrollToSection(item)}
                    className="text-left capitalize text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-4">Areas of Interest</h4>
              <p className="text-muted-foreground leading-relaxed">
                Software engineering, cybersecurity, web and mobile development, AI, networking and IoT.
              </p>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center">
            <p className="text-muted-foreground">
              © {new Date().getFullYear()} Caddilac Kwasi Akoto. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
