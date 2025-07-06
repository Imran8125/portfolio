import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [terminalOutput, setTerminalOutput] = useState([
    '> System initialized...',
    '> Ready to receive transmission...'
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTerminalOutput(prev => [
      ...prev,
      `> Transmission received from ${formData.name}`,
      `> Email: ${formData.email}`,
      `> Message length: ${formData.message.length} characters`,
      '> Processing... ██████████ 100%',
      '> Message successfully transmitted to Imran.exe',
      '> Connection established. Response incoming...'
    ]);
    
    // Reset form
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-mono font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          &gt; InitiateContact()
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Terminal output */}
          <div className="bg-black border border-green-400 rounded-lg p-6 font-mono">
            <div className="flex items-center mb-4">
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <span className="ml-4 text-green-400">contact@imran-terminal</span>
            </div>
            
            <div className="h-64 overflow-y-auto text-green-400 text-sm">
              {terminalOutput.map((line, index) => (
                <div key={index} className="mb-1">
                  {line}
                </div>
              ))}
              <div className="animate-pulse">█</div>
            </div>
          </div>

          {/* Contact form - Space control panel style */}
          <div className="bg-gray-900/50 backdrop-blur border border-gray-700 rounded-lg p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-cyan-400 font-mono mb-2">
                  &gt; Name: 
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-black border border-cyan-400 rounded px-4 py-2 text-white font-mono focus:outline-none focus:border-blue-400 focus:shadow-lg focus:shadow-cyan-400/20"
                  placeholder="Enter your name..."
                  required
                />
              </div>

              <div>
                <label className="block text-cyan-400 font-mono mb-2">
                  &gt; Email:
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-black border border-cyan-400 rounded px-4 py-2 text-white font-mono focus:outline-none focus:border-blue-400 focus:shadow-lg focus:shadow-cyan-400/20"
                  placeholder="your.email@domain.com"
                  required
                />
              </div>

              <div>
                <label className="block text-cyan-400 font-mono mb-2">
                  &gt; Message:
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full bg-black border border-cyan-400 rounded px-4 py-2 text-white font-mono focus:outline-none focus:border-blue-400 focus:shadow-lg focus:shadow-cyan-400/20 resize-none"
                  placeholder="Type your message here..."
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-mono font-semibold py-3 rounded transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50 hover:scale-105"
              >
                [ TRANSMIT MESSAGE ]
              </button>
            </form>

            {/* Contact links */}
            <div className="mt-8 pt-6 border-t border-gray-700">
              <div className="flex justify-center gap-6">
                <a 
                  href="mailto:imran8122005@gmail.com" 
                  className="text-cyan-400 hover:text-white transition-colors font-mono"
                >
                  📧 Email
                </a>
                <a 
                  href="https://github.com/Imran8125" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-white transition-colors font-mono"
                >
                  🐙 GitHub
                </a>
                <a 
                  href="https://linkedin.com/in/imran-s812" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-white transition-colors font-mono"
                >
                  💼 LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-gray-800">
          <p className="font-mono text-gray-400">
            © 2024 Imran • Crafted with ⚡ and strategic thinking
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
