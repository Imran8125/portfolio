import React, { useState, useEffect, useRef } from 'react';

const Projects = () => {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [animatedProjects, setAnimatedProjects] = useState<Set<number>>(new Set());
  const sectionRef = useRef<HTMLElement>(null);

  const projects = [
    {
      id: 'hr-ai',
      title: 'Agentic HR AI – Automated Recruitment Platform',
      description: 'Engineered an end-to-end recruitment system using Python, LangChain, and Gemini 1.5 to automate resume screening, interview scheduling, and candidate communication. Built a web-based HR dashboard and adaptive chat-based interview portal using Flask and Google APIs.',
      type: '♟ AI Agent',
      tech: ['Python', 'Flask', 'LangChain', 'Gemini API', 'Gmail API', 'Calendar API', 'JSON'],
      status: 'Deployed',
      codeSnippet: "hr_agent.screen_resume(candidate)\nhr_agent.schedule_interview()",
      color: 'from-cyan-400 to-blue-500'
    },
    {
      id: 'ecommerce',
      title: 'E-Commerce Platform',
      description: 'Engineered a full-stack e-commerce application using Java and Spring Boot to master secure authentication and backend scalability. Built shopping cart and order processing system with real-time APIs and deployed using Docker and Kubernetes.',
      type: '♘ Backend App',
      tech: ['Java', 'Spring Boot', 'REST APIs', 'Docker', 'Kubernetes', 'H2 Database'],
      status: 'Production',
      codeSnippet: "@RestController\npublic class OrderController {\n  // Handle orders\n}",
      color: 'from-green-400 to-emerald-500'
    },
    {
      id: 'ai-chatbot',
      title: 'Next-Gen AI Chatbot',
      description: 'Engineered a web-based chatbot using Flask and Gemini 1.5 Pro to simulate 25+ AI personalities and enable real-time conversations. Built a responsive UI and dynamic chatbot logic that adapts to user prompts and personalities.',
      type: '♟ AI Agent',
      tech: ['Python', 'Flask', 'Gemini API', 'HTML', 'CSS', 'JavaScript'],
      status: 'Beta',
      codeSnippet: "chatbot.load_personality(selected)\nchatbot.generate_response(prompt)",
      color: 'from-purple-400 to-pink-500'
    },
    {
      id: 'solar-planner',
      title: 'Solar System Mission Planner',
      description: 'Engineered a simulation tool using Python to visualize planetary positions and plan optimal interplanetary trajectories with Hohmann transfer logic. Used NumPy and Matplotlib to calculate travel windows and mission duration.',
      type: '♖ Simulation Tool',
      tech: ['Python', 'NumPy', 'Matplotlib', 'Orbital Mechanics'],
      status: 'Research',
      codeSnippet: "trajectory = calculate_hohmann_transfer()\nplot_mission_window(trajectory)",
      color: 'from-red-400 to-orange-500'
    },
    {
      id: 'currency-converter',
      title: 'Currency Converter Application',
      description: 'Developed a real-time currency converter using JavaFX and integrated external APIs for live exchange rates. Designed an intuitive GUI and used Maven for dependency management.',
      type: '♘ Desktop App',
      tech: ['Java 11', 'JavaFX', 'REST APIs', 'Maven'],
      status: 'Production',
      codeSnippet: "ExchangeRate rate = api.getLiveRate();\nconvertedAmount = calculate(amount, rate);",
      color: 'from-yellow-400 to-amber-500'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          // Trigger staggered animations
          projects.forEach((_, index) => {
            setTimeout(() => {
              setAnimatedProjects(prev => new Set([...prev, index]));
            }, index * 200); // 200ms delay between each project
          });
        }
      },
      {
        threshold: 0.3, // Trigger when 30% of the section is visible
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [isVisible, projects]);

  return (
    <section ref={sectionRef} id="projects" className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-mono font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          &gt; Projects.filter(impressive)
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`relative bg-gray-900/50 backdrop-blur border border-gray-700 rounded-lg p-6 transition-all duration-300 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-400/20 group cursor-pointer ${
                animatedProjects.has(index) 
                  ? 'animate-scale-in' 
                  : 'opacity-0 scale-95'
              }`}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="flex justify-between items-start mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-mono bg-gradient-to-r ${project.color} text-black font-semibold`}>
                  {project.type}
                </span>
                <span className={`px-2 py-1 rounded text-xs font-mono ${
                  project.status === 'Production' ? 'bg-green-500/20 text-green-400' :
                  project.status === 'Deployed' ? 'bg-blue-500/20 text-blue-400' :
                  project.status === 'Beta' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-purple-500/20 text-purple-400'
                }`}>
                  {project.status}
                </span>
              </div>

              <h3 className="text-xl font-mono font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                {project.title}
              </h3>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech) => (
                  <span key={tech} className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-sm font-mono">
                    {tech}
                  </span>
                ))}
              </div>

              {hoveredProject === project.id && (
                <div className="absolute inset-0 bg-black/90 backdrop-blur rounded-lg flex items-center justify-center p-6 transition-all duration-300">
                  <div className="bg-gray-900 border border-cyan-400 rounded-lg p-4 font-mono text-sm">
                    <div className="text-cyan-400 mb-2">// Code Preview</div>
                    <pre className="text-green-400 whitespace-pre-line">
                      {project.codeSnippet}
                    </pre>
                  </div>
                </div>
              )}

              <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-br ${project.color} rounded-lg transition-opacity duration-300`} />
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a 
            href="https://github.com/Imran8125?tab=repositories" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-mono font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50 hover:scale-105"
          >
            View All Projects on GitHub →
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
