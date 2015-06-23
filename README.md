# Blades

WordPress theme for Upstatement.com

* * *

## Getting started with Development

Clone this repo

```
cd ~/Sites
git clone git@github.com:Upstatement/blades.git
```

After it has downloaded, navigate inside the directory and run the setup script
```
cd blades
sh vvv-setup.sh
```

Use composer to download plugins

```
vagrant ssh
cd /srv/www/wordpress-blades/wp-content/themes/blades
composer update
```

When asked for what setup (nginx or apache) enter nginx

### 3. Fetch & import the database
1. get a copy of the database dump you'd like to use (we store lots of these on Dropbox, ask Jared where)
2. import the database using Sequal Pro
