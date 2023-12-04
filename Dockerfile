FROM node:18.12.0

WORKDIR app/

COPY ["package.json","package-lock.json","./"]

RUN npm install

COPY . .

CMD ["npm","start"]