wsgi_app = "unzip.wsgi:create_app()"
bind = "127.0.0.1:8082"
loglevel = "info"
accesslog = "/var/log/gunicorn/access.log"
errorlog = "/var/log/gunicorn/error.log"

workers = 1
threads = 1
worker_class = "sync"
