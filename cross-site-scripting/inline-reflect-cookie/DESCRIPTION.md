An alert is a fun party trick, but on its own it doesn't hurt anyone. What makes XSS dangerous is what your code gets to be once it runs: it lives on the page's origin, with the victim's access, seeing everything they see, their logged-in session included.

So this time you've got a real target. When the victim opens your link, their browser is carrying a `flag` cookie for this origin, and whoever set it forgot to mark it `HttpOnly`, so JavaScript on the page can read it straight off `document.cookie`. Your message still drops into the page unescaped, same as the last level.
