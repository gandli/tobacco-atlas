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

## Building and Running

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

## Analysis of Target Website (ciggies.app)

Based on pixel-level analysis of the target website https://www.ciggies.app/, here are the detailed findings:

### Overall Information Architecture

The website is structured as a comprehensive Chinese cigarette database and community platform with the following main sections:

1. **Home/Collection** (`/`): Main product listing page showing cigarette products
2. **Brands** (`/brands`): Organized by geographical regions (Mainland China, Hong Kong/Macau/Taiwan, International, Historical)
3. **Community** (`/community`): User community section (requires login)
4. **Feed** (`/feed`): Activity feed showing recent user interactions
5. **Individual Product Pages** (`/sku/:id`): Detailed product information
6. **Brand Pages** (`/brand/:id`): Collection of products under a specific brand
7. **User Profile** (`/my`): Personal user dashboard
8. **Chat** (`/chat`): Real-time community chat feature

### Page-by-Page Functionality

#### Home/Collection Page
- Displays a grid of cigarette products with images
- Includes filtering options (All/Format/Price/Sort)
- Shows 3,220 products in total
- Each product card displays:
  - Product image
  - Chinese and English names
  - Brand name
  - Region and English translation
  - Price (when available)
  - Favorite and "Mark as tried" buttons
- Pagination controls at bottom

#### Brands Page
- Organized by region: Mainland China (98 brands), HK/Macau/Taiwan (10), International (37), Historical (73)
- Each brand card shows:
  - Brand logo/image
  - Chinese and English names
  - Number of products in the brand
  - Pinyin representation
- Search functionality for brands

#### Individual Product (SKU) Page
- Large product image display
- Detailed product information:
  - Chinese and English names
  - Brand with company information
  - Description in both Chinese and English
  - Specifications table:
    - Tobacco type
    - Tar, nicotine, CO content
    - Length
    - Format (e.g., slim)
    - Count per box
    - Boxes per carton
  - Barcodes (box and carton)
  - Ratings section with Taste, Pack, Value, and Overall scores
- Interactive elements:
  - Favorite button
  - Mark as tried
  - Wishlist
- Comment section at bottom

#### Feed Page
- Shows chronological activity from community members
- Activities include:
  - Products tried
  - Favorites added
  - Wishlist additions
- Each activity shows user, action, product, and timestamp

#### Chat Feature
- Real-time chat accessible from most pages
- Shows online users count
- Displays recent conversations/messages
- Requires sign-in to participate

### Module Interactions and UI Design

#### Navigation
- Consistent top navigation bar across all pages
- Logo links back to home
- Section links: Collection, Brands, Community, Feed
- User profile link on right side when logged in

#### Visual Design
- Clean, minimalist interface with ample white space
- Product cards use consistent layout with prominent imagery
- Color scheme is neutral with accent colors for interactive elements
- Typography is clear and readable
- Responsive design adapts to different screen sizes
- Images are high-quality and consistently sized

#### Interactive Elements
- Hover effects on product cards
- Star icons for favorites
- Circle icons for "tried" status
- Diamond icons for wishlist
- Smooth transitions between states
- Real-time updates in chat

### Technical Implementation Insights (Frontend Perspective)

#### Architecture
- Single Page Application (SPA) built with React
- Routing handled by React Router
- State management likely uses React Context and/or Redux
- Data fetching probably uses React Query or SWR
- Component-based architecture with reusable UI elements

#### UI Framework
- Uses Tailwind CSS for styling
- Likely uses a component library similar to shadcn/ui
- Custom components for product displays, ratings, and interactive elements
- Responsive design implemented with mobile-first approach

#### Data Handling
- Product images served from internal API (`/api/img/products/`)
- Brand images from `/api/img/brands/`
- Dynamic content loaded via API calls
- User interactions (favorites, tried, wishlist) stored server-side
- Real-time chat functionality suggests WebSocket implementation

#### Performance Considerations
- Image optimization with appropriate sizing
- Lazy loading for product grids
- Efficient data fetching strategies
- Caching mechanisms for improved performance

#### Accessibility
- Semantic HTML structure
- Proper labeling of interactive elements
- Keyboard navigation support
- Screen reader compatibility

### Key Differentiators

1. **Comprehensive Database**: Extensive collection of Chinese cigarette brands and products
2. **Community Features**: Active user engagement through ratings, reviews, and chat
3. **Detailed Information**: Thorough specifications for each product
4. **Regional Organization**: Clear categorization by geographic origin
5. **Visual Appeal**: High-quality product imagery and clean interface
6. **Real-time Interaction**: Live chat and activity feeds

This analysis provides a foundation for replicating the functionality, design, and user experience of the ciggies.app website in the local project.