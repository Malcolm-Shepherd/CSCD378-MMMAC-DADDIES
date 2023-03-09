function setCookie(name, value, expire_days) {
    const d = new Date();
    d.setTime(d.getTime() + (expire_days * 24 * 60 * 60 * 1000));
    const expires = `expires=${d.toUTCString}`;
    document.cookie = `${name}=${value}; expires=Thu, 18 Dec 2023 12:00:00 UTC; path=/; SameSite=Strict`;
}

// Handle responses from Node image.
function responseHandler(data) {
    console.log(data);
    if (data.status == "ok") {
        $("#formErrors")[0].innerHTML = "";
        setCookie("uid", data.uid, 365);
        setCookie("username", data.username, 365);
        setCookie("hash", data.hash, 365);
        document.getElementById("loginOrOut").innerText = "LOGOUT";
        document.getElementById("joinOrUser").innerText = data.username;
        alert("Login Success!");
        window.location.href = "http://localhost:8080";
    }
    else {
        $("#formErrors")[0].innerHTML = "<p>Invalid username or password</p>";
    }
}


// Wait until page loads.
document.addEventListener("DOMContentLoaded", function() {
    // Get document elements.
    const usernameField = document.getElementById("username");
    const passwordField = document.getElementById("password");
    const loginButton   = document.getElementById("login");

    // Add listener to login button.
    loginButton.addEventListener("click", function(event) {

        // Get field data.
        const username = usernameField.value;
        const password = passwordField.value;

        // Send request to Node image.
        if (username.length > 0 && password.length > 0) {
            const request = {
                username: username,
                password: password
            };
            $.ajax({
                url: 'http://localhost:8082/login',
                type: 'post',
                data: request,
                crossDomain: true,
                success: function (data) {
                    responseHandler(data);
                }
            });
        }
        // Prevent Default action
        event.preventDefault();
    });
});