import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Database,
  MonitorSmartphone,
  TerminalSquare,
} from 'lucide-react';

const Skills = () => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const skillCategories = [
    {
      title: 'Backend Development',
      icon: Database,
      color: 'from-[#52ab98] to-[#2b6777]',
      skills: [
        'Python', 'Odoo', 'FastAPI', 'Laravel', 'ExpressJS',
        'Golang', 'REST API', 'GraphQL', 'Redis',
        'MySQL', 'PostgreSQL'
      ],
    },
    {
      title: 'Frontend Development',
      icon: MonitorSmartphone,
      color: 'from-[#6c8ead] to-[#c8d8e4]',
      skills: ['JavaScript', 'TypeScript', 'ReactJS', 'NextJS', 'VueJS'],
    },
    {
      title: 'Tools & Platforms',
      icon: TerminalSquare,
      color: 'from-[#3e5562] to-[#a4b0be]',
      skills: ['Git', 'GitHub Actions', 'Jira', 'Slack', 'Notion', 'Docker'],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section id="skills" className="py-20 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              My <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Skills</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A snapshot of the technologies and tools I use to build scalable, user-friendly applications.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {skillCategories.map((category) => (
              <motion.div
                key={category.title}
                variants={itemVariants}
                className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6"
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${category.color}`}>
                    <category.icon size={24} className="text-white" />
                  </div>
                  <h3 className="text-lg font-bold">{category.title}</h3>
                </div>
                <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                  {category.skills.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
