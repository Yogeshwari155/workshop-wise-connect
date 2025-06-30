# WorkshopWise - Full-Stack Workshop Management Platform

## Overview

WorkshopWise is a comprehensive workshop management platform built with a modern full-stack architecture. The application enables users to discover, register for, and manage workshops while providing enterprise partners with tools to create and manage their own workshops. The platform features role-based access control with three user types: regular users, enterprise partners, and administrators.

## System Architecture

The application follows a monorepo structure with a clear separation between client and server components:

- **Frontend**: React-based SPA using Vite as the build tool
- **Backend**: Express.js REST API server
- **Database**: PostgreSQL with Drizzle ORM (configured for NeonDB)
- **UI Framework**: shadcn/ui components with Radix UI primitives
- **Styling**: Tailwind CSS with custom design system
- **State Management**: React Context for authentication, TanStack Query for server state

## Key Components

### Frontend Architecture
- **Component Library**: Comprehensive set of shadcn/ui components for consistent design
- **Routing**: React Router for client-side navigation
- **Authentication**: Context-based auth system with role-based access control
- **Forms**: React Hook Form with Zod validation
- **Notifications**: Toast system for user feedback
- **Responsive Design**: Mobile-first approach with Tailwind CSS

### Backend Architecture
- **API Structure**: Express.js with modular route handling
- **Data Layer**: Drizzle ORM with PostgreSQL
- **Storage Interface**: Abstracted storage layer with in-memory fallback
- **Development Setup**: Hot reload with Vite integration
- **Error Handling**: Centralized error handling middleware

### User Roles and Permissions
- **Regular Users**: Browse and register for workshops, view dashboard
- **Enterprise Partners**: Create and manage workshops, view registrations
- **Administrators**: Full system access, user management, analytics

## Data Flow

1. **User Authentication**: Users authenticate through the frontend, with JWT-like session management
2. **Workshop Discovery**: Users browse workshops with filtering and search capabilities
3. **Registration Process**: Two-tier registration system (automated for free, manual approval for paid)
4. **Payment Integration**: Screenshot-based payment verification system
5. **Workshop Management**: Enterprise users can create, edit, and manage their workshops
6. **Analytics**: Comprehensive reporting system for admins and enterprise partners

## External Dependencies

### Frontend Dependencies
- **React Ecosystem**: React 18, React Router, React Hook Form
- **UI Components**: Radix UI primitives, Lucide React icons
- **Data Fetching**: TanStack Query for server state management
- **Styling**: Tailwind CSS, class-variance-authority for component variants
- **Charts**: Recharts for data visualization
- **Date Handling**: date-fns for date manipulation

### Backend Dependencies
- **Server Framework**: Express.js with TypeScript support
- **Database**: Drizzle ORM, @neondatabase/serverless
- **Session Management**: connect-pg-simple for PostgreSQL sessions
- **Development**: tsx for TypeScript execution, Vite for development server

### Build and Development Tools
- **Build Tool**: Vite for frontend, esbuild for backend
- **TypeScript**: Full TypeScript support across the stack
- **Package Manager**: npm with lockfile for dependency management
- **Development**: Hot reload, error overlay, and development banners

## Deployment Strategy

### Development Environment
- **Frontend**: Vite development server with HMR
- **Backend**: tsx with hot reload capabilities
- **Database**: NeonDB PostgreSQL instance
- **Environment**: Replit-optimized with development banners and error overlays

### Production Build
- **Frontend**: Static assets built with Vite, served from Express
- **Backend**: Bundled with esbuild for Node.js deployment
- **Database**: PostgreSQL with Drizzle migrations
- **Static Assets**: Served through Express with proper caching headers

### Database Management
- **Schema**: Centralized in `shared/schema.ts` using Drizzle
- **Migrations**: Drizzle Kit for schema migrations
- **Connection**: Environment-based database URL configuration

## User Preferences

Preferred communication style: Simple, everyday language.

## Changelog

Changelog:
- June 30, 2025. Initial setup