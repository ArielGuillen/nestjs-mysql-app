# Stage 1: Base image
FROM node:18 as base

# Stage 2: Dependencies
FROM base as dependencies
WORKDIR /app
COPY package.json ./
RUN npm install 

# Stage 3: Build
FROM base as build
WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
RUN npm run build
RUN npm prune --production

# Stage 4: Pre-Production
FROM gcr.io/distroless/nodejs18-debian11 as pre-production
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=build /app/dist .
EXPOSE 4000

# Stage 5: Production
FROM pre-production as production
WORKDIR /app
CMD ["main.js"]
