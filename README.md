# Param Patel - Living System Portfolio

Welcome to the repository for my personal portfolio website! This project is a modern, interactive Next.js application designed to showcase my projects, research, and lab notes. More than a static site, this is engineered as a **"Living System"**—an interactive ecosystem that evolves, reacts to time, and blends cutting-edge web technologies with intricate design metaphors.

## Live Website

View the live portfolio here: **[https://param-portfolio-2026.vercel.app/](https://param-portfolio-2026.vercel.app/)**

## About the Project

This portfolio serves as a central hub for my active experiments, evolving infrastructure, and technical foundations. It is designed to demonstrate extreme technical depth in front-end engineering, WebGL, and conceptual design. 

### Unique Features & Architectural Highlights

- **Circadian Theme Engine:** The site doesn't just have a dark mode; it lives in a 4-phase circadian rhythm (dawn, day, dusk, night). A global state engine dynamically transitions CSS variables and GPU-accelerated 3D material colors, lighting, and fog per-frame.
- **Immersive 3D Environments (R3F):** Every core route features a distinct, highly detailed 3D environment (e.g., *The Clearing, The Nexus Pool, The Workshop*). These scenes feature custom GLSL shaders (like a 6,000-blade procedural grass wind simulation), advanced PBR materials, and physics-driven camera parallax.
- **Oracle Root Terminal & Hybrid AI RAG:** A hidden CLI (the Oracle Terminal) is built into the UI, featuring 17 commands. The `ask` command connects to a custom client-side Retrieval-Augmented Generation (RAG) pipeline that combines Semantic Search and Keyword Search (BM25) using Reciprocal Rank Fusion.
- **Procedural SVG Engineering:** Features hand-coded, interactive SVG systems, including a "Knowledge Tree" that deterministically generates leaves along Bézier curves, and a "Living Ecosystem" footer with procedural falling leaves, animated creatures, and a hand-drawn signpost navigation system.
- **Real-time Infrastructure:** Uses Upstash Redis at the Edge for fire-and-forget real-time tracking of active visitors per route without blocking page rendering.

## Tech Stack

The project leverages a highly modern web development stack to deliver this immersive experience:

### Frontend & Framework
- **[Next.js](https://nextjs.org/)** - App Router for scalable and performant React applications.
- **[React](https://react.dev/)** - UI library for building component-driven interfaces.
- **[TypeScript](https://www.typescriptlang.org/)** - For type-safe code and better developer experience.

### Styling & Animation
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework (v4).
- **[Framer Motion](https://www.framer.com/motion/)** - Declarative animations, page transitions, and complex physics layouts.
- **[GSAP](https://gsap.com/)** - Advanced, high-performance animations.
- **[Lenis](https://lenis.darkroom.engineering/)** - Smooth scrolling experience.

### 3D Graphics & Visuals
- **[Three.js](https://threejs.org/)** - Powerful 3D library for WebGL.
- **[React Three Fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction)** - React renderer for Three.js.
- **[@react-three/drei](https://github.com/pmndrs/drei)** - Useful helpers for React Three Fiber.
- **Custom GLSL Shaders** - For procedural wind, noise, and distance-based gradients.

### Backend, AI, CMS & Services
- **[Google GenAI API](https://ai.google.dev/)** - Powering the Oracle Terminal's RAG embeddings and streaming chat.
- **[Sanity](https://www.sanity.io/)** - Headless CMS for managing projects, notes, and dynamic content.
- **[Clerk](https://clerk.com/)** - Secure and seamless user authentication.
- **[PostHog](https://posthog.com/)** - Product analytics and granular interaction tracking.
- **[Upstash Redis](https://upstash.com/)** - Serverless Redis for live presence and analytics at the Edge.
- **[Vercel](https://vercel.com/)** - Hosting and CI/CD deployment.

## Project Structure

- `src/app/`: Next.js App Router pages, layouts, and API routes.
- `src/components/`: Reusable React components (UI, SVG engineering, layout).
- `src/components/hero/`: Distinct 3D R3F scenes for every route.
- `src/hooks/`: Custom React hooks (e.g., `useMousePhysics`, `useThemeColors`).
- `src/lib/`: Utility functions, the `LivingSystemStore`, Oracle CLI logic, and the BM25/RRF RAG pipeline.
- `src/sanity/`: Sanity CMS configuration, schemas, and queries.
- `src/providers/`: Context providers (Theme, Analytics, etc.).

## Getting Started

To run this project locally, follow these steps:

### Prerequisites
- Node.js (v18 or higher recommended)
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd my-portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the necessary API keys (Sanity, Clerk, PostHog, Google AI, Upstash). Reference the `.env.example` if available.

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Contact

Feel free to reach out for collaborations, inquiries, or just to chat about tech! You can contact me through the dedicated section on the live website.
