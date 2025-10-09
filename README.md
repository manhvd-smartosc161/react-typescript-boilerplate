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
├── build/                    # Production build directory
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
│   ├── App.tsx              # Root App component
│   ├── App.css              # App styles
│   ├── index.tsx            # Entry point
│   ├── index.css            # Global CSS
│   └── react-app-env.d.ts   # React app environment types
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
