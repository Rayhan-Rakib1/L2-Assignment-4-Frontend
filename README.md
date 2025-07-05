# Minimal Library Management System - Frontend


---

## 📚 Project Overview

This project is the **Frontend** part of a Minimal Library Management System built with **React**, **TypeScript**, and **Redux Toolkit Query (RTK Query)**. It enables users to:

- View a list of books with detailed information.
- Perform full CRUD operations on books.
- Borrow books with quantity and due date management.
- View an aggregated summary of borrowed books.

All features are accessible without authentication to keep it simple and user-friendly.

---

## ✨ Features

- **Book Management:**
  - Display all books in a sortable, paginated table.
  - Add, edit, and delete books with live UI updates.
  - Mark books as available/unavailable based on copies.

- **Borrow Management:**
  - Borrow books by specifying quantity and due date.
  - Validation to prevent borrowing more copies than available.
  - Real-time updates of book availability after borrowing.

- **Borrow Summary:**
  - View total quantity borrowed per book.
  - Clean and minimal UI for quick insights.

- **Responsive Design:**
  - Fully responsive layout using Tailwind CSS.
  - Optimized for desktop, tablet, and mobile devices.

- **Bonus Features:**
  - Optimistic UI updates.
  - Toast notifications for success and error feedback.
  - Type-safe forms using React Hook Form and TypeScript.

---

## 🛠️ Technology Stack

| Layer         | Technology                    |
| ------------- | -----------------------------|
| Frontend      | React, TypeScript             |
| State Mgmt    | Redux Toolkit & RTK Query     |
| Styling       | Tailwind CSS                  |
| API Client    | RTK Query (Redux Toolkit)     |
| Routing       | React Router DOM              |

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher recommended)
- npm or yarn package manager



