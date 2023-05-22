FROM node:18

WORKDIR /app

COPY package*.json ./

RUN pnpm install

COPY . .

RUN pnpm dev

EXPOSE 5172

CMD ["pnpm", "dev"]