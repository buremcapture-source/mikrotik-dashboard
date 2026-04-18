FROM node:18-alpine

WORKDIR /app

# Copy files
COPY proxy-server.js .
COPY mikrotik-dashboard-v2.html .
COPY package.json .

# Port
EXPOSE 3000

# Environment
ENV NODE_ENV=production

# Start
CMD ["node", "proxy-server.js"]
