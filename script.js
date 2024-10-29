// Function to display the login form
function showLoginForm() {
  const authContainer = document.getElementById('auth-container');
  authContainer.innerHTML = `
      <form id="login-form">
          <h2>Login</h2>
          <input type="text" id="username" placeholder="Username" required>
          <input type="password" id="password" placeholder="Password" required>
          <button type="submit">Login</button>
          <p class="signup-link">Don't have an account? <a href="#" onclick="showSignupForm()">Sign Up</a></p>
      </form>
  `;

  document.getElementById('login-form').addEventListener('submit', handleLogin);
}

// Function to display the signup form
function showSignupForm() {
  const authContainer = document.getElementById('auth-container');
  authContainer.innerHTML = `
      <form id="signup-form">
          <h2>Sign Up</h2>
          <input type="text" id="username" placeholder="Username" required>
          <input type="password" id="password" placeholder="Password" required>
          <button type="submit">Sign Up</button>
          <p class="login-link">Already have an account? <a href="#" onclick="showLoginForm()">Login</a></p>
      </form>
  `;

  document.getElementById('signup-form').addEventListener('submit', handleSignup);
}

// Handle login 
function handleLogin(event) {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const storedUsers = JSON.parse(localStorage.getItem('users') || '{}');
  if (storedUsers[username] && storedUsers[username] === password) {
    // Successful login
    localStorage.setItem('currentUser', username);
    showScheduleContainer();
  } else {
    alert('Incorrect username or password. If you forgot your password, please create a new account.');
  }
}

// Handle signup
function handleSignup(event) {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const storedUsers = JSON.parse(localStorage.getItem('users') || '{}');
  if (storedUsers[username]) {
    alert('Username already exists.');
  } else {
    storedUsers[username] = password;
    localStorage.setItem('users', JSON.stringify(storedUsers));
    alert('Signup successful! You can now log in.');
    showLoginForm();
  }
}

// ... (rest of the JavaScript code for schedule input, saving, loading) 
