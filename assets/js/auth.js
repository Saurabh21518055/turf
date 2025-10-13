// function saveToken(token, role){ localStorage.setItem("auth_token", token); localStorage.setItem("auth_role", role); }
// function getToken(){ return localStorage.getItem("auth_token"); }
// function getRole(){ return localStorage.getItem("auth_role"); }
// function logout(){ localStorage.removeItem("auth_token"); localStorage.removeItem("auth_role"); location.href="login.html"; }

// function requireAuth(roles){
//   const t=getToken(), r=getRole();
//   if(!t || !roles.includes(r)) location.href="login.html";
// }

// // API calls (adjust endpoints to your backend)
// async function loginUser(payload){ return api("/auth/login",{method:"POST", body:payload, auth:false}); }
// async function registerUser(payload, role){ return api(`/auth/register-${role}`,{method:"POST", body:payload, auth:false}); }
// async function forgotPassword(email){ return api("/auth/forgot-password",{method:"POST", body:{email}, auth:false}); }


// //-------------
const AUTH_KEY = "tb_user";  // stored in localStorage

// Return { role, email, name } or null
function getUser() {
  try { return JSON.parse(localStorage.getItem(AUTH_KEY) || "null"); }
  catch { return null; }
}

function getToken() {
  return !!getUser(); // mimic "token present"
}

function getRole() {
  return getUser()?.role || null;
}

function setUser(u) {
  localStorage.setItem(AUTH_KEY, JSON.stringify(u));
}

function logout() {
  localStorage.removeItem(AUTH_KEY);
  location.href = "index.html";
}

// ============= LOGIN PAGE HOOK =============
function initLoginPage() {
  const form = document.querySelector("#loginForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.querySelector("#loginEmail").value.trim();
    const role  = document.querySelector("#loginRole").value;
    const name  = email.split("@")[0];

    setUser({ email, role, name });

    if (role === "customer") {
      location.href = "book-slot.html"; // redirect to home page
    } else if (role === "owner") {
      location.href = "owner-dashboard.html";
    } else if (role === "admin") {
      location.href = "admin-dashboard.html";
    }
  });
}

// ============= REGISTER (Customer) =============
function initRegisterCustomerPage() {
  const form = document.querySelector("#registerCustomerForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Registered! Please login now.");
    location.href = "index.html"; // go to home/login page
  });
}

// Auto init
document.addEventListener("DOMContentLoaded", () => {
  initLoginPage();
  initRegisterCustomerPage();
});

// Expose globally for layout.js
window.getRole = getRole;
window.getToken = getToken;
window.logout = logout;
// AUTH.JS

async function forgotPassword(email, { role = 'admin' } = {}) {
  // return api('/auth/admin/forgot', { method:'POST', body:{ email }});
  await new Promise(r=>setTimeout(r,300)); // mock delay
  return { message: `If the email exists, a reset link has been sent to ${email}.` };
}
window.forgotPassword = forgotPassword;
