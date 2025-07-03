import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Coffee, Heart, Zap } from 'lucide-react';

const About = () => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const stats = [
    // { icon: Code, label: 'Projects Completed', value: '25+' },
    // { icon: Coffee, label: 'Cups of Coffee', value: '1000+' },
    // { icon: Heart, label: 'Happy Clients', value: '20+' },
    // { icon: Zap, label: 'Years Experience', value: '6+' },
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
    <section id="about" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-10 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              About <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Me</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get to know more about who I am, what I do, and what skills I have
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Image/Visual */}
            <motion.div variants={itemVariants} className="relative">
              <div className="relative">
                {/* Placeholder for profile image */}
                <div className="w-full max-w-md mx-auto aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl flex items-center justify-center">
                  <div className="w-3/4 h-3/4 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center">
                    <Code size={80} className="text-white" />
                  </div>
                </div>
                
                {/* Floating Elements */}
                <motion.div
                  className="absolute -top-4 -right-4 bg-card border border-border rounded-2xl p-4 shadow-lg"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Zap className="text-primary" size={24} />
                </motion.div>
                
                <motion.div
                  className="absolute -bottom-4 -left-4 bg-card border border-border rounded-2xl p-4 shadow-lg"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                >
                  <Heart className="text-accent" size={24} />
                </motion.div>
              </div>
            </motion.div>

            {/* Right Column - Content */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h3 className="text-2xl md:text-3xl font-bold mb-6">
                I enjoy building useful things and solving real problems with code
              </h3>

              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  I'm a Full-Stack Developer based in Lumajang, Indonesia, with over 6 years of experience
                  in building scalable web applications and enterprise systems. I’ve worked with a wide range
                  of clients — from universities to Japanese corporations — helping them turn ideas into 
                  practical and maintainable solutions.
                </p>

                <p>
                  Most of my work revolves around backend architecture, REST/GraphQL APIs, and frontend
                  development using modern frameworks like React and Vue. I'm also experienced in ERP customization
                  using Odoo, which has deepened my understanding of how software supports business workflows.
                </p>

                <p>
                  I believe good code is not just about clever solutions — it's about clarity, reliability,
                  and being kind to the next developer (including your future self).
                </p>
              </div>

              {/* Skills Preview */}
              <div className="pt-6">
                <h4 className="text-lg font-semibold mb-4">Core Technologies</h4>
                <div className="flex flex-wrap gap-3">
                  {['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL'].map((tech, index) => (
                    <motion.span
                      key={tech}
                      className="px-4 py-2 bg-accent/10 text-accent-foreground rounded-full text-sm font-medium border border-accent/20"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3, delay: 1 + index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Stats Section */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-20"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center p-6 bg-card/50 backdrop-blur-sm border border-border rounded-2xl"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 1.5 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 text-primary rounded-xl mb-4">
                  <stat.icon size={24} />
                </div>
                <div className="text-2xl md:text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;

