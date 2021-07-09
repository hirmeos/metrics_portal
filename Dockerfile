FROM node:14.17.3 AS build

WORKDIR /usr/src/app/

COPY package.json package-lock.json ./
RUN npm install --quiet --no-cache

COPY ./ ./

RUN npm run lint
RUN npm run build

FROM nginx:latest

COPY ./nginx.conf /etc/nginx/conf.d/portal.conf
COPY ./site.conf /etc/nginx/snippets/site.conf

WORKDIR /usr/share/nginx/html
COPY --from=build /usr/src/app/dist/ ./

CMD /bin/bash -c "envsubst < /etc/nginx/conf.d/portal.conf > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"
