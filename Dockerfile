FROM node:18.16-alpine AS build

RUN npm install -g typescript ts-node

WORKDIR /usr/src/app

COPY package*.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build


FROM node:18.16-alpine AS runtime

COPY --from=build /usr/src/app/node_modules /usr/src/app/node_modules
COPY --from=build /usr/src/app/dist /usr/src/app/dist
COPY --from=build /usr/src/app/src /usr/src/app/src
COPY --from=build /usr/src/app/package.json /usr/src/app/package.json
COPY --from=build /usr/src/app/tsconfig.json /usr/src/app/tsconfig.json

WORKDIR /usr/src/app

EXPOSE 3000

CMD [ "npm", "start" ]
