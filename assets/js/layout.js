
// (async function initLayout() {
//   const nav = qs("#navbar");
//   if (nav) {
//     const html = await fetch("partials/navbar.html").then(r => r.text());
//     nav.innerHTML = html;

//     const right = qs("#navRight");
//     const role = getRole();
//     const logged = !!getToken();

//     if (role === "owner") {
//       // Left links removed
//       const leftNav = nav.querySelector(".navbar-nav.me-auto");
//       if (leftNav) leftNav.innerHTML = "";

//       // Keep logo + name, but remove link functionality
//       const brand = nav.querySelector(".navbar-brand");
//       if (brand) {
//         brand.removeAttribute("href");          // remove click
//         brand.style.cursor = "default";         // optional: cursor not pointer
//       }

//       // Right side: only Logout
//       right.innerHTML = `
//         <li class="nav-item">
//           <button class="btn btn-outline-danger ms-2" onclick="logout()">Logout</button>
//         </li>`;
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
//     } else if (role === "admin") {
//       right.innerHTML = `
//         <li class="nav-item"><a class="nav-link" href="admin-dashboard.html">Dashboard</a></li>
//         <li class="nav-item"><button class="btn btn-outline-danger ms-2" onclick="logout()">Logout</button></li>`;
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

//---------

// (async function initLayout() {
//   const nav = qs("#navbar");
//   if (nav) {
//     const html = await fetch("partials/navbar.html").then(r => r.text());
//     nav.innerHTML = html;

//     const right = qs("#navRight");
//     const role = getRole();
//     const logged = !!getToken();

//     // Customize navbar for admin
//     if (role === "admin") {
//       // Remove left side links
//       const leftNav = nav.querySelector(".navbar-nav.me-auto");
//       if (leftNav) leftNav.innerHTML = "";

//       // Keep logo + TurfBook name but remove click
//       const brand = nav.querySelector(".navbar-brand");
//       if (brand) {
//         brand.removeAttribute("href");
//         brand.style.cursor = "default";
//       }

//       // Right side: Dashboard, Owners, Logout
//       right.innerHTML = `
//         <li class="nav-item"><a class="nav-link" href="admin-dashboard.html">Dashboard</a></li>
//         <li class="nav-item"><a class="nav-link" href="admin-owners.html">Owners</a></li>
//         <li class="nav-item"><button class="btn btn-outline-danger ms-2" onclick="logout()">Logout</button></li>`;
//     }
//     else if (role === "owner") {
//       // Owner: only logo + Logout
//       const leftNav = nav.querySelector(".navbar-nav.me-auto");
//       if (leftNav) leftNav.innerHTML = "";

//       const brand = nav.querySelector(".navbar-brand");
//       if (brand) {
//         brand.removeAttribute("href");
//         brand.style.cursor = "default";
//       }

//       right.innerHTML = `
//         <li class="nav-item">
//           <button class="btn btn-outline-danger ms-2" onclick="logout()">Logout</button>
//         </li>`;
//     }
//     else if (!logged) {
//       // Guest links
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
//       // Customer links
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

//----

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
//       // Remove default href and make clickable to refresh
//       brand.removeAttribute("href");
//       brand.style.cursor = "pointer";
//       brand.addEventListener("click", () => location.reload());
//     }

//     if (role === "admin") {
//       // Remove left side links
//       const leftNav = nav.querySelector(".navbar-nav.me-auto");
//       if (leftNav) leftNav.innerHTML = "";

//       // Right side: Dashboard, Owners, Logout
//       right.innerHTML = `
//         <li class="nav-item"><a class="nav-link" href="admin-dashboard.html">Dashboard</a></li>
//         <li class="nav-item"><a class="nav-link" href="admin-owners.html">Owners</a></li>
//         <li class="nav-item"><button class="btn btn-outline-danger ms-2" onclick="logout()">Logout</button></li>`;
//     } else if (role === "owner") {
//       // Owner: only Logout
//       const leftNav = nav.querySelector(".navbar-nav.me-auto");
//       if (leftNav) leftNav.innerHTML = "";

//       right.innerHTML = `
//         <li class="nav-item">
//           <button class="btn btn-outline-danger ms-2" onclick="logout()">Logout</button>
//         </li>`;
//     } else if (!logged) {
//       // Guest links
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
//       // Customer links
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



///------------



(async function initLayout() {
  const nav = qs("#navbar");
  if (nav) {
    const html = await fetch("partials/navbar.html").then(r => r.text());
    nav.innerHTML = html;

    const right = qs("#navRight");
    const role = getRole();
    const logged = !!getToken();

    // Get logo / brand element
    const brand = nav.querySelector(".navbar-brand");
    if (brand) {
      // Remove default href and make clickable to refresh
      brand.removeAttribute("href");
      brand.style.cursor = "pointer";
      brand.addEventListener("click", () => location.reload());
    }

    if (role === "admin") {
      // Remove left side links
      const leftNav = nav.querySelector(".navbar-nav.me-auto");
      if (leftNav) leftNav.innerHTML = "";

      // Right side: Dashboard, Owners, Logout
      right.innerHTML = `
        <li class="nav-item"><a class="nav-link" href="admin-dashboard.html">Dashboard</a></li>
        <li class="nav-item"><a class="nav-link" href="admin-owners.html">Owners</a></li>
        <li class="nav-item"><button class="btn btn-outline-danger ms-2" onclick="logout()">Logout</button></li>`;
    } else if (role === "owner") {
      // Owner: only Logout
      const leftNav = nav.querySelector(".navbar-nav.me-auto");
      if (leftNav) leftNav.innerHTML = "";

      right.innerHTML = `
        <li class="nav-item">
          <button class="btn btn-outline-danger ms-2" onclick="logout()">Logout</button>
        </li>`;
    } else if (!logged) {
      // Guest links
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
      // Customer links
      right.innerHTML = `
        <li class="nav-item"><a class="nav-link" href="customer-history.html">My Bookings</a></li>
        <li class="nav-item"><button class="btn btn-outline-danger ms-2" onclick="logout()">Logout</button></li>`;
    }
  }

  const foot = qs("#footer");
  if (foot) {
    const html = await fetch("partials/footer.html").then(r => r.text());
    foot.innerHTML = html;
  }
})();
