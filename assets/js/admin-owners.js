document.addEventListener("DOMContentLoaded", async ()=>{
  if(location.pathname.endsWith("admin-owners.html")){
    // const owners = await api("/admin/owners");
    const owners = [
      {id:1,name:"Ravi Shah",email:"ravi@example.com",phone:"9876543210",status:"PENDING"},
      {id:2,name:"Neha Patil",email:"neha@example.com",phone:"9123456780",status:"APPROVED"}
    ];
    const tbody = qs("#ownersRows");
    tbody.innerHTML = owners.map(o=>`
      <tr>
        <td class="fw-semibold">${o.name}</td>
        <td>${o.email}</td>
        <td>${o.phone}</td>
        <td><span class="badge ${o.status==="APPROVED"?"text-bg-success":o.status==="PENDING"?"text-bg-warning":"text-bg-secondary"}">${o.status}</span></td>
        <td class="d-flex gap-2">
          ${o.status==="PENDING"?`<button class="btn btn-sm btn-success" onclick="approve(${o.id})">Approve</button>`:""}
          <a class="btn btn-sm btn-outline-primary" href="admin-owner-details.html?oid=${o.id}">View</a>
          <button class="btn btn-sm btn-outline-danger" onclick="suspend(${o.id})">Suspend</button>
        </td>
      </tr>`).join("");
  } else {
    // details page
    const oid = urlParam("oid") || 1;
    // const owner = await api(`/admin/owners/${oid}`);
    const owner = { id:oid, name:"Ravi Shah", email:"ravi@example.com", phone:"9876543210", status:"APPROVED" };
    qs("#ownerCard").innerHTML = `
      <div class="d-flex justify-content-between">
        <div>
          <div class="fw-semibold">${owner.name}</div>
          <div class="small text-muted">${owner.email} • ${owner.phone}</div>
        </div>
        <div><span class="badge text-bg-success">${owner.status}</span></div>
      </div>`;

    // turfs
    const turfs = [
      {id:1,name:"Green Field Arena",price:800,photo:"assets/img/gallery1.jpg"},
      {id:2,name:"City Sports Turf",price:700,photo:"assets/img/gallery2.jpg"}
    ];
    qs("#turfs").innerHTML = turfs.map(t=>`
      <div class="col">
        <div class="card h-100">
          <img src="${t.photo}" class="card-img-top" alt="${t.name}">
          <div class="card-body"><h5 class="card-title">${t.name}</h5><span class="badge text-bg-secondary">₹${t.price}/hr</span></div>
        </div>
      </div>`).join("");

    // bookings
    const bks = [
      {id:"BK1A2B3", customer:"Aman Gupta", turf:"Green Field Arena", date:"2025-10-01", amount:800, status:"CONFIRMED"}
    ];
    qs("#bookingsRows").innerHTML = bks.map(b=>`
      <tr><td>${b.id}</td><td>${b.customer}</td><td>${b.turf}</td><td>${b.date}</td><td>₹${formatINR(b.amount)}</td><td><span class="badge ${badgeClass(b.status)}">${b.status}</span></td></tr>
    `).join("");
  }
});

async function approve(id){ toast("Approved owner "+id+" (demo)"); }
async function suspend(id){ toast("Suspended owner "+id+" (demo)"); }
