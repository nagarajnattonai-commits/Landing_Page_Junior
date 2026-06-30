import React, { useState, useEffect } from "react";

interface ThreeDTiltCardProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  onClick?: () => void;
  maxTilt?: number;
  key?: React.Key;
}

export default function ThreeDTiltCard({
  children,
  className = "",
  id,
  onClick,
  maxTilt = 8
}: ThreeDTiltCardProps) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  // Detect mobile screen to disable intensive relative mouse tracking
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Mouse coordinates relative to card center
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    
    // Normalized coordinates (-1 to 1)
    const normX = mouseX / (width / 2);
    const normY = mouseY / (height / 2);
    
    // Calculate rotation angles (invert Y axis for natural rotation)
    const rotX = -normY * maxTilt;
    const rotY = normX * maxTilt;
    
    setTilt({ x: rotX, y: rotY });
  };

  const handleMouseEnter = () => {
    if (isMobile) return;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  const cardStyle: React.CSSProperties = isMobile
    ? {}
    : {
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(${isHovered ? 1.02 : 1}, ${isHovered ? 1.02 : 1}, 1)`,
        transformStyle: "preserve-3d",
        transition: isHovered ? "transform 0.05s linear" : "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)"
      };

  return (
    <div
      id={id}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative select-none ${className}`}
      style={cardStyle}
    >
      {/* 3D Inner reflection sheen overlay */}
      {!isMobile && isHovered && (
        <div 
          className="absolute inset-0 pointer-events-none z-10 opacity-30 mix-blend-overlay transition-opacity duration-300 bg-gradient-to-tr from-transparent via-white/5 to-cyan-500/20"
          style={{
            transform: `translateZ(40px)`,
          }}
        />
      )}
      <div 
        style={!isMobile ? { transform: `translateZ(20px)`, transformStyle: "preserve-3d" } : {}}
        className="h-full flex flex-col justify-between"
      >
        {children}
      </div>
    </div>
  );
}
