# FinSmart

FinSmart is a modern personal finance and transaction management dashboard built with React, Vite, and Tailwind CSS. It provides a clean, responsive interface for users to register, log in, review transactions, and manage their profile.

## Features

- **Authentication:** Sign Up and Login pages for secure user access.
- **Dashboard:** A complete dashboard interface to get an overview of finances.
- **Transactions:** A dedicated page to view and manage detailed financial transactions.
- **User Profile:** View and update your personal user profile.
- **Responsive Design:** Optimized for mobile, tablet, and desktop views using Tailwind CSS.

## Tech Stack

- **Frontend Framework:** React 19
- **Routing:** React Router DOM (v7)
- **Styling:** Tailwind CSS with `tailwind-merge` and `clsx`
- **Icons:** Lucide React
- **Charts/Graphs:** Recharts
- **Build Tool:** Vite

## Local Development

### Prerequisites

- [Node.js](https://nodejs.org/) (v16.x or later recommended)
- `npm` or `yarn` (or `pnpm`)

### Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd finsmart
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start the Development Server**
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`.

## Deployment Guide

Deploying a Vite + React application is quick and straightforward. Below are instructions for popular deployment platforms.

### Option 1: Vercel (Recommended)

1. Connect your GitHub/GitLab repository to [Vercel](https://vercel.com).
2. Create a new project and select your `finsmart` repository.
3. Vercel will auto-detect the Vite framework.
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Click **Deploy**.

### Option 2: Netlify

1. Connect your repository to [Netlify](https://www.netlify.com).
2. Create a new site from your Git repository.
3. Configure your build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. Click **Deploy Site**.

*Note: Since this app uses client-side routing (`React Router`), Netlify requires a `_redirects` file to handle route rewrites. Create a `public/_redirects` file containing:*
```text
/* /index.html 200
```

### Option 3: Traditional Hosting / Nginx

To host on a traditional VPS or shared hosting environment:

1. **Build the production bundle:**
   ```bash
   npm run build
   ```
   This will generate a `dist` folder containing static files (HTML, CSS, JS).

2. **Upload the contents** of the `dist` folder to your web server (e.g., `/var/www/html/finsmart`).

3. **Configure the Server (Nginx Example):**
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;
       root /var/www/html/finsmart;
       index index.html;

       location / {
           try_files $uri $uri/ /index.html;
       }
   }
   ```
   *The `try_files` directive ensures that all unmatched routes are redirected back to `index.html` for client-side routing.*

### Option 4: Docker

If you prefer deploying with Docker, you can create a `Dockerfile`:

```dockerfile
# Build stage
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
# Add custom nginx config for SPA routing (try_files) if needed
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```
Build and run your container:
```bash
docker build -t finsmart-app .
docker run -p 8080:80 finsmart-app
```
