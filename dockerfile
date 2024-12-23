

########################## PROD #############################

############################################################
######### TENER CUIDADO AL CAMBIAR LA CONFIGURACION ########
###########################################################
#STAGE PARA DEPENDENCIAS DESARROLLO
FROM node:current-alpine3.21 AS dev-deps
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install --legacy-peer-deps && npm install -g @angular/cli

#STAGE PARA CONSTRUIR EL PROYECTO
FROM node:current-alpine3.21 AS builder
WORKDIR /usr/src/app
COPY --from=dev-deps /usr/src/app/node_modules ./node_modules
COPY . .
#RUN yarn test
RUN npm run build

#STAGE PARA PRODUCCION
FROM nginx:1.23.3 AS prod
EXPOSE 80
COPY --from=builder /usr/src/app/dist/web-deposito-helado/browser /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
CMD [ "nginx","-g", "daemon off;" ]

########################## PROD #############################
