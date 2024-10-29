// Function to display the login form
function showLoginForm() {
  const authContainer = document.getElementById('auth-container');
  authContainer.innerHTML = `
      <form id="login-form">
          <input type="text" id="username" placeholder="Username" required>
          <input type="password" id="password" placeholder="Password" required>
          <button type="submit">Login</button>
      </form>
      <button onclick="showSignupForm()">Sign Up</button>
      <button onclick="showForgotPasswordForm()">Forgot Password?</button>
  `;

  document.getElementById('login-form').addEventListener('submit', handleLogin);
}

// Function to display the signup form
function showSignupForm() {
  const authContainer = document.getElementById('auth-container');
  authContainer.innerHTML = `
      <form id="signup-form">
          <input type="text" id="username" placeholder="Username" required>
          <input type="password" id="password" placeholder="Password" required>
          <button type="submit">Sign Up</button>
      </form>
      <button onclick="showLoginForm()">Login</button>
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
    alert('Incorrect username or password.');
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

// Show Forgot Password form (Insecure demo)
function showForgotPasswordForm() {
  const authContainer = document.getElementById('auth-container');
  authContainer.innerHTML = `
    <p>For simplicity, this demo will just show you your password (not secure for real apps!)</p>
    <form id="forgot-password-form">
      <input type="text" id="username" placeholder="Username" required>
      <button type="submit">Retrieve Password</button>
    </form>
  `;

  document.getElementById('forgot-password-form').addEventListener('submit', handleForgotPassword);
}

// Handle Forgot Password (insecure - for illustration only)
function handleForgotPassword(event) {
  event.preventDefault();
  const username = document.getElementById('username').value;

  const storedUsers = JSON.parse(localStorage.getItem('users') || '{}');
  if (storedUsers[username]) {
    alert(`Your password is: ${storedUsers[username]}`);
    showLoginForm();
  } else {
    alert('Username not found.');
  }
}

// Function to show the schedule container 
function showScheduleContainer() {
  document.getElementById('auth-container').style.display = 'none';
  document.getElementById('schedule-container').style.display = 'block';
  buildScheduleInput();
  loadSchedule(); // Load any saved schedule for the user
}

// Function to build the schedule input form
function buildScheduleInput() {
  const scheduleInput = document.getElementById('schedule-input');
  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const periods = ['A', 'B'];
  const teachers = ['Teacher 1', 'Teacher 2', 'Teacher 3', 'Teacher 4', 'Teacher 5', 'Teacher 6', 'Teacher 7']; // Add your 7 teacher names

  let tableHTML = '<table><thead><tr><th>Day</th><th>Period</th>';
  teachers.forEach(teacher => {
    tableHTML += `<th>${teacher}</th>`; 
  });
  tableHTML += '</tr></thead><tbody>';

  weekdays.forEach(day => {
    periods.forEach(period => {
      tableHTML += '<tr>';
      tableHTML += `<td>${day}</td><td>${period}</td>`;
      teachers.forEach(teacher => {
        tableHTML += `<td><select id="${day}-${period}-${teacher.replace(/\s+/g, '')}"><option value="No">No</option><option value="Yes">Yes</option></select></td>`; 
      });
      tableHTML += '</tr>';
    });
  });

  tableHTML += '</tbody></table>';
  tableHTML += '<button onclick="saveSchedule()">Save Schedule</button>';

  scheduleInput.innerHTML = tableHTML;
}

// Function to save the schedule to local storage
function saveSchedule() {
  const currentUser = localStorage.getItem('currentUser');
  if (!currentUser) return; // User not logged in

  const schedule = {};
  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const periods = ['A', 'B'];
  const teachers = ['Teacher 1', 'Teacher 2', 'Teacher 3', 'Teacher 4', 'Teacher 5', 'Teacher 6', 'Teacher 7']; 

  weekdays.forEach(day => {
    schedule[day] = {};
    periods.forEach(period => {
      schedule[day][period] = {};
      teachers.forEach(teacher => {
        const selectId = `${day}-${period}-${teacher.replace(/\s+/g, '')}`;
        const value = document.getElementById(selectId).value;
        schedule[day][period][teacher] = value;
      });
    });
  });

  localStorage.setItem(`schedule-${currentUser}`, JSON.stringify(schedule));
  alert('Schedule saved!');

  // Update the displayed schedule (call displaySchedule if you have a display area)
}

// Function to load and display the saved schedule (if you have a display area)
function loadSchedule() {
  const currentUser = localStorage.getItem('currentUser');
  if (!currentUser) return;

  const schedule = JSON.parse(localStorage.getItem(`schedule-${currentUser}`) || '{}');
  // Add code to display the schedule in the 'schedule-display' div
}

// Initial setup: Show the login form by default
showLoginForm();
