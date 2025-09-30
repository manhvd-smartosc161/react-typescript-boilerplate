# React Typescript Atomic Design Boilerplate

A modern React application boilerplate built with TypeScript, Material-UI, and following Atomic Design principles.

## 📋 Description

This is a frontend web application boilerplate designed following the Atomic Design pattern, providing a solid foundation for building scalable React applications with features like dashboard, user authentication, and settings management.

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
│   ├── apis/                # API layer - HTTP requests management
│   │   ├── api.ts          # Axios instance and base config
│   │   ├── auth.ts         # Authentication APIs
│   │   └── index.ts        # Export all APIs
│   │
│   ├── assets/              # Static assets (images, icons, fonts)
│   │   └── images/         # Images (logo, backgrounds, etc.)
│   │
│   ├── atoms/               # Atomic Design - Smallest components, cannot be broken down further
│   │   ├── Avatar/         # User avatar display component
│   │   ├── Button/         # Button component
│   │   ├── Card/           # Card component
│   │   ├── Icon/           # Icon component
│   │   ├── Image/          # Image component
│   │   ├── Text/           # Text component
│   │   ├── Title/          # Title component
│   │   └── index.ts        # Export all atoms
│   │
│   ├── molecules/           # Atomic Design - Combination of multiple atoms
│   │   ├── Breadcrumb/     # Breadcrumb navigation component
│   │   ├── StatCard/       # Statistics display component
│   │   ├── UserProfile/    # User information component
│   │   └── index.ts        # Export all molecules
│   │
│   ├── organisms/           # Atomic Design - Combination of multiple molecules and atoms
│   │   ├── ChartCard/      # Chart container card component
│   │   ├── DataTable/      # Data table component
│   │   ├── Header/         # Page header component
│   │   ├── Sidebar/        # Sidebar navigation component
│   │   ├── StatsGrid/      # Statistics grid display component
│   │   └── index.ts        # Export all organisms
│   │
│   ├── templates/           # Atomic Design - Layout templates
│   │   ├── AppLayout/      # General app layout
│   │   ├── DashboardTemplate/ # Template for dashboard pages
│   │   └── index.ts        # Export all templates
│   │
│   ├── pages/               # Page components - Application pages
│   │   ├── Home.tsx        # Home / Dashboard page
│   │   ├── Login.tsx       # Login page
│   │   ├── Settings.tsx    # Settings page
│   │   └── NotFound.tsx    # 404 page
│   │
│   ├── router/              # Routing configuration
│   │   ├── appRoutes.ts    # Route definitions
│   │   └── index.tsx       # Router component with route guards
│   │
│   ├── store/               # State management (Recoil)
│   │   ├── auth.ts         # Auth state atoms and selectors
│   │   └── index.ts        # Export all stores
│   │
│   ├── hooks/               # Custom React hooks
│   │   ├── useAuth.ts      # Authentication handling hook
│   │   ├── useLocalStorage.ts # localStorage interaction hook
│   │   ├── useDebounce.ts  # Input debounce hook
│   │   ├── useApiCache.ts  # API response cache hook
│   │   └── index.ts        # Export all hooks
│   │
│   ├── configs/             # Configuration files
│   │   └── index.ts        # App configurations (API URL, etc.)
│   │
│   ├── constants/           # Constants and enums
│   │   ├── route.ts        # Route constants
│   │   └── index.ts        # Other constants
│   │
│   ├── styles/              # Global styles and theme
│   │   ├── theme.ts        # MUI theme customization
│   │   ├── color.ts        # Color palette
│   │   └── index.ts        # Export styles
│   │
│   ├── types/               # TypeScript type definitions
│   │   └── menu.ts         # Menu types
│   │
│   ├── utils/               # Utility functions
│   │   └── cookie.ts       # Cookie utilities
│   │
│   ├── App.tsx             # Root App component
│   ├── App.css             # App styles
│   ├── index.tsx           # Entry point
│   └── index.css           # Global CSS
│
├── craco.config.ts          # CRACO configuration (webpack override)
├── tsconfig.json            # TypeScript configuration
├── package.json             # Dependencies and scripts
└── README.md               # Documentation (this file)
```

## 🎨 Atomic Design Pattern

This project follows the Atomic Design pattern for component organization:

1. **Atoms** (`src/atoms/`): Basic components (Button, Input, Text, Icon...)
2. **Molecules** (`src/molecules/`): Combination of atoms (SearchBar, UserCard...)
3. **Organisms** (`src/organisms/`): Complex UI parts (Header, Sidebar, Table...)
4. **Templates** (`src/templates/`): Layout structures
5. **Pages** (`src/pages/`): Complete pages

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

- Public routes: `/login`, `/404`
- Private routes: `/`, `/settings` (requires login)
- Route guards automatically redirect when not authenticated

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
