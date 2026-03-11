#!/bin/sh

# On vide les caches pour la production
php artisan config:cache
php artisan route:cache
php artisan view:cache

# On lance les migrations
php artisan migrate --force

# On démarre Apache
exec apache2-foreground
