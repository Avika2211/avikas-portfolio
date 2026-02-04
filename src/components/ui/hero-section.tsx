import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import ThreeScene from "@/components/ui/three-scene";

export default function HeroSection() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const texts = [
    "AI/ML Research Engineer",
    "Full Stack Developer", 
    "A Curious Problem Solver!"
  ];
  
  const counterRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const currentText = texts[currentTextIndex];
    let timeout: NodeJS.Timeout;

    if (isDeleting) {
      if (typedText.length > 0) {
        timeout = setTimeout(() => {
          setTypedText(typedText.slice(0, -1));
        }, 50);
      } else {
        setIsDeleting(false);
        setCurrentTextIndex((prev) => (prev + 1) % texts.length);
      }
    } else {
      if (typedText.length < currentText.length) {
        timeout = setTimeout(() => {
          setTypedText(currentText.slice(0, typedText.length + 1));
        }, 100);
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
      }
    }

    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, currentTextIndex, texts]);

  useEffect(() => {
    // Animate counters when component mounts
    const animateCounters = () => {
      const counters = [
        { target: 0.0012, suffix: '%', duration: 2000 },
        { target: 500, suffix: '+', duration: 2000 },
        { target: 5, suffix: '+', duration: 2000 },
        { target: 20, suffix: 'X +', duration: 2000 }
      ];

      counters.forEach((counter, index) => {
        const element = counterRefs.current[index];
        if (!element) return;

        const increment = counter.target / (counter.duration / 16);
        let current = 0;

        const timer = setInterval(() => {
          current += increment;
          if (current >= counter.target) {
            current = counter.target;
            clearInterval(timer);
          }

          let displayValue = '';
          if (counter.prefix) displayValue += counter.prefix;
          
          if (counter.target < 1) {
            displayValue += current.toFixed(4);
          } else {
            displayValue += Math.floor(current).toLocaleString();
          }
          
          if (counter.suffix) displayValue += counter.suffix;
          element.textContent = displayValue;
        }, 16);
      });
    };

    const timer = setTimeout(animateCounters, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Three.js 3D Scene Background */}
      <ThreeScene className="opacity-40" />
      
      {/* Interactive Neural Network Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 1200 800" className="w-full h-full">
          <defs>
            <radialGradient id="nodeGradient">
              <stop offset="0%" stopColor="hsl(191, 100%, 50%)" stopOpacity="0.9"/>
              <stop offset="100%" stopColor="hsl(191, 100%, 50%)" stopOpacity="0.1"/>
            </radialGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <g className="animate-pulse-slow">
            <line x1="100" y1="100" x2="300" y2="200" stroke="hsl(191, 100%, 50%)" strokeWidth="2" opacity="0.6" filter="url(#glow)"/>
            <line x1="300" y1="200" x2="500" y2="150" stroke="hsl(258, 84%, 65%)" strokeWidth="2" opacity="0.6" filter="url(#glow)"/>
            <line x1="500" y1="150" x2="700" y2="300" stroke="hsl(148, 100%, 50%)" strokeWidth="2" opacity="0.6" filter="url(#glow)"/>
            <line x1="700" y1="300" x2="900" y2="200" stroke="hsl(191, 100%, 50%)" strokeWidth="2" opacity="0.6" filter="url(#glow)"/>
            <line x1="200" y1="400" x2="600" y2="350" stroke="hsl(333, 100%, 56%)" strokeWidth="2" opacity="0.4" filter="url(#glow)"/>
            <circle cx="100" cy="100" r="4" fill="url(#nodeGradient)" filter="url(#glow)"/>
            <circle cx="300" cy="200" r="4" fill="url(#nodeGradient)" filter="url(#glow)"/>
            <circle cx="500" cy="150" r="4" fill="url(#nodeGradient)" filter="url(#glow)"/>
            <circle cx="700" cy="300" r="4" fill="url(#nodeGradient)" filter="url(#glow)"/>
            <circle cx="900" cy="200" r="4" fill="url(#nodeGradient)" filter="url(#glow)"/>
          </g>
        </svg>
      </div>
      
      {/* Enhanced Floating Orbs with Glow */}
      <div className="floating-orb w-24 h-24 top-20 left-20 animate-float shadow-2xl shadow-cyan-400/50" style={{animationDelay: '0s'}}></div>
      <div className="floating-orb w-16 h-16 top-40 right-32 animate-float shadow-2xl shadow-purple-500/50" style={{animationDelay: '2s'}}></div>
      <div className="floating-orb w-20 h-20 bottom-32 left-1/4 animate-float shadow-2xl shadow-green-400/50" style={{animationDelay: '4s'}}></div>
      <div className="floating-orb w-12 h-12 top-1/3 right-1/4 animate-float shadow-2xl shadow-pink-500/50" style={{animationDelay: '6s'}}></div>
      
      <div className="text-center z-10 max-w-4xl mx-auto px-4">
        {/* 3D Holographic Nameplate */}
        <div className="relative mb-8">
          <h1 className="font-orbitron text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-green-400 neon-glow animate-pulse-slow">
            AVIKA JOSHI
          </h1>
          <div className="absolute inset-0 font-orbitron text-6xl md:text-8xl font-black cyber-blue opacity-20 blur-sm">
            AVIKA JOSHI
          </div>
        </div>
        
        <div className="font-inter text-xl md:text-2xl mb-6 text-gray-300 min-h-[2rem] flex items-center justify-center">
          <span className="typing-animation">
            {typedText}
            <span className="animate-pulse">|</span>
          </span>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4 mb-8 text-sm md:text-base">
          <span className="glassmorphism px-4 py-2 rounded-full">MIT CSAIL Fellow</span>
          <span className="glassmorphism px-4 py-2 rounded-full">Cambridge Researcher</span>
          <span className="glassmorphism px-4 py-2 rounded-full">Harvard Impact Winner</span>
        </div>
        
        {/* Animated Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="glassmorphism p-4 rounded-xl text-center animate-slide-up" style={{animationDelay: '0.2s'}}>
            <div ref={(el) => counterRefs.current[0] = el} className="text-2xl font-bold cyber-blue">0.0012%</div>
            <div className="text-xs text-gray-400">Harvard HPAIR Top</div>
          </div>
          <div className="glassmorphism p-4 rounded-xl text-center animate-slide-up" style={{animationDelay: '0.4s'}}>
            <div ref={(el) => counterRefs.current[1] = el} className="text-2xl font-bold neon-purple">50+</div>
            <div className="text-xs text-gray-400">Concurrent Users</div>
          </div>
          <div className="glassmorphism p-4 rounded-xl text-center animate-slide-up" style={{animationDelay: '0.6s'}}>
            <div ref={(el) => counterRefs.current[2] = el} className="text-2xl font-bold cyber-green">5+</div>
            <div className="text-xs text-gray-400">Languages</div>
          </div>
          <div className="glassmorphism p-4 rounded-xl text-center animate-slide-up" style={{animationDelay: '0.8s'}}>
            <div ref={(el) => counterRefs.current[3] = el} className="text-2xl font-bold electric-yellow">20x +</div>
            <div className="text-xs text-gray-400">Olympiad Winner</div>
          </div>
        </div>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href= "/Avika Joshi CV.pdf" className="bg-gradient-to-r from-cyan-400 to-purple-500 px-8 py-4 rounded-full font-semibold text-white hover:scale-105 transition-transform animate-glow">
          Download Resume
          </a>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="cyber-blue text-2xl w-8 h-8" />
      </div>
    </section>
  );
}
