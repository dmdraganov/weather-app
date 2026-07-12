# React Weather App

This is a modern weather application built with a React frontend and a Node.js (Express) backend. It provides current weather information, multi-day forecasts, and allows users to search for and manage locations.

## Features

- **Current & Forecast Weather:** View real-time weather conditions and a 7-day forecast for any location.
- **Location Search:** Search for cities and locations worldwide.
- **Geolocation:** Automatically detect and show weather for your current location.
- **Theme Switching:** Toggle between light and dark modes.
- **Localization:** Supports multiple languages (English and Russian).
- **Favorite & Recent Locations:** Quickly access your saved and recently viewed locations.

## Tech Stack

### Frontend

- **Framework:** [React](https://react.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Sass (SCSS Modules)](https://sass-lang.com/)
- **Routing:** [React Router](https://reactrouter.com/)
- **State Management:**
  - **Server State/Caching:** [TanStack Query](https://tanstack.com/query/latest)
  - **Client State:** [Zustand](https://github.com/pmndrs/zustand)
- **Internationalization:** [i18next](https://www.i18next.com/)
- **Code Quality:** [ESLint](https://eslint.org/) & [Prettier](https://prettier.io/)

### Backend

- **Framework:** [Express.js](https://expressjs.com/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Runtime:** [Node.js](https://nodejs.org/)
- **Development:** [tsx](https://github.com/esbuild-kit/tsx) for live-reloading

## Architecture

The application consists of a `client` (React SPA) and a `server` (Express API). The client does **not** call the external weather API directly. Instead, it calls the backend server, which acts as a proxy to fetch data from the weather service. This helps protect the API key.

```
/
├── client/         # Frontend React Application
└── server/         # Backend Express Proxy Server
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- A **WeatherAPI** key from [weatherapi.com](https://www.weatherapi.com/)

### Setup

#### 1. Configure the Server

The server requires your WeatherAPI key.

```bash
# Navigate to the server directory
cd server

# Copy the environment file
cp .env.example .env
```

Now, open the newly created `server/.env` file and add your API key from [WeatherAPI](https://www.weatherapi.com/):

```
WEATHER_API_KEY=your_weather_api_key_here
PORT=3001
```

#### 2. Configure the Client

The client only needs to know the URL of your backend server. By default, it will try to connect to `http://localhost:3001/api`.

If your server runs on a different address, navigate to the `client` directory and create a `.env` file to specify the correct URL:

```bash
# Navigate to the client directory
cd client

# Copy the environment file (optional, only if your server URL is not the default)
cp .env.example .env
```

Open `client/.env` and modify the URL:

```
VITE_API_URL=http://your-server-address/api
```

### Installation

You need to install dependencies for both the client and the server.

- **Install Server Dependencies:**

  ```bash
  cd server
  npm install
  ```

- **Install Client Dependencies:**
  ```bash
  cd client
  npm install
  ```

### Running the Application

You must start both the backend and frontend servers.

1.  **Start the Backend Server:**
    In the `server/` directory, run:

    ```bash
    npm run dev
    ```

    The server will start on the port defined in your `.env` file (e.g., `3001`).

2.  **Start the Frontend Client:**
    In the `client/` directory, run:
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173` (or another port if 5173 is busy).

## Available Scripts

### Client (`client/`)

- `npm run dev`: Starts the Vite development server.
- `npm run build`: Builds the application for production.
- `npm run preview`: Serves the production build locally.
- `npm run lint`: Lints the codebase using ESLint.
- `npm run format`: Formats code with Prettier.
- `npm run typecheck`: Verifies type correctness.

### Server (`server/`)

- `npm run dev`: Starts the Express server with live-reloading.
- `npm run build`: Compiles the TypeScript code to JavaScript.
- `npm run lint`: Lints the codebase using ESLint.
  `npm run format`: Formats code with Prettier.
