FROM php:8.2-apache

# Installer dépendances système
RUN apt-get update && apt-get install -y \
    git \
    curl \
    zip \
    unzip \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libzip-dev

# Installer extensions PHP
RUN docker-php-ext-install pdo pdo_mysql mbstring exif pcntl bcmath gd zip

# Configuration Apache pour Laravel
RUN a2enmod rewrite
RUN sed -ri -e 's!/var/www/html!/var/www/html/public!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!/var/www/html/public!g' /etc/apache2/conf-available/*.conf


# Installer Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Dossier de travail standard pour Apache
WORKDIR /var/www/html

# Optimisation du cache Docker : installer les dépendances avant de copier le reste
COPY composer.json composer.lock ./
RUN composer install --no-dev --optimize-autoloader --no-scripts

# Copier tout le projet
COPY . .

# Permissions pour Laravel
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache
RUN chmod +x /var/www/html/entrypoint.sh


EXPOSE 80

# Lancer Apache en avant-plan
CMD ["/var/www/html/entrypoint.sh"]
