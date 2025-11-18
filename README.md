# Listings Manager

A modern React application for managing product listings with search, filtering, sorting, and pagination capabilities.

## Prerequisites

- Node.js v22.x (repo ships with `.nvmrc`, run `nvm use`)
- npm or yarn

## Getting Started

```bash
# Use the correct Node.js version
nvm use

# Install dependencies
npm install
# or
yarn install

# One-time setup for MSW (if not already done)
npx msw init public --save

# Start development server
npm run dev
# or
yarn dev
```

Open `http://localhost:5173` in your browser.

**Note:** Navigating directly to `/products?...` in the address bar will return the SPA's HTML. Use DevTools → Network → Fetch/XHR (or `fetch('/products')` in the console) to view the mocked JSON responses.

## Project Structure

```
src
   components/          # Reusable UI components
    Toolbar.tsx     # Search, filter, and sort controls
     ProductCard.tsx # Product card component
     Pagination.tsx  # Pagination controls
    ─ Loader.tsx      # Loading spinner
  ├── pages/              # Page components
  │   ├── ProductsPage.tsx      # Main product listing page
  │   └── ProductDetailsPage.tsx # Product detail view
  ├── hooks/              # Custom React hooks
  │   └── useProducts.ts # Products data fetching hook
  ├── mocks/              # MSW mock server
  │   ├── handlers.ts     # API request handlers
  │   ├── browser.ts      # Browser worker setup
  │   ├── server.ts       # Node server setup (for tests)
  │   └── data/
  │       └── products.json # Seed data
  └── App.tsx             # Main app component with routing
```

## Features

###  Core Requirements

- **Product List**: Paginated list displaying name, price, category, and stock status
- **Sorting**: Sort by name (A-Z, Z-A) and price (Low-High, High-Low)
- **Product Details**: Separate route (`/products/:id`) for detailed product view
- **Search**: Real-time search by product name
- **Category Filter**: Filter products by category (dynamically generated from available products)
- **States**: Comprehensive handling of loading, empty, and error states
- **Accessibility**: Full keyboard navigation, ARIA labels, semantic HTML, and focus management

## UI/UX Highlights

- **Modern Design**: Clean, professional interface with gradient backgrounds and smooth animations
- **Responsive**: Mobile-first design that works seamlessly on all screen sizes
- **Interactive**: Hover effects, smooth transitions, and visual feedback
- **Visual Indicators**: Animated stock status indicators (green for in-stock, red for out-of-stock)
- **Indian Currency**: All prices displayed in ₹ (INR) with proper formatting

## API (Mocked with MSW)

The mock server provides these endpoints:

- `GET /products?query=&category=&page=1&limit=10` - Get paginated products with filtering
- `GET /products/:id` - Get single product details

Seed data is in `src/mocks/data/products.json`. You can adjust mock behavior in `src/mocks/handlers.ts`.

## Testing

Run tests with:

```bash
npm test
# or
yarn test
```

The test suite includes:
- Product list loading and rendering
- Search functionality
- Filter interactions

## Design Decisions

### Toolbar Design

The toolbar was designed from scratch as a horizontal form with three controls:
- **Search Input**: Real-time text search with `type="search"` for native browser features
- **Category Dropdown**: Dynamically populated from available product categories
- **Sort Dropdown**: Four sorting options (name/price × asc/desc)

**Rationale**: This layout provides clear visual hierarchy, works well on mobile (stacks vertically), and maintains accessibility with proper labels and keyboard navigation.

### State Management

- **Local State**: Used React `useState` for UI state (query, category, sort, page)
- **Custom Hook**: `useProducts` encapsulates all data fetching logic with proper error handling and loading states
- **URL State**: Considered but not implemented - would be valuable for shareable links

### Component Architecture

- **Separation of Concerns**: Each component has a single responsibility
- **Reusability**: Components like `Loader`, `Pagination`, and `ProductCard` are fully reusable
- **Type Safety**: Comprehensive TypeScript types throughout

### Accessibility

- **Semantic HTML**: Proper use of `<nav>`, `<article>`, `<form>`, and heading hierarchy
- **ARIA Labels**: All interactive elements have descriptive labels
- **Keyboard Navigation**: Full keyboard support with visible focus indicators
- **Screen Readers**: `aria-live` regions for dynamic content updates

## Trade-offs

### What We Chose

1. **No URL State**: Search/filter state is not synced with URL for simplicity, but this means users can't bookmark filtered views
2. **Client-Side Filtering**: All filtering happens client-side via MSW, which works well for the mock but would need server-side implementation for production
3. **Simple Pagination**: Previous/Next buttons only (no page numbers) to keep UI clean and mobile-friendly
4. **No Debouncing**: Search updates immediately - could add debouncing for better performance with large datasets

### What We'd Add With More Time

1. **URL State Management**: Sync filters/search with URL query params for shareable links
2. **Advanced Pagination**: Page number buttons, jump to page, items per page selector
3. **Debounced Search**: Delay API calls while user is typing
4. **Product Images**: Add image support to product cards
5. **Bulk Actions**: Select multiple products for batch operations
6. **Export Functionality**: Export filtered results to CSV/JSON
7. **More Tests**: 
   - Category filter tests
   - Sorting tests
   - Pagination tests
   - Error state tests
   - Accessibility tests with jest-axe
8. **Performance Optimizations**:
   - Virtual scrolling for large lists
   - React.memo for expensive components
   - Code splitting for routes
9. **Enhanced UX**:
   - Toast notifications for actions
   - Skeleton loaders instead of spinner
   - Optimistic UI updates
   - Keyboard shortcuts (e.g., `/` to focus search)
10. **Production Readiness**:
    - Error boundary components
    - Analytics integration
    - Performance monitoring
    - SEO optimization (meta tags, structured data)

## Technology Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **MSW** - API mocking for development and testing
- **Vitest** - Testing framework
- **Testing Library** - Component testing utilities

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run test` - Run tests
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## License

MIT
"# Frontend_Task" 
