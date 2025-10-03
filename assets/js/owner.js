document.addEventListener("DOMContentLoaded", async ()=>{
  // KPIs
  // const kpi = await api("/owner/kpi");
  const kpi = { revenue: 125000, month: 12000, bookings: 56, turfs: 3 };
  qs("#revTotal").textContent = formatINR(kpi.revenue);
  qs("#revMonth").textContent = formatINR(kpi.month);
  qs("#countBookings").textContent = kpi.bookings;
  qs("#countTurfs").textContent = kpi.turfs;

  // Turfs
  // const turfs = await api("/owner/turfs");
  const turfs = [
    {id:1,name:"Green Field Arena",price:800,photo:"assets/img/gallery1.jpg"},
    {id:2,name:"City Sports Turf",price:700,photo:"assets/img/gallery2.jpg"}
  ];
  qs("#turfs").innerHTML = turfs.map(t=>`
    <div class="col">
      <div class="card h-100">
        <img src="${t.photo}" class="card-img-top" alt="${t.name}">
        <div class="card-body">
          <h5 class="card-title">${t.name}</h5>
          <span class="badge text-bg-secondary">₹${t.price}/hr</span>
        </div>
        <div class="card-footer bg-transparent border-0">
          <a class="btn btn-sm btn-outline-primary w-100" href="owner-turf-edit.html?tid=${t.id}">Edit</a>
        </div>
      </div>
    </div>`).join("");

  // Recent bookings
  // const bks = await api("/owner/bookings?limit=10");
  const bks = [
    {id:"BK1A2B3", turf:"Green Field Arena", date:"2025-10-01", time:"18:00-19:00", amount:800, status:"CONFIRMED"}
  ];
  const rows = qs("#bookingsRows");
  rows.innerHTML = bks.map(r=>`
    <tr><td>${r.id}</td><td>${r.turf}</td><td>${r.date}</td><td>${r.time}</td><td>₹${formatINR(r.amount)}</td><td><span class="badge ${badgeClass(r.status)}">${r.status}</span></td></tr>
  `).join("");
});
