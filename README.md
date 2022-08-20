# BREMOLAH COLLECTION

is an ecommerce platform built using the mern stack

## installation process

1. install nodejs and npm
2. cd client && npm install
3. cd server && npm install
4. npm start on both clientand server

## for aws deployement

follow the below links

1. https://medium.com/@rksmith369/how-to-deploy-mern-stack-app-on-aws-ec2-with-ssl-nginx-the-right-way-e76c1a8cd6c6

# of Nginx configuration files in order to fully unleash the power of Nginx.

# https://www.nginx.com/resources/wiki/start/

# https://www.nginx.com/resources/wiki/start/topics/tutorials/config_pitfalls/

# https://wiki.debian.org/Nginx/DirectoryStructure

#

# In most cases, administrators will remove this file from sites-enabled/ and

# leave it as reference inside of sites-available where it will continue to be

# updated by the nginx packaging team.

#

# This file will automatically load configuration files provided by other

# applications, such as Drupal or Wordpress. These applications will be made

# available underneath a path with that package name, such as /drupal8.

#

# Please see /usr/share/doc/nginx-doc/examples/ for more detailed examples.

##

# Default server configuration

#

# configure nginx

cd /etc/nginx/sites-enabled/
sudo vim default

server {
listen 80 default_server;
listen [::]:80 default_server;

        root /var/www/build;

        server_name yourdomain.com yourdomain.com;

        location / {
                try_files $uri /index.html;
        }

        location /api/ {
                proxy_pass http://localhost:5000;
        }

}
