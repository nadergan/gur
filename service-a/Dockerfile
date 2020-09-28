FROM  nginx:mainline-alpine

ADD src/html/ /usr/share/nginx/html/

ENTRYPOINT ["nginx", "-g", "daemon off;"]