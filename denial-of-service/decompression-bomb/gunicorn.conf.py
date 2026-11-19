wsgi_app = "wsgi:create_app()"
bind = "app.internal:443"
certfile = "/etc/ssl/certs/internal.cert.pem"
keyfile = "/etc/ssl/private/internal.key.pem"
loglevel = "info"
accesslog = "/var/log/gunicorn/access.log"
errorlog = "/var/log/gunicorn/error.log"

workers = 1
threads = 1
worker_class = "sync"
