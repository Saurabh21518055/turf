document.addEventListener("DOMContentLoaded", async ()=>{
  await loadHistory();

  qs("#btnFilter")?.addEventListener("click", loadHistory);

  async function loadHistory(){
    const from = qs("#from")?.value || "";
    const to = qs("#to")?.value || "";
    // const rows = await api(`/bookings/my?from=${from}&to=${to}`);
    const rows = demoRows();

    const tbody = qs("#historyRows");
    if(!rows.length){ tbody.innerHTML = `<tr><td colspan="7" class="text-center text-muted">No data</td></tr>`; return; }

    tbody.innerHTML = rows.map(r=>`
      <tr>
        <td>${r.id}</td>
        <td>${r.turf}</td>
        <td>${r.date}</td>
        <td>${r.time}</td>
        <td>₹${formatINR(r.amount)}</td>
        <td><span class="badge ${badgeClass(r.status)}">${r.status}</span></td>
        <td>
          ${r.status==="CONFIRMED" ? `<button class="btn btn-sm btn-outline-secondary me-1" onclick="resched('${r.id}')">Reschedule</button>
          <button class="btn btn-sm btn-outline-danger" onclick="cancelBk('${r.id}')">Cancel</button>` : ""}
        </td>
      </tr>`).join("");
  }
});

function badgeClass(s){ return s==="CONFIRMED"?"text-bg-success":s==="PENDING_PAYMENT"?"text-bg-warning":"text-bg-secondary"; }
function demoRows(){ return [
  {id:"BK1A2B3", turf:"Green Field Arena", date:"2025-10-01", time:"18:00-19:00", amount:800, status:"CONFIRMED"},
  {id:"BK9Z8Y7", turf:"City Sports Turf", date:"2025-09-20", time:"10:00-11:00", amount:700, status:"COMPLETED"}
];}
function resched(id){ toast("Reschedule flow for "+id); }
function cancelBk(id){ if(confirm("Cancel booking "+id+"?")) toast("Cancelled (demo)"); }
