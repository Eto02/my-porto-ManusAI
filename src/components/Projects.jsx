import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, BookOpen, FileText } from 'lucide-react';

const Projects = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [filter, setFilter] = useState('all');
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  const projects = [
    {
      id: 1,
      title: "Web Automation App Development",
      category: "fullstack",
      description:
        "Contributed to the development of a web-based automation platform for a Japanese company using FastAPI, GraphQL, and React. Involved in building scalable backend services, designing GraphQL APIs, and developing responsive user interfaces to streamline and automate business workflows.",
      technologies: ["FastAPI", "GraphQL", "React", "PostgreSQL", "Docker", "3rd Party APIs"],
      image: "/api/placeholder/400/300",
      liveUrl: null,
      githubUrl: null,
      featured: true,
      type: "Automation Platform",
    },
    {
      id: 2,
      title: "Odoo 17.0 Technical Training",
      category: "backend",
      description:
        "Provided technical training to the IT team of a manufacturing company on ERP development using Odoo 17. Covered essential core modules and hands-on customization relevant to manufacturing processes.",
      technologies: ["Odoo 17", "Python", "PostgreSQL"],
      image: "/api/placeholder/400/300",
      liveUrl: null,
      githubUrl: null,
      featured: false,
      type: "Odoo Technical Training",
    },
    {
      id: 3,
      title: "Whistleblowing System Development",
      category: "fullstack",
      description:
        "Built a confidential reporting platform using Next.js, Tailwind CSS, Express.js, and MySQL. Managed both frontend and backend, handled secure submission processes, integration, bug fixing, and maintenance throughout the project lifecycle.",
      technologies: ["Next.js", "Express.js", "Tailwind CSS", "MySQL"],
      image: "/api/placeholder/400/300",
      liveUrl: null,
      githubUrl: null,
      featured: false,
      type: "Web Application",
    },
    {
      id: 4,
      title: "Customer Portal Revamp",
      category: "frontend",
      description:
        "Led the redevelopment of a customer-facing portal previously built in monolithic Odoo for a digital infrastructure company. Rebuilt using React and REST APIs to significantly improve performance, scalability, and user experience.",
      technologies: ["React", "JavaScript", "REST API", "Tailwind CSS"],
      image: "/api/placeholder/400/300",
      liveUrl: null,
      githubUrl: null,
      featured: false,
      type: "Frontend Migration",
    },
    {
      id: 5,
      title: "Odoo 14.0 Enterprise Customization",
      category: "backend",
      description:
        "Customized Odoo 14.0 Enterprise for a digital infrastructure company to automate business processes including project management, CRM, accounting, and inventory. Delivered scalable and modular solutions tailored to operational needs.",
      technologies: ["Odoo 14", "Python", "PostgreSQL", "XML"],
      image: "/api/placeholder/400/300",
      liveUrl: null,
      githubUrl: null,
      featured: false,
      type: "ERP Implementation",
    },
    {
      id: 6,
      title: "Academic Web Application Development",
      category: "fullstack",
      description:
        "Developed full-stack academic portals using Laravel for lecturer and student admissions across multiple universities. Customized modules, user interfaces, and role-based access features to match each institution’s needs.",
      technologies: ["Laravel", "MySQL", "Bootstrap", "Blade"],
      image: "/api/placeholder/400/300",
      liveUrl: null,
      githubUrl: null,
      featured: false,
      type: "Academic Portal",
    },
  ];

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'fullstack', label: 'Full Stack' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' }
  ];

  const filteredProjects =
    filter === 'all' ? projects : projects.filter(project => project.category === filter);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="projects" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent"
          >
            Project Portfolio
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8"
          >
            A showcase of real-world applications I've built or contributed to—presented with respect for client confidentiality.
          </motion.p>

          {/* Filters */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {filters.map(filterItem => (
              <button
                key={filterItem.id}
                onClick={() => setFilter(filterItem.id)}
                className={`px-6 py-3 rounded-full transition-all duration-300 ${
                  filter === filterItem.id
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'bg-card text-card-foreground hover:bg-accent border border-border'
                }`}
              >
                {filterItem.label}
              </button>
            ))}
          </motion.div>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map(project => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className="group relative bg-card border border-border rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
              whileHover={{ y: -8 }}
            >
              {/* Cover */}
              <div className="relative h-64 bg-gradient-to-br from-primary/10 to-primary/5 p-6 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-medium">
                    {project.type}
                  </span>
                  {project.featured && (
                    <span className="bg-amber-500/20 text-amber-600 px-3 py-1 rounded-full text-sm font-medium">
                      Featured
                    </span>
                  )}
                </div>
                <div className="flex justify-center">
                  <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center">
                    <FileText size={40} className="text-primary" />
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>

                {/* Expandable Description */}
                <p
                  className={`text-muted-foreground mb-2 transition-all ${
                    expandedId === project.id ? '' : 'line-clamp-3'
                  }`}
                >
                  {project.description}
                </p>
                {project.description.length > 120 && (
                  <button
                    onClick={() => toggleExpand(project.id)}
                    className="text-sm text-primary hover:underline focus:outline-none mb-4"
                  >
                    {expandedId === project.id ? 'Show less' : 'Read more'}
                  </button>
                )}

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.slice(0, 3).map((tech, index) => (
                    <span
                      key={index}
                      className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="text-muted-foreground text-sm px-3 py-1">
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>

                {/* Disabled Action Buttons */}
                <div className="flex gap-3">
                  <motion.button
                    disabled
                    className="flex-1 bg-primary/30 text-primary-foreground/60 px-4 py-2 rounded-lg flex items-center justify-center gap-2 cursor-not-allowed"
                  >
                    <BookOpen size={16} />
                    Read
                  </motion.button>
                  <motion.button
                    disabled
                    className="bg-card border border-border text-muted-foreground/40 px-4 py-2 rounded-lg flex items-center justify-center cursor-not-allowed"
                  >
                    <Github size={16} />
                  </motion.button>
                  <motion.button
                    disabled
                    className="bg-card border border-border text-muted-foreground/40 px-4 py-2 rounded-lg flex items-center justify-center cursor-not-allowed"
                  >
                    <ExternalLink size={16} />
                  </motion.button>
                </div>
              </div>

              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mt-16"
        >
          <div className="bg-card border border-border rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Interested in working together?</h3>
            <p className="text-muted-foreground mb-6">
              I'm always open to discussing new opportunities and interesting projects.
            </p>
            <motion.button
              className="bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get In Touch
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
