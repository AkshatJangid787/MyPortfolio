
import React, { useEffect } from "react";
import { Code, Palette, Database, Globe, MoveRight, Smartphone, Cloud, GitBranch, Zap, Monitor, Cpu, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const Services = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const mainSkills = [
    {
      id: "frontend",
      icon: <Code size={32} />,
      title: "Frontend Development",
      description: "Building responsive and interactive user interfaces with modern frameworks and libraries.",
      image: "/lovable-uploads/708f9e32-840d-46a4-aaa4-75ad2689e16f.png",
      features: [
        "React.js & Next.js",
        "TypeScript & JavaScript (ES6+)",
        "Tailwind CSS & Styled Components",
        "HTML5 & CSS3",
        "Redux & Context API",
        "Responsive Design & Mobile-First"
      ]
    },
    {
      id: "backend",
      icon: <Database size={32} />,
      title: "Backend Development",
      description: "Creating robust server-side applications and APIs with scalable architecture.",
      image: "/lovable-uploads/becfc2e3-b59f-4f86-afca-b9f6fc7b7c14.png",
      features: [
        "Node.js & Express.js",
        "Python & Django/Flask",
        "PostgreSQL & MongoDB",
        "RESTful APIs & GraphQL",
        "Authentication & Authorization",
        "Database Design & Optimization"
      ]
    },
    {
      id: "fullstack",
      icon: <Globe size={32} />,
      title: "Full Stack Solutions",
      description: "End-to-end application development from concept to deployment.",
      image: "/lovable-uploads/03e83f18-76a1-4349-a197-dbde03a93343.png",
      features: [
        "MERN & PERN Stack",
        "API Integration",
        "State Management",
        "Real-time Applications",
        "Performance Optimization",
        "Testing & Debugging"
      ]
    }
  ];

  const additionalSkills = [
    {
      icon: <Smartphone size={24} />,
      title: "Mobile Development",
      description: "React Native apps for iOS and Android platforms."
    },
    {
      icon: <Cloud size={24} />,
      title: "Cloud Services",
      description: "AWS, Vercel, and Firebase deployment solutions."
    },
    {
      icon: <GitBranch size={24} />,
      title: "Version Control",
      description: "Git, GitHub workflows, and collaborative development."
    },
    {
      icon: <Zap size={24} />,
      title: "Performance Optimization",
      description: "Code splitting, lazy loading, and SEO optimization."
    },
    {
      icon: <Monitor size={24} />,
      title: "UI/UX Design",
      description: "Figma, prototyping, and user-centered design."
    },
    {
      icon: <Shield size={24} />,
      title: "Security & Testing",
      description: "Unit testing, integration testing, and security best practices."
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-psyco-black-light py-20 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-psyco-green-DEFAULT/10 rounded-full blur-3xl top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-psyco-orange-light mb-6 animate-fade-in">My Skills</h1>
            <p className="text-xl text-gray-300 mb-8 animate-fade-in animation-delay-100">
              Full-stack developer with expertise in modern web technologies. I create scalable, performant applications with clean code and user-focused design.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center bg-psyco-green-DEFAULT hover:bg-psyco-green-dark text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 btn-glow animate-fade-in animation-delay-200"
            >
              Let's Work Together
              <MoveRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Main Skills */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-psyco-orange-light mb-2">Core Expertise</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Technologies and frameworks I use to build exceptional digital experiences
            </p>
          </div>
          
          {mainSkills.map((skill, index) => (
            <div 
              key={skill.id}
              id={skill.id}
              className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 mb-20 last:mb-0 animate-fade-in`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-full lg:w-1/2">
                <div className="glassmorphism p-1 rounded-2xl h-full">
                  <div className="relative w-full h-full overflow-hidden rounded-xl">
                    <img 
                      src={skill.image} 
                      alt={skill.title} 
                      className="object-cover w-full h-full aspect-video lg:aspect-auto transition-transform duration-10000 hover:scale-110"
                    />
                  </div>
                </div>
              </div>
              
              <div className="w-full lg:w-1/2 flex flex-col justify-center">
                <div className="text-psyco-green-DEFAULT mb-4">
                  {skill.icon}
                </div>
                <h3 className="text-2xl font-semibold text-psyco-orange-light mb-4">{skill.title}</h3>
                <p className="text-gray-300 mb-6">{skill.description}</p>
                
                <div className="bg-psyco-black-light rounded-xl p-6">
                  <h4 className="text-lg font-medium text-psyco-orange-light mb-4">Technologies & Tools:</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {skill.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <div className="text-psyco-green-DEFAULT mt-1 mr-2">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.66675 10.1148L12.7947 3.98608L13.7381 4.92875L6.66675 12.0001L2.42675 7.76008L3.36941 6.81741L6.66675 10.1148Z" fill="currentColor" />
                          </svg>
                        </div>
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Additional Skills */}
      <section className="py-20 px-6 md:px-12 bg-psyco-black-light">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-psyco-orange-light mb-2">Additional Skills</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Specialized knowledge and tools that enhance development workflow
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalSkills.map((skill, index) => (
              <div 
                key={index}
                className="glassmorphism p-6 card-hover animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="text-psyco-green-DEFAULT mb-4">
                  {skill.icon}
                </div>
                <h3 className="text-xl font-medium text-white hover:text-psyco-orange-light transition-colors mb-2">{skill.title}</h3>
                <p className="text-gray-300">{skill.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-psyco-green-DEFAULT/10 rounded-full blur-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="glassmorphism p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-psyco-orange-light mb-4">Ready to Build Something Amazing?</h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-8">
              Let's discuss your project and bring your ideas to life with modern web technologies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-psyco-green-DEFAULT hover:bg-psyco-green-dark text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 flex items-center justify-center btn-glow"
              >
                Start a Project
                <MoveRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/references"
                className="bg-transparent border border-psyco-green-DEFAULT text-psyco-green-DEFAULT hover:bg-psyco-green-DEFAULT/10 font-medium py-3 px-8 rounded-lg transition-all duration-300 flex items-center justify-center"
              >
                View My Work
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
