document.addEventListener("DOMContentLoaded", async ()=>{
  qs("#btnFilter")?.addEventListener("click", load);
  await load();

  async function load(){
    const from = qs("#from")?.value || "";
    const to = qs("#to")?.value || "";
    const status = qs("#status")?.value || "";
    // const rows = await api(`/admin/bookings?from=${from}&to=${to}&status=${status}`);
    const rows = [
      {id:"BK1A2B3", customer:"Aman Gupta", turf:"Green Field Arena", date:"2025-10-01", amount:800, status:"CONFIRMED"},
      {id:"BK9Z8Y7", customer:"Riya Shah", turf:"City Sports Turf", date:"2025-09-20", amount:700, status:"COMPLETED"}
    ];
    const tbody = qs("#rows");
    tbody.innerHTML = rows.map(r=>`
      <tr>
        <td>${r.id}</td><td>${r.customer}</td><td>${r.turf}</td><td>${r.date}</td>
        <td>₹${formatINR(r.amount)}</td><td><span class="badge ${badgeClass(r.status)}">${r.status}</span></td>
      </tr>`).join("");
  }
});
