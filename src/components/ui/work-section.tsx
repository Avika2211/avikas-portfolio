import { Bot, FlaskRound, Globe, Eye, Heart, GraduationCap, ExternalLink, Github, FileText, Play, BarChart3, Download, Zap, Code, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import InteractiveProjectShowcase from "@/components/ui/interactive-project-showcase";
import { useState } from "react";

const projects = [
  {
    id: 1,
    title: "AIRA Platform",
    icon: Bot,
    color: "cyber-blue",
    description: "Offline B2B AI Calling agent built on faster-whisper for fast local transcription, TinyLlama via Ollama for lightweight, intelligent dialogue, Coqui TTS for lifelike, low-latency speech, Asterisk for real SIP-based call handling (designed for production use)",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    tech: ["Python", "TTS", "STT"],
    metrics: { primary: "", secondary: "" },
    actions: [ExternalLink, Github]
  },
  {
    id: 2,
    title: "MIT Production Framework",
    icon: FlaskRound,
    color: "neon-purple",
    description: "First undergraduate to develop production framework for Prof. Kellis' lab",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    tech: ["Python", "Distributed Systems", "Cloud"],
    metrics: { primary: "MIT Adopted", secondary: "Production Ready" },
    actions: [FileText, Github]
  },
  {
    id: 3,
    title: "Climate AI Research",
    icon: Globe,
    color: "cyber-green",
    description: "Large-scale environmental data processing for climate modeling",
    image: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    tech: ["MLOps", "15K+ Datasets", "Distributed"],
    metrics: { primary: "International Impact", secondary: "Petabyte Scale" },
    actions: [BarChart3, Download]
  },
  {
    id: 4,
    title: "SmartCV Suite",
    icon: Eye,
    color: "electric-yellow",
    description: "Multi-domain CV solution with 98.5% accuracy across 5 industries",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    tech: ["OpenCV", "Deep Learning", "Docker"],
    metrics: { primary: "300+ Users", secondary: "12 Countries" },
    actions: [Play, BarChart3]
  },
  {
    id: 5,
    title: "BioAI Diagnostics",
    icon: Heart,
    color: "neon-pink",
    description: "AI-powered medical image analysis with 97.8% diagnostic accuracy",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    tech: ["TensorFlow", "Medical Imaging", "Cloud"],
    metrics: { primary: "97.8% Accuracy", secondary: "Multi-modal" },
    actions: [Play, FileText]
  },
  {
    id: 6,
    title: "EduAI Tutor",
    icon: GraduationCap,
    color: "cyber-blue",
    description: "AI tutor that adapts to student emotions and learning patterns",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    tech: ["Computer Vision", "NLP", "Emotion AI"],
    metrics: { primary: "40% Improvement", secondary: "Learning Outcomes" },
    actions: [Play, BarChart3]
  }
];

const timeline = [
  {
    year: "University of Cambridge",
    title: "AI/ML + Data Science Intern",
    description: "",
    color: "neon-purple"
  },
  {
    year: "Massachusetts Institute of Technology- CSAIL",
    title: "Research Fellow, Project Contributer and MIT Rising Scholar",
    description: "",
    color: "neon-pink"
  },
  {
    year: "Stanford University Code in Place",
    title: "Section Leader",
    description: "",
    color: "cyber-blue"
  },
  {
    year: "Walford Capitals",
    title: "Market Research Analyst => Project Manager(Heading VCS)",
    description: "",
    color: "cyber-green"
  },
  {
    year: "Harvard Project For Asian and International Relations",
    title: "Top 0.0012%, Delegate=>Keynote Speaker=>Winner Harvard Impact Challenge",
    description: "",
    color: "cyber-blue"
  },
  {
    year: "Uttarakhand Saanskitik Prasar Samiti",
    title: "Anchor, Performer, Dancer: Youngest and first female to host Indian Republic Day'25 @ USPS",
    description: "",
    color: "cyber-blue"
  }

];

export default function WorkSection() {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'3d' | 'grid'>('3d');

  return (
    <section id="work" className="min-h-screen py-20 relative overflow-hidden">
      {/* Ambient effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="floating-orb w-40 h-40 top-5 left-5 animate-float shadow-2xl shadow-green-400/30" style={{animationDelay: '2s'}}></div>
        <div className="floating-orb w-24 h-24 bottom-10 right-10 animate-float shadow-2xl shadow-purple-500/30" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-orbitron text-4xl md:text-6xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-green-400 animate-pulse-slow">
            PROJECT SHOWCASE
          </h2>
          
          {/* Interactive View Toggle */}
          <div className="flex justify-center mb-12">
            <div className="glassmorphism p-1 rounded-full flex">
              <button
                onClick={() => setViewMode('3d')}
                className={`px-6 py-3 rounded-full transition-all duration-300 flex items-center space-x-2 ${
                  viewMode === '3d' 
                    ? 'bg-gradient-to-r from-cyan-400 to-purple-500 text-white shadow-lg' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                <Zap className="w-4 h-4" />
                <span className="font-semibold">3D Experience</span>
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-6 py-3 rounded-full transition-all duration-300 flex items-center space-x-2 ${
                  viewMode === 'grid' 
                    ? 'bg-gradient-to-r from-purple-500 to-green-400 text-white shadow-lg' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                <Database className="w-4 h-4" />
                <span className="font-semibold">Grid View</span>
              </button>
            </div>
          </div>
          
          {/* Dynamic Content Based on View Mode */}
          {viewMode === '3d' ? (
            <div className="mb-16">
              <InteractiveProjectShowcase 
                className="w-full max-w-4xl mx-auto"
                onProjectSelect={setSelectedProject}
              />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {projects.map((project) => (
                <div 
                  key={project.id} 
                  className={`project-card glassmorphism p-6 rounded-2xl group hover:scale-105 transition-all duration-300 cursor-pointer ${
                    selectedProject?.id === project.id ? 'ring-2 ring-cyan-400 scale-105' : ''
                  }`}
                  onClick={() => setSelectedProject(selectedProject?.id === project.id ? null : project)}
                >
                  <img 
                    src={project.image} 
                    alt={project.description}
                    className="w-full h-48 object-cover rounded-xl mb-4"
                  />
                  <div className="flex items-center mb-3">
                    <project.icon className={`${project.color} text-2xl mr-3 w-6 h-6`} />
                    <h3 className="text-xl font-bold">{project.title}</h3>
                  </div>
                  <p className="text-gray-300 text-sm mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span key={tech} className={`text-xs glassmorphism px-2 py-1 rounded text-cyan-400`}>
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-sm">
                      <div className={`${project.color} font-semibold`}>{project.metrics.primary}</div>
                      <div className="text-gray-400">{project.metrics.secondary}</div>
                    </div>
                    <div className="flex space-x-2">
                      {project.actions.map((Action, index) => (
                        <Button key={index} size="sm" variant="ghost" className={`${project.color} hover:text-white transition-colors p-2`}>
                          <Action className="w-4 h-4" />
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Selected Project Details */}
          {selectedProject && (
            <div className="glassmorphism p-8 rounded-2xl mb-16 animate-fade-in border border-cyan-400/30">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 glassmorphism rounded-full">
                    <selectedProject.icon className="w-8 h-8 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-white">{selectedProject.title}</h3>
                    <p className="text-gray-400">{selectedProject.description}</p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  onClick={() => setSelectedProject(null)}
                  className="text-gray-400 hover:text-white"
                >
                  ×
                </Button>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="glassmorphism p-4 rounded-lg">
                  <h4 className="font-semibold text-cyan-400 mb-2">Technology Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech?.map((tech: string) => (
                      <span key={tech} className="text-xs bg-cyan-400/20 text-cyan-400 px-2 py-1 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="glassmorphism p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-400 mb-2">Impact Metrics</h4>
                  <div className="space-y-1">
                    <div className="text-sm text-white">{selectedProject.metrics?.primary}</div>
                    <div className="text-xs text-gray-400">{selectedProject.metrics?.secondary}</div>
                  </div>
                </div>
                
                <div className="glassmorphism p-4 rounded-lg">
                  <h4 className="font-semibold text-green-400 mb-2">Quick Actions</h4>
                  <div className="flex space-x-2">
                    <Button size="sm" className="bg-gradient-to-r from-cyan-400 to-purple-500">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Demo
                    </Button>
                    <Button size="sm" variant="outline" className="border-gray-600">
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Achievement Timeline */}
          <div className="glassmorphism p-8 rounded-2xl">
            <h3 className="text-2xl font-bold text-center mb-8 cyber-blue">Work Experience</h3>
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-cyan-400 to-purple-500"></div>
              <div className="space-y-8">
                {timeline.map((item, index) => (
                  <div key={index} className="flex items-center">
                    {index % 2 === 0 ? (
                      <>
                        <div className="w-1/2 text-right pr-8">
                          <div className={`font-semibold ${item.color}`}>{item.year}</div>
                          <div className="text-sm text-gray-300">{item.title}</div>
                        </div>
                        <div className={`w-4 h-4 bg-${item.color} rounded-full border-4 border-black relative z-10`}></div>
                        <div className="w-1/2 pl-8">
                          <div className="text-sm text-gray-400">{item.description}</div>
                        </div>
                        
                      </>
                    ) : (
                      <>
                        <div className="w-1/2 text-right pr-8">
                          <div className="text-sm text-gray-400">{item.description}</div>
                        </div>
                        <div className={`w-4 h-4 bg-${item.color} rounded-full border-4 border-black relative z-10`}></div>
                        <div className="w-1/2 pl-8">
                          <div className={`font-semibold ${item.color}`}>{item.year}</div>
                          <div className="text-sm text-gray-300">{item.title}</div>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
