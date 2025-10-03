// (async function initLayout(){
//   const nav = qs("#navbar");
//   if(nav){
//     const html = await fetch("partials/navbar.html").then(r=>r.text());
//     nav.innerHTML = html;

//     const right = document.getElementById("navRight");
//     const role = getRole(); const logged = !!getToken();

//     if(!logged){
//       right.innerHTML = `
//         <li class="nav-item dropdown">
//           <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">Register</a>
//           <ul class="dropdown-menu dropdown-menu-end">
//             <li><a class="dropdown-item" href="register-customer.html">As Player</a></li>
//             <li><a class="dropdown-item" href="register-owner.html">As Owner</a></li>
//           </ul>
//         </li>
//         <li class="nav-item"><a class="nav-link" href="login.html">Login</a></li>
//         <li class="nav-item"><a class="nav-link" href="admin-dashboard.html">Admin</a></li>`;
//     } else if(role==="owner"){
//       right.innerHTML = `
//         <li class="nav-item"><a class="nav-link" href="owner-dashboard.html">Owner Dashboard</a></li>
//         <li class="nav-item"><button class="btn btn-outline-danger ms-2" onclick="logout()">Logout</button></li>`;
//     } else if(role==="admin"){
//       right.innerHTML = `
//         <li class="nav-item"><a class="nav-link" href="admin-dashboard.html">Admin</a></li>
//         <li class="nav-item"><button class="btn btn-outline-danger ms-2" onclick="logout()">Logout</button></li>`;
//     } else {
//       right.innerHTML = `
//         <li class="nav-item"><a class="nav-link" href="customer-history.html">My Bookings</a></li>
//         <li class="nav-item"><button class="btn btn-outline-danger ms-2" onclick="logout()">Logout</button></li>`;
//     }
//   }

//   const foot = qs("#footer");
//   if(foot){
//     const html = await fetch("partials/footer.html").then(r=>r.text());
//     foot.innerHTML = html;
//   }
// })();
(async function initLayout(){
  const nav = qs("#navbar");
  if(nav){
    const html = await fetch("partials/navbar.html").then(r=>r.text());
    nav.innerHTML = html;

    const right = document.getElementById("navRight");
    const role = getRole(); const logged = !!getToken();

    if(!logged){
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
    } else if(role==="owner"){
      right.innerHTML = `
        <li class="nav-item"><a class="nav-link" href="owner-dashboard.html">Owner Dashboard</a></li>
        <li class="nav-item"><button class="btn btn-outline-danger ms-2" onclick="logout()">Logout</button></li>`;
    } else if(role==="admin"){
      right.innerHTML = `
        <li class="nav-item"><a class="nav-link" href="admin-dashboard.html">Dashboard</a></li>
        <li class="nav-item"><button class="btn btn-outline-danger ms-2" onclick="logout()">Logout</button></li>`;
    } else {
      right.innerHTML = `
        <li class="nav-item"><a class="nav-link" href="customer-history.html">My Bookings</a></li>
        <li class="nav-item"><button class="btn btn-outline-danger ms-2" onclick="logout()">Logout</button></li>`;
    }
  }

  const foot = qs("#footer");
  if(foot){
    const html = await fetch("partials/footer.html").then(r=>r.text());
    foot.innerHTML = html;
  }
})();