# Blades

[![Build Status](https://travis-ci.org/Upstatement/blades.svg?branch=master)](https://travis-ci.org/Upstatement/blades)

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
_Note: If you used the setup script, this step may not be necessary_
```
vagrant ssh
cd /srv/www/wordpress-blades/wp-content/themes/blades
composer update
```

When asked for what setup (nginx or apache) enter nginx

### Fetch & import the database
1. **Connect to your local database.** Open up Sequel Pro. Connect to your database using [this info](http://i.imgur.com/xe5RspM.png)
  - SSH button
  - **MySQL Host:** `127.0.0.1`
  - **Username:** `root`
  - **Password:** `root`
  - **SSH Host:** `192.168.50.48` (this may be different on your machine, check the hosts file (which you can access in Chrome via file:///etc/hosts) and look for different IP address. Try those if this doesn't work for you)
  - **SSH User:** `vagrant`
  - **SSH Password:** `vagrant`

2. **Import a copy of the current database dump.** 
   - In Sequel Pro, click the `Choose Database` dropdown button in the upper left corner
   - Choose `wordpress_blades`
   - Hit `Shift+Command+I` or go to `File > Import`
   - Choose the database dump on Dropbox:`Dropbox/Upstatement Team Folder/Website/DB`
   - And you're done!

### Grab the uploads
What's a website without images? The uploads directory is located in `Dropbox/Upstatement Team Folder/Website/uploads` COPY (don't move) it to your uploads directory through finder: `~/Sites/blades_env/www/wordpress-blades/wp-content/uploads`

### Install Bower Components
1. Navigate to the theme folder in Terminal (`Sites/blades`)
2. Run `bower install`
