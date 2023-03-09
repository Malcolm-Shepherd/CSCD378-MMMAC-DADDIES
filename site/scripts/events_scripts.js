// This file will be used to display logging and how many users have visited the sites
// The content from this file will only be visible and added to the HTML if the user is an admin

// if user == admin
window.onload = function () {


    const adminInfo = document.getElementById("adminOnlyEventInfo");

    if (1 === 2) { // Will change to if userID == adminID
        const p = document.createElement("p");
        // Will use variable that includes users visited when logging is implemented.
        p.textContent = "ADMIN ONLY,  Page visited by " + " Users";
        adminInfo.appendChild(p);
    }
}