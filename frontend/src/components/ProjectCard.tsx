import React from 'react';
import { cn } from '@/lib/utils';
import { ExternalLink, Github } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
  className?: string;
  style?: React.CSSProperties;
}

const ProjectCard = ({
  title,
  description,
  tags,
  liveUrl,
  githubUrl,
  className,
  style
}: ProjectCardProps) => {
  return (
    <div
      className={cn(
        "glassmorphism overflow-hidden group card-hover transition-all duration-500 p-6",
        className
      )}
      style={style}
    >
      <div className="flex justify-end mb-2 space-x-2">
        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-psyco-black-card p-2 rounded-lg text-psyco-orange-DEFAULT hover:text-psyco-orange-light transition-colors"
        >
          <ExternalLink size={16} />
        </a>
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-psyco-black-card p-2 rounded-lg text-psyco-orange-DEFAULT hover:text-psyco-orange-light transition-colors"
        >
          <Github size={16} />
        </a>
      </div>

      <h3 className="text-xl font-semibold text-white hover:text-psyco-orange-light transition-colors mb-2">{title}</h3>
      <p className="text-gray-300 mb-4 text-sm">{description}</p>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="px-2 py-1 md:px-3 md:py-1 bg-orange-500/10 text-orange-400 text-xs md:text-sm rounded-full border border-orange-500/20"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProjectCard;
