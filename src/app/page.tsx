"use client";
import React, { useState, useEffect, lazy, memo } from "react";
import {
  Phone,
  BarChart3,
  Brain,
  Clock,
  Menu,
  X,
  Mail,
  Linkedin,
  Twitter,
  MessageCircle,
  PlaneTakeoff,
} from "lucide-react";
import { motion } from "framer-motion";

// Lazy load heavy components
const Image = lazy(() => import("next/image"));

interface VisibilityState {
  [key: string]: boolean;
}

// Define a Feature interface for type safety
interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

// Memoized feature card component
const FeatureCard = memo(
  ({
    feature,
    index,
    isVisible,
  }: {
    feature: Feature;
    index: number;
    isVisible: boolean;
  }) => {
    const Icon = feature.icon;

    return (
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={
          isVisible
            ? { opacity: 1, y: 0, scale: 1 }
            : { opacity: 0, y: 50, scale: 0.95 }
        }
        transition={{
          duration: 0.6,
          delay: index * 0.15,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        whileHover={{
          scale: 1.05,
          y: -5,
          transition: { duration: 0.3 },
        }}
        className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-500 border border-gray-100 hover:border-blue-200 group"
        style={{
          boxShadow: "0 4px 25px rgba(0, 0, 0, 0.08)",
        }}
      >
        <motion.div
          className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-100 transition-colors duration-300"
          whileHover={{ rotate: 5, scale: 1.1 }}
          transition={{ duration: 0.3 }}
        >
          <Icon className="w-7 h-7 text-blue-600" />
        </motion.div>
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          {feature.title}
        </h3>
        <p className="text-gray-600 leading-relaxed">{feature.description}</p>
      </motion.div>
    );
  }
);

FeatureCard.displayName = "FeatureCard";

// Memoized navigation component
const Navigation = memo(
  ({
    showNavbar,
    isMenuOpen,
    setIsMenuOpen,
  }: {
    showNavbar: boolean;
    isMenuOpen: boolean;
    setIsMenuOpen: (open: boolean) => void;
  }) => {
    return (
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: showNavbar ? 0 : -100,
          opacity: showNavbar ? 1 : 0,
          scale: showNavbar ? 1 : 0.95,
        }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 rounded-2xl w-full md:max-w-4xl"
        style={{
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(226, 232, 240, 0.8)",
          boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="md:max-w-4xl w-full mx-auto px-6 py-3 rounded-2xl">
          <div className="flex w-full justify-between items-center">
            <motion.div
              className="flex items-center mr-3"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-xl font-bold text-gray-900">
                Tagada <span className="text-blue-600">AI</span>
              </div>
            </motion.div>

            <div className="hidden md:block">
              <div className="flex items-center space-x-6">
                {["Home", "Features", "Pricing", "Contact"].map((item) => (
                  <motion.a
                    key={item}
                    href={`#${item.toLowerCase().replace(" ", "-")}`}
                    className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-300 relative group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item}
                    <span className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full"></span>
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="md:hidden">
              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-blue-600 transition-colors duration-300"
                whileTap={{ scale: 0.95 }}
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </motion.button>
            </div>
          </div>

          {/* Mobile menu */}
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: isMenuOpen ? 1 : 0,
              height: isMenuOpen ? "auto" : 0,
            }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden"
          >
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center space-x-4">
                {["Home", "Features", "Pricing", "Contact"].map((item) => (
                  <motion.a
                    key={item}
                    href={`#${item.toLowerCase().replace(" ", "-")}`}
                    className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-300 rounded-lg hover:bg-blue-50"
                    onClick={() => setIsMenuOpen(false)}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.nav>
    );
  }
);

Navigation.displayName = "Navigation";

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
      window.addEventListener("mousemove", handleMouseMove);
    }, 3000);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.target.id) {
          setIsVisible((prev) => ({
            ...prev,
            [entry.target.id]: true,
          }));
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll("[data-animate]");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: Phone,
      title: "Automated Calls",
      description:
        "Human-like AI calls powered by advanced voice technology that engage customers professionally and increase payment recovery rates.",
    },
    {
      icon: BarChart3,
      title: "Call Summary Reports",
      description:
        "Upload your customer CSV files and receive comprehensive call summaries with recovery recommendations.",
    },
    {
      icon: Brain,
      title: "AI-Powered Call Analysis",
      description:
        "Advanced AI analysis of every conversation to identify successful strategies and optimize future collection approaches.",
    },
    {
      icon: Clock,
      title: "24/7 Operations",
      description:
        "Continuous collection efforts without breaks, maximizing recovery opportunities around the clock with automated scheduling.",
    },
  ];

  const redirectToWhatsApp = () => {
    window.open("https://wa.me/+919044299909", "_blank");
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <Navigation
        showNavbar={showNavbar}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen flex justify-center items-center pt-20 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-white"
      >
        {/* Subtle grid background */}
        <div className="absolute inset-0 opacity-30">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(59, 130, 246, 0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59, 130, 246, 0.03) 1px, transparent 1px)
              `,
              backgroundSize: "50px 50px",
            }}
          ></div>
        </div>

        {/* Subtle background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-50 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute -top-40 -right-40 w-96 h-96 bg-green-50 rounded-full blur-3xl"
            animate={{
              scale: [1.1, 1, 1.1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              className="text-center lg:text-left"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              data-animate
              id="hero"
            >
              <motion.h1
                className="text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight mb-4 lg:mb-6 font-serif text-gray-900"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                AI-Powered Debt Collection
                <motion.span
                  className="block text-blue-600"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  Made Simple
                </motion.span>
              </motion.h1>
              <motion.div
                className="mb-6 lg:mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <p className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
                  Say Goodbye to Manual Calls. Hello to Faster Recovery.
                </p>
                <p className="text-lg sm:text-xl font-medium text-green-600 mb-4">
                  Recover More. Spend Less. Sleep Easy.
                </p>
              </motion.div>
              <motion.p
                className="text-lg sm:text-xl text-gray-600 mb-6 lg:mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Recover outstanding payments efficiently with Tagada AI&#39;s
                intelligent, human-like automated calls that maintain customer
                relationships while maximizing recovery rates.
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <motion.button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 lg:px-8 py-3 lg:py-4 rounded-xl font-semibold text-base lg:text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                  onClick={() => scrollToSection("features")}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  About Product
                </motion.button>
                <motion.button
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6 lg:px-8 py-3 lg:py-4 rounded-xl font-semibold text-base lg:text-lg transition-all duration-300"
                  onClick={redirectToWhatsApp}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Request Demo
                </motion.button>
              </motion.div>
            </motion.div>

            <motion.div
              className="relative mt-8 lg:mt-0"
              initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <motion.div
                className="relative bg-gray-50 rounded-3xl p-8 shadow-xl"
                whileHover={{
                  scale: 1.02,
                  rotate: 1,
                  transition: { duration: 0.3 },
                }}
              >
                <React.Suspense
                  fallback={
                    <div className="w-full h-96 bg-gray-200 rounded-2xl animate-pulse"></div>
                  }
                >
                  <Image
                    src="/chatbots-ai.webp"
                    alt="AI Robot for debt collection"
                    width={500}
                    height={500}
                    className="w-full h-full object-cover rounded-2xl shadow-lg"
                  />
                </React.Suspense>
                <div className="absolute inset-0 bg-blue-600/5 rounded-2xl"></div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12 lg:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 font-serif">
              Powerful Features for Modern Businesses
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI-driven platform combines cutting-edge technology with
              proven collection strategies to deliver exceptional results while
              maintaining customer satisfaction.
            </p>
          </motion.div>

          <div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
            data-animate
            id="features"
          >
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                feature={feature}
                index={index}
                isVisible={isVisible.features}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12 lg:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 font-serif text-gray-900">
              Ready to Get Started?
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Our AI-powered debt collection solution is currently in
              development. We&#39;re building something amazing that will
              revolutionize how businesses handle payment recovery while
              maintaining customer relationships.
            </p>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              data-animate
              id="pricing"
            >
              <motion.div
                className="bg-gray-50 rounded-3xl shadow-xl p-8 lg:p-12 border border-gray-100 group"
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)",
                  transition: { duration: 0.3 },
                }}
              >
                <div className="text-center">
                  <motion.div
                    className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <MessageCircle className="w-10 h-10 text-green-600" />
                  </motion.div>

                  <h3 className="text-2xl lg:text-3xl font-bold mb-4 text-gray-900">
                    Be Among the First to Experience the Future
                  </h3>

                  <p className="text-gray-600 mb-8 text-base lg:text-lg leading-relaxed">
                    Join our exclusive early access program and be the first to
                    experience next-generation AI debt collection. Get
                    personalized demos and priority access when we launch.
                  </p>

                  <div className="space-y-4">
                    <motion.button
                      onClick={redirectToWhatsApp}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <PlaneTakeoff className="w-6 h-6 mr-2" />
                      <span>Get Early Access</span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 font-serif">
              Ready to Transform Your Collections?
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 mb-8">
              Get in touch with our team to learn how Tagada AI can help you
              recover outstanding payments while maintaining positive customer
              relationships.
            </p>
          </motion.div>

          <motion.div
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            data-animate
            id="contact"
          >
            <div className="grid md:grid-cols-3 gap-8">
              {/* Email */}
              <motion.div
                className="text-center group"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors duration-300"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Mail className="w-8 h-8 text-blue-600" />
                </motion.div>
                <h3 className="font-semibold text-gray-900 text-lg mb-2">
                  Email Us
                </h3>
                <p className="text-gray-600 mb-4">adityaomar33@gmail.com</p>
                <motion.a
                  href="mailto:adityaomar33@gmail.com"
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Send Email
                </motion.a>
              </motion.div>

              {/* Phone */}
              <motion.div
                className="text-center group"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors duration-300"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Phone className="w-8 h-8 text-green-600" />
                </motion.div>
                <h3 className="font-semibold text-gray-900 text-lg mb-2">
                  Call Us
                </h3>
                <p className="text-gray-600 mb-4">+91 9044299909</p>
                <motion.a
                  href="tel:+919044299909"
                  className="inline-flex items-center text-green-600 hover:text-green-700 font-medium transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Call Now
                </motion.a>
              </motion.div>

              {/* WhatsApp */}
              <motion.div
                className="text-center group"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors duration-300"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <MessageCircle className="w-8 h-8 text-green-600" />
                </motion.div>
                <h3 className="font-semibold text-gray-900 text-lg mb-2">
                  WhatsApp
                </h3>
                <p className="text-gray-600 mb-4">Quick chat support</p>
                <motion.button
                  onClick={redirectToWhatsApp}
                  className="inline-flex items-center text-green-600 hover:text-green-700 font-medium transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Chat Now
                </motion.button>
              </motion.div>
            </div>

            {/* CTA Button */}
            <motion.div
              className="text-center mt-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <motion.button
                onClick={redirectToWhatsApp}
                className="bg-blue-600 hover:bg-blue-700 text-white py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started Today
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* Company Info */}
            <div className="md:col-span-2">
              <motion.div
                className="text-3xl font-bold mb-4 text-white"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                Tagada <span className="text-blue-400">AI</span>
              </motion.div>
              <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
                Empowering businesses with AI-driven debt recovery solutions
                that maintain customer relationships while maximizing collection
                success. Built for the future of collections.
              </p>
              <div className="flex space-x-4">
                <motion.a
                  href="https://www.linkedin.com/in/aditya-omar-631413229/"
                  target="_blank"
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-300 p-3 rounded-xl"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Linkedin size={24} />
                </motion.a>
                <motion.a
                  href="https://x.com/aditya_omar3?t=dQxdYSlom9CnnVmDaOik0Uxw&s=09"
                  target="_blank"
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-300 p-3 rounded-xl"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Twitter size={24} />
                </motion.a>
                <motion.button
                  onClick={redirectToWhatsApp}
                  className="text-gray-400 hover:text-green-400 transition-colors duration-300 p-3 rounded-xl"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <MessageCircle size={24} />
                </motion.button>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-blue-400">
                Quick Links
              </h3>
              <ul className="space-y-3">
                {["Home", "Features", "Pricing", "Contact"].map((item) => (
                  <li key={item}>
                    <motion.a
                      href={`#${item.toLowerCase()}`}
                      className="text-gray-400 hover:text-white transition-colors duration-300"
                      whileHover={{ x: 5, scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {item}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-blue-400">
                Get in Touch
              </h3>
              <div className="space-y-3">
                <motion.div
                  className="flex items-center space-x-3 text-gray-400"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Mail size={16} />
                  <a
                    href="mailto:adityaomar33@gmail.com"
                    className="text-sm hover:text-blue-400 transition-colors duration-300"
                  >
                    adityaomar33@gmail.com
                  </a>
                </motion.div>
                <motion.div
                  className="flex items-center space-x-3 text-gray-400"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Phone size={16} />
                  <a
                    href="tel:+919044299909"
                    className="text-sm hover:text-blue-400 transition-colors duration-300"
                  >
                    +91 9044299909
                  </a>
                </motion.div>
                <motion.div
                  className="flex items-center space-x-3 text-gray-400"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <MessageCircle size={16} />
                  <span
                    onClick={redirectToWhatsApp}
                    className="cursor-pointer text-sm hover:text-green-400 transition-colors duration-300"
                  >
                    WhatsApp Support
                  </span>
                </motion.div>
              </div>
            </div>
          </div>

          <motion.div
            className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-center items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; 2025 Tagada AI. All rights reserved. Building the future of
              debt collection.
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
};

export default VyapaariLanding;
