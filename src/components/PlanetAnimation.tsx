import { useEffect, useState } from "react";

interface PlanetAnimationProps {
  planetType: "mars" | "moon" | null;
  searchQuery: string;
}

export const PlanetAnimation = ({ planetType, searchQuery }: PlanetAnimationProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isZooming, setIsZooming] = useState(false);

  useEffect(() => {
    if (planetType) {
      setIsVisible(true);
      setIsZooming(true);
      
      const zoomTimer = setTimeout(() => setIsZooming(false), 2000);
      const hideTimer = setTimeout(() => setIsVisible(false), 4000);
      
      return () => {
        clearTimeout(zoomTimer);
        clearTimeout(hideTimer);
      };
    }
  }, [planetType]);

  if (!isVisible || !planetType) return null;

  const planetInfo = {
    mars: {
      color: "hsl(var(--accent))",
      gradient: "var(--gradient-mars)",
      title: "Mars Research",
      description: "Exploring radiation biology, long-duration missions, and bioregenerative life support systems",
      emoji: "🔴"
    },
    moon: {
      color: "hsl(210 15% 70%)",
      gradient: "linear-gradient(135deg, hsl(210 15% 70%) 0%, hsl(210 10% 50%) 100%)",
      title: "Lunar Research",
      description: "Investigating lunar regolith agriculture, radiation effects, and sustainable habitat systems",
      emoji: "🌙"
    }
  };

  const info = planetInfo[planetType];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none overflow-hidden">
      {/* Milky Way Background with Stars */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-purple-950/20 to-background">
        {/* Animated Stars */}
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.8 + 0.2,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 2 + 1}s`
            }}
          />
        ))}
        
        {/* Milky Way Streak */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: 'radial-gradient(ellipse 100% 50% at 50% 50%, rgba(147, 51, 234, 0.3) 0%, transparent 50%)',
            transform: 'rotate(-30deg)',
          }}
        />
      </div>

      {/* Planet Zoom Animation */}
      <div 
        className={`relative transition-all duration-2000 ease-out ${
          isZooming ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
        }`}
        style={{
          animation: isZooming ? 'zoomToPlanet 2s ease-out forwards' : 'none'
        }}
      >
        <div 
          className="relative w-64 h-64 md:w-96 md:h-96 rounded-full flex items-center justify-center"
          style={{
            background: info.gradient,
            boxShadow: `0 0 60px ${info.color}, 0 0 120px ${info.color}, 0 0 180px ${info.color}`,
            animation: "spin 20s linear infinite"
          }}
        >
          {/* Crater effects for visual detail */}
          <div className="absolute inset-0 rounded-full overflow-hidden opacity-30">
            <div className="absolute top-1/4 left-1/4 w-12 h-12 rounded-full bg-black/20" />
            <div className="absolute top-1/2 right-1/4 w-8 h-8 rounded-full bg-black/15" />
            <div className="absolute bottom-1/3 left-1/3 w-10 h-10 rounded-full bg-black/25" />
            <div className="absolute top-2/3 right-1/3 w-6 h-6 rounded-full bg-black/10" />
          </div>

          {/* Info overlay */}
          <div className="relative z-10 text-center p-8 bg-background/80 backdrop-blur-sm rounded-2xl max-w-xs">
            <div className="text-6xl mb-4 animate-bounce">{info.emoji}</div>
            <h3 className="text-2xl font-bold text-foreground mb-2">{info.title}</h3>
            <p className="text-sm text-muted-foreground">{info.description}</p>
            <div className="mt-4 text-xs text-primary font-mono">
              Searching: {searchQuery}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes zoomToPlanet {
          0% { 
            transform: scale(0) translateZ(-1000px);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% { 
            transform: scale(1) translateZ(0);
            opacity: 1;
          }
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
        
        .animate-twinkle {
          animation: twinkle 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};
