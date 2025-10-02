# React TypeScript Employee Management App

A modern React application built with TypeScript, Material-UI, and following Atomic Design principles for employee management.

## 📋 Description

This is a frontend web application designed following the Atomic Design pattern, providing a comprehensive employee management system with features like dashboard, user authentication, data visualization, and settings management.

## 🛠️ Technologies Used

- **React 18.3.1** - UI Library
- **TypeScript 4.4.2** - Type Safety
- **Material-UI (MUI) 7.3** - Component Library
- **React Router 6.30** - Routing
- **Recoil 0.7.7** - State Management
- **Axios** - HTTP Client
- **Highcharts** - Data Visualization
- **Styled Components** - CSS-in-JS
- **CRACO** - Create React App Configuration Override
- **React Toastify** - Notifications

## 📁 Project Structure

```
fe-employee-app/
├── build/                    # Production build directory (created after build)
│   ├── static/              # Optimized static assets
│   └── index.html           # Entry HTML file
│
├── public/                   # Public static files directory
│   ├── index.html           # HTML template
│   ├── favicon.ico          # Website icon
│   └── manifest.json        # PWA manifest
│
├── src/                      # Main source code
│   │
│   ├── api/                  # API layer - HTTP requests management
│   │   ├── index.ts         # Axios instance and base config
│   │   ├── ApiError.ts      # API error handling
│   │   └── services/        # API service modules
│   │       └── authService.ts # Authentication API services
│   │
│   ├── assets/              # Static assets (images, icons, fonts)
│   │   └── images/         # Images (logo, backgrounds, etc.)
│   │
│   ├── components/          # Atomic Design Components
│   │   │
│   │   ├── atoms/           # Atomic Design - Smallest components
│   │   │   ├── Avatar/      # User avatar display component
│   │   │   ├── Button/      # Button component
│   │   │   ├── Card/        # Card component
│   │   │   ├── Icon/        # Icon component
│   │   │   ├── Image/       # Image component
│   │   │   ├── Loading/      # Loading spinner component
│   │   │   ├── Text/        # Text component
│   │   │   ├── Title/       # Title component
│   │   │   └── index.ts     # Export all atoms
│   │   │
│   │   ├── molecules/       # Atomic Design - Combination of multiple atoms
│   │   │   ├── Breadcrumb/  # Breadcrumb navigation component
│   │   │   ├── StatCard/    # Statistics display component
│   │   │   ├── UserProfile/ # User information component
│   │   │   └── index.ts     # Export all molecules
│   │   │
│   │   ├── organisms/       # Atomic Design - Complex UI parts
│   │   │   ├── ChartCard/   # Chart container card component
│   │   │   ├── DataTable/   # Data table component
│   │   │   ├── Header/      # Page header component
│   │   │   ├── Sidebar/     # Sidebar navigation component
│   │   │   ├── StatsGrid/   # Statistics grid display component
│   │   │   └── index.ts     # Export all organisms
│   │   │
│   │   ├── layouts/         # Layout components
│   │   │   ├── AuthLayout/  # Authentication layout
│   │   │   ├── MainLayout/  # Main application layout
│   │   │   ├── LayoutWrapper/ # Layout wrapper component
│   │   │   └── index.ts     # Export all layouts
│   │   │
│   │   ├── templates/       # Atomic Design - Layout templates
│   │   │   ├── DashboardTemplate/ # Template for dashboard pages
│   │   │   ├── FormTemplate/      # Template for form pages
│   │   │   ├── PageTemplate/      # General page template
│   │   │   └── index.ts           # Export all templates
│   │   │
│   │   └── index.ts         # Export all components
│   │
│   ├── pages/               # Page components - Application pages
│   │   ├── Home/           # Home / Dashboard page
│   │   ├── Login/          # Login page
│   │   ├── Error/          # 404 error page
│   │   ├── System/         # System settings page
│   │   └── index.tsx       # Export all pages
│   │
│   ├── routes/              # Routing configuration
│   │   ├── appRoutes.ts     # Route definitions
│   │   ├── route.ts         # Route types
│   │   └── index.tsx        # Router component with route guards
│   │
│   ├── store/               # State management (Recoil)
│   │   ├── auth.ts          # Auth state atoms and selectors
│   │   └── index.ts         # Export all stores
│   │
│   ├── hooks/               # Custom React hooks
│   │   ├── useDebounce.ts   # Input debounce hook
│   │   ├── useLocalStorage.ts # localStorage interaction hook
│   │   └── index.ts         # Export all hooks
│   │
│   ├── config/              # Configuration files
│   │   ├── color.ts         # Color palette configuration
│   │   ├── theme.ts         # MUI theme customization
│   │   └── index.ts         # Export configurations
│   │
│   ├── types/               # TypeScript type definitions
│   │   ├── api.ts           # API response types
│   │   ├── user.ts          # User-related types
│   │   └── index.ts         # Export all types
│   │
│   ├── utils/               # Utility functions
│   │   ├── cookie.ts        # Cookie utilities
│   │   └── errorMessage.ts  # Error message utilities
│   │
│   ├── mock/                # Mock data for development
│   │   └── data.ts          # Mock data definitions
│   │
│   ├── fonts/               # Custom fonts
│   │   └── Vbee.woff        # Custom font file
│   │
│   ├── App.tsx              # Root App component
│   ├── App.css              # App styles
│   ├── index.tsx            # Entry point
│   ├── index.css            # Global CSS
│   └── react-app-env.d.ts   # React app environment types
│
├── craco.config.ts          # CRACO configuration (webpack override)
├── tsconfig.json            # TypeScript configuration
├── package.json             # Dependencies and scripts
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

- Node.js >= 16.x
- pnpm (or npm/yarn)

### Install dependencies

```bash
pnpm install
```

### Run development server

```bash
pnpm start
```

Application will run at: `http://localhost:3000`

### Build production

```bash
pnpm run build
```

Build will be created in the `build/` directory

### Build production (no source maps)

```bash
pnpm run build:prod
```

### Run production build locally

```bash
pnpm run start:prod
```

### Analyze bundle size

```bash
pnpm run analyze
```

### Lint code

```bash
pnpm run lint
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
- **Employee Management**: View, add, edit, delete employees
- **Data Visualization**: Highcharts integration for charts
- **Responsive Design**: Mobile-first approach with MUI
- **State Management**: Recoil for global state
- **Type Safety**: Full TypeScript support
- **Component Library**: Reusable atomic components

## 📦 Available Scripts

| Script            | Description                          |
| ----------------- | ------------------------------------ |
| `pnpm start`      | Run development server               |
| `pnpm build`      | Build production                     |
| `pnpm build:prod` | Build production without source maps |
| `pnpm start:prod` | Run production build locally         |
| `pnpm test`       | Run tests                            |
| `pnpm lint`       | Lint TypeScript files                |
| `pnpm analyze`    | Analyze bundle size                  |

## 🌐 Environment Variables

Create `.env` file in root directory:

```env
REACT_APP_API_URL=your_api_url_here
```

## 📝 Code Style

Project uses:

- **ESLint** with Airbnb config
- **Prettier** for code formatting
- **TypeScript** for type safety
- **Atomic Design** for component organization
- **Styled Components** with consistent naming

## 🔧 Development Notes

- All styled components use the `Styled` prefix pattern
- Components are organized following Atomic Design principles
- API services are ready for backend integration
- Mock data is available for development
- Responsive design with Material-UI breakpoints
