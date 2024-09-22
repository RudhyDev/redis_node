
FROM node:20-alpine

WORKDIR /app

COPY pnpm-lock.yaml package.json ./

RUN npm install -g pnpm

RUN pnpm install

COPY . .

EXPOSE 3000

CMD ["pnpm", "start:dev"]