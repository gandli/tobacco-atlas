# Chinese Cigarette Museum (Ciggies-Clone) - Project Context

## Project Overview

This is a React-based web application called "中国卷烟博物馆" (Chinese Cigarette Museum) built using modern web technologies. The project is a digital museum showcasing Chinese cigarette brands and products. It was created using the Lovable platform and follows a contemporary tech stack including Vite, TypeScript, React, shadcn/ui, and Tailwind CSS.

The project appears to be a clone or copy of another project named "ciggies", as indicated by the directory name "ciggies-clone".

## Technologies Used

- **Vite**: Fast build tool and development server
- **TypeScript**: Typed JavaScript superset
- **React**: Component-based UI library
- **React Router DOM**: Client-side routing
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Reusable components built with Radix UI and Tailwind CSS
- **TanStack Query (React Query)**: Server state management
- **Lucide React**: Icon library
- **Zod**: Schema validation
- **React Hook Form**: Form management with easy validation
- **Vitest**: Testing framework

## Project Structure

```
ciggies-clone/
├── public/                 # Static assets
├── src/                    # Source code
│   ├── components/         # Reusable UI components
│   ├── data/              # Data files and mock data
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions
│   ├── pages/             # Page components
│   ├── App.tsx           # Main application component
│   ├── main.tsx          # Application entry point
│   └── index.css         # Global styles
├── components.json        # shadcn/ui configuration
├── package.json           # Dependencies and scripts
├── vite.config.ts         # Vite configuration
├── tailwind.config.ts     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── index.html             # HTML template
```

## Key Features

The application has multiple routes for different sections:
- Home page (`/`)
- Gallery (`/gallery`)
- Brands listing (`/brands`)
- Brand detail page (`/brand/:pinyin`)
- SKU detail page (`/sku/:id`)
- Community section (`/community`)
- Chat functionality (`/chat`)
- Feed (`/feed`)
- User profile page (`/my`)
- 404 Not Found page

## Development Setup

### Prerequisites
- Node.js and npm (or bun)

### Installation and Running

1. **Install dependencies:**
   ```bash
   npm install
   # or
   bun install
   ```

2. **Run in development mode:**
   ```bash
   npm run dev
   # or
   bun run dev
   ```
   
   The application will be available at `http://localhost:8080` (as configured in vite.config.ts).

3. **Build for production:**
   ```bash
   npm run build
   # or
   bun run build
   ```

4. **Preview production build:**
   ```bash
   npm run preview
   # or
   bun run preview
   ```

5. **Run tests:**
   ```bash
   npm run test
   # or
   bun run test
   ```

6. **Lint code:**
   ```bash
   npm run lint
   # or
   bun run lint
   ```

## Styling and UI Framework

The project uses:
- **Tailwind CSS** for utility-first styling
- **shadcn/ui** for accessible UI components
- **CSS variables** for theming (light/dark mode support)
- **Typography plugin** for enhanced text rendering

## State Management

- **React Query** for server state management and caching
- **React hooks** for local component state
- **React Router DOM** for client-side navigation

## Development Conventions

- TypeScript is used throughout the project
- Components follow the shadcn/ui design system
- Absolute imports are configured using `@` alias for the `src` directory
- Tailwind CSS utility classes are used extensively
- Component organization separates UI components, pages, and business logic
- Responsive design is implemented using Tailwind's responsive utilities

## Special Notes

- The project is configured to use Chinese as the primary language (HTML lang attribute in index.html)
- Font loading is optimized with preconnect links to Google Fonts
- Social media meta tags are included for better sharing
- The project includes accessibility features through Radix UI primitives
- Dark mode support is configured in the Tailwind theme