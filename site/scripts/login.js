// Handle responses from Node image.
function responseHandler(data) {
    console.log(data);
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
            $.post(
                "http://localhost:8082/login",
                request,
                responseHandler,
                "json"
            );
        }
        // Prevent Default action
        event.preventDefault();
    });
});
