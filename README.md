# 🎓Knoa — Scalable AI-Powered online Learning Platform

Knoa is a **full-stack, production-ready AI-powered learning platform** designed to connect **students, mentors, and admins** in a secure , role-based ecosystem. The system supports course lifecycle management, controlled enrollment workflows, and monetization through integrated payment processing and AI chatting

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

# AI Assistant

## Capabilities

- Context-aware platform assistant
- Handles greetings, help & onboarding
- Suggests courses based on user goals
- Answers platform-specific queries
- Real-time chat UI (ChatGPT-style)

---

## How It Works

- Uses **Gemini 2.5 Flash (Google GenAI)**
- Controlled via **system prompt**
- Injects platform knowledge dynamically
- Supports conversation history
- Includes retry + fallback logic (production-ready)

---

## Architecture & Tech Stack

### Frontend

- React 19 (Component-driven architecture)
- React Router (v7) for dynamic routing
- TanStack React Query for server-state management
- Tailwind CSS for utility-first styling
- Firebase Client SDK for authentication
- Axios for API communication
- Uiverse.io for high-quality, community-made CSS and Tailwind components (buttons, loaders, and inputs) to enhance the "eye-soothing" user experience.

### Backend

- Node.js + Express (RESTful API design)
- MongoDB (NoSQL data persistence)
- Firebase Admin SDK (secure token verification)
- Stripe API (payment processing)
- Environment-based configuration using dotenv
- Google GenAI

---

## Security Considerations

- Role-based access enforced at API level
- Firebase ID token verification on protected routes
- Environment variables for all sensitive credentials
- CORS configuration to restrict unauthorized origins
- Payment validation handled server-side

---

## Key Functional Modules

- Role-Based Dashboards (Admin / Mentor / Student)
- Course Management System (CRUD + ownership validation)
- Enrollment & Approval Workflow
- Payment Integration (Stripe)
- Wishlist Persistence (Client-side storage)
- Newsletter Subscription Engine
- Protected API & Route Layer

## Setup Guide

This guide will help you run the **Knoa Learning Platform** locally on your machine.

---

# 1. Clone the Repository

```bash
git clone https://github.com/your-username/knoa.git
cd knoa
```

### Project Structure Overview

knoa/
├── knoa-client/ → React Frontend (Vite)
├── knoa-server/ → Node.js Backend (Express)
├── README.md

---

### Frontend Setup (React + Vite)

Step 1: Go to client folder
cd client

Step 2: Install dependencies
npm install

Step 3: Run frontend
npm run dev

---

### Backend Setup (Node.js + Express)

Step 1: Go to server folder
cd server

Step 2: Install dependencies
npm install

Step 3: Start backend server
npm start

---

### Environment Variables Setup

Create a .env file inside /knoa-server:

- PORT=3000
- MONGODB_URI=your_mongodb_connection_string
- GEMINI_API_KEY=your_google_gemini_api_key
- STRIPE_SECRETE=your_stripe_secret_key
- SITE_DOMAIN=your_client_url
- FB_SERVICE_KEY=your_base64_encoded_firebase_admin_key

---

Create a .env.local file inside /knoa-client:

VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_publicKey=your_emailjs_publicKey
VITE_templateID=your_emailjs_templateID
VITE_serviceID=your_emailjs_serviceId
VITE_imageHost=your_imagbb_api_key

---

### Firebase Setup

Go to Firebase Console
Create a project
Enable Authentication (Email + Google)
Copy config values into frontend .env.local
Generate Firebase Admin SDK key
Convert it to Base64
Add it to backend .env

---

### Stripe Setup

Create Stripe account
Go to Dashboard → API Keys
Copy Secret Key
Add it to backend .env

---

### AI Setup (Gemini)

Go to Google AI Studio
Generate API Key
Add it to backend .env

---

### Start Frontend

cd client
npm run dev

---

###Start Backend
cd server
npm start

---
