Reflected XSS only fires if you can talk a victim into clicking your link. [Stored XSS](https://owasp.org/www-community/attacks/xss/#stored-xss-attacks) is worse. The payload gets saved on the server, in something like a comment, a profile, or a post, and then it is served to everyone who views that content. There is no link to click. It runs on its own, in the browser of whoever loads the page.

**pwnpost** lets users publish posts for others to read. The site shows post content without escaping it, so your post is treated as markup and runs in the browser of anyone who opens the feed:

```html
<div class="post">
    <payload>
</div>
```

That includes the `admin`, who reads submitted posts to check them. Code that runs in the admin's browser runs with the admin's access, so it can reach things only the admin can see, like their own unpublished post.

Log in, save a payload in a post, and get it to run when the admin reviews the feed.

---

### Challenge Environment

You can log into ***pwnpost*** with these accounts:

- `guest:password`
- `hacker:1337`
