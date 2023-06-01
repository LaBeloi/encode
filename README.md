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

Tip: in case of error with Prisma (found issue with pnpm and prisma) try to delete global node_modules and reinstall dependency.

- `pnpm dev` run project

Ports:

- `http://localhost:5173/` - frontend
  
- `http://localhost:3000/` - backend
                       `/api` - Global Prefix for API
                       `/docs` - Prefix for Swagger documentation
