# E-Commerce Platform

A modern, full-stack e-commerce solution designed for scalable online retail. Built for businesses seeking a robust, customizable foundation for selling products, managing orders, and delivering a seamless user experience. This project demonstrates best practices in type-safe development, modular architecture, and rapid feature delivery.

## Key Features

- **Product Catalog & Search**: Browse, filter, and search a diverse catalog of products with rich metadata and images.
- **Personal User Accounts**: Secure registration, authentication, and personal dashboards with order history and configuration management.
- **Order Management**: Place, track, and manage orders with real-time updates and status tracking.
- **Custom PC Configuration**: Users can assemble and save custom product configurations, ideal for electronics and hardware stores.
- **Discounts & Loyalty**: Built-in support for discounts and loyalty programs to drive customer retention.
- **Responsive UI**: Fast, mobile-friendly interface with reusable components and modern design.

## Technologies & Architecture

- **Frontend**:
  - [Next.js 14](https://nextjs.org/) (App Router, React 18, SSR/SSG)
  - [React Query](https://tanstack.com/query/latest) for data fetching and caching
  - [Tailwind CSS](https://tailwindcss.com/) for utility-first, responsive styling
  - Modular UI components for rapid development and consistency

- **Backend**:
  - [tRPC](https://trpc.io/) for end-to-end type-safe APIs (no REST/GraphQL boilerplate)
  - [Prisma ORM](https://www.prisma.io/) with PostgreSQL for robust, scalable data modeling
  - [NextAuth.js](https://next-auth.js.org/) with custom credentials and Prisma adapter for secure authentication
  - [Zod](https://zod.dev/) for runtime validation and type inference

- **State & Data Management**:
  - [Zustand](https://zustand-demo.pmnd.rs/) for lightweight, scalable state management

- **Project Structure**:
  - `src/app/` — Next.js app entry and routing
  - `src/modules/`, `src/components/`, `src/pagesComponents/` — Feature modules and reusable UI
  - `src/server/` — API routers, authentication, and database logic
  - `prisma/` — Database schema and migrations

- **Dev Experience**:
  - TypeScript-first codebase
  - ESLint, Prettier, and Tailwind plugins for code quality and consistency
  - Scripts for local development, database management, and linting