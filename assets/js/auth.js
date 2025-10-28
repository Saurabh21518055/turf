// // function saveToken(token, role){ localStorage.setItem("auth_token", token); localStorage.setItem("auth_role", role); }
// // function getToken(){ return localStorage.getItem("auth_token"); }
// // function getRole(){ return localStorage.getItem("auth_role"); }
// // function logout(){ localStorage.removeItem("auth_token"); localStorage.removeItem("auth_role"); location.href="login.html"; }

// // function requireAuth(roles){
// //   const t=getToken(), r=getRole();
// //   if(!t || !roles.includes(r)) location.href="login.html";
// // }

// // // API calls (adjust endpoints to your backend)
// // async function loginUser(payload){ return api("/auth/login",{method:"POST", body:payload, auth:false}); }
// // async function registerUser(payload, role){ return api(`/auth/register-${role}`,{method:"POST", body:payload, auth:false}); }
// // async function forgotPassword(email){ return api("/auth/forgot-password",{method:"POST", body:{email}, auth:false}); }


// // //-------------
// const AUTH_KEY = "tb_user";  // stored in localStorage

// // Return { role, email, name } or null
// function getUser() {
//   try { return JSON.parse(localStorage.getItem(AUTH_KEY) || "null"); }
//   catch { return null; }
// }

// function getToken() {
//   return !!getUser(); // mimic "token present"
// }

// function getRole() {
//   return getUser()?.role || null;
// }

// function setUser(u) {
//   localStorage.setItem(AUTH_KEY, JSON.stringify(u));
// }

// function logout() {
//   localStorage.removeItem(AUTH_KEY);
//   location.href = "index.html";
// }

// // ============= LOGIN PAGE HOOK =============
// function initLoginPage() {
//   const form = document.querySelector("#loginForm");
//   if (!form) return;

//   form.addEventListener("submit", (e) => {
//     e.preventDefault();
//     const email = document.querySelector("#loginEmail").value.trim();
//     const role  = document.querySelector("#loginRole").value;
//     const name  = email.split("@")[0];

//     setUser({ email, role, name });

//     if (role === "customer") {
//       location.href = "book-slot.html"; // redirect to home page
//     } else if (role === "owner") {
//       location.href = "owner-dashboard.html";
//     } else if (role === "admin") {
//       location.href = "admin-dashboard.html";
//     }
//   });
// }

// // ============= REGISTER (Customer) =============
// function initRegisterCustomerPage() {
//   const form = document.querySelector("#registerCustomerForm");
//   if (!form) return;

//   form.addEventListener("submit", (e) => {
//     e.preventDefault();
//     alert("Registered! Please login now.");
//     location.href = "index.html"; // go to home/login page
//   });
// }

// // Auto init
// document.addEventListener("DOMContentLoaded", () => {
//   initLoginPage();
//   initRegisterCustomerPage();
// });

// // Expose globally for layout.js
// window.getRole = getRole;
// window.getToken = getToken;
// window.logout = logout;
// // AUTH.JS

// async function forgotPassword(email, { role = 'admin' } = {}) {
//   // return api('/auth/admin/forgot', { method:'POST', body:{ email }});
//   await new Promise(r=>setTimeout(r,300)); // mock delay
//   return { message: `If the email exists, a reset link has been sent to ${email}.` };
// }
// window.forgotPassword = forgotPassword;

//--
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
  // Optional: clear any pending redirect
  localStorage.removeItem("redirectAfterLogin");
  location.href = "login.html"; // or "index.html" if you prefer
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

    // If user was bounced from a protected page, send them back there
    const pending = localStorage.getItem("redirectAfterLogin");

    let target;
    if (pending) {
      target = pending;
    } else if (role === "customer") {
      target = "book-slot.html";              // 👈 default for customers
    } else if (role === "owner") {
      target = "owner-dashboard.html";
    } else {
      target = "admin-dashboard.html";
    }

    // Clean up and go
    localStorage.removeItem("redirectAfterLogin");
    location.href = target;
  });
}

// ============= REGISTER (Customer) =============
function initRegisterCustomerPage() {
  const form = document.querySelector("#registerCustomerForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Registered! Please login now.");
    location.href = "login.html"; // send to login
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

// AUTH.JS (extra)
async function forgotPassword(email, { role = 'admin' } = {}) {
  await new Promise(r=>setTimeout(r,300)); // mock delay
  return { message: `If the email exists, a reset link has been sent to ${email}.` };
}
window.forgotPassword = forgotPassword;


////////////////---------------------------new code wih post api

// const AUTH_KEY = "tb_user";  // stored in localStorage

// // =====================================================
// // ✅ Get user details from localStorage
// // =====================================================
// function getUser() {
//   try { 
//     return JSON.parse(localStorage.getItem(AUTH_KEY) || "null"); 
//   } catch { 
//     return null; 
//   }
// }

// // =====================================================
// // ✅ Check if token (user session) exists
// // =====================================================
// function getToken() {
//   return !!getUser(); // mimic "token present"
// }

// // =====================================================
// // ✅ Get logged-in user's role
// // =====================================================
// function getRole() {
//   return getUser()?.role || null;
// }

// // =====================================================
// // ✅ Save user details in localStorage
// // =====================================================
// function setUser(u) {
//   localStorage.setItem(AUTH_KEY, JSON.stringify(u));
// }

// // =====================================================
// // ✅ Logout user and redirect to login page
// // =====================================================
// function logout() {
//   localStorage.removeItem(AUTH_KEY);
//   localStorage.removeItem("redirectAfterLogin"); // optional cleanup
//   location.href = "login.html";
// }

// // =====================================================
// // ✅ POST: Login user
// // =====================================================
// async function loginUser(email, password) {
//   try {
//     const response = await fetch("/api/auth/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, password })
//     });

//     if (!response.ok) {
//       throw new Error(`Login failed with status ${response.status}`);
//     }

//     const data = await response.json();
//     return data; // { token, user, message, etc. }
//   } catch (error) {
//     console.error("Login error:", error);
//     throw error;
//   }
// }

// // =====================================================
// // ✅ POST: Register new customer
// // =====================================================
// async function registerUser(name, email, password, mobileNo) {
//   try {
//     const response = await fetch("/api/auth/register", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ name, email, password, mobileNo })
//     });

//     if (!response.ok) {
//       throw new Error(`Registration failed with status ${response.status}`);
//     }

//     const data = await response.json();
//     return data; // { message: "User registered successfully", etc. }
//   } catch (error) {
//     console.error("Registration error:", error);
//     throw error;
//   }
// }

// // =====================================================
// // ✅ Login Page Script (Attach Event)
// // =====================================================
// function initLoginPage() {
//   const form = document.querySelector("#loginForm");
//   if (!form) return;

//   form.addEventListener("submit", async (e) => {
//     e.preventDefault();

//     const email = document.querySelector("#loginEmail").value.trim();
//     const password = document.querySelector("#loginPassword").value.trim();
//     const role  = document.querySelector("#loginRole").value;
//     const name  = email.split("@")[0];

//     try {
//       const result = await loginUser(email, password);
//       console.log("Login success:", result);
//       setUser({ email, role, name });

//       const pending = localStorage.getItem("redirectAfterLogin");
//       let target;
//       if (pending) {
//         target = pending;
//       } else if (role === "customer") {
//         target = "book-slot.html";
//       } else if (role === "owner") {
//         target = "owner-dashboard.html";
//       } else {
//         target = "admin-dashboard.html";
//       }

//       localStorage.removeItem("redirectAfterLogin");
//       location.href = target;
//     } catch (err) {
//       alert("Login failed! Please check credentials.");
//     }
//   });
// }

// // =====================================================
// // ✅ Register Customer Script (Attach Event)
// // =====================================================
// function initRegisterCustomerPage() {
//   const form = document.querySelector("#registerCustomerForm");
//   if (!form) return;

//   form.addEventListener("submit", async (e) => {
//     e.preventDefault();

//     const name = document.querySelector("#registerName").value.trim();
//     const email = document.querySelector("#registerEmail").value.trim();
//     const password = document.querySelector("#registerPassword").value.trim();
//     const mobileNo = document.querySelector("#registerMobile").value.trim();

//     try {
//       const result = await registerUser(name, email, password, mobileNo);
//       console.log("Registration success:", result);
//       alert("Registered successfully! Please login now.");
//       location.href = "login.html";
//     } catch (err) {
//       alert("Registration failed! Please try again.");
//     }
//   });
// }

// // =====================================================
// // ✅ Auto initialize login/register pages
// // =====================================================
// document.addEventListener("DOMContentLoaded", () => {
//   initLoginPage();
//   initRegisterCustomerPage();
// });

// // =====================================================
// // ✅ Expose helper functions globally (for layout.js)
// // =====================================================
// window.getRole = getRole;
// window.getToken = getToken;
// window.logout = logout;

// // =====================================================
// // ✅ Forgot Password (Mocked)
// // =====================================================
// async function forgotPassword(email, { role = 'admin' } = {}) {
//   await new Promise(r=>setTimeout(r,300)); // mock delay
//   return { message: `If the email exists, a reset link has been sent to ${email}.` };
// }
// window.forgotPassword = forgotPassword;
