document.addEventListener("DOMContentLoaded", async ()=>{
  // const kpi = await api("/admin/kpi");
  const kpi = { revenue: 320000, bookings: 540, owners: 42, activeUsers: 1200 };
  qs("#revTotal").textContent = formatINR(kpi.revenue);
  qs("#countBookings").textContent = kpi.bookings;
  qs("#countOwners").textContent = kpi.owners;
  qs("#activeUsers").textContent = kpi.activeUsers;

  // trends - sample Chart.js
  const ctx = document.getElementById('chartBookings');
  if(ctx && window.Chart){
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ["Apr","May","Jun","Jul","Aug","Sep"],
        datasets: [{ label:"Bookings", data:[60,72,85,90,110,123] }]
      },
      options: { responsive:true, maintainAspectRatio:false }
    });
  }
});
