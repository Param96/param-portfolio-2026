# Param Patel - Personal Portfolio

Welcome to the repository for my personal portfolio website! This project is a modern, interactive Next.js application designed to showcase my projects, research, and lab notes with a focus on AI/ML systems, agentic frameworks, automation experiments, and research infrastructure.

## Live Website

View the live portfolio here: **[https://param-portfolio-2026.vercel.app/](https://param-portfolio-2026.vercel.app/)**

## About the Project

This portfolio serves as a central hub for my active experiments, evolving infrastructure, and technical foundations. It's built to be more than just a static site—it's an interactive experience that reflects my engineering work and passion for pushing the boundaries of web development and artificial intelligence.

The site features 3D interactive elements, smooth animations, and a robust content management system to keep my lab notes and project showcases up-to-date.

## Tech Stack

The project leverages a modern web development stack to deliver a fast, responsive, and visually engaging experience:

### Frontend & Framework
- **[Next.js](https://nextjs.org/)** - App Router for scalable and performant React applications.
- **[React](https://react.dev/)** - UI library for building component-driven interfaces.
- **[TypeScript](https://www.typescriptlang.org/)** - For type-safe code and better developer experience.

### Styling & Animation
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework for rapid UI development.
- **[Framer Motion](https://www.framer.com/motion/)** - Declarative animations and transitions.
- **[GSAP](https://gsap.com/)** - Advanced, high-performance animations.
- **[Lenis](https://lenis.darkroom.engineering/)** - Smooth scrolling experience.

### 3D Graphics & Visuals
- **[Three.js](https://threejs.org/)** - Powerful 3D library for WebGL.
- **[React Three Fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction)** - React renderer for Three.js.
- **[@react-three/drei](https://github.com/pmndrs/drei)** - Useful helpers for React Three Fiber.
- **[Postprocessing](https://docs.pmnd.rs/react-three-postprocessing/introduction)** - Advanced visual effects.

### Backend, CMS & Services
- **[Sanity](https://www.sanity.io/)** - Headless CMS for managing projects, notes, and dynamic content.
- **[Clerk](https://clerk.com/)** - Secure and seamless user authentication.
- **[PostHog](https://posthog.com/)** - Product analytics and event tracking.
- **[Upstash Redis](https://upstash.com/)** - Serverless Redis for caching and rate limiting.
- **[Vercel](https://vercel.com/)** - Hosting and CI/CD deployment.

## Project Structure

- `src/app/`: Next.js App Router pages, layouts, and API routes.
- `src/components/`: Reusable React components (UI, 3D elements, layout).
- `src/hooks/`: Custom React hooks.
- `src/lib/`: Utility functions and service integrations.
- `src/sanity/`: Sanity CMS configuration, schemas, and queries.
- `src/data/`: Static data and configuration constants.
- `src/providers/`: Context providers (Theme, Analytics, etc.).
- `public/`: Static assets like images, models, and fonts.

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
   Create a `.env.local` file in the root directory and add the necessary API keys (Sanity, Clerk, PostHog, etc.). Reference the respective documentation or `.env.example` if available.

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Contact

Feel free to reach out for collaborations, inquiries, or just to chat about tech! You can contact me through the dedicated section on the live website.
