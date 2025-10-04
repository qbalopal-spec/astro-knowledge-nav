import { useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, useTexture } from "@react-three/drei";
import * as THREE from "three";

interface PlanetAnimationProps {
  planetType: "mars" | "moon" | null;
  searchQuery: string;
}

function Mars() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }
  });

  return (
    <Sphere ref={meshRef} args={[2, 64, 64]}>
      <meshStandardMaterial
        color="#cd5c5c"
        roughness={0.9}
        metalness={0.1}
      >
        {/* Mars-like texture with procedural bumps */}
        <primitive 
          attach="map" 
          object={(() => {
            const canvas = document.createElement('canvas');
            canvas.width = 512;
            canvas.height = 512;
            const ctx = canvas.getContext('2d')!;
            
            // Base red/orange color
            const gradient = ctx.createLinearGradient(0, 0, 512, 512);
            gradient.addColorStop(0, '#cd5c5c');
            gradient.addColorStop(0.5, '#a0522d');
            gradient.addColorStop(1, '#8b4513');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, 512, 512);
            
            // Add craters and surface details
            for (let i = 0; i < 100; i++) {
              ctx.fillStyle = `rgba(139, 69, 19, ${Math.random() * 0.3})`;
              ctx.beginPath();
              ctx.arc(
                Math.random() * 512,
                Math.random() * 512,
                Math.random() * 30 + 5,
                0,
                Math.PI * 2
              );
              ctx.fill();
            }
            
            const texture = new THREE.CanvasTexture(canvas);
            return texture;
          })()}
        />
      </meshStandardMaterial>
    </Sphere>
  );
}

function Moon() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001;
    }
  });

  return (
    <Sphere ref={meshRef} args={[2, 64, 64]}>
      <meshStandardMaterial
        color="#c0c0c0"
        roughness={1}
        metalness={0}
      >
        {/* Moon-like texture with craters */}
        <primitive 
          attach="map" 
          object={(() => {
            const canvas = document.createElement('canvas');
            canvas.width = 512;
            canvas.height = 512;
            const ctx = canvas.getContext('2d')!;
            
            // Base gray color
            const gradient = ctx.createRadialGradient(256, 256, 0, 256, 256, 256);
            gradient.addColorStop(0, '#e0e0e0');
            gradient.addColorStop(0.5, '#c0c0c0');
            gradient.addColorStop(1, '#808080');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, 512, 512);
            
            // Add craters
            for (let i = 0; i < 150; i++) {
              const x = Math.random() * 512;
              const y = Math.random() * 512;
              const radius = Math.random() * 40 + 5;
              
              ctx.fillStyle = `rgba(96, 96, 96, ${Math.random() * 0.4})`;
              ctx.beginPath();
              ctx.arc(x, y, radius, 0, Math.PI * 2);
              ctx.fill();
              
              // Crater highlight
              ctx.fillStyle = `rgba(224, 224, 224, ${Math.random() * 0.2})`;
              ctx.beginPath();
              ctx.arc(x - radius * 0.3, y - radius * 0.3, radius * 0.3, 0, Math.PI * 2);
              ctx.fill();
            }
            
            const texture = new THREE.CanvasTexture(canvas);
            return texture;
          })()}
        />
      </meshStandardMaterial>
    </Sphere>
  );
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
      title: "Mars Research",
      description: "Exploring radiation biology, long-duration missions, and bioregenerative life support systems",
      emoji: "🔴"
    },
    moon: {
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

      {/* 3D Planet */}
      <div 
        className={`relative transition-all duration-2000 ease-out ${
          isZooming ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
        }`}
        style={{
          animation: isZooming ? 'zoomToPlanet 2s ease-out forwards' : 'none',
          width: '500px',
          height: '500px'
        }}
      >
        <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={1.5} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4169e1" />
          
          {planetType === "mars" ? <Mars /> : <Moon />}
        </Canvas>

        {/* Info overlay */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-center p-6 bg-background/90 backdrop-blur-sm rounded-2xl max-w-md mb-8">
          <div className="text-4xl mb-3">{info.emoji}</div>
          <h3 className="text-2xl font-bold text-foreground mb-2">{info.title}</h3>
          <p className="text-sm text-muted-foreground mb-3">{info.description}</p>
          <div className="text-xs text-primary font-mono">
            Searching: {searchQuery}
          </div>
        </div>
      </div>

      <style>{`
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
