FROM node:20

WORKDIR /app

COPY package.json ./

COPY . .

RUN npm install

RUN rm -rf .next

RUN npm run build

CMD ["npm", "run", "start"]