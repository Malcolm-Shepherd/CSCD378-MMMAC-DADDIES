// I don't want to touch this function. -Cameron
function checkForm() {
    let errors = [];

    const fName = document.getElementById("fname");
    const lName = document.getElementById("lname");
    const email = document.getElementById("email");
    const userName = document.getElementById("username");
    const password = document.getElementById("password");
    const passwordCheck = document.getElementById("passCheck");
    const error = document.getElementById("formErrors");
    error.innerHTML = "";

    if (fName.value.length < 1) {
        errors.push("Missing first name.");
        const li = document.createElement("li");
        li.textContent = "Missing first name.";
        error.appendChild(li);
        fName.classList.add("error");
    }
    else {
        fName.classList.remove("error");
    }
    if (lName.value.length < 1) {
        errors.push("Missing first name.");
        const li = document.createElement("li");
        li.textContent = "Missing last name.";
        error.appendChild(li);
        lName.classList.add("error");
    }
    else {
        lName.classList.remove("error");
    }
    let emailRE = (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}$/);
    if (emailRE.test(email.value) === false) {
        errors.push("error");
        const li = document.createElement("li");
        li.textContent = "Invalid email address.";
        error.appendChild(li);
        email.classList.add("error");
    }
    else {
        email.classList.remove("error");
    }
    if (userName.value.length < 1) {
        errors.push("error");
        const li = document.createElement("li");
        li.textContent = "Missing username.";
        error.appendChild(li);
        userName.classList.add("error");
    }
    else {
        userName.classList.remove("error");
    }

    if (password.value.length < 1) {
        errors.push("Password must be between 10 and 20 characters.");
        const li = document.createElement("li");
        li.textContent = "Password must be between 10 and 20 characters.";
        error.appendChild(li);
        password.classList.add("error");
    }
    else {
        password.classList.remove("error");
    }

    if (password.value !== passwordCheck.value ) {
        errors.push("Password and confirmation password don't match.");
        const li = document.createElement("li");
        li.textContent = "Password and confirmation password don't match.";
        error.appendChild(li);

        passwordCheck.classList.add("error");
    }
    else {

        passwordCheck.classList.remove("error");
    }

    if (errors.length > 0) {
        error.classList.remove("hide");
        return false;
    }
    else {
        error.classList.add("hide");
        return true;
    }
}


// Handle requests from Node image.
function responseHandler(data) {
    console.log(data);
    if (data.status == "ok") {
        $("#formErrors")[0].innerHTML = "";
        alert("Registration successful!");
        window.location.href = "http://localhost:8080";
    }
    else {
        $("#formErrors")[0].innerHTML = "<p>There was an error registering the user.</p>";
    }
}


// Wait until page loads.
document.addEventListener("DOMContentLoaded", function() {

    // Get document elements (Maybe we could use JQuery for this?).
    const firstnameField = document.getElementById("fname");
    const lastnameField  = document.getElementById("lname");
    const emailField     = document.getElementById("email");
    const usernameField  = document.getElementById("username");
    const passwordField  = document.getElementById("password");
    const submitButton   = document.getElementById("submit");

    // Add listener to submit button.
    submitButton.addEventListener("click", function(event) {

        // Validate input.
        if (checkForm()) {
            console.log("Hello, world!");

            // Send request to Node image.
            const request = {
                firstname: firstnameField.value,
                lastname:  lastnameField.value,
                email:     emailField.value,
                username:  usernameField.value,
                password:  passwordField.value
            };
            $.post(
                "http://localhost:8082/join",
                request,
                responseHandler,
                "json"
            );
        }

        event.preventDefault();
    });
});
