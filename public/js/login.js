//-------------Login Details:
const loginFormHandler = async (event) => {
  event.preventDefault();
  // Collect values from the login form
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();
  if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
};

//-------------Sign Up Details:
const signupFormHandler = async (event) => {
  event.preventDefault();
  const name = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  if (name && email && password) {
    const response = await fetch('/api/users/signup', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      alert("Account created!"); // Display an alert message
    } else {
      const errorData = await response.json();
      if (errorData.message) {
        alert(errorData.message);
      } else {
        alert(response.statusText);
      }
    }
  }
};

//-------------Used if User Logs In:
document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);
  
//-------------Used if User Signs Up:
document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);