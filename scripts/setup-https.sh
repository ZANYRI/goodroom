#!/usr/bin/env bash
set -euo pipefail

# Автоматическая настройка Nginx + бесплатного SSL-сертификата Let's Encrypt (HTTPS)
# для домена goodroom26.ru и www.goodroom26.ru (Next.js на порту 3002).
#
# Использование на Ubuntu/Debian VPS (после смены DNS A-записей с Tilda на IP вашего VPS):
#   sudo bash scripts/setup-https.sh goodroom26@mail.ru

DOMAIN="goodroom26.ru"
WWW_DOMAIN="www.goodroom26.ru"
EMAIL="${1:-goodroom26@mail.ru}"
APP_PORT="3002"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
NGINX_AVAILABLE="/etc/nginx/sites-available/${DOMAIN}"
NGINX_ENABLED="/etc/nginx/sites-enabled/${DOMAIN}"
WEBROOT="/var/www/letsencrypt"

if [ "$(id -u)" -ne 0 ]; then
  echo "Ошибка: запустите скрипт с правами root (sudo bash scripts/setup-https.sh ${EMAIL})"
  exit 1
fi

echo "==> [1/5] Проверка пакетов nginx и certbot..."
if ! command -v nginx >/dev/null 2>&1 || ! command -v certbot >/dev/null 2>&1; then
  apt-get update
  apt-get install -y nginx certbot python3-certbot-nginx
fi

mkdir -p "${WEBROOT}"

echo "==> [2/5] Подготовка стартового HTTP-конфига для выпуска сертификата..."
if [ ! -f "/etc/letsencrypt/live/${DOMAIN}/fullchain.pem" ]; then
  cat > "${NGINX_AVAILABLE}" <<EOF
server {
    listen 80;
    listen [::]:80;
    server_name ${DOMAIN} ${WWW_DOMAIN};

    location ^~ /.well-known/acme-challenge/ {
        root ${WEBROOT};
        default_type "text/plain";
        allow all;
    }

    location / {
        proxy_pass http://127.0.0.1:${APP_PORT};
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
EOF

  ln -sf "${NGINX_AVAILABLE}" "${NGINX_ENABLED}"
  nginx -t
  systemctl reload nginx

  echo "==> [3/5] Выпуск SSL-сертификата Let's Encrypt для ${DOMAIN} и ${WWW_DOMAIN}..."
  certbot certonly \
    --webroot \
    -w "${WEBROOT}" \
    -d "${DOMAIN}" \
    -d "${WWW_DOMAIN}" \
    --email "${EMAIL}" \
    --agree-tos \
    --non-interactive
else
  echo "==> [3/5] Сертификат /etc/letsencrypt/live/${DOMAIN}/fullchain.pem уже существует."
fi

echo "==> [4/5] Установка финального HTTPS-конфига Nginx (HSTS, TLS 1.2/1.3, 301 HTTP->HTTPS)..."
cp "${PROJECT_DIR}/nginx/goodroom26.ru.conf" "${NGINX_AVAILABLE}"
ln -sf "${NGINX_AVAILABLE}" "${NGINX_ENABLED}"
nginx -t
systemctl reload nginx

echo "==> [5/5] Проверка таймера автопродления SSL-сертификата..."
systemctl enable --now certbot.timer >/dev/null 2>&1 || true
systemctl status certbot.timer --no-pager | head -n 5 || true

echo ""
echo "Готово! Сайт работает по защищённому протоколу: https://${DOMAIN}"
