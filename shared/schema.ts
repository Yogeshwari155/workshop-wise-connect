import { pgTable, text, serial, integer, boolean, varchar, timestamp, numeric, date } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  role: varchar("role", { length: 20 }).notNull().default("user"), // user, enterprise, admin
  company: varchar("company", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow(),
});

export const workshops = pgTable("workshops", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  company: varchar("company", { length: 255 }).notNull(),
  date: date("date").notNull(),
  time: varchar("time", { length: 20 }).notNull(),
  mode: varchar("mode", { length: 20 }).notNull(), // online, offline, hybrid
  location: varchar("location", { length: 255 }),
  price: numeric("price", { precision: 10, scale: 2 }).notNull().default("0"),
  seats: integer("seats").notNull(),
  registeredSeats: integer("registered_seats").notNull().default(0),
  registrationMode: varchar("registration_mode", { length: 20 }).notNull().default("automated"), // automated, manual
  image: varchar("image", { length: 500 }).notNull(),
  status: varchar("status", { length: 20 }).notNull().default("active"), // active, inactive, completed
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const registrations = pgTable("registrations", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  workshopId: integer("workshop_id").notNull().references(() => workshops.id),
  status: varchar("status", { length: 20 }).notNull().default("pending"), // pending, confirmed, completed, cancelled
  registeredAt: timestamp("registered_at").defaultNow(),
  paymentScreenshot: varchar("payment_screenshot", { length: 500 }),
  notes: text("notes"),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  registrations: many(registrations),
}));

export const workshopsRelations = relations(workshops, ({ many }) => ({
  registrations: many(registrations),
}));

export const registrationsRelations = relations(registrations, ({ one }) => ({
  user: one(users, {
    fields: [registrations.userId],
    references: [users.id],
  }),
  workshop: one(workshops, {
    fields: [registrations.workshopId],
    references: [workshops.id],
  }),
}));

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  name: true,
  role: true,
  company: true,
});

export const insertWorkshopSchema = createInsertSchema(workshops).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  registeredSeats: true,
});

export const insertRegistrationSchema = createInsertSchema(registrations).omit({
  id: true,
  registeredAt: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertWorkshop = z.infer<typeof insertWorkshopSchema>;
export type Workshop = typeof workshops.$inferSelect;
export type InsertRegistration = z.infer<typeof insertRegistrationSchema>;
export type Registration = typeof registrations.$inferSelect;
