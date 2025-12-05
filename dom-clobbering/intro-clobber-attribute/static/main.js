let role = window.role || {name: "user", showFlag: false}

if (role.name == "admin") {
    if (role.showFlag) {
        // Seems the admin wants to show the flag
        fetch("/showflag");
    } 
} else {
    if (role.showFlag) {
        console.log("Users can't do that!")
    }
}