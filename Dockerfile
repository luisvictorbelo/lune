FROM node:24-alpine AS base
WORKDIR /app

RUN apk add --no-cache dumb-init

COPY package*.json ./


FROM base AS deps
RUN npm ci --ignore-scripts


FROM deps AS build
COPY tsconfig*.json nest-cli.json ./
COPY src ./src
RUN npm run build


FROM base AS production-deps
RUN npm ci --omit=dev --ignore-scripts && npm cache clean --force


FROM node:24-alpine AS production
WORKDIR /app
ENV NODE_ENV=production

RUN apk add --no-cache dumb-init

COPY --from=production-deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY package*.json ./

EXPOSE 3000
USER node

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/main.js"]


FROM deps AS development
ENV NODE_ENV=development

COPY tsconfig*.json nest-cli.json ./
COPY src ./src

EXPOSE 3000
CMD ["npm", "run", "start:dev"]