import React, { useEffect, useState } from "react";
import HeroSection from "@/components/HeroSection";
import SkillCard from "@/components/SkillCard";
import ProjectCard from "@/components/ProjectCard";
import { Link } from "react-router-dom";
import { Code, Palette, Database, MoveRight, User, Github, Linkedin } from "lucide-react";
import axios from "@/utils/axios";

const Index = () => {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get('/projects');
        const sorted = [...res.data].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setFeaturedProjects(sorted.slice(0, 3));
      } catch (err) {
        console.error("Failed to fetch projects:", err);
      } finally {
        setLoadingProjects(false);
      }
    };
    fetchProjects();
  }, []);

  const skills = [
    {
      title: "Frontend Development",
      description: "React, TypeScript, Tailwind CSS, and modern web technologies",
      icon: <Code size={24} />
    },
    {
      title: "UI/UX Design",
      description: "Creating beautiful and intuitive user interfaces and experiences",
      icon: <Palette size={24} />
    },
    {
      title: "Full Stack Development",
      description: "Backend development with databases and API integration",
      icon: <Database size={24} />
    }
  ];

  return (
    <div>
      <HeroSection />

      {/* About Section */}
      <section className="py-20 px-6 md:px-12 bg-psyco-black-light">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-psyco-orange-light mb-6">About Me</h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                I'm a passionate <span className="text-orange-500 font-bold text-glow">Full-Stack Developer</span>. I specialize in modern web technologies 
                and love turning complex problems into simple, beautiful designs.
              </p>
              <p className="text-gray-300 mb-8 leading-relaxed">
                When I'm not coding, you can find me exploring new technologies, contributing to 
                open-source projects, or sharing knowledge with the developer community.
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
                <Link
                  to="/about"
                  className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 flex items-center btn-glow"
                >
                  Learn More About Me
                  <MoveRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
              <div className="flex space-x-4">
                <a 
                  href="https://github.com/AkshatJangid787"
                  target="_blank"
                  className="text-psyco-green-DEFAULT hover:text-psyco-orange-light transition-colors"
                >
                  <Github size={24} />
                </a>
                <a 
                  href="https://www.linkedin.com/in/akshatjangid/" 
                  target="_blank"
                  className="text-psyco-green-DEFAULT hover:text-psyco-orange-light transition-colors"
                >
                  <Linkedin size={24} />
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="glassmorphism p-8 text-center">
                <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-r from-psyco-green-DEFAULT to-psyco-green-light flex items-center justify-center">
                  <User size={48} className="text-white" />
                </div>
                <h3 className="text-xl font-semibol mb-2 text-psyco-orange-light transition-colors">Akshat Jangid</h3>
                <p className="text-psyco-green-DEFAULT mb-4">Full Stack Developer</p>
                <p className="text-gray-300 text-sm">
                  Building digital experiences that inspire and connect people
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-psyco-orange-light mb-2">My Skills</h2>
              <p className="text-gray-400 max-w-2xl">
                Technologies and tools I work with to bring ideas to life
              </p>
            </div>
            <Link 
              to="/services"
              className="mt-4 sm:mt-0 flex items-center text-psyco-green-DEFAULT hover:text-orange-400 transition-colors"
            >
              View all skills
              <MoveRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <SkillCard
                key={index}
                {...skill}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-20 px-6 md:px-12 bg-psyco-black-light">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-psyco-orange-light mb-2">Featured Projects</h2>
              <p className="text-gray-400 max-w-2xl">
                Some of my recent work that I'm proud to showcase
              </p>
            </div>
            <Link 
              to="/references"
              className="mt-4 sm:mt-0 flex items-center text-psyco-green-DEFAULT hover:text-orange-400 transition-colors"
            >
              View all projects
              <MoveRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          {loadingProjects ? (
            <p className="text-gray-500 text-center">Loading projects...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project, index) => (
                <ProjectCard
                  key={project._id}
                  title={project.title}
                  description={project.description}
                  tags={project.techStack || []}
                  liveUrl={project.liveLink || "#"}
                  githubUrl={project.githubLink || "#"}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 md:px-12 bg-[#121212] relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-psyco-green-DEFAULT/10 rounded-full blur-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-orange-400 mb-4">Let's Work Together</h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-8">
              Ready to bring your next project to life? I'm always open to discussing new opportunities and interesting challenges.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-psyco-green-DEFAULT hover:bg-psyco-green-dark text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 flex items-center justify-center btn-glow"
              >
                Get In Touch
                <MoveRight className="ml-2 h-5 w-5" />
              </Link>
              <a
                href="/resume.pdf"
                className="bg-transparent border border-psyco-green-DEFAULT text-psyco-green-DEFAULT hover:bg-psyco-green-DEFAULT/10 font-medium py-3 px-8 rounded-lg transition-all duration-300 flex items-center justify-center"
              >
                Download Resume
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
