import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertWorkshopSchema, insertRegistrationSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Workshop routes
  
  // Get all workshops
  app.get("/api/workshops", async (req, res) => {
    try {
      const workshops = await storage.getAllWorkshops();
      res.json(workshops);
    } catch (error) {
      console.error("Error fetching workshops:", error);
      res.status(500).json({ error: "Failed to fetch workshops" });
    }
  });

  // Get specific workshop
  app.get("/api/workshops/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const workshop = await storage.getWorkshop(id);
      if (!workshop) {
        return res.status(404).json({ error: "Workshop not found" });
      }
      res.json(workshop);
    } catch (error) {
      console.error("Error fetching workshop:", error);
      res.status(500).json({ error: "Failed to fetch workshop" });
    }
  });

  // Create workshop
  app.post("/api/workshops", async (req, res) => {
    try {
      const validatedData = insertWorkshopSchema.parse(req.body);
      const workshop = await storage.createWorkshop(validatedData);
      res.status(201).json(workshop);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid data", details: error.errors });
      }
      console.error("Error creating workshop:", error);
      res.status(500).json({ error: "Failed to create workshop" });
    }
  });

  // Update workshop
  app.put("/api/workshops/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertWorkshopSchema.partial().parse(req.body);
      const workshop = await storage.updateWorkshop(id, validatedData);
      if (!workshop) {
        return res.status(404).json({ error: "Workshop not found" });
      }
      res.json(workshop);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid data", details: error.errors });
      }
      console.error("Error updating workshop:", error);
      res.status(500).json({ error: "Failed to update workshop" });
    }
  });

  // Delete workshop
  app.delete("/api/workshops/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteWorkshop(id);
      if (!success) {
        return res.status(404).json({ error: "Workshop not found" });
      }
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting workshop:", error);
      res.status(500).json({ error: "Failed to delete workshop" });
    }
  });

  // Registration routes
  
  // Create registration
  app.post("/api/registrations", async (req, res) => {
    try {
      const validatedData = insertRegistrationSchema.parse(req.body);
      const registration = await storage.createRegistration(validatedData);
      res.status(201).json(registration);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid data", details: error.errors });
      }
      console.error("Error creating registration:", error);
      res.status(500).json({ error: "Failed to create registration" });
    }
  });

  // Get registrations by user
  app.get("/api/registrations/user/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const registrations = await storage.getRegistrationsByUserId(userId);
      res.json(registrations);
    } catch (error) {
      console.error("Error fetching user registrations:", error);
      res.status(500).json({ error: "Failed to fetch registrations" });
    }
  });

  // Get registrations by workshop
  app.get("/api/registrations/workshop/:workshopId", async (req, res) => {
    try {
      const workshopId = parseInt(req.params.workshopId);
      const registrations = await storage.getRegistrationsByWorkshopId(workshopId);
      res.json(registrations);
    } catch (error) {
      console.error("Error fetching workshop registrations:", error);
      res.status(500).json({ error: "Failed to fetch registrations" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
