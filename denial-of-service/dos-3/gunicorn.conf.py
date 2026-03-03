wsgi_app = "wsgi:application"
bind = "0.0.0.0:80"
loglevel = "info"
accesslog = "/var/log/gunicorn/access.log"
errorlog = "/var/log/gunicorn/error.log"

timeout = 1
