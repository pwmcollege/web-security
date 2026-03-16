Same setup as the previous challenge — blind XSS via the bug reporting system, admin reviews at `/reports`.

This time, the session cookie is HttpOnly. But the flag is still somewhere the admin's browser can reach.

## Challenge Environment

The following accounts are available:
- `hacker` / `1337`
- `guest` / `password`
