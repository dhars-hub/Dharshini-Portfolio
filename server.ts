import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

// In-memory message store for portfolio contact requests
const messages: ContactMessage[] = [];
let totalVisits = 1;

// Lazy initialized Gemini client helper
let geminiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!geminiClient && process.env.GEMINI_API_KEY) {
    geminiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return geminiClient;
}

const DHARSHINI_KNOWLEDGE_SYSTEM_PROMPT = `
You are the intelligent AI Assistant for Dharshini B's portfolio.
You have two core capabilities:
1. Answering questions about Dharshini B (her background as a Full Stack Developer, MCA student with 9.00 CGPA, her projects like Smile Steps, technical skills in Python, Java, SQL, React, Node.js, Express, MongoDB, UI/UX prototyping).
2. Acting as a helpful, knowledgeable software engineering assistant who can answer technical programming questions, discuss web development concepts, explain algorithms, software architecture, debugging tips, and converse naturally.

CRITICAL INSTRUCTIONS:
- When asked about Dharshini's technical stack or skills, give her core technical stack clearly and concisely in one structured, well-organized overview (MERN Stack: MongoDB, Express.js, React, Node.js; Core Languages: Python, Java, SQL, MySQL, PHP, C; UI/UX: Tailwind CSS, Figma).
- Directly answer whatever the user asks. If the user asks a technical question (e.g. "What is React?", "How does SQL work?", "Explain MERN stack"), answer that technical question directly and clearly with code examples or structured points.
- If the user greets you or makes conversation, reply naturally, warmly, and helpfully.
- DO NOT repeatedly bring up or dump resume/CV information unless the user specifically asks for her resume, CV, or academic transcripts.
- Keep your tone conversational, clear, professional, concise, and fast.

Profile Information (use when asked about Dharshini):
- Role: Full Stack Developer
- Education: MCA (2025-2027, CGPA: 9.00), BCA (2022-2025, CGPA: 8.51)
- Tech Stack: Python, Java, SQL, MySQL, PHP, C, React, Node.js, Express.js, MongoDB (MERN Stack), Tailwind CSS, JavaScript (ES6+), Figma UI/UX
- Key Projects: Smile Steps (MERN web app for children with developmental disabilities), Automated Toll Gate System with Computer Vision & License Plate Detection (Python/OpenCV), Fitness & Habit Tracker, Movie App UI Prototype
- Internships: Full Stack Web Development Intern at Internship Studio; Web Dev & UI/UX Intern at Unified Mentor
- Links: GitHub (github.com/dhars-hub), LinkedIn (linkedin.com/in/dharshini-b-44a34124a/)
`;

async function startServer() {
  const app = express();
  const PORT = 3000;

  // JSON request body parser
  app.use(express.json());

  // === BACKEND API ROUTES ===

  // 1. Health check & Server status
  app.get("/api/health", (_req, res) => {
    res.json({
      status: "ok",
      server: "Express Node.js Backend",
      uptime: Math.floor(process.uptime()),
      timestamp: new Date().toISOString(),
    });
  });

  // 2. Portfolio Stats & Analytics API
  app.get("/api/stats", (_req, res) => {
    totalVisits += 1;
    res.json({
      success: true,
      totalVisits,
      messagesReceived: messages.length,
      serverUptimeSec: Math.floor(process.uptime()),
      nodeVersion: process.version,
    });
  });

  // 3. Contact Form Submission API (POST)
  app.post("/api/contact", (req, res) => {
    try {
      const { name, email, subject, message } = req.body;

      if (!name || !email || !message) {
        return res.status(400).json({
          success: false,
          error: "Please provide your name, email, and message content.",
        });
      }

      const newMessage: ContactMessage = {
        id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        name: String(name).trim(),
        email: String(email).trim(),
        subject: subject ? String(subject).trim() : "General Inquiry",
        message: String(message).trim(),
        createdAt: new Date().toISOString(),
      };

      messages.unshift(newMessage);

      console.log(`[Backend Contact API] New message received from ${newMessage.name} (${newMessage.email}): "${newMessage.subject}"`);

      return res.status(201).json({
        success: true,
        message: "Your message has been successfully received by the backend server!",
        data: {
          id: newMessage.id,
          createdAt: newMessage.createdAt,
        },
      });
    } catch (err: any) {
      console.error("[Backend Contact API Error]", err);
      return res.status(500).json({
        success: false,
        error: "Failed to process message on the backend server.",
      });
    }
  });

  // 4. Retrieve message count & recent activity (GET)
  app.get("/api/contact/messages", (_req, res) => {
    res.json({
      success: true,
      count: messages.length,
      messages: messages.map((m) => ({
        id: m.id,
        name: m.name,
        subject: m.subject,
        createdAt: m.createdAt,
      })),
    });
  });

  // 5. AI Assistant Chat API (POST /api/ai/chat)
  app.post("/api/ai/chat", async (req, res) => {
    try {
      const { message, conversationHistory } = req.body;

      if (!message || typeof message !== "string") {
        return res.status(400).json({
          success: false,
          error: "Message prompt is required.",
        });
      }

      const client = getGeminiClient();

      if (client) {
        try {
          // Construct conversation for Gemini model
          const contents = [];
          if (Array.isArray(conversationHistory)) {
            for (const turn of conversationHistory) {
              if (turn.role && turn.content) {
                contents.push({
                  role: turn.role === "assistant" ? "model" : "user",
                  parts: [{ text: String(turn.content) }],
                });
              }
            }
          }
          contents.push({
            role: "user",
            parts: [{ text: String(message) }],
          });

          let replyText = "";
          
          // Ultra-fast model prioritization with thinking disabled for instantaneous chat responses
          const candidateModels = ["gemini-2.5-flash-lite", "gemini-2.5-flash"];

          for (const modelName of candidateModels) {
            try {
              // 2.5s maximum timeout per candidate before trying next or fallback
              const modelPromise = client.models.generateContent({
                model: modelName,
                contents,
                config: {
                  systemInstruction: DHARSHINI_KNOWLEDGE_SYSTEM_PROMPT,
                  thinkingConfig: {
                    thinkingBudget: 0,
                  },
                  maxOutputTokens: 350,
                  temperature: 0.6,
                },
              });

              const timeoutPromise = new Promise<null>((resolve) => 
                setTimeout(() => resolve(null), 2500)
              );

              const geminiResponse = await Promise.race([modelPromise, timeoutPromise]);

              if (geminiResponse && geminiResponse.text) {
                replyText = geminiResponse.text;
                break; // Successfully got fast response
              }
            } catch (modelErr: any) {
              console.warn(`[Gemini API notice: ${modelName}]`, modelErr?.status || modelErr?.message || "Temporarily unavailable");
            }
          }

          if (replyText) {
            return res.json({
              success: true,
              reply: replyText,
              mode: "gemini",
            });
          }
        } catch (apiErr: any) {
          // Fall back to comprehensive knowledge engine
        }
      }

      // Built-in instant offline responder
      const lower = message.toLowerCase().trim();
      let fallbackReply = "";

      // 1. Greetings & Pleasantries
      if (/^(hi|hello|hey|greetings|good\s*(morning|afternoon|evening)|howdy)\b/i.test(lower)) {
        fallbackReply = `Hello! How can I help you today? You can ask me about Dharshini's technical stack, her featured projects (like Smile Steps), or any web development and coding concepts!`;
      }
      // 2. Technical Stack & Skills Inquiries (Give one unified, complete stack)
      else if (lower.includes("tech stack") || lower.includes("technical stack") || lower.includes("skills") || lower.includes("skill") || lower.includes("technologies") || lower.includes("stack") || lower.includes("languages")) {
        fallbackReply = `Dharshini's core **Technical Stack** includes:
• **MERN Full Stack**: MongoDB, Express.js, React, Node.js
• **Core Programming**: Python, Java, SQL, MySQL, PHP, C, JavaScript (ES6+)
• **Frontend & UI/UX**: Tailwind CSS, HTML5, CSS3, Figma Design Prototyping
• **Specializations**: RESTful API Design, Computer Vision (OpenCV), Full-Stack Architecture`;
      }
      // 3. Questions about the bot itself
      else if (lower.includes("who are you") || lower.includes("what can you do") || lower.includes("your name")) {
        fallbackReply = `I am Dharshini's AI Assistant! I can discuss full-stack development, explain technical programming concepts (like MERN stack, APIs, Python, databases), and share details about Dharshini's projects and skills.`;
      }
      // 4. Technical & Programming concept questions
      else if (lower.includes("what is react") || lower.includes("explain react") || lower.includes("how does react work")) {
        fallbackReply = `**React** is a declarative, component-based JavaScript library for building interactive user interfaces. It uses a **Virtual DOM** to efficiently reconcile UI state changes and re-render only the specific components that need updating. In full-stack applications, React pairs seamlessly with backend frameworks like Express.js and Node.js.`;
      } else if (lower.includes("what is mern") || lower.includes("mern stack") || lower.includes("explain mern")) {
        fallbackReply = `**MERN Stack** is a popular full-stack JavaScript architecture composed of:
• **M**ongoDB: NoSQL document-oriented database for flexible JSON-like data storage.
• **E**xpress.js: Minimalist web framework running on Node.js to structure RESTful APIs.
• **R**eact: Frontend component library for dynamic user interfaces.
• **N**ode.js: JavaScript runtime environment enabling scalable server-side execution.`;
      } else if (lower.includes("what is node") || lower.includes("explain node") || lower.includes("nodejs")) {
        fallbackReply = `**Node.js** is an open-source, cross-platform JavaScript runtime built on Chrome's V8 engine. It uses an asynchronous, event-driven, non-blocking I/O model that makes it lightweight and efficient for real-time web services, microservices, and REST APIs.`;
      } else if (lower.includes("sql vs nosql") || lower.includes("difference between sql") || lower.includes("database")) {
        fallbackReply = `**SQL vs. NoSQL Databases**:
• **SQL (Relational)** (e.g., MySQL, PostgreSQL): Uses structured schemas, tables, rows, and columns with strict relational foreign keys. Ideal for transactional integrity (ACID).
• **NoSQL (Document/Key-Value)** (e.g., MongoDB): Uses flexible schema-less JSON documents. Ideal for rapid prototyping, hierarchical data, and horizontal scaling.`;
      } else if (lower.includes("what is python") || lower.includes("explain python")) {
        fallbackReply = `**Python** is a high-level, interpreted programming language known for its clear syntax and versatility. It is widely used in web backends (Django, Flask), Computer Vision / Image Processing (OpenCV), Artificial Intelligence, and data analysis.`;
      } else if (lower.includes("what is java") || lower.includes("explain java") || lower.includes("oop")) {
        fallbackReply = `**Java** is a class-based, object-oriented programming language designed to have few implementation dependencies ("Write Once, Run Anywhere"). It enforces strong Object-Oriented Principles (Encapsulation, Inheritance, Polymorphism, Abstraction) for building enterprise-scale applications.`;
      }
      // 5. Specific inquiries about Dharshini's role & background
      else if (lower.includes("role") || lower.includes("position") || lower.includes("job") || lower.includes("title")) {
        fallbackReply = `Dharshini B is a **Full Stack Developer**. She designs end-to-end web applications, develops REST APIs, and creates user-centered UI/UX prototypes.`;
      } else if (lower.includes("smile step") || lower.includes("smile") || lower.includes("disabilit")) {
        fallbackReply = `**Smile Steps** is a featured MERN web application designed for children with developmental disabilities. It provides a calming, sensory-friendly UI with guided 2-minute visual brushing coaches, progress tracking, and positive reinforcement reward milestones.`;
      } else if (lower.includes("toll") || lower.includes("gate") || lower.includes("vehicle") || lower.includes("plate")) {
        fallbackReply = `The **Automated Toll Gate System** uses Python and OpenCV Computer Vision to recognize vehicle license plates, compute highway tariffs automatically, and store records for streamlined toll management.`;
      } else if (lower.includes("education") || lower.includes("cgpa") || lower.includes("college") || lower.includes("degree") || lower.includes("mca") || lower.includes("bca")) {
        fallbackReply = `Dharshini holds strong academic credentials:
• **MCA (2025–2027)**: Holy Cross College (Autonomous), Trichy — **CGPA: 9.00**
• **BCA (2022–2025)**: Holy Cross College (Autonomous), Trichy — **CGPA: 8.51**`;
      } else if (lower.includes("intern") || lower.includes("experience")) {
        fallbackReply = `Dharshini has completed two internships:
1. **Full Stack Web Development Intern** at *Internship Studio* (Full-stack web application development, API integration).
2. **Web Development & UI/UX Design Intern** at *Unified Mentor* (Component design systems and responsive layouts).`;
      } else if (lower.includes("resume") || lower.includes("cv") || lower.includes("transcript")) {
        fallbackReply = `You can view or download Dharshini's full resume using the **"Download Resume"** button on the portfolio header or navigation bar.`;
      } else if (lower.includes("contact") || lower.includes("email") || lower.includes("hire") || lower.includes("reach") || lower.includes("linkedin") || lower.includes("github")) {
        fallbackReply = `You can connect with Dharshini via:
• **LinkedIn**: linkedin.com/in/dharshini-b-44a34124a/
• **GitHub**: github.com/dhars-hub
• **Message Form**: Use the **Get In Touch** section below to send a message directly.`;
      } else {
        fallbackReply = `I'm happy to help! You can ask me any technical programming questions (about React, Python, Java, SQL, Node.js), or inquire about Dharshini's technical stack, projects, or experience. What would you like to know?`;
      }

      return res.json({
        success: true,
        reply: fallbackReply,
        mode: "knowledge_engine",
      });
    } catch (err: any) {
      console.error("[AI Chat API Error]", err);
      return res.status(500).json({
        success: false,
        error: "Failed to generate AI response.",
      });
    }
  });

  // === VITE MIDDLEWARE & STATIC ASSET HANDLING ===
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Express Backend] Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
