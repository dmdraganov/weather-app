# Project Overview

This is a modern React weather application built with Vite and TypeScript. It allows users to view current weather, forecasts, and manage a list of locations.

## Key Technologies

- **Framework:** [React](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Sass](https://sass-lang.com/) (using SCSS modules)
- **State Management:**
  - **Server State:** [`@tanstack/react-query`](https://tanstack.com/query/latest) for caching API data.
  - **Client State:** [`zustand`](https://github.com/pmndrs/zustand) for global state management (e.g., locations).
  - **Context:** React Context API for theming and providing weather data to components.
- **Routing:** [`react-router-dom`](https://reactrouter.com/)
- **Linting:** [ESLint](https://eslint.org/)
- **Formatting:** [Prettier](https://prettier.io/)

## Project Structure

The project follows a modular architecture, separating concerns into features and shared utilities.

- `src/app`: Core application setup, including the main entry point (`main.tsx`), router configuration (`router.tsx`), and global providers (`providers/`).
- `src/modules`: Contains distinct feature modules like `weather`, `location`, and `settings`. Each module is self-contained with its own API logic, components, hooks, and state.
- `src/pages`: Top-level components for each route, which compose widgets and components from the `modules`.
- `src/shared`: Reusable code shared across the application, such as UI components, API request logic, hooks, and utility functions.

## Building and Running

### Prerequisites

- [Node.js](https://nodejs.org/) (version specified in `.nvmrc` if available, otherwise latest LTS)
- [npm](https://www.npmjs.com/)

### Environment Variables

The application requires an API key from [WeatherAPI](https://www.weatherapi.com/).

1.  Create a `.env` file in the root of the project by copying the example file:
    ```bash
    cp .env.example .env
    ```
2.  Add your WeatherAPI key to the `.env` file:
    ```
    VITE_WEATHER_API_KEY=your_api_key_here
    ```

### Available Scripts

- **`npm run dev`**: Starts the development server with Hot Module Replacement (HMR).
- **`npm run build`**: Compiles and bundles the application for production.
- **`npm run preview`**: Serves the production build locally for previewing.
- **`npm run lint`**: Runs ESLint to identify and fix code quality issues.
- **`npm run format`**: Formats all files using Prettier.
- **`npm run check-format`**: Checks for formatting errors without modifying files.

## Development Conventions

- **Styling:** Use SCSS modules for component-scoped styles. Global styles are defined in `src/app/styles`.
- **State Management:** Use `@tanstack/react-query` for all data fetching and caching. Use `zustand` for managing global UI state.
- **Commits:** Follow conventional commit standards.
- **API:** All API interactions should go through the `src/shared/api` helpers. The `buildApiUrl` utility should be used to construct API endpoints.
