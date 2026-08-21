More threads this time, sixty-four of them, all in one process. Threads are cheap next to whole processes, so the service can juggle far more requests at once without the overhead.

But threads only get you as far as the hardware under them. They still share one disk and one set of file descriptors, and `POST /log` writes every request it takes to a file. Sixty-four threads writing at the same time don't each get their own disk; they line up for it. Push enough through and they spend their time waiting on I/O instead of answering the status page.

Same `/log` endpoint as before.
