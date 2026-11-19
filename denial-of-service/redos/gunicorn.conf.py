from gunicorn.sock import ssl_context as create_ssl_context

wsgi_app = "wsgi:application"
bind = "app.internal:443"
certfile = "/etc/ssl/certs/internal.cert.pem"
keyfile = "/etc/ssl/private/internal.key.pem"
loglevel = "info"
accesslog = "/var/log/gunicorn/access.log"
errorlog = "/var/log/gunicorn/error.log"

workers = 4
preload_app = True
user = "nobody"
group = "nogroup"


def load_tls_context(server):
    # Load the root-owned key before Gunicorn forks unprivileged workers.
    context = create_ssl_context(server.cfg)

    def ssl_context(config, default_ssl_context_factory):
        return context

    server.cfg.set("ssl_context", ssl_context)


on_starting = load_tls_context
on_reload = load_tls_context
