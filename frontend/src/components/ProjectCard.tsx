
import React from 'react';
import { cn } from '@/lib/utils';
import { ExternalLink, Github } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  imageSrc: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
  className?: string;
  style?: React.CSSProperties;
}

const ProjectCard = ({
  title,
  description,
  imageSrc,
  tags,
  liveUrl,
  githubUrl,
  className,
  style
}: ProjectCardProps) => {
  return (
    <div 
      className={cn(
        "glassmorphism overflow-hidden group card-hover transition-all duration-500",
        className
      )}
      style={style}
    >
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-psyco-black-DEFAULT to-transparent z-10"></div>
        <img 
          src={imageSrc} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 z-20 flex space-x-2">
          <a 
            href={liveUrl}
            className="bg-psyco-black-card p-2 rounded-lg text-psyco-orange-DEFAULT hover:text-psyco-orange-light transition-colors"
          >
            <ExternalLink size={16} />
          </a>
          <a 
            href={githubUrl}
            className="bg-psyco-black-card p-2 rounded-lg text-psyco-orange-DEFAULT hover:text-psyco-orange-light transition-colors"
          >
            <Github size={16} />
          </a>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-white hover:text-psyco-orange-light transition-colors mb-2">{title}</h3>
        <p className="text-gray-300 mb-4 text-sm">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span 
              key={index}
              className="bg-psyco-orange-DEFAULT/10 text-psyco-orange-DEFAULT px-2 py-1 rounded-md text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
