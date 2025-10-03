document.addEventListener("DOMContentLoaded", ()=>{
  const tid = urlParam("tid");
  if(tid){ loadExisting(tid); }

  qs("#turfForm").addEventListener("submit", async (e)=>{
    e.preventDefault();
    const payload = {
      name: qs("#name").value.trim(),
      price: Number(qs("#price").value||0),
      address: qs("#address").value.trim(),
      facilities: qs("#facilities").value.split(",").map(s=>s.trim()).filter(Boolean),
      mapUrl: qs("#mapUrl").value.trim()
    };
    // Files: use FormData when wiring
    // const res = tid ? await api(`/owner/turfs/${tid}`, {method:"PUT", body:payload}) : await api(`/owner/turfs`, {method:"POST", body:payload});
    toast("Saved (demo). Redirecting…");
    setTimeout(()=>location.href="owner-dashboard.html", 600);
  });
});

async function loadExisting(tid){
  // const t = await api(`/owner/turfs/${tid}`);
  const t = { name:"Green Field Arena", price:800, address:"Andheri, Mumbai", facilities:["Parking","Floodlights"], mapUrl:"https://maps.google.com" };
  qs("#name").value = t.name;
  qs("#price").value = t.price;
  qs("#address").value = t.address;
  qs("#facilities").value = t.facilities.join(", ");
  qs("#mapUrl").value = t.mapUrl;
}
