# Fruit Food

Fruit Food is organized as a frontend application and a reserved backend directory:

```text
frontend/   Next.js app, shared UI, assets, and local json-server mock API
backend/    Reserved for the future Django backend; currently empty
```

## Run the frontend

Requirements: Node.js 20+ and Git.

```bash
cd frontend
npm install
cp .env.example .env.local
cp db_orinak_example db.json
npm run dev
```

Open the app at <http://localhost:3000>. The mock API runs at <http://localhost:8000>.
For Windows, use `copy .env.example .env.local` and `copy db_orinak_example db.json`.

Frontend-specific architecture, data conventions, and team workflow are documented in
[frontend/README.md](frontend/README.md).
