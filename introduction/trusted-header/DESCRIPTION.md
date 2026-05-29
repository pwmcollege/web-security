Editing the cookie is off the table now. This version signs the session, so without the server's secret key any tampering just gets thrown out.

The session isn't the only thing the app looks at, though. Applications often run behind a proxy and pick up details about a request from its headers, like which address it came from or whether it should count as internal traffic. The awkward part is that headers ride along in the request, which means they come from you. If the app takes one of them at face value, you get to decide what it says.

Read through the source, figure out which header flips the app into treating you as admin, set it, and go collect that draft.
