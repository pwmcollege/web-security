An absolute path slipped past the last challenge because the filter only watched for `..`. This one tries to close both routes at once. It cleans the name by stripping `.` and `/` off the ends, which knocks the `../` off a relative climb and the `/` off an absolute path:

```python
path = f"{BASE}/{urllib.parse.unquote(filename).strip('./')}"
```

`strip('./')` looks like it removes a leading `../`, but that is not what it does. It removes any run of `.` and `/` characters from the two ends of the string, and it never touches the middle. The developer pictured a traversal that sits right at the front of the name, so that is all the cleanup guards against. A `../` buried in the middle rides through completely untouched.
