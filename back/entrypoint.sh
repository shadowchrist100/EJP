#!/bin/sh

# 1. Gestion du port pour Apache (Dynamique pour Render)
# On remplace le port 80 par la variable $PORT fournie par Render (souvent 10000)
sed -s -i "s/Listen 80/Listen ${PORT:-80}/" /etc/apache2/ports.conf
sed -s -i "s/<VirtualHost \*:80>/<VirtualHost *:${PORT:-80}>/" /etc/apache2/sites-available/*.conf

# 2. Optimisation des performances (Caches de production)
echo "Mise en cache de la configuration..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

# 3. Base de données
# On lance les migrations automatiquement à chaque déploiement
echo "Exécution des migrations..."
php artisan migrate --force

# 4. Lancement d'Apache
# 'exec' permet à Apache de devenir le processus principal (PID 1)
echo "Démarrage d'Apache sur le port ${PORT:-80}..."
exec apache2-foreground
