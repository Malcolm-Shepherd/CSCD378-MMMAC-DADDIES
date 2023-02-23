function checkForm() {
    // TODO: Perform input validation
    const errors = [];
    const fName = document.getElementById("fname");
    const lName = document.getElementById("lname");
    const email = document.getElementById("email");
    const userName = document.getElementById("username")
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
    }
    else {
        error.classList.add("hide");
    }
}

document.getElementById("submit").addEventListener("click", function(event) {
    checkForm();

    // Prevent default form action. DO NOT REMOVE THIS LINE
    event.preventDefault();
});