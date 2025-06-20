import React from 'react';
import { cn } from '@/lib/utils';

interface SkillCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const SkillCard = ({
  title,
  description,
  icon,
  className,
  style
}: SkillCardProps) => {
  return (
    <div 
      className={cn(
        "glassmorphism overflow-hidden group card-hover transition-all duration-500 p-6",
        className
      )}
      style={style}
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="bg-psyco-black-card p-3 rounded-lg text-psyco-orange-DEFAULT">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-white hover:text-psyco-orange-light transition-colors">
          {title}
        </h3>
      </div>

      <p className="text-gray-300 text-sm">{description}</p>
    </div>
  );
};

export default SkillCard;
