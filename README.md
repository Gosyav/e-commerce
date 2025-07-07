# 🛒 E-Commerce Platform

A modern, full-stack e-commerce solution designed for scalable online retail.
Built for businesses seeking a robust, customizable foundation for selling products, managing orders, and delivering a seamless user experience.

This project demonstrates best practices in **type-safe development**, **modular architecture**, and **rapid feature delivery** using modern tools across the stack.

---

## 🌟 Key Features

- **Product Catalog & Search** — browse, filter, and search a diverse catalog with rich metadata and images
- **User Accounts** — secure sign-up/login with personal dashboards and order history
- **Order Management** — place, track, and manage orders with real-time status updates
- **Custom PC Builder** — assemble and save product configurations (ideal for electronics & hardware stores)
- **Discounts & Loyalty** — built-in support for promotions and reward programs
- **Responsive UI** — fast, mobile-first interface with reusable, modern components

---

## 🧱 Technologies & Architecture

### 🖥️ Frontend

- **Next.js 14** (App Router, SSR/SSG, React 18)
- **React Query** – for data fetching and caching
- **Tailwind CSS** – utility-first styling with responsive design
- Modular, reusable UI components for rapid development

### 🗄️ Backend

- **tRPC** – fully type-safe APIs without REST/GraphQL boilerplate
- **Prisma + PostgreSQL** – robust, scalable relational data modeling
- **NextAuth.js** – authentication with custom credentials and Prisma adapter
- **Zod** – runtime validation and static type inference

### ⚙️ State & Data Management

- **Zustand** – lightweight and scalable client state

---

## 🧩 Project Structure
```
src/
├── app/ # App routing (Next.js App Router)
├── modules/ # Feature modules (catalog, cart, auth, etc.)
├── components/ # Reusable UI elements
├── pagesComponents/ # Layout-aware, page-level components
├── server/ # API routers, DB logic, authentication
prisma/ # Database schema and migrations
```