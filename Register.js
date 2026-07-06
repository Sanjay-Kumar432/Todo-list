const registerForm = document.getElementById("registerForm");
registerForm.addEventListener("submit", function(e){
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword =
    document.getElementById("confirmPassword").value;
    // Name Validation
   const namePattern =
    /^[a-zA-Z\s]+$/;
    if(name === ""){
        alert("Please enter your name.");
        return;
    }
    if(!namePattern.test(name)){
        alert("Please enter a valid name.");
        return;
    }
    // Email Validation
    const emailPattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(email === ""){
        alert("Please enter your email.");
        return;
    }
    if(!emailPattern.test(email)){
        alert("Please enter a valid email address.");
        return;
    }
    // Password Validation
    const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
    if(password === ""){
        alert("Please enter a password.");
        return;
    }
    if(!passwordPattern.test(password)){
        alert(
`Password must contain: 
Minimum 8 characters
At least one uppercase letter
At least one lowercase letter
At least one number
At least one special character (@$!%*?&)`

);
        return;
    }
    // Confirm Password
    if(confirmPassword === ""){
        alert("Please confirm your password.");
        return;
    }
    if(password !== confirmPassword){
        alert("Passwords do not match.");
        return;
    }
    // Get existing users
    let users = JSON.parse(localStorage.getItem("users")) || [];
    // Check if email already exists
    const userExists = users.some(user => user.email === email);
    if (userExists) {
    alert("An account with this email already exists.");
    return;
}
// Create user object
    const newUser = {
    name: name,
    email: email,
    password: password
    };
    // Save user
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registration Successful!");
    // Redirect to Login Page
    window.location.href = "login.html";
});