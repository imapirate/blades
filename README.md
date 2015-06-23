# Blades

WordPress theme for Upstatement.com

* * *

## Getting started with Development

### Clone this repo

```
cd ~/Sites
git clone git@github.com:Upstatement/blades.git
```

After it has downloaded, navigate inside the directory and run the setup script
```
cd blades
sh vvv-setup.sh
```

### Use composer to download plugins

```
vagrant ssh
cd /srv/www/wordpress-blades/wp-content/themes/blades
composer update
```

When asked for what setup (nginx or apache) enter nginx

### Fetch & import the database
1. get a copy of the database dump you'd like to use. It's located in:`Dropbox/Upstatement Team Folder/Website/DB`. Open up Sequel Pro. Connect to your database using [this info](http://i.imgur.com/xe5RspM.png)
- SSH button
- **MySQL Host:** `127.0.0.1`
- **Username:** `root`
- **Password:** `root`
- **SSH Host:** `192.168.50.4` (this may be different on your machine, check the hosts file (which you can access in Chrome via file:///etc/hosts) and look for different IP address. Try those if this doesn't work for you)
- **SSH User:** `vagrant`
- **SSH Password:** `vagrant`

### Grab the uploads
What's a website without images? The uploads directory is located in `Dropbox/Upstatement Team Folder/Website/uploads` COPY (don't move) it to your uploads directory through finder: `~/Sites/blades_env/www/wordpress-blades/wp-content/uploads`


