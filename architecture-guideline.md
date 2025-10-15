# **React Application Architecture Guideline: Lotus's Supplier Portal**

## **Table of Contents**

1. [Introduction & Guiding Principles](#1-introduction--guiding-principles)
2. [Visual Folder Structure Overview](#2-visual-folder-structure-overview)
3. [Component Architecture: Atomic Design](#3-component-architecture-atomic-design)
   - [General Rules for All Components](#general-rules-for-all-components)
   - [Atomic Level Rules & Responsibilities](#atomic-level-rules--responsibilities)
4. [State Management Strategy](#4-state-management-strategy)
5. [Data Fetching & API Layer](#5-data-fetching--api-layer)
6. [Forms & Validation](#6-forms--validation)
7. [Styling & Theming](#7-styling--theming)
8. [Error Handling](#8-error-handling)
9. [Domain-Driven Organization](#9-domain-driven-organization)
10. [Code Quality & Conventions](#10-code-quality--conventions)

---

## **1. Introduction & Guiding Principles**

Welcome to the Supplier Portal project. This document is the single source of truth for our front-end architecture. Its purpose is to ensure our codebase remains scalable, maintainable, and consistent. Adhering to these guidelines is essential for all contributors.

---

## **2. Visual Folder Structure Overview**

The `src` directory is organized by responsibility. Understand this map, and you'll know where to find and place any piece of code.

```
src/
├── api/           # Data Fetching Layer: Services that communicate with the backend.
├── assets/        # Static Files: Images, SVGs, and other non-code assets.
├── components/    # UI Layer: All reusable React components, organized by Atomic Design.
│   ├── atoms/     # - Indivisible UI elements (Button, Input).
│   ├── molecules/ # - Groups of atoms forming functional units (FormField).
│   ├── organisms/ # - Complex, distinct UI sections (LoginForm, Sidebar).
│   ├── layouts/   # - The application's main structural chrome (MainLayout).
│   └── templates/ # - The structural skeletons for specific pages (DashboardTemplate).
├── config/        # App Configuration: Theme definitions (MUI), color palettes.
├── constants/     # Static Data: Application-wide, non-changing values.
├── errors/        # Error Handling: Custom error classes and global handlers.
├── hooks/         # Business Logic Layer: Reusable React hooks.
├── i18n/          # Internationalization: Configuration for i18next.
├── libs/          # Library Setup: Third-party library configuration (React Query client).
├── mock/          # Mock Data: Used for development and testing.
├── pages/         # Presentation Layer: Routed page components.
├── routes/        # Routing: Route definitions, guards (Private/Public), and setup.
├── schemas/       # Validation: Form validation schemas (Yup).
├── stores/        # Global State: Recoil atoms for global UI state.
├── types/         # Type Definitions: Global TypeScript types and interfaces.
├── utils/         # Utility Functions: Pure, reusable helper functions.
├── App.tsx        # Application Root: Context providers and router entry point.
└── index.tsx      # Entry Point: Renders the React application.
```

---

## **3. Component Architecture: Atomic Design**

Our `src/components` directory is strictly organized by the Atomic Design methodology. This creates a clear hierarchy of responsibilities, promotes reusability, and isolates complexity. Adherence to these rules is mandatory.

### **General Rules for All Components**

- **File Structure:** Every component **must** reside in its own folder, named in `PascalCase`. The internal structure should be:
  - `index.tsx`: Contains the React component logic.
  - `index.styled.ts`: Contains all styled-components for the component.
  - `types.ts` (optional): For complex prop types specific to this component.
- **Separation of Concerns:** A component's primary responsibility is to render UI based on props. **Components must not contain direct API calls, complex business logic, or validation schema definitions.** This logic belongs in hooks, services, and schema files, respectively.

---

### **Atomic Level Rules & Responsibilities**

- **1. Atoms (`/atoms`)**
  - **Purpose:** The fundamental, indivisible building blocks of our UI. They are the tangible implementation of our design system's smallest parts.
  - **Examples:** `Button`, `Input`, `Icon`, `Heading`, `Checkbox`.
  - **Key Rules:**
    1.  **No External Context:** An Atom **must not** have margins or specific positioning (`position: absolute`). It must be self-contained and unaware of where it is being used. Spacing should be applied by the parent component (Molecule or Organism).
    2.  **No Composition of Other Atoms:** An Atom is the lowest level. It **must not** be built by combining other Atoms from our library. It may, however, wrap a base MUI component (e.g., our `Button` atom styles and configures MUI's `<MuiButton>`).
    3.  **Stateless Logic:** Atoms should be "dumb" components. They can have minimal internal state related to UI interaction (e.g., `hover` or `focus` states), but they **must not** contain business logic. All data and callbacks are passed in via props.

- **2. Molecules (`/molecules`)**
  - **Purpose:** Simple, functional groups of Atoms that work together to perform a single, discrete action.
  - **Examples:** `ControlledTextField` (combining `Label`, `Input`, `ErrorText` atoms), `SearchBar` (`Input` + `Button`).
  - **Key Rules:**
    1.  **Compose Atoms:** A Molecule's primary role is to compose two or more Atoms into a functional unit.
    2.  **Single, Specific Purpose:** A Molecule should do one thing well. A `ControlledTextField` handles one form input. A `SearchBar` handles search input. If a Molecule starts managing multiple distinct responsibilities, it should be refactored into an Organism.
    3.  **Limited Business Logic:** Molecules remain highly reusable and generally "dumb." They can contain UI-specific logic (like connecting to `react-hook-form`'s `Controller`), but they **must not** contain application-level business logic. They are controlled by props from a parent.

- **3. Organisms (`/organisms`)**
  - **Purpose:** Complex, distinct sections of the UI that serve a specific business purpose. They are the first level where the component begins to feel like a complete, standalone feature.
  - **Examples:** `LoginForm`, `MultiStepForm`, `Sidebar`, `DataTable`.
  - **Key Rules:**
    1.  **Sectional Responsibility:** Organisms represent a whole section of the UI. They are composed of Molecules and/or Atoms to create a functional piece of the interface.
    2.  **Can Manage State:** Organisms are permitted to manage their own complex local state. For example, a `DataTable` can manage its internal state for sorting, filtering, and pagination.
    3.  **Data is Passed In:** An Organism **must not fetch its own data**. To remain reusable, it must receive all data and mutation functions as props from a Page. This allows the same `DataTable` organism to be used for displaying "Suppliers" on one page and "Users" on another.

- **4. Layouts (`/layouts`)**
  - **Purpose:** Define the persistent structure of the application's interface, often referred to as the "chrome" (e.g., header, sidebar, main content area).
  - **Examples:** `MainLayout` (for authenticated users), `AuthLayout` (for login/signup pages).
  - **Key Rules:**
    1.  **Structural Only:** Layouts are purely for structure and **must not** contain any page-specific business logic.
    2.  **Renders `children`:** A Layout's primary job is to correctly place its `children` prop, which will be the Page component rendered by the router.

- **5. Templates (`/templates`)**
  - **Purpose:** The internal skeleton of a page's content area. They arrange Organisms into a specific page structure, acting as a blueprint.
  - **Examples:** `DashboardTemplate`, `RegistrationTemplate`.
  - **Key Rules:**
    1.  **The Blueprint for Pages:** A Template defines _where_ content goes, but it doesn't know _what_ that content is. It provides slots for Organisms.
    2.  **Strictly Prop-Driven:** Templates are the "dumbest" of all complex components. They **must not** contain any logic or state. They receive all their content (usually Organisms) via props.
    3.  **No Data Connection:** A Template **must not** have any connection to data sources (no hooks calling APIs, no connection to state stores).

- **6. Pages (`/pages`)**
  - **Purpose:** The final, concrete instances of a view. This is where the UI is connected to the application's data and business logic.
  - **Key Rules:**
    1.  **The Connection Point:** Pages are the primary layer for calling React Query hooks (`useQuery`, `useMutation`) to fetch and manipulate data. They connect to global state stores (`Recoil`) and handle routing parameters.
    2.  **Composition Hub:** A Page's main responsibility is to compose a `Template` and pass in the necessary `Organisms` and `Molecules` to fill its placeholders, providing them with the fetched data and callbacks.
    3.  **Minimal Markup:** A Page component itself should have very little JSX. Its code should primarily consist of hooks and passing props down to the Template and Organisms it orchestrates.

---

## **4. State Management Strategy**

We use a three-tiered approach to state. **Always use the simplest tool for the job.**

1.  **Local State (`useState`, `useReducer`)**
    - **Use For:** State confined to a single component (e.g., modal visibility, input values).
    - **Rule:** **This is your default.** Do not lift state up unless absolutely necessary.

2.  **Server Cache State (`@tanstack/react-query`)**
    - **Use For:** **All data that comes from the API.** This includes fetching, caching, mutations (Create/Update/Delete), re-fetching, and error handling.
    - **Rule:** **This is the single source of truth for server state.** Never store server data in Recoil or local state. All React Query logic is initiated within custom hooks in `src/hooks`.

3.  **Global UI State (`recoil`)**
    - **Use For:** Global state that is _not_ server data and is shared across the entire application.
    - **Examples:** Authentication status, current user object, UI theme, global notifications.
    - **Rule:** All Recoil atoms must be defined in the `src/stores/` directory.

---

## **5. Data Fetching & API Layer**

All communication with the backend must follow this strict pattern to ensure separation of concerns.

1.  **API Services (`src/api/services/`)**: The lowest level. Functions here use `axios` to make HTTP requests and handle response/error transformation. They know _what_ endpoint to call.
2.  **React Query Hooks (`src/hooks/`)**: The middle layer. Custom hooks (e.g., `useLoginMutation`, `useCurrentUser`) use `useQuery` or `useMutation` from React Query to call the API services. They know _when_ and _how_ to fetch or mutate data.
3.  **Pages & Components (`src/pages/`, `src/components/organisms/`)**: The top level. These components call the custom hooks to get data or trigger actions. They **must never** import `axios` or API services directly.

**Correct Flow:** `Page` → calls `useLoginMutation()` → which uses `useMutation(authService.login)` → which calls the `axios` request.

---

## **6. Forms & Validation**

- **Form Management:** All forms must use `react-hook-form`.
- **Validation:** All validation logic must use `yup`.
- **Decoupled Schemas:** Validation schemas **must** be defined in the `src/schemas/` directory, completely separate from the UI components.
- **Controlled Components:** Use the pre-built `Controlled...Field` molecules (e.g., `ControlledTextField`) to ensure consistent integration with `react-hook-form`.

---

## **7. Styling & Theming**

- **Styling Solution:** We use **Styled Components**. All styling logic for a component must reside in its `index.styled.ts` file.
- **Naming Convention:** All styled-component variables **must** be prefixed with `Styled` (e.g., `StyledContainer`, `StyledButton`).
- **Theme is Law:** **Never use hard-coded values** for colors, fonts, spacing, or breakpoints. Always import and use values from our MUI theme, defined in `src/config/theme.ts`.
  - **Bad:** `color: '#FFF'; margin-top: 16px;`
  - **Good:** `color: theme.palette.common.white; margin-top: theme.spacing(2);`

---

## **8. Error Handling**

Effective error handling is crucial for providing a good user experience and maintaining application stability. We follow a centralized approach to error management across all layers of the application.

### **Error Classification**

- **Network Errors**: Connection failures, timeouts, server unavailable
- **Validation Errors**: Invalid user input, business rule violations
- **Authentication Errors**: Session expired, unauthorized access
- **Server Errors**: 5xx HTTP status codes, unexpected server responses
- **Client Errors**: Programming errors, missing dependencies

### **Error Handling Strategy**

1. **API Layer (`src/api/`)**: Transform HTTP errors into application-specific error types
2. **Service Layer (`src/api/services/`)**: Handle response errors and throw custom error objects
3. **Hook Layer (`src/hooks/`)**: Use React Query's built-in error handling for API calls
4. **Component Layer**: Display user-friendly error messages using error boundaries and toast notifications
5. **Global Error Boundary**: Catch unhandled errors and display fallback UI

### **Error Components**

- **ErrorBoundary**: Catches JavaScript errors anywhere in the child component tree
- **Error Messages**: User-friendly error displays in forms and pages
- **Toast Notifications**: Non-intrusive error feedback for actions

### **Best Practices**

- **User-Friendly Messages**: Never expose technical error details to users
- **Graceful Degradation**: Application continues to function when non-critical errors occur
- **Error Logging**: All errors should be logged for debugging and monitoring
- **Recovery Options**: Provide clear paths for users to recover from errors

---

## **9. Domain-Driven Organization**

To keep the codebase organized as it grows, we group related logic by **business domain** (e.g., `Supplier`, `Auth`). When adding a new feature, you must create corresponding files or folders:

- **Hooks:** `src/hooks/supplier/`
- **Types:** `src/types/supplier.ts`
- **API Services:** `src/api/services/supplierService.ts`
- **Validation Schemas:** `src/schemas/supplierSchema.ts`
- **i18n:** `public/locales/[lang]/supplier.json`

This parallel structure ensures that all code for a feature is logically grouped and discoverable.

## **10. Code Quality & Conventions**

- **Path Aliases:** Always use the defined path aliases (`@components`, `@hooks`, etc.) for imports outside of the current module. This improves readability and maintainability.
- **Barrel Files:** Use the `index.ts` barrel files to simplify imports from directories. For example, `import { Button, Input } from '@components/atoms';`.
- **Linting & Formatting:** `ESLint` and `Prettier` are configured to enforce code style. Code that does not pass the linting checks will fail the build. Format your code before committing.
- **Testing (Proposed Strategy):**
  - **Unit Tests:** For pure logic in `/utils`, `/schemas`, and simple `/hooks`.
  - **Component Tests:** Using `React Testing Library` for all `atoms` and `molecules` to test rendering and user interaction.
  - **Integration Tests:** For complex `organisms` and `pages` to ensure different parts of the application work together correctly.
