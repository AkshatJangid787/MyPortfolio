
import React, { useState, useEffect } from 'react';

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [displayedCode, setDisplayedCode] = useState<string[]>([]);

  const codeLines = [
    "const developer = {",
    "  name: 'Akshat Jangid',",
    "  skills: 'Full Stack',",
    "  passion: 'Building amazing web experiences',",
    "  status: 'Ready to create something awesome'",
    "};",
    "",
    "function initializePortfolio() {",
    "  console.log('Loading portfolio...');",
    "  return developer.showcase();",
    "}",
    "",
    "// Initializing...",
    "initializePortfolio();"
  ];

  useEffect(() => {
    if (currentLine >= codeLines.length) {
      const timer = setTimeout(() => {
        onComplete();
      }, 500);
      return () => clearTimeout(timer);
    }

    const currentLineText = codeLines[currentLine];
    
    if (currentChar <= currentLineText.length) {
      const timer = setTimeout(() => {
        setDisplayedCode(prev => {
          const newCode = [...prev];
          if (newCode[currentLine]) {
            newCode[currentLine] = currentLineText.slice(0, currentChar);
          } else {
            newCode[currentLine] = currentLineText.slice(0, currentChar);
          }
          return newCode;
        });
        setCurrentChar(prev => prev + 1);
      }, Math.random() * 50 + 20); // Random typing speed for realistic effect

      return () => clearTimeout(timer);
    } else {
      // Move to next line
      const timer = setTimeout(() => {
        setCurrentLine(prev => prev + 1);
        setCurrentChar(0);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [currentLine, currentChar, onComplete]);

  return (
    <div className="fixed inset-0 bg-psyco-black-DEFAULT z-50 flex items-center justify-center">
      <div className="w-full max-w-4xl px-6">
        {/* Terminal Header */}
        <div className="bg-psyco-black-light rounded-t-lg p-4 border-b border-psyco-orange-muted/20">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-psyco-orange-DEFAULT"></div>
            <span className="ml-4 text-gray-400 text-sm">portfolio.js</span>
          </div>
        </div>

        {/* Code Editor */}
        <div className="bg-psyco-black-light rounded-b-lg p-6 min-h-[400px] font-mono text-sm">
          {displayedCode.map((line, index) => (
            <div key={index} className="flex items-start space-x-4 mb-2">
              <span className="text-gray-500 select-none w-6 text-right">
                {index + 1}
              </span>
              <span className="text-gray-300">
                {line.includes('const') || line.includes('function') ? (
                  <span className="text-psyco-orange-DEFAULT">{line}</span>
                ) : line.includes('//') ? (
                  <span className="text-gray-500">{line}</span>
                ) : line.includes("'") || line.includes('"') ? (
                  <span>
                    {line.split(/(['"])/).map((part, i) => 
                      part === "'" || part === '"' ? (
                        <span key={i} className="text-yellow-400">{part}</span>
                      ) : i % 2 === 0 ? (
                        <span key={i} className="text-gray-300">{part}</span>
                      ) : (
                        <span key={i} className="text-yellow-400">{part}</span>
                      )
                    )}
                  </span>
                ) : (
                  <span className="text-gray-300">{line}</span>
                )}
                {index === currentLine && (
                  <span className="inline-block w-2 h-5 bg-psyco-orange-DEFAULT ml-1 animate-pulse"></span>
                )}
              </span>
            </div>
          ))}
        </div>

        {/* Loading indicator */}
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center space-x-2 text-psyco-orange-DEFAULT">
            <div className="w-2 h-2 bg-psyco-orange-DEFAULT rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-psyco-orange-DEFAULT rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-psyco-orange-DEFAULT rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
          <p className="text-gray-400 mt-4 font-mono text-sm">
            Compiling portfolio...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
