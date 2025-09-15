FROM ubuntu:latest
LABEL authors="feile"

ENTRYPOINT ["top", "-b"]

# 1. Utilise une image Node.js légère
FROM node:18-alpine AS base

# 2. Définir le répertoire de travail
WORKDIR /apps

# 3. Copie les fichiers de config NX et package.json
COPY package*.json nx.json tsconfig.base.json ./

# 4. Installation des dépendances uniquement (sans node_modules volumineux)
RUN npm install -g nx && npm install --legacy-peer-deps

# 5. Copie du code de l'application
COPY . .

# 6. Construction de l'application (prod)
RUN nx build stores --prod

# 7. Image finale (allégée pour production)
FROM nginx:alpine AS production
COPY --from=base /stores/dist/apps/stores /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
