# build
FROM node:16-alpine as development

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig.json ./

COPY .env.template .env

RUN npm install glob typescript@4
RUN npm install glob rimraf

RUN npm install --only=development

COPY . .

RUN npm run build

# run

FROM node:16-alpine as production

ARG appVersion=0.1.0.0
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

# COPY . .

COPY --from=development /usr/src/app/dist ./dist

# Add Helm app version file
RUN echo "$appVersion" > appversion

# RUN ls /usr/src/app/dist/

CMD ["node", "/usr/src/app/dist/main"]
