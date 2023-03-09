let loginOrOut = document.getElementById("loginOrOut");
let joinOrUser = document.getElementById("joinOrUser");
function delete_cookie(name) {
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
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

if (getCookie("uid") !== ""){

    let indexCheck = joinOrUser.href.split("/").length;
    let user = getCookie("username");
    loginOrOut.innerText = "LOGOUT";
    joinOrUser.innerText = user.valueOf();

    //Checks if we're in index.html or not
    joinOrUser.href = "html/account.html";
    if(joinOrUser.href === "http://localhost:8080/html/html/account.html") {
        joinOrUser.href = "account.html";
    }
    loginOrOut.addEventListener("click",function(event){
        delete_cookie("uid");
        delete_cookie("username");
        delete_cookie("hash");
    });
    loginOrOut.href = "index.html";
    if(loginOrOut.href === "http://localhost:8080/html/index.html") {
        loginOrOut.href = "../index.html";
    }


}
else{
    loginOrOut.innerText = "LOGIN";
    joinOrUser.innerText = "JOIN";

    //Checks if we're in index.html or not
    joinOrUser.href = "html/join.html";
    if(joinOrUser.href === "http://localhost:8080/html/html/join.html") {
        joinOrUser.href = "join.html";
    }
    loginOrOut.href = "html/login.html";
    if(loginOrOut.href === "http://localhost:8080/html/html/login.html") {
        loginOrOut.href = "login.html";
    }
}

