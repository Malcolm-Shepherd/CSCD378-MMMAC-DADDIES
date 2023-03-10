const loginOrOut = document.getElementById("loginOrOut");
const joinOrUser = document.getElementById("joinOrUser");

function delete_cookie(name) {
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
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

function logoutHandler(data) {
    console.log(data);
    if (data.status == "ok") {
        delete_cookie("uid");
        delete_cookie("username");
        delete_cookie("hash");
        alert("Logout successful!");
        window.location.href = "http://localhost:8080";
    }
    else {
        alert("There was an error logging you out.");
    }
}

if (getCookie("uid") !== "") {
    const user = getCookie("username");
    loginOrOut.innerText = "LOGOUT";
    joinOrUser.innerText = user.valueOf();

    //Checks if we're in index.html or not
    joinOrUser.href = "html/account.html";
    if(joinOrUser.href.indexOf("html/html") != -1) {
        joinOrUser.href = "account.html";
    }

    // Replace logout link with API request.
    loginOrOut.href = "";
    loginOrOut.addEventListener("click", (event) => {
        $.post("http://localhost:8082/logout",
               {username: user},
               logoutHandler,
               "json"
              );
        event.preventDefault();
    });
}
else {
    loginOrOut.innerText = "LOGIN";
    joinOrUser.innerText = "JOIN";

    //Checks if we're in index.html or not
    joinOrUser.href = "html/join.html";
    if(joinOrUser.href.indexOf("html/html") != -1) {
        joinOrUser.href = "join.html";
    }
    loginOrOut.href = "html/login.html";
    if(loginOrOut.href.indexOf("html/html") != -1) {
        loginOrOut.href = "login.html";
    }
}
