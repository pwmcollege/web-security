Every shortcut from the earlier levels is gone: no identity in the URL, no editable cookie, no header to lean on, no admin side door. The session is signed and the form is the only entrance, so this time you have to get the login handler itself to wave you through.

Admin's password still isn't something you can find or guess. But a login is really just a chain of checks run one after another, and the way they're ordered (plus the exact condition guarding each one) leaves room for mistakes. Read the handler closely and look for the input that slips past every check.
