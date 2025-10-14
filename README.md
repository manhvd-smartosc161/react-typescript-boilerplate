# React TypeScript Supplier Portal App

A modern React application built with TypeScript, Material-UI, and following Atomic Design principles for supplier management portal.

## 📋 Description

This is a frontend web application designed following the Atomic Design pattern, providing a comprehensive supplier portal system with features like dashboard, user authentication, data visualization, settings management, and supplier registration.

## 🛠️ Technologies Used

- **React 18.3.1** - UI Library
- **TypeScript 5.3.3** - Type Safety
- **Vite 5.0.12** - Build Tool & Dev Server
- **Material-UI (MUI) 7.3** - Component Library
- **React Router 6.30** - Routing
- **Recoil 0.7.7** - State Management
- **TanStack Query 5.90.2** - Data Fetching & Caching
- **Axios** - HTTP Client
- **Highcharts** - Data Visualization
- **Styled Components** - CSS-in-JS
- **React Hook Form** - Form Management
- **Yup** - Form Validation
- **i18next** - Internationalization
- **React Toastify** - Notifications
- **Docker** - Containerization
- **Nginx** - Web Server

## 📁 Project Structure

```
supplier-portal/
├── dist/                     # Production build directory (Vite output)
├── public/                   # Public static files
├── src/                      # Main source code
│   ├── api/                  # API layer - HTTP requests management
│   ├── assets/              # Static assets (images, icons, fonts)
│   ├── components/          # Atomic Design Components
│   │   ├── atoms/           # Basic UI components (Button, Input, Text...)
│   │   ├── molecules/       # Combination of atoms (SearchBar, UserCard...)
│   │   ├── organisms/       # Complex UI parts (Header, Sidebar, Table...)
│   │   ├── layouts/         # Layout components (AuthLayout, MainLayout...)
│   │   └── templates/       # Page templates (DashboardTemplate, FormTemplate...)
│   ├── pages/               # Application pages
│   ├── routes/              # Routing configuration and route guards
│   ├── stores/               # State management (Recoil atoms and selectors)
│   ├── hooks/               # Custom React hooks
│   ├── config/              # Configuration files (theme, colors)
│   ├── constants/           # Application constants
│   ├── types/               # TypeScript type definitions
│   ├── errors/              # Error handling utilities
│   ├── utils/               # Utility functions
│   ├── mock/                # Mock data for development
│   ├── schemas/             # Form validation schemas
│   ├── libs/                 # Library configurations
│   ├── fonts/               # Custom fonts
│   ├── locales/             # Internationalization files
│   ├── i18n/                # i18n configuration
│   ├── App.tsx              # Root App component
│   ├── App.css              # App styles
│   ├── index.tsx            # Entry point
│   ├── index.css            # Global CSS
│   └── vite-env.d.ts        # Vite environment types
├── docker-compose.yml       # Docker Compose configuration
├── Dockerfile               # Docker configuration
├── nginx.conf               # Nginx configuration
├── vite.config.ts           # Vite configuration
├── tsconfig.json            # TypeScript configuration
├── package.json             # Dependencies and scripts
├── pnpm-lock.yaml          # pnpm lock file
└── README.md                # Documentation (this file)
```

## 🎨 Atomic Design Pattern

This project follows the Atomic Design pattern for component organization:

1. **Atoms** (`src/components/atoms/`): Basic components (Button, Input, Text, Icon...)
2. **Molecules** (`src/components/molecules/`): Combination of atoms (SearchBar, UserCard...)
3. **Organisms** (`src/components/organisms/`): Complex UI parts (Header, Sidebar, Table...)
4. **Layouts** (`src/components/layouts/`): Layout structures (AuthLayout, MainLayout...)
5. **Templates** (`src/components/templates/`): Page templates (DashboardTemplate, FormTemplate...)
6. **Pages** (`src/pages/`): Complete pages

## 🎨 Styled Components Pattern

All styled components follow a consistent naming pattern:

- **Styled** prefix for all styled components (e.g., `StyledButton`, `StyledCard`)
- Organized in separate `.styled.ts` files
- Consistent import/export patterns

## 🚀 Installation and Running

### Requirements

- Node.js >= 18.x
- pnpm (recommended) or npm/yarn
- Docker (for containerized deployment)

### Install dependencies

```bash
pnpm install
```

### Run development server

```bash
pnpm dev
# or
pnpm start
```

Application will run at: `http://localhost:3000`

### Build production

```bash
pnpm run build
```

Build will be created in the `dist/` directory

### Preview production build locally

```bash
pnpm run preview
```

### Run production build locally

```bash
pnpm run start:prod
```

### Lint code

```bash
pnpm run lint
```

## 🐳 Docker Deployment

### Build Docker image

```bash
docker build -t supplier-portal .
```

### Run with Docker Compose

```bash
docker-compose up -d
```

### Environment Variables

Create `.env` file in root directory:

```env
REACT_APP_API_URL=your_api_url_here
PORT=3000
```

## 🔐 Authentication

The application has an authentication system with:

- **Mock Authentication**: Currently uses mock authentication for demo purposes
- **API Ready**: `authService.ts` is prepared for real API integration
- **Route Guards**: Automatic redirect when not authenticated
- **State Management**: Recoil for global auth state
- **Public Routes**: `/login`, `/404`
- **Private Routes**: `/`, `/settings` (requires login)

## 📊 Features

- **Dashboard**: Statistics cards, charts, and data tables
- **Supplier Management**: View, add, edit, delete suppliers
- **Registration System**: Supplier registration and onboarding
- **Data Visualization**: Highcharts integration for charts
- **Responsive Design**: Mobile-first approach with MUI
- **State Management**: Recoil for global state
- **Data Fetching**: TanStack Query for server state management
- **Form Management**: React Hook Form with Yup validation
- **Internationalization**: Multi-language support (EN/TH)
- **Type Safety**: Full TypeScript support
- **Component Library**: Reusable atomic components
- **Docker Support**: Containerized deployment
- **Performance**: Vite for fast development and optimized builds

## 📦 Available Scripts

| Script            | Description                          |
| ----------------- | ------------------------------------ |
| `pnpm dev`        | Run development server (Vite)        |
| `pnpm start`      | Run development server               |
| `pnpm build`      | Build production                     |
| `pnpm build:prod` | Build production without source maps |
| `pnpm preview`    | Preview production build locally     |
| `pnpm start:prod` | Run production build locally         |
| `pnpm preload`    | Build and run production locally     |
| `pnpm lint`       | Lint TypeScript files                |

## 🌐 Environment Variables

Create `.env` file in root directory:

```env
REACT_APP_API_URL=your_api_url_here
PORT=3000
```

## 📝 Code Style

Project uses:

- **ESLint** with Airbnb config
- **Prettier** for code formatting
- **TypeScript** for type safety
- **Atomic Design** for component organization
- **Styled Components** with consistent naming
- **Path Aliases** for clean imports (@src, @components, etc.)

## 🔧 Development Notes

- All styled components use the `Styled` prefix pattern
- Components are organized following Atomic Design principles
- API services are ready for backend integration
- Mock data is available for development
- Responsive design with Material-UI breakpoints
- Vite provides fast HMR and optimized builds
- Docker support for easy deployment
- Multi-language support with i18next
- Form validation with React Hook Form + Yup
- Server state management with TanStack Query

## 🚀 Performance Features

- **Vite**: Fast development server and optimized production builds
- **Code Splitting**: Automatic chunk splitting for better performance
- **Tree Shaking**: Unused code elimination
- **Gzip Compression**: Nginx configuration for compressed assets
- **Asset Caching**: Optimized cache headers for static assets
- **Bundle Analysis**: Built-in bundle size monitoring
