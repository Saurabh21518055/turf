

//---
// (async function initLayout() {
//   const nav = qs("#navbar");
//   if (nav) {
//     const html = await fetch("partials/navbar.html").then(r => r.text());
//     nav.innerHTML = html;

//     const right = qs("#navRight");
//     const role = getRole();
//     const logged = !!getToken();

//     // Get logo / brand element
//     const brand = nav.querySelector(".navbar-brand");
//     if (brand) {
//       brand.style.cursor = "pointer";

//       // Guest (not logged in)
//       if (!logged) {
//         brand.addEventListener("click", () => location.href = "index.html");
//       } else {
//         // Logged-in users: refresh page
//         brand.addEventListener("click", () => location.reload());
//       }
//       // Remove href for guests or logged-in users
//       brand.removeAttribute("href");
//     }

//     if (role === "admin") {
//       const leftNav = nav.querySelector(".navbar-nav.me-auto");
//       if (leftNav) leftNav.innerHTML = ""; // remove left links

//       right.innerHTML = `
//         <li class="nav-item"><a class="nav-link" href="admin-dashboard.html">Dashboard</a></li>
//         <li class="nav-item"><a class="nav-link" href="admin-owners.html">Owners</a></li>
//         <li class="nav-item"><button class="btn btn-outline-danger ms-2" onclick="logout()">Logout</button></li>`;
//     } else if (role === "owner") {
//       const leftNav = nav.querySelector(".navbar-nav.me-auto");
//       if (leftNav) leftNav.innerHTML = "";

//       right.innerHTML = `
//         <li class="nav-item"><button class="btn btn-outline-danger ms-2" onclick="logout()">Logout</button></li>`;
//     } else if (!logged) {
//       right.innerHTML = `
//         <li class="nav-item dropdown">
//           <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">Register</a>
//           <ul class="dropdown-menu dropdown-menu-end">
//             <li><a class="dropdown-item" href="register-customer.html">As Player</a></li>
//             <li><a class="dropdown-item" href="register-owner.html">As Owner</a></li>
//           </ul>
//         </li>
//         <li class="nav-item"><a class="nav-link" href="login.html">Login</a></li>
//         <li class="nav-item"><a class="nav-link" href="admin-login.html">Admin</a></li>`;
//     } else {
//       right.innerHTML = `
//         <li class="nav-item"><a class="nav-link" href="customer-history.html">My Bookings</a></li>
//         <li class="nav-item"><button class="btn btn-outline-danger ms-2" onclick="logout()">Logout</button></li>`;
//     }
//   }

//   const foot = qs("#footer");
//   if (foot) {
//     const html = await fetch("partials/footer.html").then(r => r.text());
//     foot.innerHTML = html;
//   }
// })();

//--
(async function initLayout() {
  const nav = qs("#navbar");
  if (nav) {
    const html = await fetch("partials/navbar.html").then(r => r.text());
    nav.innerHTML = html;

    const right = qs("#navRight");
    const role = getRole();
    const logged = !!getToken();

    // Logo / TurfBook brand
    const brand = nav.querySelector(".navbar-brand");
    if (brand) {
      brand.removeAttribute("href");      // remove default link
      brand.style.cursor = "pointer";

      if (role === "customer" || !logged) {
        // Customer or guest: redirect to index
        brand.addEventListener("click", () => location.href = "index.html");
      } else {
        // Owner or admin: just refresh page
        brand.addEventListener("click", () => location.reload());
      }
    }

    // Navbar right links
    if (role === "admin") {
      const leftNav = nav.querySelector(".navbar-nav.me-auto");
      if (leftNav) leftNav.innerHTML = ""; // remove left links
      right.innerHTML = `
        <li class="nav-item"><a class="nav-link" href="admin-dashboard.html">Dashboard</a></li>
        <li class="nav-item"><a class="nav-link" href="admin-owners.html">Owners</a></li>
        <li class="nav-item"><button class="btn btn-outline-danger ms-2" onclick="logout()">Logout</button></li>`;
    } else if (role === "owner") {
      const leftNav = nav.querySelector(".navbar-nav.me-auto");
      if (leftNav) leftNav.innerHTML = "";
      right.innerHTML = `
        <li class="nav-item"><button class="btn btn-outline-danger ms-2" onclick="logout()">Logout</button></li>`;
    } else if (!logged) {
      right.innerHTML = `
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">Register</a>
          <ul class="dropdown-menu dropdown-menu-end">
            <li><a class="dropdown-item" href="register-customer.html">As Player</a></li>
            <li><a class="dropdown-item" href="register-owner.html">As Owner</a></li>
          </ul>
        </li>
        <li class="nav-item"><a class="nav-link" href="login.html">Login</a></li>
        <li class="nav-item"><a class="nav-link" href="admin-login.html">Admin</a></li>`;
    } else {
      right.innerHTML = `
        <li class="nav-item"><a class="nav-link" href="customer-history.html">My Bookings</a></li>
        <li class="nav-item"><button class="btn btn-outline-danger ms-2" onclick="logout()">Logout</button></li>`;
    }
  }

  // Footer
  const foot = qs("#footer");
  if (foot) {
    const html = await fetch("partials/footer.html").then(r => r.text());
    foot.innerHTML = html;
  }
})();
