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
    alert('Incorrect username or password');
  }
}

// Handle signup
function handleSignup(event) {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const storedUsers = JSON.parse(localStorage.getItem('users') || '{}');
  if (storedUsers[username]) {
    alert('Username already exists');
  } else {
    storedUsers[username] = password;
    localStorage.setItem('users', JSON.stringify(storedUsers));
    alert('Signup successful! You can now log in.');
    showLoginForm();
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

  let tableHTML = '<table><thead><tr><th>Day</th><th>Period A</th><th>Period B</th></tr></thead><tbody>';

  weekdays.forEach(day => {
    tableHTML += '<tr>';
    tableHTML += `<td>${day}</td>`;
    periods.forEach(period => {
      tableHTML += `<td><input type="text" id="${day}-${period}" placeholder="Teacher Name"></td>`;
    });
    tableHTML += '</tr>';
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

  weekdays.forEach(day => {
    schedule[day] = {};
    periods.forEach(period => {
      const teacherName = document.getElementById(`${day}-${period}`).value;
      schedule[day][period] = teacherName;
    });
  });

  localStorage.setItem(`schedule-${currentUser}`, JSON.stringify(schedule));
  alert('Schedule saved!');

  // Update the displayed schedule
  displaySchedule();
}

// Function to load and display the saved schedule
function loadSchedule() {
  const currentUser = localStorage.getItem('currentUser');
  if (!currentUser) return;

  const schedule = JSON.parse(localStorage.getItem(`schedule-${currentUser}`) || '{}');
  displaySchedule(schedule);
}

// Function to display the schedule
function displaySchedule(schedule = {}) {
  const scheduleDisplay = document.getElementById('schedule-display');

  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const periods = ['A', 'B'];

  let tableHTML = '<table><thead><tr><th>Day</th><th>Period A</th><th>Period B</th></tr></thead><tbody>';

  weekdays.forEach(day => {
    tableHTML += '<tr>';
    tableHTML += `<td>${day}</td>`;
    periods.forEach(period => {
      const teacherName = schedule[day] && schedule[day][period] ? schedule[day][period] : '';
      tableHTML += `<td>${teacherName}</td>`;
    });
    tableHTML += '</tr>';
  });

  tableHTML += '</tbody></table>';

  scheduleDisplay.innerHTML = tableHTML;
}

// Initial setup: Show the login form by default
showLoginForm();
