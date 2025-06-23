import React, { useEffect, useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import axios from "@/utils/axios";

interface Project {
  _id: string;
  title: string;
  description: string;
  techStack?: string[];
  liveLink?: string;
  githubLink?: string;
}

interface Skill {
  _id: string;
  name: string;
}

const References: React.FC = () => {
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [skills, setSkills] = useState<Skill[] | null>(null);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [loadingSkills, setLoadingSkills] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get("/projects");
        if (Array.isArray(res.data)) {
          setProjects(res.data);
        } else {
          console.error("Unexpected projects response:", res.data);
          setProjects(null);
        }
      } catch (error) {
        console.error("Failed to fetch projects:", error);
        setProjects(null);
      } finally {
        setLoadingProjects(false);
      }
    };
    fetchProjects();
  }, []);

  // Fetch skills
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await axios.get("/skills");
        if (Array.isArray(res.data)) {
          setSkills(res.data);
        } else {
          console.error("Unexpected skills response:", res.data);
          setSkills(null);
        }
      } catch (error) {
        console.error("Failed to fetch skills:", error);
        setSkills(null);
      } finally {
        setLoadingSkills(false);
      }
    };
    fetchSkills();
  }, []);

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

          {loadingProjects ? (
            <p className="text-center text-gray-400">Loading projects...</p>
          ) : projects && projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
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
          ) : (
            <p className="text-center text-red-400">No projects found.</p>
          )}
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

          {loadingSkills ? (
            <p className="text-center text-gray-400">Loading skills...</p>
          ) : skills && skills.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {skills.map((skill, index) => (
                <div
                  key={skill._id}
                  className="glassmorphism flex items-center justify-center py-6 px-4 text-center card-hover animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <span className="text-white font-medium hover:text-psyco-orange-light transition-colors">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-red-400">No skills found.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default References;
