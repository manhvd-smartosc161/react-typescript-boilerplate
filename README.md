# Supplier Portal App

A modern React application built with TypeScript, Material-UI, and following Atomic Design principles for supplier management portal.

## 📚 Documentation

- [Architecture Guidelines](./architecture-guideline.md) - Project architecture and design patterns
- [Git Flow](./git-flow.md) - Git workflow and branching strategy

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
pnpm build
```

Build will be created in the `dist/` directory

### Preview production build locally

```bash
pnpm preview
```

### Run production build locally

```bash
pnpm start:prod
```

### Build and run production locally

```bash
pnpm preload
```

### Lint code

```bash
pnpm lint
```

## 🌐 Environment Variables

Create `.env` file in root directory:

```env
VITE_API_URL=your_api_url_here
PORT=3000
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
