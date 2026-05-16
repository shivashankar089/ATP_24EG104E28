# 🖋️ Capstone Project: Pro-Blog Platform

![Platform](https://img.shields.io/badge/Platform-Full--Stack-blue?style=for-the-badge)
![React](https://img.shields.io/badge/Frontend-React%2018-61DAFB?style=for-the-badge&logo=react)
![Node](https://img.shields.io/badge/Backend-Node.js-339933?style=for-the-badge&logo=nodedotjs)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?style=for-the-badge&logo=mongodb)

A complete, production-ready Full-Stack Blog Application with role-based access control, secure authentication, and a dynamic user interface.

---

## 🚀 Overview

The **Pro-Blog Platform** is designed to provide a seamless blogging experience for Users, Authors, and Administrators. It features a robust backend built with Node/Express and a responsive frontend powered by React and Tailwind CSS.

### Key Features:
- **🔐 Multi-Role Authentication**: Distinct dashboards for Users, Authors, and Admins.
- **🖼️ Image Management**: Cover image and profile picture uploads via Cloudinary integration.
- **⚡ Real-time Updates**: Global state management using Zustand for smooth UX.
- **🛡️ Secure Access**: JWT-based authentication with HTTP-only cookies.
- **📱 Responsive Design**: Fully optimized for mobile, tablet, and desktop views.

---

## 🏗️ Architecture

The project is divided into two main components:

### [📁 Backend](./Backend)
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Auth**: JWT with custom verification middleware
- **Storage**: Cloudinary + Multer

### [📁 Frontend](./Frontend)
- **Framework**: React (Vite)
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Routing**: React Router v6

---

## 🛠️ Tech Stack Details

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React, Vite, Zustand, Tailwind CSS, Axios, React Router |
| **Backend** | Node.js, Express.js, MongoDB, JWT, Cookie-Parser |
| **DevOps/Services** | Cloudinary, Vercel (Deployment), Render |

---

## 🚦 Getting Started

### 1. Prerequisites
- Node.js (v16+)
- MongoDB Atlas Account
- Cloudinary Account

### 2. Setup Backend
```bash
cd Backend
npm install
# Create .env with:
# DB_URL, JWT_SECRET, CLOUDINARY_CLOUD_NAME, etc.
npm start
```

### 3. Setup Frontend
```bash
cd Frontend
npm install
npm run dev
```

---

## 👤 Author
**Roll No:** 24EG104E28

---
*Documentation enhanced by Antigravity AI*
