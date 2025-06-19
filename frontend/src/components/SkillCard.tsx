
import React from 'react';
import { cn } from '@/lib/utils';

interface SkillCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  imageSrc: string;
  className?: string;
  style?: React.CSSProperties;
}

const SkillCard = ({
  title,
  description,
  icon,
  imageSrc,
  className,
  style
}: SkillCardProps) => {
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
        <div className="absolute top-4 left-4 z-20 bg-psyco-black-card p-2 rounded-lg">
          <div className="text-psyco-orange-DEFAULT">
            {icon}
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-white hover:text-psyco-orange-light transition-colors mb-2">{title}</h3>
        <p className="text-gray-300 text-sm">{description}</p>
      </div>
    </div>
  );
};

export default SkillCard;
