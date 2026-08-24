import React, { useState, useRef, useEffect } from 'react';
import { Bot, Sparkles, Send, X, Minimize2, Maximize2, RotateCcw, User, ExternalLink, Download, FileText, Briefcase, Mail } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { generateResumePDF } from '../utils/pdfGenerator';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  action?: 'resume' | 'projects' | 'contact';
}

interface AIBotProps {
  onOpenResume: () => void;
  onOpenContact: () => void;
  onSelectSlide?: (index: number) => void;
}

const DEFAULT_SUGGESTIONS = [
  "What is Dharshini's specific role?",
  "Tell me about the Smile Steps project",
  "What is her academic background & CGPA?",
  "What is her core technical stack?",
  "How can I contact or hire Dharshini?"
];

export const AIBot: React.FC<AIBotProps> = ({ onOpenResume, onOpenContact, onSelectSlide }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      role: 'assistant',
      content: `👋 Hello! I am Dharshini's AI Assistant.

Feel free to ask me anything about web development, technical programming concepts (like React, Node.js, Python, SQL), or Dharshini's full-stack projects and experience!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
      inputRef.current?.focus();
    }
  }, [messages, isOpen, isMinimized]);

  const handleSendMessage = async (textToSend?: string) => {
    const messageContent = (textToSend || input).trim();
    if (!messageContent || isLoading) return;

    const userMessage: Message = {
      id: `user_${Date.now()}`,
      role: 'user',
      content: messageContent,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Build conversation history for context
      const historyPayload = messages.slice(-6).map(m => ({
        role: m.role,
        content: m.content
      }));

      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: messageContent,
          conversationHistory: historyPayload
        })
      });

      if (!res.ok) {
        throw new Error(`Server returned status ${res.status}`);
      }

      const data = await res.json();

      let replyContent = "I am happy to assist you with any information regarding Dharshini's full-stack development experience.";
      if (data.success && data.reply) {
        replyContent = data.reply;
      }

      // Only attach specific contextual actions when explicitly requested
      const lower = messageContent.toLowerCase();
      let action: 'resume' | 'projects' | 'contact' | undefined;
      if (/\b(resume|cv|curriculum vitae)\b/i.test(lower)) {
        action = 'resume';
      } else if (/\b(projects?|demo|showcase|portfolio works?)\b/i.test(lower)) {
        action = 'projects';
      } else if (/\b(contact|hire|email|get in touch)\b/i.test(lower)) {
        action = 'contact';
      }

      const botMessage: Message = {
        id: `assistant_${Date.now()}`,
        role: 'assistant',
        content: replyContent,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        action
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error("Using client-side portfolio knowledge engine:", err);
      // Smart contextual fallback engine for static deployments (GitHub Pages, Vercel static)
      const lower = messageContent.toLowerCase().trim();
      let fallbackText = "";
      let fallbackAction: 'resume' | 'projects' | 'contact' | undefined;

      // 1. Hiring, Employment, Collaboration, Contact inquiries
      if (
        lower.includes("hire") ||
        lower.includes("how to hire") ||
        lower.includes("how can hire") ||
        lower.includes("hiring") ||
        lower.includes("job") ||
        lower.includes("recruitment") ||
        lower.includes("recruit") ||
        lower.includes("contact") ||
        lower.includes("reach") ||
        lower.includes("email") ||
        lower.includes("opportunity") ||
        lower.includes("freelance") ||
        lower.includes("work with") ||
        lower.includes("connect")
      ) {
        fallbackText = `Dharshini B is actively open for **Full-Time Full Stack Developer** roles and **Software Engineering** opportunities!

**How you can reach out & hire her:**
• **Direct Portfolio Message**: Scroll down to the **Get In Touch** section below to send a message directly to her inbox.
• **LinkedIn**: [linkedin.com/in/dharshini-b-44a34124a/](https://linkedin.com/in/dharshini-b-44a34124a/)
• **GitHub**: [github.com/dhars-hub](https://github.com/dhars-hub)
• **Location**: Trichy, Tamil Nadu, India (Open to on-site & remote roles)

Feel free to use the quick button below to jump straight to the contact form!`;
        fallbackAction = 'contact';
      }
      // 2. Resume & CV Inquiries
      else if (
        lower.includes("resume") ||
        lower.includes("cv") ||
        lower.includes("curriculum vitae") ||
        lower.includes("download resume") ||
        lower.includes("view resume") ||
        lower.includes("transcript")
      ) {
        fallbackText = `You can view and download Dharshini's complete resume in PDF format with her detailed academic records (9.00 CGPA MCA), technical stack, internships, and project milestones using the link below!`;
        fallbackAction = 'resume';
      }
      // 3. Technical Stack & Skills Inquiries
      else if (
        lower.includes("tech stack") ||
        lower.includes("technical stack") ||
        lower.includes("skills") ||
        lower.includes("skill") ||
        lower.includes("technologies") ||
        lower.includes("stack") ||
        lower.includes("languages") ||
        lower.includes("tools")
      ) {
        fallbackText = `Dharshini's core **Technical Stack** includes:
• **MERN Full Stack**: MongoDB, Express.js, React, Node.js
• **Core Programming Languages**: Python, Java, SQL, MySQL, PHP, C, JavaScript (ES6+)
• **Frontend & UI/UX**: Tailwind CSS, HTML5, CSS3, Figma Design Prototyping
• **Specializations**: RESTful API Design, Computer Vision (OpenCV), Full-Stack Architecture, Database Management`;
      }
      // 4. Projects inquiries
      else if (
        lower.includes("smile step") ||
        lower.includes("smile") ||
        lower.includes("disabilit")
      ) {
        fallbackText = `**Smile Steps** is Dharshini's featured MERN web application built specifically for children with developmental disabilities. It provides a calming, sensory-friendly interface with guided 2-minute visual brushing timers, habit trackers, and positive reinforcement reward milestones using MongoDB, Express, React, and Node.js.`;
        fallbackAction = 'projects';
      } else if (
        lower.includes("toll") ||
        lower.includes("gate") ||
        lower.includes("license plate") ||
        lower.includes("vehicle") ||
        lower.includes("number plate")
      ) {
        fallbackText = `The **Automated Toll Gate System with License Plate Detection** uses Python, OpenCV, and Computer Vision to automatically identify vehicle registration plates in real time, calculate highway tolls, and log transaction records.`;
        fallbackAction = 'projects';
      } else if (
        lower.includes("project") ||
        lower.includes("portfolio work") ||
        lower.includes("built") ||
        lower.includes("showcase")
      ) {
        fallbackText = `Dharshini has built several impactful real-world projects:
1. **Smile Steps**: Accessible MERN web app for children with developmental disabilities.
2. **Automated Toll Gate System**: Python & OpenCV computer vision vehicle license plate recognition system.
3. **Fitness & Healthcare Habit Tracker**: Full-stack routine logger and progress analytics dashboard.
4. **Movie App UI Prototype**: Modern Figma user interface design system.`;
        fallbackAction = 'projects';
      }
      // 5. Education & Academics
      else if (
        lower.includes("education") ||
        lower.includes("cgpa") ||
        lower.includes("college") ||
        lower.includes("degree") ||
        lower.includes("mca") ||
        lower.includes("bca") ||
        lower.includes("holy cross") ||
        lower.includes("academic")
      ) {
        fallbackText = `Dharshini holds an outstanding academic record:
• **Master of Computer Applications (MCA, 2025–2027)**: Holy Cross College (Autonomous), Trichy — **CGPA: 9.00**
• **Bachelor of Computer Applications (BCA, 2022–2025)**: Holy Cross College (Autonomous), Trichy — **CGPA: 8.51**
• **Higher Secondary (12th)**: 9.17 CGPA | **SSLC (10th)**: 8.82 CGPA`;
      }
      // 6. Internships & Experience
      else if (
        lower.includes("intern") ||
        lower.includes("experience") ||
        lower.includes("company") ||
        lower.includes("internship studio") ||
        lower.includes("unified mentor")
      ) {
        fallbackText = `Dharshini has completed two professional internships:
1. **Full Stack Web Development Intern** at *Internship Studio*: Built full-stack web applications, responsive layouts, and backend API routes.
2. **Web Development & UI/UX Design Intern** at *Unified Mentor*: Crafted interactive component libraries, design systems, and responsive user interfaces in Figma and frontend frameworks.`;
      }
      // 7. Workshops & Certifications
      else if (
        lower.includes("workshop") ||
        lower.includes("seminar") ||
        lower.includes("certificate") ||
        lower.includes("certif")
      ) {
        fallbackText = `Key workshops & certifications attended:
• **Two-Day National Workshop on "MERN Stack Development" (2026)**
• **Two-Day National Seminar on "GenAI: Trends, Challenges, and Applications" (2025)**
• **Global Technology Summit on "Data, AI & Computing" (2025)**
• Certifications in Full Stack Development, Java, Python for Data Science, and UI/UX Design.`;
      }
      // 8. Greetings & Pleasantries
      else if (
        /^(hi|hello|hey|greetings|good\s*(morning|afternoon|evening)|howdy)\b/i.test(lower)
      ) {
        fallbackText = `Hello! How can I help you today? You can ask me how to hire Dharshini, inquire about her technical stack and projects (like *Smile Steps*), or ask any coding questions!`;
      }
      // 9. Technical Programming Concepts
      else if (lower.includes("what is react") || lower.includes("explain react") || lower.includes("react")) {
        fallbackText = `**React** is a popular component-based JavaScript library for building dynamic user interfaces. It uses a **Virtual DOM** to efficiently reconcile UI state changes and re-render only the components that need updating.`;
      } else if (lower.includes("what is mern") || lower.includes("mern stack") || lower.includes("explain mern")) {
        fallbackText = `**MERN Stack** stands for:
• **M**ongoDB: NoSQL document database for flexible JSON data storage.
• **E**xpress.js: Fast, minimalist web framework for Node.js API development.
• **R**eact: Declarative frontend library for building interactive user interfaces.
• **N**ode.js: JavaScript runtime environment for backend execution.`;
      } else if (lower.includes("python")) {
        fallbackText = `**Python** is a versatile, high-level programming language widely used for web backend development, automated scripting, Data Science, and Computer Vision (OpenCV).`;
      } else if (lower.includes("java")) {
        fallbackText = `**Java** is a class-based, object-oriented programming language designed to "Write Once, Run Anywhere" (WORA), enforcing strong OOP concepts like Encapsulation, Inheritance, Polymorphism, and Abstraction.`;
      } else if (lower.includes("sql") || lower.includes("database")) {
        fallbackText = `**SQL (Structured Query Language)** is the standard language for relational database management (e.g., MySQL, PostgreSQL), enabling structured data schemas, table joins, and ACID transactional integrity.`;
      } else if (lower.includes("who are you") || lower.includes("what can you do")) {
        fallbackText = `I am Dharshini's AI Portfolio Assistant! I can help you with hiring inquiries, provide information on Dharshini's technical stack, education, and projects, or answer any programming questions.`;
      } else {
        fallbackText = `I'm happy to help! You can ask me how to hire Dharshini, explore her core technical stack, check her projects (like *Smile Steps*), or discuss web development topics. What would you like to know?`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `assistant_fallback_${Date.now()}`,
          role: 'assistant',
          content: fallbackText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          action: fallbackAction
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([
      {
        id: `welcome_${Date.now()}`,
        role: 'assistant',
        content: `Chat history reset. What would you like to explore or ask about?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <>
      {/* Floating AI Bot Launcher Trigger */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
          <button
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#12131a] border border-[#818cf8]/50 hover:border-[#818cf8] text-white shadow-[0_0_25px_rgba(129,140,248,0.35)] hover:shadow-[0_0_35px_rgba(129,140,248,0.6)] transition-all transform hover:scale-105 cursor-pointer"
            aria-label="Open AI Portfolio Assistant"
          >
            {/* Pulsing Bot Icon */}
            <div className="relative p-2 rounded-full bg-gradient-to-r from-[#818cf8] to-[#6366f1] text-white shadow-md">
              <Bot className="w-5 h-5 animate-pulse" />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
            </div>

            <div className="text-left pr-1">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold font-display text-white tracking-wide">AI Assistant</span>
                <Sparkles className="w-3 h-3 text-amber-300" />
              </div>
              <p className="text-[10px] text-[#818cf8] font-code">Ask about Dharshini</p>
            </div>
          </button>
        </div>
      )}

      {/* Floating AI Chat Window */}
      {isOpen && (
        <div
          className={`fixed bottom-4 right-4 z-50 transition-all duration-300 w-[92vw] sm:w-[420px] bg-[#12131a] border border-[#818cf8]/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col ${
            isMinimized ? 'h-16' : 'h-[580px] max-h-[85vh]'
          }`}
        >
          {/* Chat Header */}
          <div className="p-3.5 bg-[#1a1b22] border-b border-[#818cf8]/20 flex items-center justify-between gap-2 select-none">
            <div className="flex items-center gap-2.5">
              <div className="relative p-2 rounded-xl bg-gradient-to-r from-[#818cf8] to-[#6366f1] text-white shadow-md">
                <Bot className="w-4 h-4" />
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400"></span>
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-xs font-bold text-white font-display">Dharshini's AI Assistant</h3>
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-code">
                    Gemini AI
                  </span>
                </div>
                <p className="text-[10px] text-[#94a3b8] font-code">Full Stack Developer Guide</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleReset}
                className="p-1.5 rounded-lg text-[#94a3b8] hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                title="Reset conversation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1.5 rounded-lg text-[#94a3b8] hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                title={isMinimized ? 'Expand' : 'Minimize'}
              >
                {isMinimized ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-[#94a3b8] hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                title="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Main Chat Body (When not minimized) */}
          {!isMinimized && (
            <>
              {/* Message List */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-left font-body text-xs text-[#e3e1ec]">
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div className="flex items-start gap-2 max-w-[88%]">
                      {m.role === 'assistant' && (
                        <div className="p-1.5 rounded-lg bg-[#1e1b4b] text-[#818cf8] border border-[#818cf8]/30 mt-0.5 shrink-0">
                          <Bot className="w-3.5 h-3.5" />
                        </div>
                      )}

                      <div
                        className={`p-3 rounded-2xl whitespace-pre-wrap leading-relaxed ${
                          m.role === 'user'
                            ? 'bg-gradient-to-r from-[#6366f1] to-[#818cf8] text-white rounded-tr-none shadow-md font-medium'
                            : 'bg-[#1a1b22] border border-[#818cf8]/25 text-[#e3e1ec] rounded-tl-none shadow-sm'
                        }`}
                      >
                        {m.content}

                        {/* Interactive Direct Action Buttons from Assistant */}
                        {m.action === 'resume' && (
                          <div className="mt-2.5 pt-2.5 border-t border-white/10 flex flex-wrap gap-2">
                            <button
                              onClick={() => {
                                generateResumePDF();
                              }}
                              className="px-2.5 py-1 rounded-lg bg-[#818cf8] text-[#101b8a] font-bold text-[11px] flex items-center gap-1.5 hover:brightness-110 transition-all cursor-pointer shadow-sm"
                            >
                              <Download className="w-3 h-3" />
                              <span>Download PDF</span>
                            </button>
                            <button
                              onClick={onOpenResume}
                              className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold text-[11px] flex items-center gap-1 transition-all cursor-pointer"
                            >
                              <FileText className="w-3 h-3" />
                              <span>View Full CV</span>
                            </button>
                          </div>
                        )}

                        {m.action === 'projects' && (
                          <div className="mt-2.5 pt-2.5 border-t border-white/10 flex flex-wrap gap-2">
                            <button
                              onClick={() => {
                                if (onSelectSlide) onSelectSlide(7);
                                const el = document.getElementById('projects');
                                el?.scrollIntoView({ behavior: 'smooth' });
                              }}
                              className="px-2.5 py-1 rounded-lg bg-indigo-500/30 text-indigo-300 border border-indigo-400/40 hover:bg-indigo-500/50 font-bold text-[11px] flex items-center gap-1 transition-all cursor-pointer"
                            >
                              <Briefcase className="w-3 h-3" />
                              <span>Explore Projects</span>
                            </button>
                          </div>
                        )}

                        {m.action === 'contact' && (
                          <div className="mt-2.5 pt-2.5 border-t border-white/10 flex flex-wrap gap-2">
                            <button
                              onClick={onOpenContact}
                              className="px-2.5 py-1 rounded-lg bg-emerald-500/30 text-emerald-300 border border-emerald-400/40 hover:bg-emerald-500/50 font-bold text-[11px] flex items-center gap-1 transition-all cursor-pointer"
                            >
                              <Mail className="w-3 h-3" />
                              <span>Send Direct Message</span>
                            </button>
                          </div>
                        )}
                      </div>

                      {m.role === 'user' && (
                        <div className="p-1.5 rounded-lg bg-[#2a266b] text-white mt-0.5 shrink-0">
                          <User className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>

                    <span className="text-[9px] text-[#64748b] font-code mt-1 px-1">
                      {m.timestamp}
                    </span>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex items-start gap-2 max-w-[85%]">
                    <div className="p-1.5 rounded-lg bg-[#1e1b4b] text-[#818cf8] border border-[#818cf8]/30 shrink-0">
                      <Bot className="w-3.5 h-3.5 animate-spin" />
                    </div>
                    <div className="p-3 rounded-2xl bg-[#1a1b22] border border-[#818cf8]/25 text-[#94a3b8] rounded-tl-none flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#818cf8] animate-bounce"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#818cf8] animate-bounce [animation-delay:0.2s]"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#818cf8] animate-bounce [animation-delay:0.4s]"></span>
                      <span className="text-[11px] font-code text-[#818cf8] ml-1">AI Thinking...</span>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Suggested Questions Chips */}
              <div className="px-3 py-2 bg-[#161720] border-t border-[#818cf8]/15 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
                <span className="text-[10px] font-bold text-[#818cf8] uppercase tracking-wider shrink-0 font-code flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-400" /> Prompts:
                </span>
                {DEFAULT_SUGGESTIONS.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(s)}
                    className="px-2.5 py-1 rounded-full bg-[#1e1b4b] hover:bg-[#2a266b] text-[#bdc2ff] hover:text-white border border-[#818cf8]/30 hover:border-[#818cf8] text-[10.5px] whitespace-nowrap transition-all cursor-pointer font-code"
                  >
                    {s}
                  </button>
                ))}
              </div>

              {/* Chat Input Bar */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="p-3 bg-[#1a1b22] border-t border-[#818cf8]/20 flex items-center gap-2"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask anything about Dharshini's skills, projects..."
                  className="flex-1 bg-[#12131a] border border-[#818cf8]/30 focus:border-[#818cf8] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-[#64748b] focus:outline-none transition-all"
                  disabled={isLoading}
                />

                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="p-2.5 rounded-xl bg-gradient-to-r from-[#818cf8] to-[#6366f1] text-white hover:brightness-110 transition-all disabled:opacity-40 disabled:hover:brightness-100 cursor-pointer shadow-md"
                  title="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </>
          )}
        </div>
      )}
    </>
  );
};
