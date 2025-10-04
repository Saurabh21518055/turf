document.addEventListener("DOMContentLoaded", async () => {
  // TODO: fetch filter datasets from API if available
  // render turfs
  await loadTurfs();
  qs("#btnSearch")?.addEventListener("click", ()=>loadTurfs());
  qs("#btnReset")?.addEventListener("click", ()=>{ qsa("select, input").forEach(el=>el.value=""); loadTurfs(); });
});

async function loadTurfs(){
  const q = qs("#txtSearch")?.value?.trim() || "";
  const state = qs("#fltState")?.value || "";
  const city = qs("#fltCity")?.value || "";
  const area = qs("#fltArea")?.value || "";
  const facility = qs("#fltFacility")?.value || "";
  const price = qs("#fltPrice")?.value || "";
  const rating = qs("#fltRating")?.value || "";
  const sortBy = qs("#sortBy")?.value || "relevance";

  // demo: replace with API call
  // const data = await api(`/turfs?state=${state}&city=${city}&...`);
  const data = demoTurfs(); // mock

 const list = qs("#turfList");
list.innerHTML = data.map(t => {
  const href = `turf-details.html?tid=${t.id}`;
  return `
    <div class="col">
      <!-- position-relative is required for stretched-link -->
      <div class="card h-100 card-hover position-relative">

        <!-- Make the IMAGE clickable -->
        <a href="${href}">
          <img class="card-img-top" src="${t.photo}" alt="${t.name}">
        </a>

        <div class="card-body">
          <h5 class="card-title">${t.name}</h5>
          <p class="text-muted small mb-1">${t.area}, ${t.city}</p>
          <div class="d-flex justify-content-between">
            <span class="badge text-bg-secondary">₹${t.price}/hr</span>
            <span class="badge text-bg-success">${t.rating} ★</span>
          </div>

          <!-- Keep the button if you like -->
          <a class="btn btn-sm btn-primary w-100 mt-3" href="${href}">View Details</a>

          <!-- Make the WHOLE card clickable (image + body) -->
          <a href="${href}" class="stretched-link" aria-label="Open ${t.name} details"></a>
        </div>
      </div>
    </div>
  `;
}).join("");

}

// mock data
function demoTurfs(){
  return [
    {id:1,name:"Green Field Arena",city:"Mumbai",area:"Andheri",price:800,rating:4.6,photo:"assets/img/myturf.jpg"},
    {id:2,name:"City Sports Turf",city:"Mumbai",area:"Bandra",price:700,rating:4.4,photo:"assets/img/turff.jpg"},
    {id:3,name:"Sunrise Arena",city:"Pune",area:"Kothrud",price:650,rating:4.2,photo:"assets/img/turffff.jpg"}
  ];
}
//-----------------------
// document.addEventListener("DOMContentLoaded", async () => {
//   await loadTurfs();

//   qs("#btnSearch")?.addEventListener("click", ()=>loadTurfs());
//   qs("#btnReset")?.addEventListener("click", ()=>{
//     qsa("select, input").forEach(el => el.value = "");
//     loadTurfs();
//   });
// });

// async function loadTurfs(){
//   const q        = qs("#txtSearch")?.value?.trim().toLowerCase() || "";
//   const state    = qs("#fltState")?.value || "";
//   const city     = qs("#fltCity")?.value || "";
//   const area     = qs("#fltArea")?.value || "";
//   const facility = qs("#fltFacility")?.value || "";
//   const price    = qs("#fltPrice")?.value || "";
//   const rating   = parseFloat(qs("#fltRating")?.value || "0");
//   const sortBy   = qs("#sortBy")?.value || "relevance";

//   // Replace with API call later:
//   // const data = await api(`/turfs?...`);
//   let rows = demoTurfs();

//   // --- FILTERING ---
//   rows = rows.filter(t => {
//     if (state && t.state !== state) return false;
//     if (city && t.city !== city) return false;
//     if (area && t.area !== area) return false;

//     if (facility) {
//       const has = (t.facilities || []).map(f => f.toLowerCase());
//       if (!has.includes(facility.toLowerCase())) return false;
//     }

//     if (rating && Number(t.rating) < rating) return false;

//     if (price) {
//       if (price === "lt500" && !(t.price < 500)) return false;
//       if (price === "500-1000" && !(t.price >= 500 && t.price <= 1000)) return false;
//       if (price === "gt1000" && !(t.price > 1000)) return false;
//     }

//     if (q) {
//       const hay = `${t.name} ${t.city} ${t.area}`.toLowerCase();
//       if (!hay.includes(q)) return false;
//     }

//     return true;
//   });

//   // --- SORTING ---
//   rows.sort((a,b) => {
//     if (sortBy === "priceAsc") return a.price - b.price;
//     if (sortBy === "priceDesc") return b.price - a.price;
//     if (sortBy === "ratingDesc") return b.rating - a.rating;
//     return 0; // relevance fallback
//   });

//   // --- RENDER ---
//   const list = qs("#turfList");
//   if (!rows.length) {
//     list.innerHTML = `<div class="col"><div class="alert alert-light border">No turfs match your filters.</div></div>`;
//     return;
//   }

//   list.innerHTML = rows.map(t => `
//     <div class="col">
//       <div class="card h-100 card-hover">
//         <img class="card-img-top" src="${t.photo}" alt="${t.name}">
//         <div class="card-body">
//           <h5 class="card-title">${t.name}</h5>
//           <p class="text-muted small mb-1">${t.area}, ${t.city}</p>
//           <div class="d-flex justify-content-between">
//             <span class="badge text-bg-secondary">₹${t.price}/hr</span>
//             <span class="badge text-bg-success">${t.rating} ★</span>
//           </div>
//         </div>
//         <div class="card-footer bg-transparent border-0">
//           <a class="btn btn-sm btn-primary w-100" href="turf-details.html?tid=${t.id}">View Details</a>
//         </div>
//       </div>
//     </div>
//   `).join("");
// }

// // --- MOCK DATA ---
// function demoTurfs(){
//   return [
//     {id:1,name:"Green Field Arena",state:"Maharashtra",city:"Mumbai",area:"Andheri",price:800,rating:4.6,facilities:["Parking","Floodlights"],photo:"assets/img/myturf.jpg"},
//     {id:2,name:"City Sports Turf",state:"Maharashtra",city:"Mumbai",area:"Bandra",price:700,rating:4.4,facilities:["Washroom"],photo:"assets/img/turff.jpg"},
//     {id:3,name:"Sunrise Arena",state:"Maharashtra",city:"Pune",area:"Kothrud",price:650,rating:4.2,facilities:["Parking"],photo:"assets/img/turffff.jpg"},
//     {id:4,name:"Victory Grounds",state:"Gujarat",city:"Ahmedabad",area:"Navrangpura",price:1200,rating:4.8,facilities:["Floodlights","Parking"],photo:"assets/img/turf4.jpg"}
//   ];
// }

// // --- tiny helpers ---
// function qs(s){ return document.querySelector(s); }
// function qsa(s){ return document.querySelectorAll(s); }