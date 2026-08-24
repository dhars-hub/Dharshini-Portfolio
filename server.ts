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
You are the interactive AI Portfolio Assistant for Dharshini B.
Your role is to represent Dharshini B to recruiters, tech leads, interviewers, and portfolio visitors with a professional, friendly, concise, and enthusiastic demeanor.

Key Profile Information about Dharshini B:
- **Specific Role**: Full Stack Developer
- **Degree & Academics**:
  - Master of Computer Applications (MCA) (2025 - 2027) at Holy Cross College (Autonomous), Trichy | Current CGPA: 9.00
  - Bachelor of Computer Applications (BCA) (2022 - 2025) at Holy Cross College (Autonomous), Trichy | CGPA: 8.51
  - Higher Secondary (2021 - 2022) | CGPA: 9.17
  - SSLC (2020 - 2021) | CGPA: 8.82
- **Core Technical Stack**:
  - Full Stack & Backend: Node.js, Express.js, REST APIs, Python, Java, JavaScript (ES6+), SQL, MySQL, PHP, C
  - Frontend: React, Tailwind CSS, HTML5, CSS3, Responsive Design
  - Modern Stacks: MERN Stack (MongoDB, Express, React, Node.js)
  - Concepts: Full Stack Web Architecture, Database Design, Human-Centered UI/UX Design, Figma
- **Featured Projects**:
  1. **Smile Steps**: A child-friendly MERN web application built specifically for children with developmental disabilities. Features sensory-friendly interfaces, structured 2-minute routine timer coaches, and positive reinforcement milestones. Built with React, Node.js, Express.js, and MongoDB.
  2. **Automated Toll Gate System with License Plate Detection**: Python & Computer Vision system for real-time vehicle identification, automated fee calculation, and cloud logging.
  3. **Healthcare & Fitness Habit Application**: Full stack survey and habit tracker with analytics dashboards and goal routines.
  4. **Movie App UI Prototype**: High-fidelity modern media streaming interface prototype designed in Figma.
- **Internships**:
  - Full Stack Web Development Intern at Internship Studio (Real-world web application development, responsive layouts, API integrations).
  - Web Development & UI/UX Design Intern at Unified Mentor (Modern interactive UI/UX prototyping, frontend component architecture).
- **Workshops & Certifications**:
  - Two-Day National Workshop on "MERN Stack Development" (2026).
  - Two-Day National Level Seminar on "GenAI: Trends, Challenges, and Applications" (2025).
  - Global Technology Summit on "Data, AI & Computing" (2025).
  - Certifications in Full Stack Development, Java Programming, Python for Data Science, and UI/UX Design.
- **Contact & Availability**:
  - Open for Full-Time Full Stack Developer roles and Software Engineering internships.
  - Location: Trichy, Tamil Nadu, India.
  - Profiles: GitHub (github.com/dhars-hub), LinkedIn (linkedin.com/in/dharshini-b-44a34124a/)

Instructions for Response:
- Answer questions directly, highlight Dharshini's Full Stack Developer strengths, projects, and academic excellence (9.00 CGPA).
- Keep responses engaging, structured (with bullet points where appropriate), and concise (under 150-200 words unless detailed explanation is asked).
- If asked about hiring or contacting, guide them to use the Contact form or connect via LinkedIn and GitHub.
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
          
          // Use fastest model with tight timeout (2.8s) so response is instantaneous
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 2800);

          try {
            const geminiPromise = client.models.generateContent({
              model: "gemini-2.5-flash",
              contents,
              config: {
                systemInstruction: DHARSHINI_KNOWLEDGE_SYSTEM_PROMPT,
                maxOutputTokens: 300,
                temperature: 0.5,
              },
            });

            const geminiResponse = await Promise.race([
              geminiPromise,
              new Promise<never>((_, reject) =>
                setTimeout(() => reject(new Error("AI_TIMEOUT")), 2800)
              ),
            ]);

            if (geminiResponse && geminiResponse.text) {
              replyText = geminiResponse.text;
            }
          } catch (err: any) {
            // If remote model is slow or busy, smoothly fall through to instant knowledge engine
          } finally {
            clearTimeout(timeoutId);
          }

          if (replyText) {
            return res.json({
              success: true,
              reply: replyText,
              mode: "gemini",
            });
          }
        } catch (apiErr: any) {
          // Fall back instantly to internal knowledge engine
        }
      }

      // Built-in offline knowledge responder if API key is not configured
      const lower = message.toLowerCase();
      let fallbackReply = "";

      if (lower.includes("role") || lower.includes("position") || lower.includes("job") || lower.includes("title")) {
        fallbackReply = `Dharshini B's primary specific role is **Full Stack Developer**. She is experienced in architecting end-to-end web applications, full-stack development, and crafting intuitive human-centered UI/UX designs.`;
      } else if (lower.includes("smile step") || lower.includes("smile") || lower.includes("disabilit")) {
        fallbackReply = `**Smile Steps** is Dharshini's featured project: a child-friendly MERN web application built specifically for children with developmental disabilities. It integrates sensory-friendly design, 2-minute visual brushing timer coaches, and positive reinforcement reward milestones using MongoDB, Express.js, React, and Node.js.`;
      } else if (lower.includes("toll") || lower.includes("gate") || lower.includes("vehicle") || lower.includes("number plate")) {
        fallbackReply = `**Automated Toll Gate System with License Plate Detection** uses Python, OpenCV, and Computer Vision to automatically recognize vehicle number plates, calculate toll tariffs, and synchronize billing logs.`;
      } else if (lower.includes("skill") || lower.includes("tech") || lower.includes("stack") || lower.includes("language")) {
        fallbackReply = `Dharshini's core technical stack spans:
• **Backend & Programming**: Node.js, Express.js, REST APIs, Python, Java, SQL, MySQL, PHP, C
• **Frontend & UI**: React, JavaScript (ES6+), Tailwind CSS, HTML5, CSS3, Figma UI/UX prototyping
• **Full Stack Frameworks**: MERN Stack (MongoDB, Express, React, Node.js)`;
      } else if (lower.includes("education") || lower.includes("cgpa") || lower.includes("college") || lower.includes("degree") || lower.includes("mca") || lower.includes("bca")) {
        fallbackReply = `Dharshini holds an outstanding academic track record:
• **MCA (Master of Computer Applications, 2025–2027)**: Holy Cross College (Autonomous), Trichy — **CGPA: 9.00**
• **BCA (Bachelor of Computer Applications, 2022–2025)**: Holy Cross College (Autonomous), Trichy — **CGPA: 8.51**
• **Higher Secondary**: 9.17 CGPA | **SSLC**: 8.82 CGPA`;
      } else if (lower.includes("workshop") || lower.includes("seminar") || lower.includes("conference") || lower.includes("certif")) {
        fallbackReply = `Key workshops and summits attended by Dharshini include:
• **Two-Day National Workshop on "MERN Stack Development" (2026)**
• **Two-Day National Seminar on "GenAI: Trends, Challenges, and Applications" (2025)**
• **Global Technology Summit on "Data, AI & Computing" (2025)**`;
      } else if (lower.includes("intern") || lower.includes("experience")) {
        fallbackReply = `Dharshini has completed two impactful internships:
1. **Full Stack Web Development Intern** at *Internship Studio*: Built full-stack web applications and API architectures.
2. **Web Development & UI/UX Design Intern** at *Unified Mentor*: Designed interactive component prototypes and responsive layouts.`;
      } else if (lower.includes("resume") || lower.includes("cv") || lower.includes("download")) {
        fallbackReply = `You can download Dharshini's complete resume in **PDF format** by clicking the "View & Download Curriculum Vitae" button in the navigation bar or top banner, or by clicking the "Download & Print PDF" option.`;
      } else if (lower.includes("contact") || lower.includes("email") || lower.includes("hire") || lower.includes("linkedin") || lower.includes("github")) {
        fallbackReply = `You can connect with Dharshini via:
• **LinkedIn**: linkedin.com/in/dharshini-b-44a34124a/
• **GitHub**: github.com/dhars-hub
• **Portfolio Message Form**: Scroll down to the **Get In Touch** section on this page to send a direct message!`;
      } else {
        fallbackReply = `Hello! I am Dharshini's AI Assistant. As a **Full Stack Developer** with a 9.00 CGPA in MCA, Dharshini specializes in modern web development (MERN, React, Node.js, Python, Java, SQL). 

Feel free to ask me about her projects (like *Smile Steps* or the *Automated Toll System*), technical skills, internships, education, or how to get in touch!`;
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
