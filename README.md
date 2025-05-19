# 📝 Blogcom Frontend

This is the **frontend** for the Blogcom web application — a blogging platform built with **React** and styled using **Tailwind CSS**. The app provides a user-friendly interface for blogging, featuring authentication, blog management, filtering, and more.

---

## 🚀 Tech Stack

- **React** 19
- **React Router DOM** 7
- **Tailwind CSS** 4
- **Zustand** (for state management)
- **Axios** (for API requests)
- **Framer Motion** (for animations)
- **React Icons** (for UI icons)
- **Vite** (for fast development)

---

## ✅ Features Implemented

### 1. 🔐 Authentication

- **Sign-Up Page**
  - Collects user `name`, `email`, and `password`.
- **Login Page**
  - Collects user `email` and `password`.
- Redirects unauthenticated users to the login page.
- JWT token stored in cookies/localStorage.

---

### 2. ✍️ Blogging Pages

- **Blogs Page**

  - Displays **all blogs**.
  - Filter by **author**, **category**, or both.

- **Create Blog Page**

  - Input fields: `topic`, `category`, `content`.
  - Optional: image upload.

- **Edit Blog Page**

  - Allows users to **edit their own blogs**.

- **My Blogs Section**
  - Displays blogs created by the logged-in user.
  - Users can **edit** or **delete** their own blogs.

---

### 3. 🎨 UI Features

- Uses **Tailwind CSS** for styling.
- Filters by category and author implemented using backend query params.
- Shows **alerts** for:
  - Blog creation
  - Blog update/delete success/failure
  - Unauthorized access

---

### 4. 🔁 Routing

- **React Router DOM v7** used for navigation.
- Protected routes:
  - Redirects unauthenticated users to login.
  - Access to `/home` only for logged-in users.

---
