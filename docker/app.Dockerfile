FROM node:20-alpine

WORKDIR /app

# copy only package manifests first
COPY package.json package-lock.json* ./

# install dependencies
RUN npm install

# copy the rest of the app
COPY . .

# build
RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "start"]