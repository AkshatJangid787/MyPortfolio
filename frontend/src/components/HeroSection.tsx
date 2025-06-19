
import React, { useEffect, useRef } from 'react';
import { MoveRight, Sparkles, Code, Palette, Cloud, Database, ShieldCheck, Link2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!backgroundRef.current) return;

      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;

      backgroundRef.current.style.transform = `translate(${x * -15}px, ${y * -15}px)`;
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Elements */}
      <div
        ref={backgroundRef}
        className="absolute inset-0 z-0 transition-transform duration-500 ease-out"
        style={{ willChange: 'transform' }}
      >
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-orange-400/5 rounded-full blur-3xl"></div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-10 hidden lg:block">
        <Code className="h-10 w-10 text-orange-500/30" /> {/* Backend */}
      </div>

      <div className="absolute bottom-1/4 right-10 hidden lg:block">
        <Palette className="h-10 w-10 text-orange-500/30" /> {/* UI/UX / Creativity */}
      </div>

      <div className="absolute top-10 right-1/4 hidden lg:block">
        <Cloud className="h-10 w-10 text-orange-500/30" /> {/* Cloud (AWS) */}
      </div>

      <div className="absolute bottom-10 left-1/4 hidden lg:block">
        <Database className="h-10 w-10 text-orange-500/30" /> {/* Databases */}
      </div>

      <div className="absolute top-[60%] left-1/2 hidden lg:block">
        <ShieldCheck className="h-10 w-10 text-orange-500/30" /> {/* Security / DevOps */}
      </div>

      <div className="absolute top-[30%] right-[15%] hidden lg:block">
        <Link2 className="h-10 w-10 text-orange-500/30" /> {/* Web3 / Blockchain */}
      </div>


      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center">
          <div className="max-w-2xl">
            <div className="flex items-center mb-4">
              <div className="bg-orange-500/20 text-orange-400 rounded-full px-4 py-1 text-sm font-medium inline-flex items-center">
                <Sparkles className="h-3.5 w-3.5 mr-1" />
                Full Stack Developer
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-glow mb-6">
              Not Just Websites<span className="text-orange-500"> — Experiences</span> That Stick
            </h1>

            <p className="text-xl text-gray-300 mb-8">
              I'm a passionate developer who loves turning complex problems into simple,
              beautiful solutions. Let's build something amazing together.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/contact"
                className="bg-orange-500 hover:bg-orange-700 text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 flex items-center justify-center btn-glow"
              >
                Get In Touch
                <MoveRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/references"
                className="bg-transparent border border-orange-500 text-orange-500 hover:bg-orange-500/10 font-medium py-3 px-8 rounded-lg transition-all duration-300 flex items-center justify-center"
              >
                View My Work
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
