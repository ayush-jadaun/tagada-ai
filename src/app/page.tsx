'use client'
import React, { useState, useEffect } from 'react';
import { Phone, BarChart3, Brain, Clock, Menu, X, Mail, Linkedin, Twitter, MessageCircle, PlaneTakeoff } from 'lucide-react';
import Image from 'next/image';

// Mock framer-motion implementation for the artifact environment
const motion = {
  nav: ({ children, ...props }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) => <nav {...props}>{children}</nav>,
  div: ({ children, ...props }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) => <div {...props}>{children}</div>,
};

interface VisibilityState {x
  [key: string]: boolean;
}

const VyapaariLanding = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState<VisibilityState>({});
  const [showNavbar, setShowNavbar] = useState(true);

  // Handle mouse movement for navbar visibility
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setShowNavbar(e.clientY < 100);
    };

    // Show navbar initially, then add mouse listener after 3 seconds
    const timer = setTimeout(() => {
      window.addEventListener('mousemove', handleMouseMove);
    }, 3000);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.target.id) {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: true
          }));
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: Phone,
      title: "Automated Calls",
      description: "Human-like AI calls powered by advanced voice technology that engage customers professionally and increase payment recovery rates."
    },
    {
      icon: BarChart3,
      title: "Call Summary Reports",
      description: "Upload your customer CSV files and receive comprehensive call summaries with recovery recommendations."
    },
    {
      icon: Brain,
      title: "AI-Powered Call Analysis",
      description: "Advanced AI analysis of every conversation to identify successful strategies and optimize future collection approaches."
    },
    {
      icon: Clock,
      title: "24/7 Operations",
      description: "Continuous collection efforts without breaks, maximizing recovery opportunities around the clock with automated scheduling."
    }
  ];

  const redirectToWhatsApp = () => {
    window.open('https://wa.me/+919044299909', '_blank');
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50/40 via-orange-50/30 to-amber-50/40 font-sans" style={{backgroundColor: '#fefbf7'}}>
      {/* Floating Navbar */}
      <motion.nav 
        className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 rounded-2xl w-full md:max-w-4xl transition-all duration-700 ease-out ${
          showNavbar ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-full opacity-0 scale-95'
        }`}
        style={{
          background: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 20px 40px rgba(99, 102, 241, 0.1)'
        }}
      >
        <div className="md:max-w-4xl w-full mx-auto px-6 py-3 rounded-2xl">
          <div className="flex w-full justify-between items-center">
            <div className="flex items-center mr-3">
              <div className="text-xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 bg-clip-text text-transparent">
                Tagada <span className="text-purple-600">AI</span>
              </div>
            </div>
            
            <div className="hidden md:block">
              <div className="flex items-center space-x-6">
                {['Home', 'Features', 'Pricing', 'Contact'].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase().replace(' ', '-')}`}
                    className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium transition-all duration-300 relative group"
                  >
                    {item}
                    <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full"></span>
                  </a>
                ))}
              </div>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-indigo-600 transition-colors duration-300"
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pt-4 border-t border-gray-200/50">
              <div className="flex justify-between items-center space-x-4">
                {['Home', 'Features', 'Pricing', 'Contact'].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase().replace(' ', '-')}`}
                    className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium transition-colors duration-300 rounded-lg hover:bg-indigo-50/50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex justify-center items-center pt-20 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Grid background */}
        <div className="absolute inset-0 opacity-100">
          <div 
            className="absolute inset-0" 
            style={{
              backgroundImage: `
                linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }}
          ></div>
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
        </div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-indigo-300/20 to-purple-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div 
              className={`text-center lg:text-left transform transition-all duration-1000 ${
                isVisible.hero ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
              }`}
              data-animate
              id="hero"
            >
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight mb-4 lg:mb-6 font-serif">
                <span className="bg-gradient-to-r from-gray-900 via-indigo-800 to-gray-900 bg-clip-text text-transparent">
                  AI-Powered Debt Collection
                </span>
                <span className="block bg-gradient-to-r from-indigo-600 via-purple-500 to-indigo-600 bg-clip-text text-transparent animate-gradient">
                  Made Simple
                </span>
              </h1>
              <div className="mb-6 lg:mb-8">
                <p className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
                  Say Goodbye to Manual Calls. Hello to Faster Recovery.
                </p>
                <p className="text-lg sm:text-xl font-medium text-indigo-600 mb-4">
                  Recover More. Spend Less. Sleep Easy.
                </p>
              </div>
              <p className="text-lg sm:text-xl text-gray-600 mb-6 lg:mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Recover outstanding payments efficiently with Tagada AI's intelligent, 
                human-like automated calls that maintain customer relationships while maximizing recovery rates.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button 
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-6 lg:px-8 py-3 lg:py-4 rounded-xl font-semibold text-base lg:text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-indigo-500/25"
                  onClick={() => scrollToSection('features')}
                >
                  About Product
                </button>
                <button 
                  className="border-2 border-indigo-500 text-indigo-500 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-600 hover:text-white hover:border-transparent px-6 lg:px-8 py-3 lg:py-4 rounded-xl font-semibold text-base lg:text-lg transition-all duration-300 transform hover:scale-105"
                  onClick={redirectToWhatsApp}
                >
                  Request Demo
                </button>
              </div>
            </div>
            
            <div className="relative mt-8 lg:mt-0">
              <div className="relative bg-gradient-to-br from-indigo-100 to-purple-100 rounded-3xl p-8 shadow-2xl transform transition-all duration-1000 hover:scale-105 hover:rotate-1">
                <Image 
                  src="/chatbots-ai.webp"
                  alt="image of robot"
                  height={500}
                  width={500}
                  className="w-full h-full object-cover rounded-2xl shadow-lg transition-all duration-700 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 lg:py-20" style={{backgroundColor: '#fefbf7'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 bg-clip-text text-transparent mb-4 font-serif">
              Powerful Features for Modern Businesses
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI-driven platform combines cutting-edge technology with proven collection strategies 
              to deliver exceptional results while maintaining customer satisfaction.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className={`transform transition-all duration-700 ${
                    isVisible.features ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-12 opacity-0 scale-95'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                  data-animate
                  id="features"
                >
                  <div className="bg-gradient-to-br from-white to-indigo-50/50 backdrop-blur-sm p-6 lg:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-indigo-200 group hover:scale-105">
                    <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center mb-4 lg:mb-6 group-hover:from-indigo-200 group-hover:to-purple-200 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                      <Icon className="w-6 h-6 lg:w-7 lg:h-7 text-indigo-600" />
                    </div>
                    <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 lg:py-20" style={{backgroundColor: '#fefbf7'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 font-serif">
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 bg-clip-text text-transparent">
                Ready to Get Started?
              </span>
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Our AI-powered debt collection solution is currently in development. We&apos;re building something amazing 
              that will revolutionize how businesses handle payment recovery while maintaining customer relationships.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div
              className={`transform transition-all duration-1000 ${
                isVisible.pricing ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-12 opacity-0 scale-95'
              }`}
              data-animate
              id="pricing"
            >
              <div className="bg-gradient-to-br from-white to-indigo-50/50 backdrop-blur-sm rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 p-8 lg:p-12 border border-indigo-100 hover:border-indigo-200 group">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Image src={"/whatsapp-icon.png"} alt="whatsapp-icon" width={100} height={100} className="w-10 h-10 text-white" />
                  </div>
                  
                  <h3 className="text-2xl lg:text-3xl font-bold mb-4">
                    <span className="bg-gradient-to-r from-indigo-700 to-purple-600 bg-clip-text text-transparent">
                      Be Among the First to Experience the Future
                    </span>
                  </h3>
                  
                  <p className="text-gray-600 mb-8 text-base lg:text-lg leading-relaxed">
                    Join our exclusive early access program and be the first to experience 
                    next-generation AI debt collection. Get personalized demos and priority access 
                    when we launch.
                  </p>

                  <div className="space-y-4">
                    <button 
                      onClick={redirectToWhatsApp}
                      className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-indigo-500/25 flex items-center justify-center space-x-2"
                    >
                      <PlaneTakeoff className='w-6 h-6 mr-2'/> 
                      <span>Get Early Access</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 lg:py-20" style={{backgroundColor: '#fefbf7'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 bg-clip-text text-transparent mb-6 font-serif">
              Ready to Transform Your Collections?
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 mb-8">
              Get in touch with our team to learn how Tagada AI can help you recover 
              outstanding payments while maintaining positive customer relationships.
            </p>
          </div>

          <div 
            className={`max-w-3xl mx-auto transform transition-all duration-1000 ${
              isVisible.contact ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
            }`}
            data-animate
            id="contact"
          >
            <div className="grid md:grid-cols-3 gap-8">
              {/* Email */}
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:from-indigo-200 group-hover:to-purple-200 transition-all duration-300 group-hover:scale-110">
                  <Mail className="w-8 h-8 text-indigo-600" />
                </div>
                <h3 className="font-semibold text-gray-900 text-lg mb-2">Email Us</h3>
                <p className="text-gray-600 mb-4">adityaomar33@gmail.com</p>
                <a 
                  href="mailto:adityaomar33@gmail.com"
                  className="inline-flex items-center text-indigo-600 hover:text-purple-600 font-medium transition-colors duration-300"
                >
                  Send Email
                </a>
              </div>

              {/* Phone */}
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:from-indigo-200 group-hover:to-purple-200 transition-all duration-300 group-hover:scale-110">
                  <Phone className="w-8 h-8 text-indigo-600" />
                </div>
                <h3 className="font-semibold text-gray-900 text-lg mb-2">Call Us</h3>
                <p className="text-gray-600 mb-4">+91 9044299909</p>
                <a 
                  href="tel:+919044299909"
                  className="inline-flex items-center text-indigo-600 hover:text-purple-600 font-medium transition-colors duration-300"
                >
                  Call Now
                </a>
              </div>

              {/* WhatsApp */}
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:from-indigo-200 group-hover:to-purple-200 transition-all duration-300 group-hover:scale-110">
                  <MessageCircle className="w-8 h-8 text-indigo-600" />
                </div>
                <h3 className="font-semibold text-gray-900 text-lg mb-2">WhatsApp</h3>
                <p className="text-gray-600 mb-4">Quick chat support</p>
                <button 
                  onClick={redirectToWhatsApp}
                  className="inline-flex items-center text-indigo-600 hover:text-purple-600 font-medium transition-colors duration-300"
                >
                  Chat Now
                </button>
              </div>
            </div>

            {/* CTA Button */}
            <div className="text-center mt-12">
              <button
                onClick={redirectToWhatsApp}
                className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-indigo-500/25"
              >
                Get Started Today
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* Company Info */}
            <div className="md:col-span-2">
              <div className="text-3xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Tagada <span className="text-purple-400">AI</span>
              </div>
              <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
                Empowering businesses with AI-driven debt recovery solutions that maintain 
                customer relationships while maximizing collection success. Built for the future of collections.
              </p>
              <div className="flex space-x-4">
                <a 
                  href="https://www.linkedin.com/in/aditya-omar-631413229/" 
                  target='_blank' 
                  className="text-gray-400 hover:text-indigo-400 transition-all duration-300 p-3 rounded-xl  hover:scale-110"
                >
                  <Linkedin size={24} />
                </a>
                <a 
                  href="https://x.com/aditya_omar3?t=dQxdYSlom9CnnVmDaOik0Uxw&s=09" 
                  target='_blank' 
                  className="text-gray-400 hover:text-indigo-400 transition-all duration-300 p-3 rounded-xl  hover:scale-110"
                >
                  <Twitter size={24} />
                </a>
                <button 
                  onClick={redirectToWhatsApp}
                  className="text-gray-400 hover:text-indigo-400 transition-all duration-300 p-3 rounded-xl  hover:scale-110"
                >
                  <MessageCircle size={24} />
                </button>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-indigo-400">Quick Links</h3>
              <ul className="space-y-3">
                {['Home', 'Features', 'Pricing', 'Contact'].map((item) => (
                  <li key={item}>
                    <a 
                      href={`#${item.toLowerCase()}`}
                      className="text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-indigo-400">Get in Touch</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-400">
                  <Mail size={16} />  
                  <span className="text-sm">adityaomar33@gmail.com</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-400">
                  <Phone size={16} />
                  <span className="text-sm">+91 9044299909</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-400">
                  <MessageCircle size={16} />
                  <span onClick={redirectToWhatsApp} className="cursor-pointer text-sm">WhatsApp Support</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-center items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; 2025 Tagada AI. All rights reserved. Building the future of debt collection.
            </p>
           
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default VyapaariLanding;