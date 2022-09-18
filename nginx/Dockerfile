FROM nginx:latest

RUN mkdir /etc/nginx/sites-available && mkdir -p /etc/ssl/maxcompany.xyz && mkdir /etc/nginx/sites-enabled
COPY /nginx/default /etc/nginx/sites-available/
RUN ln -s /etc/nginx/sites-available/default /etc/nginx/sites-enabled/default
# Copier le fichier de conf
COPY /nginx/nginx.conf /etc/nginx/
COPY /nginx/options-ssl-nginx.conf /nginx/ssl-dhparams.pem /etc/nginx/
COPY /nginx/privkey.pem /nginx/fullchain.pem /etc/ssl/maxcompany.xyz/
