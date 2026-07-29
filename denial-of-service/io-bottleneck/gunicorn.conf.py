wsgi_app = "wsgi:application"
bind = "unix:/run/victim.sock"
umask = 0o177
loglevel = "info"
accesslog = "/var/log/gunicorn/access.log"
errorlog = "/var/log/gunicorn/error.log"

workers = 1
threads = 64
worker_class = "gthread"
keepalive = 1
