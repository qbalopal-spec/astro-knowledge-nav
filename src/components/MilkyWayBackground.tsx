import { useEffect, useState } from "react";

export const MilkyWayBackground = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Main Milky Way Background */}
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          transform: `translateY(${scrollY * 0.3}px)`,
          background: 'radial-gradient(ellipse 120% 80% at 50% 50%, rgba(147, 51, 234, 0.2) 0%, transparent 60%)',
        }}
      />
      
      {/* Milky Way Streak */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          transform: `translateY(${scrollY * 0.2}px) rotate(-25deg)`,
          background: 'linear-gradient(135deg, transparent 30%, rgba(167, 139, 250, 0.3) 45%, rgba(196, 181, 253, 0.4) 50%, rgba(167, 139, 250, 0.3) 55%, transparent 70%)',
        }}
      />

      {/* Star Layers with Different Parallax Speeds */}
      {/* Layer 1 - Fast moving stars */}
      <div 
        className="absolute inset-0"
        style={{ transform: `translateY(${scrollY * 0.5}px)` }}
      >
        {[...Array(50)].map((_, i) => (
          <div
            key={`fast-${i}`}
            className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.8 + 0.2,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 2 + 1}s`,
              boxShadow: '0 0 2px rgba(255, 255, 255, 0.8)'
            }}
          />
        ))}
      </div>

      {/* Layer 2 - Medium speed stars */}
      <div 
        className="absolute inset-0"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      >
        {[...Array(40)].map((_, i) => (
          <div
            key={`medium-${i}`}
            className="absolute w-1.5 h-1.5 bg-blue-200 rounded-full animate-twinkle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.6 + 0.2,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${Math.random() * 3 + 2}s`,
              boxShadow: '0 0 3px rgba(191, 219, 254, 0.6)'
            }}
          />
        ))}
      </div>

      {/* Layer 3 - Slow moving stars */}
      <div 
        className="absolute inset-0"
        style={{ transform: `translateY(${scrollY * 0.15}px)` }}
      >
        {[...Array(30)].map((_, i) => (
          <div
            key={`slow-${i}`}
            className="absolute w-2 h-2 bg-purple-200 rounded-full animate-twinkle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.2,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 4 + 2}s`,
              boxShadow: '0 0 4px rgba(216, 180, 254, 0.5)'
            }}
          />
        ))}
      </div>

      {/* Bright Featured Stars */}
      <div 
        className="absolute inset-0"
        style={{ transform: `translateY(${scrollY * 0.4}px)` }}
      >
        {[...Array(10)].map((_, i) => (
          <div
            key={`bright-${i}`}
            className="absolute"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          >
            <div 
              className="w-3 h-3 bg-white rounded-full animate-pulse"
              style={{
                boxShadow: '0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(147, 51, 234, 0.4)',
              }}
            />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        
        .animate-twinkle {
          animation: twinkle 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};
