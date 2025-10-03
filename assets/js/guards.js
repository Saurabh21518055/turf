// function guardPublic(){ /* no-op */ }
// function guardCustomer(){ requireAuth(["customer"]); }
// function guardOwner(){ requireAuth(["owner"]); }
// function guardAdmin(){ requireAuth(["admin"]); }
function requireCustomer() {
  const u = getUser();
  if (!u || u.role !== "customer") {
    location.href = "login.html";
  }
}

function requireOwner() {
  const u = getUser();
  if (!u || u.role !== "owner") {
    location.href = "login.html";
  }
}

function requireAdmin() {
  const u = getUser();
  if (!u || u.role !== "admin") {
    location.href = "admin-dashboard.html";
  }
}

// expose globally
window.requireCustomer = requireCustomer;
window.requireOwner = requireOwner;
window.requireAdmin = requireAdmin;