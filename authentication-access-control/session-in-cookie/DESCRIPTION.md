The previous challenge trusted an identity supplied in the page address. Web applications more commonly carry session information in *cookies*, which let the browser remember a value and send it with later requests. This saves the application from having to include session information in every link and form as you navigate the site.

To set a cookie, a server includes a `Set-Cookie` header in its response. The browser stores the cookie and sends it back in a `Cookie` header on requests that match its scope, such as the domain and path it belongs to. An application can use this exchange to issue a session identifier after login and receive it again when the user requests a protected page.

The fact that the server originally set a cookie doesn't make the returned value trustworthy. A client can send a different value, and moving it out of the address bar doesn't put it beyond the user's control. The server still needs to validate its connection to an authenticated session before using it to decide who is making the request. Otherwise, we're back to taking the client's word for who they are!

In this challenge, the application uses cookies. Inspect the login response and the requests that follow to see whether the server actually verifies your identity.
