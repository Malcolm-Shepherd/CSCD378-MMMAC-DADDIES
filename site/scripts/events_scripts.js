// This file will be used to display logging and how many users have visited the
// sites The content from this file will only be visible and added to the HTML
// if the user is an admin

function responseHandler(data) {
    console.log(data);
}

function getCookie(cname) {
    const name = cname + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

// if user == admin
window.onload = function () {
    $.post("http://localhost:8082/events",
           {},
           responseHandler,
           "json");

    const adminInfo = document.getElementById("adminOnlyEventInfo");

    if (getCookie("uid") == "1") {  // Will change to if userID == adminID
        const p = document.createElement("p");
        let userCount = 5;
        // Will use variable that includes users visited when logging is implemented.
        p.textContent = "ADMIN ONLY,  Page visited by " + userCount + " Users";
        adminInfo.appendChild(p);
    }
}
