# encode
Project uses:
- Turbo for monorepo;
- PNPM as package manager;
- Prisma as ORM;
- React + Vite for frontend;
- Nest for backend;

Steps to run project:

- `docker compose up` to create postgresql container on port:5433

- `pnpm i` install all packages, do migrations to database, generate Prisma client.

- `pnpm dev` run project

Ports:

- `http://localhost:5173/` - frontend
  
- `http://localhost:3000/` - backend
                       `/api` - Global Prefix for API
                       `/docs` - Prefix for Swagger documentation
