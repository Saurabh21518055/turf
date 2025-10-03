document.addEventListener("DOMContentLoaded", async ()=>{
  const bookingId = urlParam("bookingId");
  if(!bookingId) return location.href="index.html";

  // const data = await api(`/bookings/${bookingId}`);
  const data = { id: bookingId, code:"TB-AB12CD", turf:"Green Field Arena", date:"2025-10-01", time:"18:00-19:00" }; // demo

  qs("#bkId").textContent = data.id;
  qs("#bkCode").textContent = data.code;
  qs("#bkTurf").textContent = data.turf;
  qs("#bkDate").textContent = data.date;
  qs("#bkTime").textContent = data.time;

  // set PDF link
  const pdfBtn = qs("#btnPdf");
  pdfBtn.href = `#`; // replace with API URL that serves PDF
});
