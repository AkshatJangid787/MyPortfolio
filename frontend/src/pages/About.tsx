
import React, { useEffect } from "react";
import { Award, Briefcase, GraduationCap, Calendar, MapPin, Trophy, Code } from "lucide-react";
import { useLeetCode } from "@/hooks/useLeetCode";

const About = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Replace 'your-username' with your actual LeetCode username
  const leetCodeStats = useLeetCode('AkshatJangid787');

  const certifications = [
    {
      title: "Full Stack Web Development",
      issuer: "FreeCodeCamp",
      date: "2023",
      description: "Comprehensive certification covering HTML, CSS, JavaScript, React, Node.js, and database management.",
      icon: <GraduationCap className="h-6 w-6" />
    },
    {
      title: "React Developer Certification",
      issuer: "Meta",
      date: "2023",
      description: "Advanced React concepts including hooks, context, performance optimization, and testing.",
      icon: <Award className="h-6 w-6" />
    },
    {
      title: "AWS Cloud Practitioner",
      issuer: "Amazon Web Services",
      date: "2022",
      description: "Cloud fundamentals, AWS services, security, and best practices for cloud deployment.",
      icon: <Trophy className="h-6 w-6" />
    }
  ];

  const experiences = [
    {
      title: "Full Stack Developer (Project-Based)",
      company: "Personal Projects",
      location: "Remote",
      period: "2023 - Present",
      description: "Designed and developed multiple full-stack applications using the MERN stack, including an eCommerce platform with authentication, cart, and order tracking features. Implemented responsive UIs, REST APIs, and integrated third-party services.",
      technologies: ["React", "Node.js", "MongoDB", "Tailwind CSS", "Express.js", "Many More"]
    },
    {
      title: "Open Source Contributor",
      company: "Hacktoberfest & GitHub",
      location: "Remote",
      period: "2023 - 2024",
      description: "Contributed to various open-source React projects during Hacktoberfest. Worked on bug fixes, UI improvements, and feature enhancements in popular repositories with 500+ stars.",
      technologies: ["React", "JavaScript", "Git", "GitHub"]
    }
  ];

  const achievements = [
    {
      title: "LeetCode Problems Solved",
      year: "Live Data",
      description: leetCodeStats.loading
        ? "Loading LeetCode statistics..."
        : leetCodeStats.error
          ? "Unable to load LeetCode data"
          : (
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-500 mb-2 hover:text-red-500 transition-colors">
                {leetCodeStats.totalSolved}
              </div>
              <div className="text-sm text-gray-300">
                <span className="text-green-400">Easy: {leetCodeStats.easySolved}</span> |{" "}
                <span className="text-yellow-400">Medium: {leetCodeStats.mediumSolved}</span> |{" "}
                <span className="text-red-400">Hard: {leetCodeStats.hardSolved}</span>
              </div>
            </div>
          ),
      icon: <Code className="h-8 w-8 text-orange-500" />
    },
    {
      title: "Open Source Contributor",
      year: "2024",
      description: "Successfully participated in Hacktoberfest 2024 by contributing to open-source React projects. Made meaningful PRs and collaborated with maintainers to improve real-world codebases.",
      icon: <Award className="h-8 w-8 text-orange-500" />
    }

  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-12 md:py-16 px-4 md:px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-psyco-orange-light mb-4 md:mb-6">
            About My Journey
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Discover my professional background, certifications, and achievements that shape who I am as a developer.
          </p>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-12 md:py-16 px-4 md:px-6 lg:px-12 bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-psyco-orange-light mb-4 flex items-center justify-center gap-3">
              <Trophy className="h-6 w-6 md:h-8 md:w-8 text-white" />
              Achievements
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto px-4">
              Notable accomplishments and recognition in my development career
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="glassmorphism p-6 md:p-8 card-hover animate-fade-in text-center"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="flex justify-center mb-6">
                  {achievement.icon}
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-white mb-2">{achievement.title}</h3>
                <p className="text-orange-400 font-medium mb-4">{achievement.year}</p>
                <div className="text-gray-300 text-sm md:text-base">{achievement.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-12 md:py-16 px-4 md:px-6 lg:px-12 bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-psyco-orange-light mb-4 flex items-center justify-center gap-3">
              <Briefcase className="h-6 w-6 md:h-8 md:w-8 text-white" />
              Professional Experience
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto px-4">
              My professional journey and the roles that have shaped my expertise
            </p>
          </div>

          <div className="space-y-6 md:space-y-8">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="glassmorphism p-4 md:p-6 lg:p-8 card-hover animate-fade-in"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="flex flex-col gap-4 md:gap-6">
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-semibold text-white mb-2">{exp.title}</h3>
                    <div className="flex flex-col gap-2 mb-4 text-sm md:text-base text-gray-300">
                      <span className="font-medium text-orange-400">{exp.company}</span>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4 flex-shrink-0" />
                          {exp.location}
                        </span>
                        <span className="hidden sm:block">•</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 flex-shrink-0" />
                          {exp.period}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-300 mb-4 text-sm md:text-base">{exp.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2 py-1 md:px-3 md:py-1 bg-orange-500/10 text-orange-400 text-xs md:text-sm rounded-full border border-orange-500/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-12 md:py-16 px-4 md:px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-psyco-orange-light mb-4 flex items-center justify-center gap-3">
              <GraduationCap className="h-6 w-6 md:h-8 md:w-8 text-white" />
              Certifications
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto px-4">
              Professional certifications that validate my skills and knowledge
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="glassmorphism p-4 md:p-6 card-hover animate-fade-in text-center"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-orange-500/10 rounded-full text-orange-500">
                    {cert.icon}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{cert.title}</h3>
                <p className="text-orange-400 font-medium mb-2">{cert.issuer}</p>
                <p className="text-gray-400 text-sm mb-3">{cert.date}</p>
                <p className="text-gray-300 text-sm">{cert.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
