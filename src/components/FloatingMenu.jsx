import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, User, Code, Briefcase, Mail, Sun, Moon, Menu, X, FileText } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const FloatingMenu = ({ activeSection, onSectionChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  const menuItems = [
    { id: 'hero', icon: Home, label: 'Home' },
    { id: 'about', icon: User, label: 'About' },
    { id: 'skills', icon: Code, label: 'Skills' },
    { id: 'projects', icon: Briefcase, label: 'Projects' },
    { id: 'contact', icon: Mail, label: 'Contact' },
    { id: 'cv', icon: FileText, label: 'CV', isExternal: true, url: 'https://cv.tahtafm.xyz/' }
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      onSectionChange(sectionId);
    }
  };

  const handleItemClick = (item) => {
    if (item.isExternal) {
      window.open(item.url, '_blank');
    } else {
      scrollToSection(item.id);
    }
  };

  return (
    <>
      {/* Mobile Menu Toggle */}
      <motion.button
        className="fixed top-6 left-6 z-50 lg:hidden bg-primary text-primary-foreground p-3 rounded-full shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </motion.button>

      {/* Desktop Menu */}
      <motion.div
        className="hidden lg:flex fixed left-8 top-1/2 transform -translate-y-1/2 z-40 flex-col gap-4"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="bg-card/80 backdrop-blur-md border border-border rounded-2xl p-4 shadow-xl">
          {menuItems.map((item, index) => (
            <motion.button
              key={item.id}
              className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 last:mb-0 transition-all duration-300 ${
                activeSection === item.id && !item.isExternal
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent'
              }`}
              onClick={() => handleItemClick(item)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              title={item.label}
            >
              <item.icon size={20} />
            </motion.button>
          ))}
        </div>

        {/* Theme Toggle */}
        <motion.button
          className="bg-card/80 backdrop-blur-md border border-border rounded-2xl p-4 shadow-xl w-12 h-12 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-300"
          onClick={toggleTheme}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.7 }}
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </motion.button>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
            <motion.div
              className="absolute left-6 top-20 bg-card border border-border rounded-2xl p-6 shadow-xl"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {menuItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl mb-2 last:mb-0 transition-all duration-300 ${
                    activeSection === item.id && !item.isExternal
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`}
                  onClick={() => {
                    handleItemClick(item);
                    setIsOpen(false);
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.1 }}
                >
                  <item.icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </motion.button>
              ))}
              
              <div className="border-t border-border mt-4 pt-4">
                <motion.button
                  className="w-full flex items-center gap-3 p-3 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-300"
                  onClick={() => {
                    toggleTheme();
                    setIsOpen(false);
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: 0.7 }}
                >
                  {isDark ? <Sun size={20} /> : <Moon size={20} />}
                  <span className="font-medium">{isDark ? 'Light Mode' : 'Dark Mode'}</span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingMenu;

