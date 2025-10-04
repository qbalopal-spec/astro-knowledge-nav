import { useEffect, useState } from "react";

interface PlanetAnimationProps {
  planetType: "mars" | "moon" | null;
  searchQuery: string;
}

export const PlanetAnimation = ({ planetType, searchQuery }: PlanetAnimationProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (planetType) {
      setIsVisible(true);
      const timer = setTimeout(() => setIsVisible(false), 3000);
      return () => clearTimeout(timer);
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
      color: "hsl(var(--muted-foreground))",
      gradient: "linear-gradient(135deg, hsl(210 15% 70%) 0%, hsl(210 10% 50%) 100%)",
      title: "Lunar Research",
      description: "Investigating lunar regolith agriculture, radiation effects, and sustainable habitat systems",
      emoji: "🌙"
    }
  };

  const info = planetInfo[planetType];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      <div className="animate-scale-in">
        <div 
          className="relative w-64 h-64 md:w-96 md:h-96 rounded-full flex items-center justify-center"
          style={{
            background: info.gradient,
            boxShadow: `0 0 60px ${info.color}, 0 0 120px ${info.color}`,
            animation: "spin 20s linear infinite"
          }}
        >
          {/* Crater effects for visual detail */}
          <div className="absolute inset-0 rounded-full overflow-hidden opacity-30">
            <div className="absolute top-1/4 left-1/4 w-12 h-12 rounded-full bg-black/20" />
            <div className="absolute top-1/2 right-1/4 w-8 h-8 rounded-full bg-black/15" />
            <div className="absolute bottom-1/3 left-1/3 w-10 h-10 rounded-full bg-black/25" />
          </div>

          {/* Info overlay */}
          <div className="relative z-10 text-center p-8 bg-background/80 backdrop-blur-sm rounded-2xl max-w-xs">
            <div className="text-6xl mb-4">{info.emoji}</div>
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
      `}</style>
    </div>
  );
};
