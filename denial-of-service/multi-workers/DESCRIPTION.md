The obvious fix for a busy server is more workers, so this one runs **32 of them**, each its own process, handling requests in parallel.

But each worker is still **synchronous**: one request at a time, start to finish. More lanes don't help if every lane is single-file.

Same goal as before: knock the server offline long enough that the watchdog gives up and prints the flag.
