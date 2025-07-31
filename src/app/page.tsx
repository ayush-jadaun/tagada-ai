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

// Typing Animation Component
const TypingAnimation = memo(() => {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typeSpeed, setTypeSpeed] = useState(150);

  const textOptions = React.useMemo(
    () => [
      "Tagada AI",
      "तगादा AI", // Hindi
      "তাগাদা AI", // Bengali
      "తగాదా AI", // Telugu
    ],
    []
  );

  useEffect(() => {
    const handleType = () => {
      const current = textOptions[currentIndex];

      if (isDeleting) {
        setCurrentText(current.substring(0, currentText.length - 1));
        setTypeSpeed(75);
      } else {
        setCurrentText(current.substring(0, currentText.length + 1));
        setTypeSpeed(150);
      }

      if (!isDeleting && currentText === current) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && currentText === "") {
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % textOptions.length);
      }
    };

    const timer = setTimeout(handleType, typeSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentIndex, typeSpeed, textOptions]);

  return (
    <span className="inline-block">
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  );
});

TypingAnimation.displayName = "TypingAnimation";

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
      <div
        className={`bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-blue-200 group transform ${
          isVisible
            ? "translate-y-0 opacity-100 scale-100"
            : "translate-y-12 opacity-0 scale-95"
        }`}
        style={{
          transitionDelay: `${index * 150}ms`,
          boxShadow: "0 4px 25px rgba(0, 0, 0, 0.08)",
        }}
      >
        <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-100 transition-colors duration-300 group-hover:scale-110 group-hover:rotate-3">
          <Icon className="w-7 h-7 text-blue-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          {feature.title}
        </h3>
        <p className="text-gray-600 leading-relaxed">{feature.description}</p>
      </div>
    );
  }
);

FeatureCard.displayName = "FeatureCard";

// Memoized navigation component with typing animation
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
      <nav
        className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 rounded-2xl w-full md:max-w-4xl transition-all duration-500 ${
          showNavbar
            ? "translate-y-0 opacity-100 scale-100"
            : "-translate-y-28 opacity-0 scale-95"
        }`}
        style={{
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(226, 232, 240, 0.8)",
          boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="md:max-w-4xl w-full mx-auto px-6 py-3 rounded-2xl">
          <div className="flex w-full justify-between items-center">
            <div className="flex items-center mr-3 hover:scale-105 transition-transform duration-200">
              <div className="text-xl font-bold text-gray-900">
                <TypingAnimation />
              </div>
            </div>

            <div className="hidden md:block">
              <div className="flex items-center space-x-6">
                {["Home", "Features", "Pricing", "Contact"].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase().replace(" ", "-")}`}
                    className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-all duration-300 relative group hover:scale-105"
                  >
                    {item}
                    <span className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full"></span>
                  </a>
                ))}
              </div>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-blue-600 transition-colors duration-300 hover:scale-110"
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          <div
            className={`md:hidden overflow-hidden transition-all duration-300 ${
              isMenuOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center space-x-4">
                {["Home", "Features", "Pricing", "Contact"].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase().replace(" ", "-")}`}
                    className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-all duration-300 rounded-lg hover:bg-blue-50 hover:scale-105"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
);

Navigation.displayName = "Navigation";

const VyapaariLanding = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState<VisibilityState>({});
  const [showNavbar, setShowNavbar] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Handle mouse movement for navbar visibility (desktop only)
  useEffect(() => {
    // Always show navbar on mobile
    if (isMobile) {
      setShowNavbar(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setShowNavbar(e.clientY < 100);
    };

    // Show navbar initially, then add mouse listener after 3 seconds (desktop only)
    const timer = setTimeout(() => {
      if (!isMobile) {
        window.addEventListener("mousemove", handleMouseMove);
      }
    }, 3000);

    return () => {
      clearTimeout(timer);
      if (!isMobile) {
        window.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [isMobile]);

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
    window.open("https://wa.me/+919450206642", "_blank");
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

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-50 rounded-full blur-3xl animate-pulse"
            style={{
              animation: "float 8s ease-in-out infinite",
            }}
          />
          <div
            className="absolute -top-40 -right-40 w-96 h-96 bg-green-50 rounded-full blur-3xl animate-pulse"
            style={{
              animation: "float 10s ease-in-out infinite reverse",
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div
              className="text-center lg:text-left order-2 lg:order-1 animate-fadeInUp"
              data-animate
              id="hero"
            >
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4 lg:mb-6 font-serif text-gray-900">
                <span className="block sm:inline">
                  Debt Collection Made Simple With
                </span>
                <span className="block text-blue-600 mt-1 sm:mt-0 min-h-[1.2em]">
                  {" "}
                  <TypingAnimation />
                </span>
              </h1>

              <div className="mb-6 lg:mb-8">
                <p className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">
                  Recover More. Spend Less.
                </p>
                <p className="hidden sm:block text-base sm:text-lg text-gray-600 mb-4 leading-relaxed">
                  Intelligent automated calls that maintain customer
                  relationships while maximizing recovery rates.
                </p>
                <p className="block sm:hidden text-base text-gray-600 mb-4 leading-relaxed">
                  Smart AI calls that recover payments while keeping customers
                  happy.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 lg:px-8 py-3 lg:py-4 rounded-xl font-semibold text-base lg:text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 hover:-translate-y-1"
                  onClick={() => scrollToSection("features")}
                >
                  Learn More
                </button>
                <button
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6 lg:px-8 py-3 lg:py-4 rounded-xl font-semibold text-base lg:text-lg transition-all duration-300 hover:scale-105 hover:-translate-y-1"
                  onClick={redirectToWhatsApp}
                >
                  Get Demo
                </button>
              </div>
            </div>

            <div className="relative order-1 lg:order-2">
              <div className="relative bg-gray-50 rounded-3xl p-6 lg:p-8 shadow-xl hover:scale-105 hover:rotate-1 transition-all duration-300">
                <React.Suspense
                  fallback={
                    <div className="w-full h-64 sm:h-80 lg:h-96 bg-gray-200 rounded-2xl animate-pulse"></div>
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
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 font-serif">
              Powerful Features for Modern Businesses
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI-driven platform combines cutting-edge technology with
              proven collection strategies to deliver exceptional results while
              maintaining customer satisfaction.
            </p>
          </div>

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
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 font-serif text-gray-900">
              Ready to Get Started?
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Our AI-powered debt collection solution is currently in
              development. We&#39;re building something amazing that will
              revolutionize how businesses handle payment recovery while
              maintaining customer relationships.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div
              data-animate
              id="pricing"
              className={`transition-all duration-600 ${
                isVisible.pricing
                  ? "translate-y-0 opacity-100 scale-100"
                  : "translate-y-12 opacity-0 scale-95"
              }`}
            >
              <div className="bg-gray-50 rounded-3xl shadow-xl p-8 lg:p-12 border border-gray-100 group hover:scale-105 hover:shadow-2xl transition-all duration-300">
                <div className="text-center">
                  <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                    <MessageCircle className="w-10 h-10 text-green-600" />
                  </div>

                  <h3 className="text-2xl lg:text-3xl font-bold mb-4 text-gray-900">
                    Be Among the First to Experience the Future
                  </h3>

                  <p className="text-gray-600 mb-8 text-base lg:text-lg leading-relaxed">
                    Join our exclusive early access program and be the first to
                    experience next-generation AI debt collection. Get
                    personalized demos and priority access when we launch.
                  </p>

                  <div className="space-y-4">
                    <button
                      onClick={redirectToWhatsApp}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 hover:scale-105 hover:-translate-y-1"
                    >
                      <PlaneTakeoff className="w-6 h-6 mr-2" />
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
      <section id="contact" className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 font-serif">
              Ready to Transform Your Collections?
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 mb-8">
              Get in touch with our team to learn how <TypingAnimation /> can
              help you recover outstanding payments while maintaining positive
              customer relationships.
            </p>
          </div>

          <div className="max-w-3xl mx-auto" data-animate id="contact">
            <div
              className={`grid md:grid-cols-3 gap-8 transition-all duration-600 ${
                isVisible.contact
                  ? "translate-y-0 opacity-100"
                  : "translate-y-12 opacity-0"
              }`}
            >
              {/* Email */}
              <div className="text-center group hover:-translate-y-2 transition-transform duration-300">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <Mail className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 text-lg mb-2">
                  Email Us
                </h3>
                <p className="text-gray-600 mb-4">adityaomar33@gmail.com</p>
                <a
                  href="mailto:adityaomar33@gmail.com"
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-all duration-300 hover:scale-105"
                >
                  Send Email
                </a>
              </div>

              {/* Phone */}
              <div className="text-center group hover:-translate-y-2 transition-transform duration-300">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <Phone className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 text-lg mb-2">
                  Call Us
                </h3>
                <p className="text-gray-600 mb-4">+91 9450206642</p>
                <a
                  href="tel:+919450206642"
                  className="inline-flex items-center text-green-600 hover:text-green-700 font-medium transition-all duration-300 hover:scale-105"
                >
                  Call Now
                </a>
              </div>

              {/* WhatsApp */}
              <div className="text-center group hover:-translate-y-2 transition-transform duration-300">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <MessageCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 text-lg mb-2">
                  WhatsApp
                </h3>
                <p className="text-gray-600 mb-4">Quick chat support</p>
                <button
                  onClick={redirectToWhatsApp}
                  className="inline-flex items-center text-green-600 hover:text-green-700 font-medium transition-all duration-300 hover:scale-105"
                >
                  Chat Now
                </button>
              </div>
            </div>

            {/* CTA Button */}
            <div className="text-center mt-12">
              <button
                onClick={redirectToWhatsApp}
                className="bg-blue-600 hover:bg-blue-700 text-white py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 hover:-translate-y-1"
              >
                Get Started Today
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* Company Info */}
            <div className="md:col-span-2">
              <div className="text-3xl font-bold mb-4 text-white hover:scale-105 transition-transform duration-200">
                <TypingAnimation />
              </div>
              <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
                Empowering businesses with AI-driven debt recovery solutions
                that maintain customer relationships while maximizing collection
                success. Built for the future of collections.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://www.linkedin.com/in/aditya-omar-631413229/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-all duration-300 p-3 rounded-xl hover:scale-110 hover:-translate-y-1"
                >
                  <Linkedin size={24} />
                </a>
                <a
                  href="https://x.com/aditya_omar3?t=dQxdYSlom9CnnVmDaOik0Uxw&s=09"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-all duration-300 p-3 rounded-xl hover:scale-110 hover:-translate-y-1"
                >
                  <Twitter size={24} />
                </a>
                <button
                  onClick={redirectToWhatsApp}
                  className="text-gray-400 hover:text-green-400 transition-all duration-300 p-3 rounded-xl hover:scale-110 hover:-translate-y-1"
                >
                  <MessageCircle size={24} />
                </button>
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
                    <a
                      href={`#${item.toLowerCase()}`}
                      className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2 hover:scale-105 inline-block"
                    >
                      {item}
                    </a>
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
                <div className="flex items-center space-x-3 text-gray-400 hover:translate-x-2 transition-transform duration-200">
                  <Mail size={16} />
                  <a
                    href="mailto:adityaomar33@gmail.com"
                    className="text-sm hover:text-blue-400 transition-colors duration-300"
                  >
                    adityaomar33@gmail.com
                  </a>
                </div>
                <div className="flex items-center space-x-3 text-gray-400 hover:translate-x-2 transition-transform duration-200">
                  <Phone size={16} />
                  <a
                    href="tel:+919450206642"
                    className="text-sm hover:text-blue-400 transition-colors duration-300"
                  >
                    +91 9450206642
                  </a>
                </div>
                <div className="flex items-center space-x-3 text-gray-400 hover:translate-x-2 transition-transform duration-200">
                  <MessageCircle size={16} />
                  <span
                    onClick={redirectToWhatsApp}
                    className="cursor-pointer text-sm hover:text-green-400 transition-colors duration-300"
                  >
                    WhatsApp Support
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-center items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; 2025 Tagada AI. All rights reserved. Building the future of
              debt collection.
            </p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-20px) scale(1.05);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default VyapaariLanding;
