document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  
  if (!form) return; // page safety

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    // Replace this with actual login logic (API call)
    if (email && password) {
      const user = { email, role: 'customer', name: email.split('@')[0] };
      localStorage.setItem('tb_user', JSON.stringify(user)); // Save user in localStorage
      localStorage.setItem('auth_token', 'demo-cust-token'); // Mock token
      localStorage.setItem('auth_role', 'customer'); // Mock role

      // Retrieve the redirect URL from localStorage and redirect the user
      const redirectAfterLogin = localStorage.getItem("redirectAfterLogin") || "index.html"; 
      location.href = redirectAfterLogin; // Redirect back to the desired page (e.g., book-turf.html)
    } else {
      alert("Please enter a valid email and password.");
    }
  });
});
