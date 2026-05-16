# ⚙️ Pro-Blog Backend API

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)

The robust server-side engine powering the Pro-Blog Platform, handling authentication, article management, and file uploads.

---

## 📂 Project Structure

```bash
Backend/
├── server.js               # Entry point & Middleware config
├── APIs/                   # Route Handlers
│   ├── UserAPI.js          # Auth & Profiles
│   ├── AuthorAPI.js        # Article CRUD
│   ├── AdminAPI.js         # User & Content Moderation
│   └── CommonAPI.js        # Public Access
├── models/                 # Mongoose Schemas
├── middlewares/            # JWT & Role Verification
├── config/                 # Cloudinary & Multer Config
└── scratch/                # Utility scripts
```

---

## 📡 API Endpoints

### 👤 User API (`/user-api`)
- `POST /user` - Register new user
- `POST /login` - User login (Returns JWT in cookie)

### ✍️ Author API (`/author-api`)
- `POST /article` - Create new article (requires image)
- `PUT /article` - Edit existing article
- `DELETE /article/:id` - Remove an article
- `GET /articles` - Fetch author's own articles

### 🛡️ Admin API (`/admin-api`)
- `GET /users` - List all registered users
- `DELETE /user/:id` - Remove a user
- `PUT /article/:id` - Approve/Reject articles
- `GET /articles` - View all articles (Moderation queue)

---

## 🔐 Security & Features
- **JWT Authentication**: Secure stateless authentication using JSON Web Tokens.
- **Role-Based Access (RBAC)**: Strict middleware-level checks for Author and Admin roles.
- **Image Processing**: On-the-fly image transformations and storage via Cloudinary.
- **CORS Enabled**: Configured for secure cross-origin requests from the frontend.

---

## 🛠️ Installation

1. Clone and Navigate: `cd CAPSTONE_PROJECT/Backend`
2. Install Dependencies: `npm install`
3. Configure Environment: Create `.env` file.
4. Start Server: `npm start` (or `node server.js`)

---
**Author Roll No:** 24EG104E28
