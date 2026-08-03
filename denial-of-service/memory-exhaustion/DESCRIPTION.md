This service adds an endpoint: `POST /log`. Send it JSON with a `message` field and the handler reads the whole request into memory before it does anything with it.

Nothing limits how big that request can be. However much you send, the server has to hold all of it at once, and a machine only has so much memory. Fill it and the process can't stay up to answer anyone, the status page included.
