import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Bot, FlaskRound, Globe, Eye, Heart, GraduationCap } from "lucide-react";

interface Project3D {
  id: number;
  title: string;
  icon: any;
  color: number;
  description: string;
  position: [number, number, number];
  scale: number;
}

const projects3D: Project3D[] = [
  {
    id: 1,
    title: "AIRA Platform",
    icon: Bot,
    color: 0x00d9ff,
    description: "Offline B2B AI Calling agent built on faster-whisper for fast local transcription, TinyLlama via Ollama for lightweight, intelligent dialogue, Coqui TTS for lifelike, low-latency speech, Asterisk for real SIP-based call handling (designed for production use)",
    position: [-3, 2, 0],
    scale: 1.2
  },
  {
    id: 2,
    title: "MIT Framework",
    icon: FlaskRound,
    color: 0x8b5cf6,
    description: "Production research framework",
    position: [3, 1, -1],
    scale: 1.0
  },
  {
    id: 3,
    title: "Climate AI",
    icon: Globe,
    color: 0x00ff88,
    description: "Environmental data processing",
    position: [0, -2, 1],
    scale: 1.4
  },
  {
    id: 4,
    title: "SmartCV",
    icon: Eye,
    color: 0xffff00,
    description: "Computer vision platform",
    position: [-2, -1, -2],
    scale: 0.8
  },
  {
    id: 5,
    title: "BioAI",
    icon: Heart,
    color: 0xff0080,
    description: "Medical diagnostics AI",
    position: [2, 0, 2],
    scale: 1.1
  },
  {
    id: 6,
    title: "EduAI",
    icon: GraduationCap,
    color: 0xff6600,
    description: "Personalized learning AI",
    position: [0, 3, -1],
    scale: 0.9
  }
];

interface InteractiveProjectShowcaseProps {
  className?: string;
  onProjectSelect?: (project: Project3D | null) => void;
}

export default function InteractiveProjectShowcase({ className, onProjectSelect }: InteractiveProjectShowcaseProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const frameRef = useRef<number>();
  const meshesRef = useRef<THREE.Mesh[]>([]);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const raycasterRef = useRef<THREE.Raycaster>(new THREE.Raycaster());
  const mouseRef = useRef<THREE.Vector2>(new THREE.Vector2());

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, 600 / 400, 0.1, 1000);
    camera.position.set(0, 0, 8);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(600, 400);
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    // Create project meshes
    const meshes: THREE.Mesh[] = [];

    projects3D.forEach((project, index) => {
      // Create different geometries for variety
      let geometry;
      switch (index % 6) {
        case 0:
          geometry = new THREE.DodecahedronGeometry(project.scale);
          break;
        case 1:
          geometry = new THREE.IcosahedronGeometry(project.scale);
          break;
        case 2:
          geometry = new THREE.OctahedronGeometry(project.scale);
          break;
        case 3:
          geometry = new THREE.TetrahedronGeometry(project.scale);
          break;
        case 4:
          geometry = new THREE.TorusGeometry(project.scale, project.scale * 0.3, 16, 100);
          break;
        default:
          geometry = new THREE.SphereGeometry(project.scale, 32, 32);
      }

      const material = new THREE.MeshBasicMaterial({
        color: project.color,
        wireframe: true,
        transparent: true,
        opacity: 0.8
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(...project.position);
      mesh.userData = { projectId: project.id, originalScale: project.scale };

      // Add glow effect
      const glowGeometry = geometry.clone();
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: project.color,
        transparent: true,
        opacity: 0.2,
        side: THREE.BackSide
      });
      const glow = new THREE.Mesh(glowGeometry, glowMaterial);
      glow.position.copy(mesh.position);
      glow.scale.multiplyScalar(1.3);

      scene.add(mesh);
      scene.add(glow);
      meshes.push(mesh);
    });

    meshesRef.current = meshes;

    // Add connecting lines between projects
    const lineGeometry = new THREE.BufferGeometry();
    const linePositions: number[] = [];
    
    for (let i = 0; i < projects3D.length; i++) {
      for (let j = i + 1; j < projects3D.length; j++) {
        const project1 = projects3D[i];
        const project2 = projects3D[j];
        const distance = Math.sqrt(
          Math.pow(project1.position[0] - project2.position[0], 2) +
          Math.pow(project1.position[1] - project2.position[1], 2) +
          Math.pow(project1.position[2] - project2.position[2], 2)
        );
        
        // Only connect nearby projects
        if (distance < 4) {
          linePositions.push(
            ...project1.position,
            ...project2.position
          );
        }
      }
    }

    lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x00d9ff,
      transparent: true,
      opacity: 0.2
    });
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (event: MouseEvent) => {
      const rect = mountRef.current?.getBoundingClientRect();
      if (rect) {
        mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        mouseRef.current.x = mouseX;
        mouseRef.current.y = mouseY;

        // Raycasting for hover detection
        raycasterRef.current.setFromCamera(mouseRef.current, camera);
        const intersects = raycasterRef.current.intersectObjects(meshes);
        
        if (intersects.length > 0) {
          const projectId = intersects[0].object.userData.projectId;
          setHoveredProject(projectId);
        } else {
          setHoveredProject(null);
        }
      }
    };

    const onClick = (event: MouseEvent) => {
      const rect = mountRef.current?.getBoundingClientRect();
      if (rect) {
        const clickX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        const clickY = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        const clickMouse = new THREE.Vector2(clickX, clickY);
        raycasterRef.current.setFromCamera(clickMouse, camera);
        const intersects = raycasterRef.current.intersectObjects(meshes);
        
        if (intersects.length > 0) {
          const projectId = intersects[0].object.userData.projectId;
          const project = projects3D.find(p => p.id === projectId);
          setSelectedProject(projectId);
          onProjectSelect?.(project || null);
        } else {
          setSelectedProject(null);
          onProjectSelect?.(null);
        }
      }
    };

    mountRef.current.addEventListener('mousemove', onMouseMove);
    mountRef.current.addEventListener('click', onClick);

    // Animation loop
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);

      // Rotate entire scene slowly
      scene.rotation.y += 0.003;

      // Animate individual meshes
      meshes.forEach((mesh, index) => {
        const project = projects3D[index];
        
        // Base rotation
        mesh.rotation.x += 0.01 + (index * 0.002);
        mesh.rotation.y += 0.008 + (index * 0.003);
        
        // Floating motion
        mesh.position.y += Math.sin(Date.now() * 0.001 + index) * 0.003;
        
        // Scale based on hover/selection
        const targetScale = hoveredProject === project.id ? project.scale * 1.3 : 
                           selectedProject === project.id ? project.scale * 1.2 : 
                           project.scale;
        
        mesh.scale.setScalar(mesh.scale.x + (targetScale - mesh.scale.x) * 0.1);

        // Color intensity based on interaction
        const material = mesh.material as THREE.MeshBasicMaterial;
        const targetOpacity = hoveredProject === project.id ? 1.0 : 
                             selectedProject === project.id ? 0.9 : 0.8;
        material.opacity += (targetOpacity - material.opacity) * 0.1;
      });

      // Camera follows mouse
      camera.position.x += (mouseX * 3 - camera.position.x) * 0.05;
      camera.position.y += (mouseY * 3 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (mountRef.current) {
        mountRef.current.removeEventListener('mousemove', onMouseMove);
        mountRef.current.removeEventListener('click', onClick);
      }
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [onProjectSelect]);

  return (
    <div className={`relative ${className}`}>
      <div ref={mountRef} className="w-full h-[400px] rounded-xl overflow-hidden glassmorphism border border-cyan-400/20" />
      
      {/* Project Legend */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-3">
        {projects3D.map((project) => {
          const IconComponent = project.icon;
          const isSelected = selectedProject === project.id;
          const isHovered = hoveredProject === project.id;
          
          return (
            <div
              key={project.id}
              className={`flex items-center space-x-3 p-3 rounded-lg glassmorphism cursor-pointer transition-all duration-300 ${
                isSelected ? 'ring-2 ring-cyan-400 scale-105' : 
                isHovered ? 'scale-102 bg-white/10' : 'hover:scale-102'
              }`}
              onClick={() => {
                const project3D = projects3D.find(p => p.id === project.id);
                setSelectedProject(isSelected ? null : project.id);
                onProjectSelect?.(isSelected ? null : project3D || null);
              }}
            >
              <IconComponent 
                className="w-5 h-5" 
                style={{ color: `#${project.color.toString(16).padStart(6, '0')}` }}
              />
              <div>
                <div className="text-sm font-semibold text-white">{project.title}</div>
                <div className="text-xs text-gray-400">{project.description}</div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Interaction Hint */}
      <div className="mt-4 text-center text-sm text-gray-400">
        Hover and click on the 3D objects to explore projects
      </div>
    </div>
  );
}
