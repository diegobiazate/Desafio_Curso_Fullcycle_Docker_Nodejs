FROM node:18-alpine

RUN apk add --no-cache wget openrc && \
    wget -q -O /usr/bin/wait-for https://raw.githubusercontent.com/eficode/wait-for/v2.2.3/wait-for && \
    chmod +x /usr/bin/wait-for

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["wait-for", "db:3306", "--", "npm", "start"]
