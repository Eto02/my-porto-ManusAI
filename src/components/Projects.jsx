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
      title: "Web Automation Platform",
      category: "fullstack",
      description: "Contributed to the development of a web-based automation system for a Japanese client using FastAPI, GraphQL, and React, simplifying complex workflows through reliable backend services. Supported webhook integrations using AWS Lambda and Terraform.",
      technologies: ["FastAPI", "GraphQL", "React", "AWS Lambda", "Terraform"],
      image: "/api/placeholder/400/300",
      featured: true,
      type: "Nurosoft IT Consulting",
    },
    {
      id: 2,
      title: "Legacy Application Modernization",
      category: "backend",
      description: "Upgraded a legacy application to work with newer technologies and environments, improving stability and ensuring it continues to meet current needs.",
      technologies: ["LibGDX", "Java"],
      image: "/api/placeholder/400/300",
      featured: false,
      type: "Nurosoft IT Consulting",
    },
    {
      id: 3,
      title: "Custom Manufacturing ERP System",
      category: "fullstack",
      description: "Built a custom ERP system for a manufacturing company to help manage production, inventory, and daily operations in one place. Focused on aligning the system with real workflows, making it easier for teams to use and maintain.",
      technologies: ["React", "Express.js", "Node.js"],
      image: "/api/placeholder/400/300",
      featured: true,
      type: "Nurosoft IT Consulting",
    },
    {
      id: 4,
      title: "Odoo 17.0 Technical Training",
      category: "backend",
      description: "Delivered hands-on ERP training to a team of 10 participants, enabling them to confidently manage, customize, and extend the system based on evolving business needs for a manufacturing company.",
      technologies: ["Odoo 17.0", "Python", "PostgreSQL"],
      image: "/api/placeholder/400/300",
      featured: false,
      type: "Nurosoft IT Consulting",
    },
    {
      id: 5,
      title: "Educational SaaS Platform",
      category: "fullstack",
      description: "Developed the backend of a subscription-based learning platform using Express.js and contributed to frontend development with Vue.js, focusing on RESTful API design and user experience.",
      technologies: ["Express.js", "Vue.js", "Node.js", "REST API"],
      image: "/api/placeholder/400/300",
      featured: false,
      type: "Nurosoft IT Consulting",
    },
    {
      id: 6,
      title: "Odoo 14.0 Customer Portal Revamp",
      category: "frontend",
      description: "Led the decoupling of a legacy monolithic portal and rebuilt it using React and REST APIs for a digital infrastructure company, significantly improving performance, scalability, and UX.",
      technologies: ["React", "REST API", "Odoo"],
      image: "/api/placeholder/400/300",
      featured: false,
      type: "Nurosoft IT Consulting",
    },
    {
      id: 7,
      title: "Odoo 14.0 Enterprise Customization",
      category: "backend",
      description: "Customized Odoo 14.0 Enterprise for a digital infrastructure company to automate project management, CRM, accounting, and inventory processes, enhancing operational efficiency.",
      technologies: ["Odoo 14.0", "Python", "PostgreSQL"],
      image: "/api/placeholder/400/300",
      featured: false,
      type: "Nurosoft IT Consulting",
    },
    {
      id: 8,
      title: "Whistleblowing System",
      category: "fullstack",
      description: "Designed and built a secure, end-to-end confidential reporting platform using Next.js, Tailwind CSS, Express.js, and MySQL. Handled full-cycle delivery including system integration and bug fixing.",
      technologies: ["Next.js", "Tailwind CSS", "Express.js", "MySQL"],
      image: "/api/placeholder/400/300",
      featured: true,
      type: "Kreatindo",
    },
    {
      id: 9,
      title: "Academic Web Applications",
      category: "fullstack",
      description: "Developed full-stack academic portals using Laravel for multiple university clients, covering lecturer management and student admissions. Customized modules and interfaces.",
      technologies: ["Laravel", "MySQL", "PHP"],
      image: "/api/placeholder/400/300",
      featured: false,
      type: "UMY (Techno Creative)",
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
                className={`px-6 py-3 rounded-full transition-all duration-300 ${filter === filterItem.id
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
                  className={`text-muted-foreground mb-2 transition-all ${expandedId === project.id ? '' : 'line-clamp-3'
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
