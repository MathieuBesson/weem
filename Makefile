# DOCKER RULES

## start	: 	Start containers and prepare a dev environment
.PHONY: start
start: start
		composer install
		php bin/console doctrine:database:create
		php bin/console doctrine:migrations:migrate
		php bin/console doctrine:fixtures:load
