import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Copy, Download, ExternalLink, User, Bot, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  quickReplies?: string[];
  actions?: Array<{
    label: string;
    action: string;
    icon?: any;
  }>;
}

interface ChatbotState {
  isOpen: boolean;
  messages: Message[];
  isTyping: boolean;
  context: {
    visitorType?: 'recruiter' | 'student' | 'researcher' | 'general';
    interests: string[];
    hasSeenProjects: boolean;
    hasSeenResearch: boolean;
    hasContactInfo: boolean;
  };
}

const KNOWLEDGE_BASE = {
  personal: {
    name: "Avika Joshi",
    status: "AI/ML Research Engineer, CS Student at DTU",
    location: "Delhi, India (open to global relocation)",
    availability: "Summer 2025 AI/ML Internships",
    targetRoles: ["AI Research", "ML Engineering", "Climate Tech", "Production AI Systems"],
    salaryRange: "$7,000-12,000 USD/month"
  },
  achievements: {
    harvard: "Top 0.0012% Harvard HPAIR delegate (83,000+ applicants)",
    mit: "MIT CSAIL Research Fellow - First undergraduate to develop production framework",
    cambridge: "Cambridge Climate AI research with Dr. Peter Murray-Rust",
    scholar: "JSTSE Scholar - Junior Science Talent Search Excellence",
    impact: "Harvard Impact Challenge Winner"
  },
  projects: {
    aira: {
      name: "AIRA Platform",
      description: "Production conversational AI system",
      metrics: "TTS, STT and fully offline SIP based Agent",
      tech: ["Python", "TTS", "STT"]
    },
    cv: {
      name: "Computer Vision Suite", 
      description: "Multi-domain CV solution with 98.5% accuracy",
      metrics: "300+ users in 12 countries, 5 industries",
      tech: ["OpenCV", "Deep Learning", "Docker"]
    },
    climate: {
      name: "Climate AI Tools",
      description: "Large-scale environmental data processing",
      metrics: "Computer vision, International research impact",
      tech: ["MLOps", "Distributed Computing", "Python"]
    },
    opensource: {
      name: "Open Source Contributions",
      description: "Contributions to semantic climate community",
      metrics: "She's dynamic and diligent",
      tech: ["Python", "Research Tools"]
    }
  },
  skills: {
    languages: ["Python (expert)", "JavaScript/TypeScript", "Java", "C++", "SQL", "R"],
    aiml: ["TensorFlow", "PyTorch", "LangChain", "OpenCV", "Hugging Face", "scikit-learn"],
    web: ["React", "Node.js", "Next.js", "Flask", "Django"],
    cloud: ["AWS", "Docker", "distributed systems", "MLOps pipelines"],
    databases: ["PostgreSQL", "MongoDB", "Redis"]
  },
  testimonials: {
    cambridge: "Avika is a leading exponent in her field with exceptional technical skills - Dr. Peter Murray-Rust, University of Cambridge"
  }
};

const CONVERSATION_TEMPLATES = {
  greeting: [
    "Hey there! 👋 I'm Avika's AI assistant. I can tell you about her research at MIT and Cambridge, her production AI systems that serve 500+ users, or why top companies should hire her. What interests you most?",
    "Hi! I'm here to help you learn about Avika Joshi - an exceptional AI/ML researcher with production experience at MIT, Cambridge, and Harvard. What would you like to know?",
    "Welcome! I can share details about Avika's groundbreaking research, her commercial AI systems, or her impressive achievements. Where should we start?"
  ],
  quickReplies: {
    initial: ["Research Work", "Production Projects", "Why Hire Avika", "Contact Info"],
    research: ["MIT CSAIL Work", "Cambridge Climate AI", "Academic Papers", "Show More Projects"],
    projects: ["AIRA Platform", "Computer Vision", "Climate AI", "Open Source"],
    hiring: ["Technical Skills", "Achievements", "Availability", "Salary Expectations"],
    contact: ["Email", "LinkedIn", "GitHub", "Schedule Call"]
  }
};

export default function AIChatbot() {
  const [state, setState] = useState<ChatbotState>({
    isOpen: false,
    messages: [],
    isTyping: false,
    context: {
      interests: [],
      hasSeenProjects: false,
      hasSeenResearch: false,
      hasContactInfo: false
    }
  });

  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [state.messages]);

  const addMessage = (content: string, type: 'user' | 'bot', quickReplies?: string[], actions?: any[]) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date(),
      quickReplies,
      actions
    };

    setState(prev => ({
      ...prev,
      messages: [...prev.messages, newMessage]
    }));
  };

  const simulateTyping = (callback: () => void, delay = 1500) => {
    setState(prev => ({ ...prev, isTyping: true }));
    setTimeout(() => {
      setState(prev => ({ ...prev, isTyping: false }));
      callback();
    }, delay);
  };

  const generateResponse = (userMessage: string): { content: string; quickReplies?: string[]; actions?: any[] } => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Intent detection
    if (lowerMessage.includes('research') || lowerMessage.includes('mit') || lowerMessage.includes('cambridge')) {
      return handleResearchQuery(lowerMessage);
    } else if (lowerMessage.includes('project') || lowerMessage.includes('aira') || lowerMessage.includes('production')) {
      return handleProjectQuery(lowerMessage);
    } else if (lowerMessage.includes('hire') || lowerMessage.includes('why') || lowerMessage.includes('different')) {
      return handleHiringQuery(lowerMessage);
    } else if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('reach')) {
      return handleContactQuery(lowerMessage);
    } else if (lowerMessage.includes('skill') || lowerMessage.includes('technology') || lowerMessage.includes('technical')) {
      return handleSkillsQuery(lowerMessage);
    } else if (lowerMessage.includes('salary') || lowerMessage.includes('compensation') || lowerMessage.includes('rate')) {
      return handleSalaryQuery(lowerMessage);
    } else {
      return handleGeneralQuery(lowerMessage);
    }
  };

  const handleResearchQuery = (query: string) => {
    setState(prev => ({
      ...prev,
      context: { ...prev.context, hasSeenResearch: true, interests: [...prev.context.interests, 'research'] }
    }));

    if (query.includes('mit')) {
      return {
        content: `Avika's MIT CSAIL work is truly groundbreaking! She's the first undergraduate to develop a production framework for Prof. Kellis' lab - that's unprecedented recognition at one of the world's top AI research institutions.\n\nHer framework is being actively used by the MIT research team and demonstrates her ability to bridge cutting-edge research with practical implementation. This experience at MIT validates her as a serious researcher who can deliver results.`,
        quickReplies: ["Cambridge Research", "View MIT Framework", "Other Projects", "Why This Matters"],
        actions: [
          { label: "Technical Details", action: "mit_details", icon: ExternalLink }
        ]
      };
    } else if (query.includes('cambridge')) {
      return {
        content: `At Cambridge, Avika is working with Dr. Peter Murray-Rust on climate AI research, processing 15K+ datasets for international climate modeling. Dr. Murray-Rust says: "Avika is a leading exponent in her field with exceptional technical skills."\n\nThis isn't just academic work - it's research with global impact that addresses one of humanity's greatest challenges. The scale (15K+ datasets) shows she can handle enterprise-level data processing.`,
        quickReplies: ["Climate Impact", "Dr. Murray-Rust Quote", "Research Papers", "MIT Work"],
        actions: [
          { label: "View Research", action: "cambridge_research", icon: ExternalLink }
        ]
      };
    } else {
      return {
        content: `Avika's research credentials are exceptional:\n\n🏛️ MIT CSAIL Fellow - First undergraduate with production framework\n🌍 Cambridge Climate AI - 15K+ datasets, international impact\n🏆 Harvard Impact Challenge Winner\n📚 JSTSE Scholar\n\nWhat sets her apart is combining world-class research with real production systems. Most researchers struggle with implementation - Avika excels at both.`,
        quickReplies: ["MIT Details", "Cambridge Work", "Production Systems", "Why Hire Her"],
        actions: [
          { label: "Research Portfolio", action: "research_portfolio", icon: ExternalLink }
        ]
      };
    }
  };

  const handleProjectQuery = (query: string) => {
    setState(prev => ({
      ...prev,
      context: { ...prev.context, hasSeenProjects: true, interests: [...prev.context.interests, 'projects'] }
    }));

    if (query.includes('aira')) {
      return {
        content: `AIRA Platform is Avika's flagship production AI system:\n\n🚀 Serving 500+ concurrent users\n💰 Generated $15K+ pilot interest\n🎯 96% conversation accuracy\n⚡ Production-ready architecture\n\nThis isn't a demo or portfolio project - it's a real commercial system with paying users. The $15K pilot interest proves market validation, and 500+ users shows it scales. How many students have production systems serving hundreds of users?`,
        quickReplies: ["Technical Stack", "Live Demo", "User Metrics", "Other Projects"],
        actions: [
          { label: "View Demo", action: "aira_demo", icon: ExternalLink },
          { label: "Technical Deep-Dive", action: "aira_tech", icon: ExternalLink }
        ]
      };
    } else if (query.includes('vision') || query.includes('cv')) {
      return {
        content: `Avika's Computer Vision Suite is deployed across 5 industries with 98.5% accuracy:\n\n🎯 98.5% accuracy rate\n🌍 300+ users in 12 countries\n🏭 5 different industries\n⚡ 25% faster processing than competitors\n\nThis demonstrates her ability to build generalizable AI solutions that work across domains - from healthcare to manufacturing. Real users, real accuracy, real business impact.`,
        quickReplies: ["Industry Applications", "Technical Details", "User Testimonials", "AIRA Platform"],
        actions: [
          { label: "Live Demo", action: "cv_demo", icon: ExternalLink },
          { label: "Performance Metrics", action: "cv_metrics", icon: ExternalLink }
        ]
      };
    } else {
      return {
        content: `Avika's project portfolio shows the full spectrum from research to production:\n\n💬 AIRA Platform - 500+ users, $15K+ pilot interest\n👁️ Computer Vision Suite - 98.5% accuracy, 5 industries\n🌍 Climate AI Tools - 15K+ datasets, international research\n📦 Open Source - 1,200+ PyPI downloads\n\nEach project has measurable impact and real users. This isn't theoretical work - it's proven commercial value.`,
        quickReplies: ["AIRA Details", "Computer Vision", "Climate AI", "Open Source"],
        actions: [
          { label: "View All Projects", action: "all_projects", icon: ExternalLink }
        ]
      };
    }
  };

  const handleHiringQuery = (query: string) => {
    setState(prev => ({
      ...prev,
      context: { ...prev.context, visitorType: 'recruiter', interests: [...prev.context.interests, 'hiring'] }
    }));

    return {
      content: `Three key differentiators that make Avika an exceptional hire:\n\n🏆Research Credibility - MIT, Cambridge, Harvard recognition validates her as a serious credentials and problem solving skills\n\n💰Production Impact - Real systems serving 500+ users with $15K+ commercial value prove she can ship\n\n🚀Proven Results - From Harvard competitions to 1,200+ downloads, she delivers measurable outcomes\n\nMost candidates have projects. Avika has measurable impact. Most have potential. Avika has proof.`,
      quickReplies: ["Technical Skills", "Availability", "Salary Range", "Contact Info"],
      actions: [
        { label: "Download Resume", action: "download_resume", icon: Download },
        { label: "Schedule Interview", action: "schedule_call", icon: ExternalLink }
      ]
    };
  };

  const handleContactQuery = (query: string) => {
    setState(prev => ({
      ...prev,
      context: { ...prev.context, hasContactInfo: true }
    }));

    return {
      content: `Avika responds super quickly! Here are the best ways to reach her:\n\n📧 avika.joshi@gmail.com\n💼 linkedin.com/in/avikajoshi\n💻 github.com/avikajoshi\n\nShe typically responds within 24 hours and loves discussing AI opportunities. For urgent opportunities, email works best.`,
      quickReplies: ["Draft Email", "LinkedIn Profile", "GitHub Code", "Schedule Call"],
      actions: [
        { label: "Copy Email", action: "copy_email", icon: Copy },
        { label: "LinkedIn", action: "linkedin", icon: ExternalLink },
        { label: "GitHub", action: "github", icon: ExternalLink }
      ]
    };
  };

  const handleSkillsQuery = (query: string) => {
    return {
      content: `Avika's technical skills span the full AI/ML stack:\n\n🐍Languages: Python (expert), JavaScript/TypeScript, Java, C++\n🤖 AI/ML: TensorFlow, PyTorch, LangChain, OpenCV, Hugging Face\n🌐 Web: React, Node.js, Next.js, Flask, Django\n☁️Cloud: AWS, Docker, distributed systems, MLOps\n🗄️Data: PostgreSQL, MongoDB, Redis\n\nShe's not just theoretical - every skill is proven in production systems serving real users.`,
      quickReplies: ["Production Experience", "Certifications", "Learning Path", "Project Examples"],
      actions: [
        { label: "Skills Portfolio", action: "skills_portfolio", icon: ExternalLink }
      ]
    };
  };

  const handleSalaryQuery = (query: string) => {
    return {
      content: `Based on Avika's research experience and production impact, her target range is $7,000-12,000 USD/month for Summer 2025 internships.\n\nThis reflects:\n✅ MIT/Cambridge research credentials\n✅ Production systems with commercial value\n✅ International recognition (Harvard, etc.)\n✅ Proven ability to deliver results\n\nFor the right opportunity with exceptional learning potential, she's flexible on compensation.`,
      quickReplies: ["Why This Range", "Negotiable?", "Benefits Priorities", "Available When"],
      actions: [
        { label: "Discuss Opportunity", action: "discuss_role", icon: ExternalLink }
      ]
    };
  };

  const handleGeneralQuery = (query: string) => {
    if (state.messages.length === 1) {
      // First interaction - provide overview
      return {
        content: CONVERSATION_TEMPLATES.greeting[0],
        quickReplies: CONVERSATION_TEMPLATES.quickReplies.initial,
        actions: []
      };
    } else {
      return {
        content: `I'd be happy to help you learn more about Avika! I can share details about:\n\n🔬 Her research at MIT CSAIL and Cambridge\n🚀 Production AI systems serving 500+ users\n🏆 International recognition and achievements\n💼 Why top companies should hire her\n📞 How to get in touch\n\nWhat interests you most?`,
        quickReplies: CONVERSATION_TEMPLATES.quickReplies.initial,
        actions: []
      };
    }
  };

  const handleUserMessage = (message: string) => {
    addMessage(message, 'user');
    setInputValue("");

    simulateTyping(() => {
      const response = generateResponse(message);
      addMessage(response.content, 'bot', response.quickReplies, response.actions);
    });
  };

  const handleQuickReply = (reply: string) => {
    handleUserMessage(reply);
  };

  const handleAction = (action: string) => {
    switch (action) {
      case 'copy_email':
        navigator.clipboard.writeText('avika.joshi@gmail.com');
        toast({ title: "Email copied to clipboard!" });
        break;
      case 'linkedin':
        window.open('https://linkedin.com/in/avikajoshi', '_blank');
        break;
      case 'github':
        window.open('https://github.com/avikajoshi', '_blank');
        break;
      case 'download_resume':
        toast({ title: "Resume download initiated" });
        break;
      case 'aira_demo':
      case 'cv_demo':
      case 'all_projects':
        // Scroll to projects section
        document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
        toast({ title: "Navigating to projects section" });
        break;
      case 'research_portfolio':
      case 'cambridge_research':
      case 'mit_details':
        // Scroll to about section
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
        toast({ title: "Navigating to research section" });
        break;
      case 'schedule_call':
      case 'discuss_role':
        // Scroll to contact section
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        toast({ title: "Navigating to contact section" });
        break;
      default:
        toast({ title: "Feature coming soon!" });
    }
  };

  const exportConversation = () => {
    const conversation = state.messages.map(msg => 
      `${msg.type.toUpperCase()}: ${msg.content}`
    ).join('\n\n');
    
    const blob = new Blob([conversation], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'avika-joshi-conversation.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const initializeChat = () => {
    setState(prev => ({ ...prev, isOpen: true }));
    
    if (state.messages.length === 0) {
      setTimeout(() => {
        addMessage(CONVERSATION_TEMPLATES.greeting[0], 'bot', CONVERSATION_TEMPLATES.quickReplies.initial);
      }, 500);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!state.isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            onClick={initializeChat}
            className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 hover:scale-110 transition-all duration-300 shadow-2xl shadow-cyan-400/50 animate-pulse"
          >
            <MessageCircle className="w-8 h-8" />
          </Button>
          <div className="absolute -top-12 right-0 glassmorphism px-3 py-1 rounded-lg text-sm whitespace-nowrap animate-bounce">
            Ask me about Avika! 💬
          </div>
        </div>
      )}

      {/* Chat Window */}
      {state.isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] glassmorphism rounded-2xl border border-cyan-400/30 z-50 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b border-gray-700 flex items-center justify-between bg-gradient-to-r from-cyan-400/10 to-purple-500/10">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-semibold text-white">Avika's AI Assistant</div>
                <div className="text-xs text-gray-400">Ask me anything!</div>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={exportConversation}
                className="text-gray-400 hover:text-white"
              >
                <Download className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setState(prev => ({ ...prev, isOpen: false }))}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {state.messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                  <div className={`flex items-start space-x-2 ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.type === 'user' 
                        ? 'bg-gradient-to-r from-purple-500 to-green-400' 
                        : 'bg-gradient-to-r from-cyan-400 to-purple-500'
                    }`}>
                      {message.type === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>
                    <div className={`px-4 py-3 rounded-2xl ${
                      message.type === 'user'
                        ? 'bg-gradient-to-r from-purple-500/20 to-green-400/20 border border-purple-500/30'
                        : 'glassmorphism border border-cyan-400/20'
                    }`}>
                      <div className="text-sm text-white whitespace-pre-line">{message.content}</div>
                      
                      {/* Quick Replies */}
                      {message.quickReplies && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {message.quickReplies.map((reply) => (
                            <Button
                              key={reply}
                              variant="outline"
                              size="sm"
                              onClick={() => handleQuickReply(reply)}
                              className="text-xs bg-cyan-400/10 border-cyan-400/30 hover:bg-cyan-400/20"
                            >
                              {reply}
                            </Button>
                          ))}
                        </div>
                      )}

                      {/* Action Buttons */}
                      {message.actions && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {message.actions.map((action) => {
                            const IconComponent = action.icon;
                            return (
                              <Button
                                key={action.action}
                                size="sm"
                                onClick={() => handleAction(action.action)}
                                className="text-xs bg-gradient-to-r from-cyan-400 to-purple-500"
                              >
                                {IconComponent && <IconComponent className="w-3 h-3 mr-1" />}
                                {action.label}
                              </Button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className={`text-xs text-gray-500 mt-1 ${message.type === 'user' ? 'text-right' : 'text-left'}`}>
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {state.isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="glassmorphism border border-cyan-400/20 px-4 py-3 rounded-2xl">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-700">
            <div className="flex space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about Avika's research, projects, or achievements..."
                onKeyPress={(e) => e.key === 'Enter' && inputValue.trim() && handleUserMessage(inputValue)}
                className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-400"
              />
              <Button
                onClick={() => inputValue.trim() && handleUserMessage(inputValue)}
                disabled={!inputValue.trim() || state.isTyping}
                className="bg-gradient-to-r from-cyan-400 to-purple-500"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
