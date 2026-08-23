import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

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
