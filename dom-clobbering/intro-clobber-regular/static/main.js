setInterval(()=>{
    document.time = document.time || 0;
    if (document.time < 10) {
        document.time += 1;
    } else {
        fetch("/cookie-dump");
    }
}, 1000)