# 🎓Knoa — Scalable Online Learning Platform

Knoa is a full-stack, production-ready learning management platform designed to connect students, mentors, and administrators through a secure, role-based ecosystem. The system supports course lifecycle management, controlled enrollment workflows, and monetization through integrated payment processing.

---

## 🌐 Live Application

🔗 https://knoa-d9d9c.web.app/

---

## 🔐 Admin Access

> This access is strictly for demonstration and evaluation purposes.

- **Email:** platformadmin@gmail.com
- **Password:** Admin@1234

---

## 🧩 System Overview

Knoa is built with a modular architecture that separates concerns across authentication, authorization, course management, and payment workflows.

The platform enforces **strict role-based access control (RBAC)** across three primary user types:

- **Admin** — System governance and approval authority
- **Mentor** — Content creation and revenue tracking
- **Student** — Course consumption and enrollment

---

## 🚀 Core Capabilities

### Authentication & Authorization

- Firebase Authentication (Email/Password + Google OAuth)
- Secure JWT-based session handling
- Backend role validation using Firebase Admin SDK
- Route protection enforced on both client and server

---

### Admin Controls

- Centralized user management (role assignment, deletion)
- Full course moderation (edit/delete any course)
- Payment approval workflow for enrollments
- Newsletter subscriber monitoring with timestamps

---

### Mentor Features

- Create, update, and delete courses
- Profile management
- Visibility into enrolled students per course
- Revenue awareness based on enrollments

---

### Student Experience

- Course discovery and browsing
- Wishlist system (persisted via localStorage)
- Secure checkout using Stripe
- Enrollment lifecycle tracking (pending → approved)
- Access control based on purchase approval status

---

### Payment Workflow

- Stripe integration for secure transactions
- Server-side payment intent handling
- Manual admin approval layer before course access is granted
- Prevents unauthorized content access post-payment

---

### Newsletter System

- Email subscription via EmailJS
- Automated welcome email delivery
- Admin dashboard visibility into subscriber data and timestamps

---

## 🏗️ Architecture & Tech Stack

### Frontend

- React 19 (Component-driven architecture)
- React Router (v7) for dynamic routing
- TanStack React Query for server-state management
- Tailwind CSS for utility-first styling
- Firebase Client SDK for authentication
- Axios for API communication
  -Uiverse.io for high-quality, community-made CSS and Tailwind components (buttons, loaders, and inputs) to enhance the "eye-soothing" user experience.

### Backend

- Node.js + Express (RESTful API design)
- MongoDB (NoSQL data persistence)
- Firebase Admin SDK (secure token verification)
- Stripe API (payment processing)
- Environment-based configuration using dotenv

---

## 🔒 Security Considerations

- Role-based access enforced at API level
- Firebase ID token verification on protected routes
- Environment variables for all sensitive credentials
- CORS configuration to restrict unauthorized origins
- Payment validation handled server-side

---

## 📦 Key Functional Modules

- Role-Based Dashboards (Admin / Mentor / Student)
- Course Management System (CRUD + ownership validation)
- Enrollment & Approval Workflow
- Payment Integration (Stripe)
- Wishlist Persistence (Client-side storage)
- Newsletter Subscription Engine
- Protected API & Route Layer
