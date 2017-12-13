FROM node:5.4

COPY package.json /src/package.json
WORKDIR /src
RUN npm install

COPY plathbot.js /src

CMD ["node", "/src/plathbot.js"]
