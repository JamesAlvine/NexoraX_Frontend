
# nexoraX — Frontend (Angular v20)

Modern, secure, and modular frontend for NGO management
Built with Angular v20, SCSS, and standalone components




## Prerequisites
Node.js v20 or higher
→ Download Node.js
npm (comes with Node.js)

→ Git (optional, for version control)
## Installation

1. Clone or navigate to the project
If you haven’t already:

git Clone https://github.com/JamesAlvine/NexoraX_Frontend.git

2. Install dependencies
npm install

This installs Angular CLI, RxJS, HttpClient, and all required packages. 

3.  Environment Configuration
Create a .env file in the frontend/ root directory:

frontend/.env
VITE_API_BASE_URL=http://localhost:8000/api/

✅ Required: This tells Angular where your Django backend is running.
🔒 In production, this will point to your deployed API (e.g., https://api.nexorax.org/). 

💡 Note: Angular v20 uses VITE_ prefix for environment variables (via Vite under the hood). 





## Running the Application

Development Server

`npm run dev`

Opens http://localhost:4200 in your browser
Auto-reloads on file changes
Uses proxy settings (if configured) or direct API calls

