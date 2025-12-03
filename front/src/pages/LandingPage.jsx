import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Briefcase, Users, GraduationCap, TrendingUp, MessageSquare, ShieldCheck, Star, ArrowRight, Sparkles, Zap, Target } from 'lucide-react';
import { faker } from '@faker-js/faker';

const LandingPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const cardVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const featureCards = [
    {
      icon: <GraduationCap size={32} className="text-emerald-500" />,
      title: "Student Profiles",
      description: "Showcase your skills, projects, and experience to stand out from the crowd.",
      gradient: "from-emerald-400 to-cyan-400",
    },
    {
      icon: <Briefcase size={32} className="text-blue-500" />,
      title: "Company Job Boards",
      description: "Companies can post jobs and manage their recruitment pipeline efficiently.",
      gradient: "from-blue-400 to-indigo-400",
    },
    {
      icon: <TrendingUp size={32} className="text-purple-500" />,
      title: "Interactive Job Search",
      description: "A modern, engaging way for students to discover their dream opportunities.",
      gradient: "from-purple-400 to-pink-400",
    },
    {
      icon: <MessageSquare size={32} className="text-orange-500" />,
      title: "Direct Messaging",
      description: "Seamless communication between students and recruiters in real-time.",
      gradient: "from-orange-400 to-red-400",
    },
    {
      icon: <ShieldCheck size={32} className="text-green-500" />,
      title: "Admin Oversight",
      description: "Full platform management to ensure quality and safety for all users.",
      gradient: "from-green-400 to-emerald-400",
    },
    {
      icon: <Users size={32} className="text-cyan-500" />,
      title: "Applicant Tracking",
      description: "Companies can easily track and manage job applicants through our system.",
      gradient: "from-cyan-400 to-blue-400",
    }
  ];

  const testimonials = [
    {
      quote: "Campus Connect helped me land my dream internship! The interface is incredibly intuitive and the matching system is spot-on.",
      name: "Sarah Martinez",
      role: "Software Engineering Student",
      avatar: "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1",
      company: "Stanford University",
    },
    {
      quote: "We've found some of our best entry-level talent through this platform. It's revolutionized our university recruitment process.",
      name: "Mark Chen",
      role: "Senior HR Director",
      avatar: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1",
      company: "TechNova Inc.",
    },
    {
      quote: "The swipe-to-apply feature is genius! It makes job hunting feel modern and efficient. I got 3 interviews in my first week!",
      name: "Emily Rodriguez",
      role: "UX/UI Design Student",
      avatar: "https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1",
      company: "MIT Design Lab",
    }
  ];

  const stats = [
    { number: "50K+", label: "Active Students", icon: <Users className="w-6 h-6" /> },
    { number: "2K+", label: "Partner Companies", icon: <Briefcase className="w-6 h-6" /> },
    { number: "15K+", label: "Jobs Posted", icon: <Target className="w-6 h-6" /> },
    { number: "98%", label: "Success Rate", icon: <Sparkles className="w-6 h-6" /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-cyan-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full opacity-20 animate-pulse-slow"></div>
        <div className="absolute -bottom-32 -left-40 w-96 h-96 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-15 animate-float"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-pink-400 to-orange-400 rounded-full opacity-10 animate-bounce-slow"></div>
      </div>

      {/* Mouse follower effect */}
      <motion.div
        className="fixed w-6 h-6 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full pointer-events-none z-50 opacity-30 blur-sm"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />

      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl shadow-lg border-b border-emerald-100"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="p-2 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                Campus Connect
              </span>
            </motion.div>
            
            <div className="hidden md:flex items-center space-x-8">
              {['Features', 'Testimonials', 'How It Works'].map((item, index) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  className="relative font-medium text-slate-700 hover:text-emerald-600 transition-all duration-300"
                  whileHover={{ y: -2 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item}
                  <motion.div
                    className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-cyan-500"
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              ))}
            </div>
            
            <div className="flex items-center space-x-4">
              <Link 
                to="/login" 
                className="font-medium text-slate-700 hover:text-emerald-600 transition-all duration-300"
              >
                Login
              </Link>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
                >
                  <span className="relative z-10">Sign Up</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-cyan-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <motion.div style={{ y: y1, opacity }} className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/30 via-cyan-100/20 to-blue-100/30"></div>
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDE2LCAxODUsIDEyOSwgMC4xKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>
          </motion.div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <motion.div variants={containerVariants} initial="hidden" animate="visible">
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-emerald-100 to-cyan-100 rounded-full text-emerald-700 text-sm font-medium mb-8"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                <span>Join 50,000+ students finding their dream careers</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="text-6xl md:text-8xl font-extrabold tracking-tight mb-8"
              >
                <span className="bg-gradient-to-r from-emerald-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent animate-gradient">
                  Your Career
                </span>
                <br />
                <span className="text-slate-800">Starts Here.</span>
              </motion.h1>
              
              <motion.p
                variants={itemVariants}
                className="mt-6 max-w-4xl mx-auto text-xl md:text-2xl text-slate-700 leading-relaxed"
              >
                Connect with innovative companies, showcase your skills, and discover opportunities 
                that align with your ambitions. The future of university recruitment is here.
              </motion.p>
              
              <motion.div
                variants={itemVariants}
                className="mt-16 flex flex-col sm:flex-row justify-center gap-8"
              >
                <motion.div
                  whileHover={{ scale: 1.08, y: -8 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative"
                >
                  {/* Glowing background effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-cyan-600 rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                  <Link
                    to="/register"
                    className="relative bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-12 py-5 rounded-3xl text-xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 overflow-hidden block"
                  >
                    <span className="relative z-10 flex items-center">
                      Find Your Dream Job
                      <Zap className="w-6 h-6 ml-3 group-hover:rotate-12 transition-transform animate-pulse" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-cyan-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000"></div>
                  </Link>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.08, y: -8 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative"
                >
                  {/* Glowing background effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur opacity-50 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                  <Link
                    to="/register"
                    className="relative bg-white/90 backdrop-blur-sm text-slate-800 px-12 py-5 rounded-3xl text-xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 border-2 border-emerald-300 hover:border-emerald-400 overflow-hidden block"
                  >
                    <span className="relative z-10 flex items-center">
                      Hire Top Talent
                      <Target className="w-6 h-6 ml-3 group-hover:rotate-12 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-50 to-cyan-50 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000"></div>
                  </Link>
                </motion.div>
              </motion.div>

              {/* Stats Section */}
              <motion.div
                variants={itemVariants}
                className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="text-center group"
                  >
                    <motion.div
                      className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-2xl text-white mb-4 group-hover:scale-110 transition-transform"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      {stat.icon}
                    </motion.div>
                    <div className="text-3xl font-bold text-slate-800 mb-2">{stat.number}</div>
                    <div className="text-slate-600">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-32 relative">
          <motion.div style={{ y: y2 }} className="absolute inset-0 bg-gradient-to-b from-white/50 to-emerald-50/50"></motion.div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <span className="inline-block px-4 py-2 bg-gradient-to-r from-emerald-100 to-cyan-100 rounded-full text-emerald-700 text-sm font-medium mb-4">
                Everything You Need
              </span>
              <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-6">
                Powerful Features for Success
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                A comprehensive toolkit designed for both students and companies to create meaningful connections.
              </p>
            </motion.div>
            
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {featureCards.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group relative bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/20 overflow-hidden"
                >
                  {/* Gradient background on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                  
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000 animate-shimmer opacity-0 group-hover:opacity-100"></div>
                  </div>
                  
                  <div className="relative z-10">
                    <motion.div
                      className="flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-r from-emerald-100 to-cyan-100 mb-6 group-hover:scale-110 transition-transform"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      {feature.icon}
                    </motion.div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-4 group-hover:text-emerald-600 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section id="testimonials" className="py-32 bg-gradient-to-r from-emerald-50 via-cyan-50 to-blue-50 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-emerald-300 to-cyan-300 rounded-full opacity-10 animate-pulse-slow"></div>
            <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-blue-300 to-purple-300 rounded-full opacity-10 animate-float"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <span className="inline-block px-4 py-2 bg-gradient-to-r from-emerald-200 to-cyan-200 rounded-full text-emerald-800 text-sm font-medium mb-4">
                Success Stories
              </span>
              <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Loved by Students & Recruiters
              </h2>
            </motion.div>
            
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/20 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/5 to-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10">
                    <div className="flex text-yellow-400 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 + i * 0.1 }}
                        >
                          <Star fill="currentColor" size={24} />
                        </motion.div>
                      ))}
                    </div>
                    
                    <blockquote className="text-slate-700 text-lg leading-relaxed mb-6">
                      "{testimonial.quote}"
                    </blockquote>
                    
                    <div className="flex items-center">
                      <motion.img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full object-cover ring-4 ring-white shadow-lg"
                        whileHover={{ scale: 1.1 }}
                      />
                      <div className="ml-4">
                        <p className="font-bold text-slate-800 text-lg">{testimonial.name}</p>
                        <p className="text-slate-600">{testimonial.role}</p>
                        <p className="text-emerald-600 text-sm font-medium">{testimonial.company}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-32 bg-white relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <span className="inline-block px-4 py-2 bg-gradient-to-r from-emerald-100 to-cyan-100 rounded-full text-emerald-700 text-sm font-medium mb-4">
                Simple Process
              </span>
              <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Get Started in 3 Steps
              </h2>
            </motion.div>
            
            <div className="grid md:grid-cols-3 gap-12">
              {[
                {
                  step: "1",
                  title: "Create Your Profile",
                  description: "Sign up as a student or company and build a profile that showcases your unique value.",
                  gradient: "from-emerald-500 to-cyan-500",
                  delay: 0.1
                },
                {
                  step: "2",
                  title: "Discover & Connect",
                  description: "Students find perfect opportunities, companies discover amazing candidates.",
                  gradient: "from-cyan-500 to-blue-500",
                  delay: 0.2
                },
                {
                  step: "3",
                  title: "Achieve Your Goals",
                  description: "Land your dream job or hire the perfect team member to grow your business.",
                  gradient: "from-blue-500 to-purple-500",
                  delay: 0.3
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: item.delay, duration: 0.8 }}
                  whileHover={{ y: -10 }}
                  className="text-center group relative"
                >
                  <motion.div
                    className={`relative flex items-center justify-center h-24 w-24 rounded-3xl bg-gradient-to-r ${item.gradient} text-white text-4xl font-bold mx-auto mb-8 shadow-xl group-hover:shadow-2xl transition-all duration-500`}
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    {item.step}
                    <div className="absolute inset-0 bg-white/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </motion.div>
                  <h3 className="text-3xl font-bold text-slate-800 mb-4 group-hover:text-emerald-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-lg max-w-sm mx-auto">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 bg-gradient-to-r from-emerald-600 via-cyan-600 to-blue-600 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-96 h-96 bg-white/10 rounded-full animate-pulse-slow"></div>
            <div className="absolute bottom-20 right-20 w-80 h-80 bg-white/10 rounded-full animate-float"></div>
            <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-white/5 rounded-full animate-bounce-slow"></div>
          </div>
          
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">
                Ready to Transform Your Future?
              </h2>
              <p className="text-xl text-white/90 mb-12 leading-relaxed">
                Join thousands of students and companies already using Campus Connect to build amazing careers and teams.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <motion.div
                  whileHover={{ scale: 1.1, y: -10 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative"
                >
                  {/* Pulsing glow effect */}
                  <div className="absolute -inset-2 bg-white rounded-3xl blur opacity-30 group-hover:opacity-50 animate-pulse"></div>
                  <Link
                    to="/register"
                    className="relative bg-white text-emerald-600 px-14 py-6 rounded-3xl text-2xl font-black shadow-3xl hover:shadow-4xl transition-all duration-300 group overflow-hidden block"
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      Get Started Today
                      <ArrowRight className="w-7 h-7 ml-3 group-hover:translate-x-2 transition-transform animate-bounce" />
                    </span>
                    {/* Animated background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-50 to-cyan-50 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-center duration-500"></div>
                  </Link>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.1, y: -10 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative"
                >
                  <div className="absolute -inset-2 bg-white/20 rounded-3xl blur opacity-20 group-hover:opacity-40 animate-pulse"></div>
                  <Link
                    to="/login"
                    className="relative bg-transparent text-white px-14 py-6 rounded-3xl text-2xl font-black border-3 border-white/50 hover:border-white transition-all duration-300 group overflow-hidden block backdrop-blur-sm"
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      Learn More
                      <Sparkles className="w-7 h-7 ml-3 group-hover:rotate-180 transition-transform duration-500" />
                    </span>
                    <div className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-center duration-500"></div>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-8">
              <div className="p-3 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Campus Connect
              </span>
            </div>
            <p className="text-slate-400 text-lg mb-8">
              Connecting ambition with opportunity, one perfect match at a time.
            </p>
            <div className="border-t border-slate-800 pt-8">
              <p className="text-slate-500">
                &copy; 2025 Campus Connect. All rights reserved. Made with ❤️ for the next generation.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;