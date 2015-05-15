#!/bin/bash

project_name=${PWD##*/}
env_name=$project_name"_env"
me=${0}
red='\033[1;31m'
cyan='\033[1;36m'
NC='\033[0m' # No Color

main() {
	name_env
	install_vvv
	configure_vvv
	start_vagrant
	activate_theme
}

name_env() {
	echo "${cyan}What would you like the environment directory to be named? The current default is:" $env_name "(hit enter to keep default).${NC}"
	read env_name
	if [ "$env_name" == "" ]; then
		env_name=$project_name"_env"
	fi
}

install_vvv() {
	echo "${cyan}Is this project running nginx or apache?${NC}"
	read server_software
	clone_env
}

clone_env() {
	if [ "$server_software" == "apache" ]; then
		cd ..
		git clone git://github.com/ericmann/vvv-apache.git $env_name
	elif [ "$server_software" == "nginx" ]; then
		cd ..
		git clone git://github.com/Varying-Vagrant-Vagrants/VVV.git $env_name
	else
		echo "${red}That's not one of the options! Enter either nginx or apache.${NC}"
		install_vvv
	fi
}

configure_vvv() {
	cd $env_name
	edit_hosts
	edit_provision
	if [ "$server_software" == "apache" ]; then
		edit_apache_config
	else
		edit_nginx_config
	fi
	edit_vagrantfile
	rename_db
}

edit_hosts() {
	cd www
	rm vvv-hosts
	touch vvv-hosts
	echo "build."$project_name".dev" >> vvv-hosts
	cd ..
}

edit_provision() {
	sed -i .bak "/core.svn/,/phpMyAdmin/d" provision/provision.sh
	sed -i .bak "s/wordpress-default/wordpress-"$project_name"/" provision/provision.sh
	sed -i .bak "s/local.wordpress.dev/build."$project_name".dev/" provision/provision.sh
	sed -i .bak "s/wordpress_default/wordpress_"$project_name"/" provision/provision.sh
	rm provision/provision.sh.bak
}

edit_nginx_config() {
	sed -i .bak "s/vvv.dev/build."$project_name".dev/" config/nginx-config/sites/default.conf
	sed -i .bak "29s/default/wordpress-$project_name/" config/nginx-config/sites/default.conf
	sed -i .bak '/WordPress stable/,$d' config/nginx-config/sites/default.conf
	rm config/nginx-config/sites/default.conf.bak
}

edit_apache_config() {
	sed -i .bak "s/local.wordpress.dev/build."$project_name".dev/" config/apache-config/sites/wordpress-default.conf
	sed -i .bak "s/wordpress-default/wordpress-$project_name/" config/apache-config/sites/wordpress-default.conf
	sed -i .bak '/WordPress trunk Apache configuration/,$d' config/apache-config/sites/wordpress-default.conf
	rm config/apache-config/sites/wordpress-default.conf.bak
}

edit_vagrantfile() {
	sed -i .bak "s/192.168.50.4/192.168.50.48/" Vagrantfile
	rm Vagrantfile.bak
}

rename_db() {
	sed -i .bak "s/wordpress_default/wordpress_"$project_name"/" database/init.sql
	sed -i .bak "/wordpress_trunk/,/Create an external user/d" database/init.sql
	rm database/init.sql.bak
}

start_vagrant() {
	vagrant plugin install vagrant-hostsupdater
	vagrant plugin install vagrant-triggers
	vagrant plugin install vagrant-vbguest
	vagrant up
}

activate_theme() {
	cd ..
	mv $project_name $env_name/www/wordpress-$project_name/wp-content/themes
	cd $env_name
	vagrant ssh -c "cd /srv/www/wordpress-"$project_name"/wp-content/themes/"$project_name" && composer install"
	rm -R www/wordpress-$project_name/wp-content/plugins/akismet
	rm www/wordpress-$project_name/wp-content/plugins/hello.php
	vagrant ssh -c "cd /srv/www/wordpress-"$project_name" && wp plugin activate --all && wp theme activate "$project_name
}

main