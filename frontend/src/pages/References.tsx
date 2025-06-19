
import React, { useEffect } from "react";
import ProjectCard from "@/components/ProjectCard";

const References = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const allProjects = [
    {
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with React, Node.js, and PostgreSQL. Features include user authentication, payment processing, and admin dashboard.",
      imageSrc: "/lovable-uploads/48e75083-18aa-4df9-bc91-8515485aa465.png",
      tags: ["React", "Node.js", "PostgreSQL", "Stripe"],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      title: "Task Management App",
      description: "Collaborative task management tool with real-time updates, team collaboration features, and advanced project tracking capabilities.",
      imageSrc: "/lovable-uploads/752a1366-6aea-49ad-be21-341fe7476d14.png",
      tags: ["React", "Firebase", "TypeScript", "Real-time"],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      title: "Weather Dashboard",
      description: "Real-time weather application with interactive charts, forecasts, and location-based weather data from multiple APIs.",
      imageSrc: "/lovable-uploads/ada582c7-709e-480e-8494-1461b602567c.png",
      tags: ["React", "API Integration", "Charts", "Geolocation"],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      title: "Social Media Platform",
      description: "Full-featured social media platform with user profiles, posts, comments, and real-time messaging functionality.",
      imageSrc: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80",
      tags: ["React", "Node.js", "MongoDB", "Socket.io"],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      title: "Portfolio Website",
      description: "Responsive portfolio website with modern design, smooth animations, and optimized performance for showcasing creative work.",
      imageSrc: "https://images.unsplash.com/photo-1478147427282-58a87a120781?auto=format&fit=crop&q=80",
      tags: ["React", "Tailwind CSS", "Animation", "Responsive"],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      title: "Learning Management System",
      description: "Comprehensive LMS with course creation, student progress tracking, video streaming, and interactive quizzes.",
      imageSrc: "/lovable-uploads/becfc2e3-b59f-4f86-afca-b9f6fc7b7c14.png",
      tags: ["React", "Node.js", "Video Streaming", "Education"],
      liveUrl: "#",
      githubUrl: "#"
    }
  ];

  return (
    <div className="pt-20">
      {/* Projects Showcase */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-psyco-orange-light mb-2">My Projects</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              A collection of projects that showcase my skills and passion for creating digital solutions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allProjects.map((project, index) => (
              <ProjectCard
                key={index}
                {...project}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-16 px-6 md:px-12 bg-psyco-black-light">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-psyco-orange-light mb-2">Technologies I Use</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              A comprehensive list of technologies and tools I work with
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              "React", "TypeScript", "Node.js", "Python", "PostgreSQL", "MongoDB",
              "Tailwind CSS", "Next.js", "Express.js", "Firebase", "AWS", "Docker"
            ].map((tech, index) => (
              <div 
                key={index}
                className="glassmorphism flex items-center justify-center py-6 px-4 text-center card-hover animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span className="text-white font-medium hover:text-psyco-orange-light transition-colors">{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default References;
