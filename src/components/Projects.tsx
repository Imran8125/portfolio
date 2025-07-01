
import React, { useState } from 'react';

const Projects = () => {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const projects = [
    {
      id: 'ai-agent',
      title: 'Intelligent Task Automation Agent',
      description: 'AI-powered agent that learns user patterns and automates repetitive tasks using natural language processing.',
      type: '♟ AI Agent',
      tech: ['Python', 'PyTorch', 'NLP', 'FastAPI'],
      status: 'Deployed',
      codeSnippet: "agent.learn_pattern(user_input)\nagent.automate_task()",
      color: 'from-cyan-400 to-blue-500'
    },
    {
      id: 'cyber-tool',
      title: 'Network Security Scanner',
      description: 'Advanced penetration testing tool that identifies vulnerabilities in network infrastructure.',
      type: '♖ Cyber Tool',
      tech: ['C++', 'Python', 'Nmap', 'SQLite'],
      status: 'Beta',
      codeSnippet: "scanner.detect_vulnerabilities()\nscanner.generate_report()",
      color: 'from-red-400 to-orange-500'
    },
    {
      id: 'backend-app',
      title: 'Microservices E-commerce API',
      description: 'Scalable backend system handling 10k+ concurrent users with real-time inventory management.',
      type: '♘ Backend App',
      tech: ['Java', 'Spring Boot', 'PostgreSQL', 'Docker'],
      status: 'Production',
      codeSnippet: "@RestController\npublic class OrderService {\n  // Handle orders\n}",
      color: 'from-green-400 to-emerald-500'
    },
    {
      id: 'ml-model',
      title: 'Predictive Analytics Engine',
      description: 'Machine learning model that predicts market trends with 94% accuracy using ensemble methods.',
      type: '♟ AI Agent',
      tech: ['Python', 'Scikit-learn', 'Pandas', 'AWS'],
      status: 'Research',
      codeSnippet: "model.fit(training_data)\npredictions = model.predict(new_data)",
      color: 'from-purple-400 to-pink-500'
    }
  ];

  return (
    <section id="projects" className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-mono font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          &gt; Projects.filter(impressive)
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="relative bg-gray-900/50 backdrop-blur border border-gray-700 rounded-lg p-6 transition-all duration-300 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-400/20 group cursor-pointer"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Project type badge */}
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

              {/* Project title and description */}
              <h3 className="text-xl font-mono font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                {project.title}
              </h3>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                {project.description}
              </p>

              {/* Tech stack */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech) => (
                  <span key={tech} className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-sm font-mono">
                    {tech}
                  </span>
                ))}
              </div>

              {/* Code snippet on hover */}
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

              {/* Holographic effect */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-br ${project.color} rounded-lg transition-opacity duration-300`} />
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-12">
          <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-mono font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50 hover:scale-105">
            View All Projects on GitHub →
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
