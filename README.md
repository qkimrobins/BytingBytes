<<<<<<< HEAD
# Startup Execution System

This is a full-stack web application designed to help early-stage startups manage their execution, planning, and decision-making processes.

## Tech Stack

- **Frontend:** Next.js (App Router) + Tailwind CSS
- **Backend:** Node.js + Express
- **Database:** PostgreSQL
- **Authentication:** JWT-based auth

## Project Structure

```
StartupExecutionSystem/
 ├── backend/
 │   ├── controllers/
 │   ├── routes/
 │   ├── middleware/
 │   ├── prisma/
 │   ├── services/
 │   └── server.js
 ├── frontend/
 │   ├── app/
 │   ├── components/
 │   ├── lib/
 │   └── hooks/
 ├── .env
 ├── README.md
```

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm
- API Key
- local Host
- Knowledge of HTML,CSS,JAVA
- VS Code (IDE)

### 1. Clone the repository

```bash
git clone <repository-url>
cd StartupExecutionSystem
```

### 2. Set up the Backend

```bash
cd backend
npm install
```

### 3. Set up the Frontend

```bash
cd ../frontend
npm install
```

### 4. Set up the Database

```bash
cd backend
npx prisma migrate dev --name init
```

### 5. Run the Application

- **Run the Backend:**

```bash
cd backend
npm run dev
```

The backend will be running on `http://localhost:5000`.

- **Run the Frontend:**

```bash
cd frontend
npm run dev
```

The frontend will be running on `http://localhost:3000`.

## Production Deployment

### Frontend (Vercel)

1. Push your code to a Git repository (e.g., GitHub).
2. Go to [Vercel](https://vercel.com/new) and import your project.
3. Vercel will automatically detect that you are using Next.js and will configure the build settings for you.
4. Add the `NEXT_PUBLIC_API_URL` environment variable, pointing to your deployed backend URL.
5. Deploy!

### Backend (Render)

1. Create a new "Web Service" on Render and connect your Git repository.
2. Use the following settings:
   - **Environment:** Node
   - **Build Command:** `npm install && npx prisma generate`
   - **Start Command:** `npm start`
3. Add the `JWT_SECRET` environment variables.
4. Deploy!
## Pushing to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-github-repository-url>
git push -u origin main
```
=======
# Work Principle 
This site works only on hosting and the AI feature works by the user's API .Therefore before using it you will have to donwlaod and host the file locally on your device.
>>>>>>> e08b2d006ff7d44446acf7022c507c4620c46aae
