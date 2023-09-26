FROM nginx
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY ./dist ./
COPY default.conf  /etc/nginx/conf.d/
