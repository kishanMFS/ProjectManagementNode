FROM node:26-alpine

WORKDIR /ProjectManagementNode

COPY package*.json ./
COPY . .

RUN npm install

EXPOSE 3002

RUN npm run build

CMD ["npm", "start"]