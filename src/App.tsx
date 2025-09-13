import { useState, useEffect } from 'react'
import { Menu, X, Sun, Moon, Download, ExternalLink, Mail, Github, Linkedin, Twitter, MapPin, Phone } from 'lucide-react'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    // Check system preference for dark mode
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    setIsDarkMode(mediaQuery.matches)

    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches)
    }

    mediaQuery.addEventListener('change', handleSystemThemeChange)
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode)
  }, [isDarkMode])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'portfolio', 'resume', 'contact']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const height = element.offsetHeight
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMenuOpen(false)
    }
  }

  const handleDownloadCV = () => {
    // In a real implementation, you would link to your actual CV file
    alert('CV download feature - link to your actual CV file!')
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-semibold text-primary">Your Name</h1>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {['home', 'about', 'portfolio', 'resume', 'contact'].map((item) => (
                  <button
                    key={item}
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

            {/* Theme toggle and Mobile menu button */}
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              
              <div className="md:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                >
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background border-t border-border">
              {['home', 'about', 'portfolio', 'resume', 'contact'].map((item) => (
                <button
                  key={item}
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

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center pt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6">
              Hi, I'm <span className="text-primary">Your Name</span>
            </h1>
            <h2 className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground mb-8">
              Software Developer & Designer
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
              I create beautiful, functional digital experiences that make a difference. 
              Passionate about clean code, elegant design, and innovative solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => scrollToSection('portfolio')}
                className="px-8 py-4 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors inline-flex items-center"
              >
                View My Work
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="px-8 py-4 border border-border text-foreground font-medium rounded-lg hover:bg-accent transition-colors inline-flex items-center"
              >
                Contact Me
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-secondary/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">About Me</h2>
            <p className="text-lg text-muted-foreground">Get to know me better</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-scale-in">
              <div className="aspect-square max-w-md mx-auto bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center">
                <div className="w-48 h-48 bg-muted rounded-full flex items-center justify-center text-muted-foreground text-2xl">
                  Photo
                </div>
              </div>
            </div>
            
            <div className="animate-fade-in-up space-y-6">
              <div>
                <h3 className="text-2xl font-semibold text-foreground mb-4">Professional Background</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  I'm a passionate software developer with over 5 years of experience creating 
                  digital solutions that combine technical excellence with beautiful design. 
                  I specialize in full-stack development, with expertise in modern web technologies 
                  and a keen eye for user experience.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  When I'm not coding, you can find me exploring new technologies, contributing to 
                  open-source projects, or sharing knowledge with the developer community. 
                  I believe in continuous learning and staying at the forefront of technology trends.
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-medium text-foreground mb-3">Core Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    'React', 'TypeScript', 'Node.js', 'Python', 'Next.js', 
                    'Tailwind CSS', 'PostgreSQL', 'AWS', 'Docker', 'Git'
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={handleDownloadCV}
                className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Download size={20} className="mr-2" />
                Download CV
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">My Portfolio</h2>
            <p className="text-lg text-muted-foreground">A selection of my recent work</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'E-Commerce Platform',
                description: 'A full-stack e-commerce solution with React, Node.js, and Stripe integration.',
                image: 'Project 1',
                link: '#'
              },
              {
                title: 'Task Management App',
                description: 'A collaborative task management application with real-time updates.',
                image: 'Project 2',
                link: '#'
              },
              {
                title: 'Portfolio Website',
                description: 'A responsive portfolio website built with modern web technologies.',
                image: 'Project 3',
                link: '#'
              },
              {
                title: 'Weather Dashboard',
                description: 'A beautiful weather dashboard with data visualization and forecasts.',
                image: 'Project 4',
                link: '#'
              },
              {
                title: 'Social Media App',
                description: 'A social media platform with real-time messaging and content sharing.',
                image: 'Project 5',
                link: '#'
              },
              {
                title: 'Analytics Platform',
                description: 'A comprehensive analytics platform with interactive charts and reports.',
                image: 'Project 6',
                link: '#'
              }
            ].map((project, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 animate-scale-in group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center text-muted-foreground text-lg font-medium">
                  {project.image}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  <a
                    href={project.link}
                    className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors"
                  >
                    View Project
                    <ExternalLink size={16} className="ml-1" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resume Section */}
      <section id="resume" className="py-20 bg-secondary/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">My Resume</h2>
            <p className="text-lg text-muted-foreground">Professional experience and education</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Experience */}
            <div className="animate-fade-in-up">
              <h3 className="text-2xl font-semibold text-foreground mb-8 flex items-center">
                Experience
              </h3>
              <div className="space-y-8">
                {[
                  {
                    title: 'Senior Software Developer',
                    company: 'Tech Company Inc.',
                    period: '2021 - Present',
                    description: 'Lead development of web applications using React, Node.js, and cloud technologies. Mentored junior developers and improved team productivity by 30%.'
                  },
                  {
                    title: 'Full Stack Developer',
                    company: 'Digital Agency',
                    period: '2019 - 2021',
                    description: 'Developed and maintained client websites and applications. Worked closely with design teams to implement pixel-perfect interfaces.'
                  },
                  {
                    title: 'Frontend Developer',
                    company: 'StartupXYZ',
                    period: '2018 - 2019',
                    description: 'Built responsive web applications and improved user experience metrics. Collaborated with cross-functional teams in an agile environment.'
                  }
                ].map((job, index) => (
                  <div key={index} className="relative pl-8 pb-8 border-l-2 border-primary/20 last:border-l-0 last:pb-0">
                    <div className="absolute -left-2 top-0 w-4 h-4 bg-primary rounded-full"></div>
                    <div className="bg-card border border-border rounded-lg p-6">
                      <h4 className="text-lg font-semibold text-foreground">{job.title}</h4>
                      <p className="text-primary font-medium mb-2">{job.company}</p>
                      <p className="text-sm text-muted-foreground mb-3">{job.period}</p>
                      <p className="text-muted-foreground leading-relaxed">{job.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education & Skills */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <h3 className="text-2xl font-semibold text-foreground mb-8">Education & Certifications</h3>
              <div className="space-y-8 mb-12">
                {[
                  {
                    title: 'Bachelor of Computer Science',
                    institution: 'University of Technology',
                    period: '2014 - 2018',
                    description: 'Graduated Magna Cum Laude. Specialized in Software Engineering and Human-Computer Interaction.'
                  },
                  {
                    title: 'AWS Solutions Architect',
                    institution: 'Amazon Web Services',
                    period: '2020',
                    description: 'Professional certification in cloud architecture and best practices.'
                  }
                ].map((edu, index) => (
                  <div key={index} className="relative pl-8 pb-8 border-l-2 border-accent/20 last:border-l-0 last:pb-0">
                    <div className="absolute -left-2 top-0 w-4 h-4 bg-accent rounded-full"></div>
                    <div className="bg-card border border-border rounded-lg p-6">
                      <h4 className="text-lg font-semibold text-foreground">{edu.title}</h4>
                      <p className="text-accent font-medium mb-2">{edu.institution}</p>
                      <p className="text-sm text-muted-foreground mb-3">{edu.period}</p>
                      <p className="text-muted-foreground leading-relaxed">{edu.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <h3 className="text-2xl font-semibold text-foreground mb-6">Technical Skills</h3>
              <div className="space-y-4">
                {[
                  { category: 'Frontend', skills: 'React, Vue.js, TypeScript, Tailwind CSS, Next.js' },
                  { category: 'Backend', skills: 'Node.js, Python, Express, FastAPI, GraphQL' },
                  { category: 'Database', skills: 'PostgreSQL, MongoDB, Redis, Prisma' },
                  { category: 'DevOps', skills: 'Docker, AWS, Vercel, GitHub Actions' },
                  { category: 'Tools', skills: 'Git, VSCode, Figma, Postman, Jira' }
                ].map((skillGroup, index) => (
                  <div key={index} className="bg-card border border-border rounded-lg p-4">
                    <h4 className="font-semibold text-foreground mb-2">{skillGroup.category}</h4>
                    <p className="text-muted-foreground">{skillGroup.skills}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Get In Touch</h2>
            <p className="text-lg text-muted-foreground">Let's discuss your next project</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="animate-fade-in-up">
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors resize-none"
                    placeholder="Tell me about your project..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors inline-flex items-center justify-center"
                >
                  <Mail size={20} className="mr-2" />
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-6">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                        <Mail className="text-primary" size={20} />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Email</p>
                        <p className="text-muted-foreground">your.email@example.com</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                        <Phone className="text-primary" size={20} />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Phone</p>
                        <p className="text-muted-foreground">+1 (555) 123-4567</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                        <MapPin className="text-primary" size={20} />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Location</p>
                        <p className="text-muted-foreground">San Francisco, CA</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-6">Follow Me</h3>
                  <div className="flex space-x-4">
                    {[
                      { icon: Github, href: 'https://github.com', label: 'GitHub' },
                      { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
                      { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' }
                    ].map(({ icon: Icon, href, label }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-card border border-border rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
                        aria-label={label}
                      >
                        <Icon size={20} />
                      </a>
                    ))}
                  </div>
                </div>

                <div className="bg-card border border-border rounded-xl p-6">
                  <h4 className="font-semibold text-foreground mb-3">Let's Work Together</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    I'm always interested in new opportunities and exciting projects. 
                    Whether you need a website, web application, or just want to say hello, 
                    don't hesitate to reach out!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-semibold text-foreground mb-4">Your Name</h3>
              <p className="text-muted-foreground">
                Creating digital experiences that make a difference.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-4">Quick Links</h4>
              <div className="space-y-2">
                {['Home', 'About', 'Portfolio', 'Resume', 'Contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="block text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-4">Services</h4>
              <div className="space-y-2 text-muted-foreground">
                <p>Web Development</p>
                <p>UI/UX Design</p>
                <p>Mobile Apps</p>
                <p>Consulting</p>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-4">Connect</h4>
              <div className="flex space-x-3">
                {[
                  { icon: Github, href: 'https://github.com' },
                  { icon: Linkedin, href: 'https://linkedin.com' },
                  { icon: Twitter, href: 'https://twitter.com' }
                ].map(({ icon: Icon, href }, index) => (
                  <a
                    key={index}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-background border border-border rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center">
            <p className="text-muted-foreground">
              © {new Date().getFullYear()} Your Name. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App