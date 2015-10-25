Repo Mongo

`sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10`

`echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.0.list`

Repo node 4

`curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -`

Instalar node, mongo, git, nginx, libkrb5-dev

`sudo apt-get install -y nodejs nginx git mongodb-org libkrb5-dev`

`sudo apt-get upgrade -y`

Crear usuario node y convertirlo en sudoer

`sudo adduser node`

`sudo adduser node sudo`

Cambiar a usuario node

`sudo -u node -i`

Crear y acceder /var/www

`sudo mkdir /var/www`

`cd /var/www`

Descargar nodepop

`sudo git clone https://github.com/jorgifumi/nodepop.git`

Dar a node la propiedad de la carpeta nodepop

`sudo chown -R node:node nodepop`

Instalar dependencias

`cd nodepop`

`npm install`

Inicializar BD

`npm run installDB`

Instalar pm2

`sudo npm install pm2 -g`

Arrancar nodepop desde pm2

`sudo pm2 start ./bin/www --name "nodepop"`

Configurar autoarranque de pm2

`sudo PM2_HOME=/home/node/.pm2 su -c "env PATH=$PATH:/usr/bin pm2 startup ubuntu -u node"`

`sudo su -c "chmod +x /etc/init.d/pm2-init.sh && updaterc.d pm2-init.sh defaults"`

`sudo chown -R node:node /home/node/`

Averigua el número de procesadores (sumar 1)

`grep processor /proc/cpuinfo` -> Lo ponemos en worker_processes

Número de conexiones máximas

`ulimit -n` -> worker_connections

Configurar nginx

`sudo nano /etc/nginx/nginx.conf` -> poner worker_processes, worker_connections, server_tokens off, server_names_hash_bucket_size 128 (AWS)

`sudo nano /etc/nginx/sites-available/default` -> Poner la ruta /var/www/default

`sudo nano /etc/nginx/sites-available/nodepop` -> Configurar rutas, dominio, cabeceras..

Activar sitio

`sudo ln -s /etc/nginx/sites-available/nodepop /etc/nginx/sites-enabled/nodepop`

Poner archivos en /var/www/default incluyendo un index

Cambiar propietario de la carpeta y archivos

`sudo chown -R www-data:www-data .`

Comprobar configuracion

`sudo nginx -t`

Reiniciar para aplicar cambios

`sudo service nginx restart`