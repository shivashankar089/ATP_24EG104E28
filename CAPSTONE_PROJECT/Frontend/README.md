# 🎨 Pro-Blog Frontend

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-orange?style=for-the-badge)

A modern, responsive, and high-performance user interface for the Pro-Blog Platform.

---

## ✨ Features

- **Dynamic Routing**: Smooth navigation using React Router v6.
- **Global State**: Efficient authentication and user state management with Zustand.
- **Component Based**: Modular architecture for scalability and maintenance.
- **Utility Styling**: Rapid UI development using Tailwind CSS.
- **Role-Aware UI**: Interface dynamically adapts based on User, Author, or Admin roles.

---

## 📂 Architecture

```bash
Frontend/src/
├── components/         # Reusable UI Components
│   ├── Layout/         # Header, Footer, Root
│   ├── Auth/           # Login, Register
│   ├── Articles/       # List, View, Create, Edit
│   └── Dashboards/     # Admin, Author, User Profiles
├── store/              # Zustand Stores (authStore.js)
├── styles/             # Global & Shared CSS
├── config/             # API Base URLs & Constants
└── App.jsx             # Main Routing Hub
```

---

## 🚦 Navigation Routes

| Path | Description | Access |
| :--- | :--- | :--- |
| `/` | Home Page | Public |
| `/articles` | Published Articles | Public |
| `/login` | Authentication | Public |
| `/author-profile` | Writing Dashboard | Author Only |
| `/admin-profile` | User & Content Management | Admin Only |

---

## 🛠️ Development

1. Navigate: `cd CAPSTONE_PROJECT/Frontend`
2. Install: `npm install`
3. Run: `npm run dev`
4. Build: `npm run build`

---
**Author Roll No:** 24EG104E28
