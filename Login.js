const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    // Validation
    if (email === "" || password === "") {
        alert("Please fill in all fields.");
        return;
    }
    // Get registered users
    const users = JSON.parse(localStorage.getItem("users")) || [];
    // Find matching user
    const user = users.find(user =>
        user.email === email &&
        user.password === password
    );
    if (!user) {
        alert("Invalid Email or Password!");
        return;
    }
    // Save logged in user
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    // alert(`Welcome ${user.name}!`);
    alert("Login Successful");
    
    // Redirect
    window.location.href = "index.html";
});