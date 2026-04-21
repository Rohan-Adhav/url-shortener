# 🔗 URL Shortener - Full Stack Application

A production-ready **URL Shortener Web Application** built using modern full-stack technologies.
This application allows users to convert long URLs into short, shareable links and track analytics like click counts.

---

## 🚀 Live Demo

🌐 Frontend: https://url-shortener-mu-olive.vercel.app/
⚙️ Backend API: https://url-shortener-8mck.onrender.com/

---

## ✨ Features

* 🔗 Shorten long URLs instantly
* 🔁 Redirect short URLs to original links
* 📊 Track click analytics
* 📋 Copy short URL to clipboard
* ⚡ Fast and responsive UI
* ❌ Input validation & error handling
* 🌐 Fully deployed (Frontend + Backend)

---

## 🧠 Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* Axios

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)

### Deployment & Tools

* Render (Backend Deployment)
* Vercel (Frontend Deployment)
* Git & GitHub

---

## 📁 Project Structure

```
url-shortener/
│
├── frontend/         # React Frontend
│   ├── src/
│   └── index.html
│
├── backend/          # Node.js Backend
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middlewares/
│   └── config/
│
└── README.md
```

---

## ⚙️ Environment Variables

### Frontend (`.env`)

```
VITE_API_BASE_URL=https://url-shortener-8mck.onrender.com
```

### Backend (`.env`)

```
PORT=3000
MONGO_URI=your_mongodb_connection_string
FRONTEND_URL=https://url-shortener-mu-olive.vercel.app
```

---

## 🛠️ Installation & Setup

### 1. Clone the repository

```
git clone https://github.com/Rohan-Adhav/url-shortener.git
cd url-shortener
```

---

### 2. Setup Backend

```
cd backend
npm install
npm run dev
```

---

### 3. Setup Frontend

```
cd frontend
npm install
npm run dev
```

---

## 📡 API Endpoints

### ➤ Shorten URL

```
POST /api/url/shorten
```

**Request Body:**

```
{
  "originalUrl": "https://example.com"
}
```

---

### ➤ Get URL Stats

```
GET /api/url/:shortCode/stats
```

---

### ➤ Redirect

```
GET /:shortCode
```

---

## 🔥 Key Highlights

* Clean and scalable **REST API design**
* Implemented **URL redirection logic**
* Added **analytics tracking (click counts)**
* Used **environment variables** for secure configuration
* Handled **CORS and deployment issues**
* Structured backend using **MVC architecture**
* Implemented **error handling middleware**
* Added **rate limiting** for API protection

---

## 📈 Future Improvements

* ⏳ URL expiry feature
* ✏️ Custom short alias
* 📊 Advanced analytics (IP tracking, location)
* 🔐 Authentication system (user-specific URLs)

---

## 👨‍💻 Author

**Rohan Adhav**
Full Stack Developer

* 🌐 Portfolio: https://rohan-adhav-portfolio.vercel.app/
* 💻 GitHub: https://github.com/Rohan-Adhav

---

## ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub!
