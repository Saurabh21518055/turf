// assets/js/home.js

document.addEventListener("DOMContentLoaded", async () => {
  // seed data (replace with API when ready)
  DATA = demoTurfs();

  // build dependent dropdowns from DATA
  populateStates();
  populateCities("");   // all cities initially
  populateAreas("", ""); // all areas initially

  await loadTurfs();

  qs("#btnSearch")?.addEventListener("click", ()=>loadTurfs());
  qs("#btnReset")?.addEventListener("click", ()=>{
    qsa("select, input").forEach(el=>el.value="");
    populateCities("");
    populateAreas("", "");
    loadTurfs();
  });
  qs("#sortBy")?.addEventListener("change", ()=>loadTurfs());

  // Cascading filters
  qs("#fltState")?.addEventListener("change", () => {
    const st = qs("#fltState").value;
    populateCities(st);
    // reset area when state changes
    qs("#fltArea").value = "";
    populateAreas(st, "");
  });

  qs("#fltCity")?.addEventListener("change", () => {
    const st = qs("#fltState").value;
    const ct = qs("#fltCity").value;
    populateAreas(st, ct);
  });

  // ✅ Press Enter in any filter → click Search
  const enterToSearch = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      qs("#btnSearch")?.click();
    }
  };
  ["#txtSearch","#fltState","#fltCity","#fltArea","#fltFacility","#fltPrice","#fltRating","#sortBy"]
    .forEach(sel => qs(sel)?.addEventListener("keydown", enterToSearch));
});

/* ========= GLOBAL (mock until API) ========= */
let DATA = []; // filled from demoTurfs() for now

/* ========= GEO HELPERS (build from DATA) ========= */
function uniqSorted(arr){ return [...new Set(arr)].filter(Boolean).sort((a,b)=>a.localeCompare(b)); }

function getStates(){
  return uniqSorted(DATA.map(r=>r.state));
}
function getCities(state){
  return uniqSorted(DATA
    .filter(r => !state || r.state === state)
    .map(r => r.city));
}
function getAreas(state, city){
  return uniqSorted(DATA
    .filter(r => (!state || r.state === state) && (!city || r.city === city))
    .map(r => r.area));
}

function populateStates(){
  const el = qs("#fltState"); if (!el) return;
  const opts = ['<option value="">State</option>', ...getStates().map(s=>`<option value="${s}">${s}</option>`)];
  el.innerHTML = opts.join("");
}
function populateCities(state){
  const el = qs("#fltCity"); if (!el) return;
  const cities = getCities(state);
  el.innerHTML = ['<option value="">City</option>', ...cities.map(c=>`<option value="${c}">${c}</option>`)].join("");
}
function populateAreas(state, city){
  const el = qs("#fltArea"); if (!el) return;
  const areas = getAreas(state, city);
  el.innerHTML = ['<option value="">Area</option>', ...areas.map(a=>`<option value="${a}">${a}</option>`)].join("");
}

/* ========= SORT HELPERS ========= */
function _norm(s){ return (s||"").toString().toLowerCase().trim(); }
function _tokens(q){ return _norm(q).split(/\s+/).filter(Boolean); }

function relevanceScore(t, q){
  if (!q) return 0;
  const name = _norm(t.name);
  const city = _norm(t.city);
  const area = _norm(t.area);
  const facs = Array.isArray(t.facilities) ? t.facilities.map(_norm).join(" ") : "";

  const hay  = `${name} ${city} ${area} ${facs}`;
  const toks = _tokens(q);
  if (!toks.length) return 0;

  let score = 0;
  if (hay.includes(_norm(q))) score += 150; // full-phrase bonus
  for (const tok of toks){
    if (name.includes(tok)) score += 100;
    if (city.includes(tok)) score += 40;
    if (area.includes(tok)) score += 25;
    if (facs.includes(tok)) score += 15;
    if (name.startsWith(tok)) score += 50;
    if (name === tok) score += 200;
  }
  // soft tie-breaks
  const rating = Number(t.rating)||0;
  const price  = Number(t.price)||0;
  score += rating * 2;
  score -= Math.min(price, 5000) / 200;
  return score;
}

function getComparator(sortBy, q){
  return (a,b) => {
    const pa = Number(a.price)||0, pb = Number(b.price)||0;
    const ra = Number(a.rating)||0, rb = Number(b.rating)||0;

    switch (sortBy) {
      case "priceAsc":  return (pa - pb) || (rb - ra) || a.name.localeCompare(b.name);
      case "priceDesc": return (pb - pa) || (rb - ra) || a.name.localeCompare(b.name);
      case "ratingDesc":return (rb - ra) || (pa - pb) || a.name.localeCompare(b.name);
      case "relevance":
      default: {
        const sa = relevanceScore(a, q);
        const sb = relevanceScore(b, q);
        return (sb - sa) || (rb - ra) || (pa - pb) || a.name.localeCompare(b.name);
      }
    }
  };
}
/* ======== /SORT HELPERS ========= */

async function loadTurfs(){
  const q        = qs("#txtSearch")?.value?.trim() || "";
  const state    = qs("#fltState")?.value || "";
  const city     = qs("#fltCity")?.value || "";
  const area     = qs("#fltArea")?.value || "";
  const facility = qs("#fltFacility")?.value || "";
  const priceF   = qs("#fltPrice")?.value || "";
  const ratingF  = parseFloat(qs("#fltRating")?.value || "0");
  const sortBy   = qs("#sortBy")?.value || "relevance";

  // Replace with API call when ready:
  // let rows = await api(`/turfs?...`);
  let rows = DATA.slice();

  // FILTERS
  rows = rows.filter(t => {
    if (state && t.state !== state) return false;
    if (city && t.city !== city) return false;
    if (area && t.area !== area) return false;

    if (facility) {
      const has = (t.facilities || []);
      if (!has.includes(facility)) return false;
    }

    if (ratingF && (Number(t.rating)||0) < ratingF) return false;

    if (priceF) {
      const p = Number(t.price)||0;
      if (priceF === "lt500"     && !(p < 500)) return false;
      if (priceF === "500-1000"  && !(p >= 500 && p <= 1000)) return false;
      if (priceF === "gt1000"    && !(p > 1000)) return false;
    }

    if (q) {
      const hay = `${t.name} ${t.city} ${t.area} ${(t.facilities||[]).join(" ")}`.toLowerCase();
      if (!hay.includes(q.toLowerCase())) return false;
    }
    return true;
  });

  // SORT
  rows.sort(getComparator(sortBy, q));

  // RENDER
  const list = qs("#turfList");
  if (!rows.length) {
    list.innerHTML = `<div class="col"><div class="alert alert-light border">No turfs match your filters.</div></div>`;
    return;
  }

  list.innerHTML = rows.map(t => {
    const href = `turf-details.html?tid=${t.id}`;
    const photo = t.photo || "assets/img/myturf.jpg";
    return `
      <div class="col">
        <div class="card h-100 card-hover position-relative">
          <a href="${href}" class="ratio ratio-16x9">
            <img class="w-100 h-100 rounded-top" style="object-fit:cover" src="${photo}" alt="${t.name}">
          </a>
          <div class="card-body">
            <h5 class="card-title mb-1">${t.name}</h5>
            <p class="text-muted small mb-2">${t.area}, ${t.city}</p>
            <div class="d-flex justify-content-between mb-2">
              <span class="badge text-bg-secondary">₹${t.price}/hr</span>
              <span class="badge text-bg-success">${(Number(t.rating)||0).toFixed(1)} ★</span>
            </div>
            <a class="btn btn-sm btn-primary w-100" href="${href}">View Details</a>
            <a href="${href}" class="stretched-link" aria-label="Open ${t.name} details"></a>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

/* ------- MOCK DATA (keep in sync with your options) ------- */
function demoTurfs(){
  return [
    {id:1,name:"Green Field Arena",state:"Maharashtra",city:"Mumbai",area:"Andheri",price:800,rating:4.6,facilities:["Parking","Floodlights"],photo:"assets/img/myturf.jpg"},
    {id:2,name:"City Sports Turf",state:"Maharashtra",city:"Mumbai",area:"Bandra",price:700,rating:4.4,facilities:["Washroom"],photo:"assets/img/turff.jpg"},
    {id:3,name:"Sunrise Arena",state:"Maharashtra",city:"Pune",area:"Kothrud",price:650,rating:4.2,facilities:["Parking"],photo:"assets/img/turffff.jpg"},
    {id:4,name:"Victory Grounds",state:"Gujarat",city:"Ahmedabad",area:"Navrangpura",price:1200,rating:4.8,facilities:["Floodlights","Parking"],photo:"assets/img/turf4.jpg"},
    {id:5,name:"Urban Kick-Off",state:"Karnataka",city:"Bengaluru",area:"Koramangala",price:950,rating:4.5,facilities:["Parking","Washroom"],photo:"assets/img/turf5.jpg"}
  ];
}



// // assets/js/home.js

// document.addEventListener("DOMContentLoaded", async () => {
//   await loadTurfs();

//   qs("#btnSearch")?.addEventListener("click", ()=>loadTurfs());
//   qs("#btnReset")?.addEventListener("click", ()=>{
//     qsa("select, input").forEach(el=>el.value="");
//     loadTurfs();
//   });
//   qs("#sortBy")?.addEventListener("change", ()=>loadTurfs());
// });

// /* ========= SORT HELPERS (minimal) ========= */
// function _norm(s){ return (s||"").toString().toLowerCase().trim(); }
// function _tokens(q){ return _norm(q).split(/\s+/).filter(Boolean); }

// function relevanceScore(t, q){
//   if (!q) return 0;
//   const name = _norm(t.name);
//   const city = _norm(t.city);
//   const area = _norm(t.area);
//   const facs = Array.isArray(t.facilities) ? t.facilities.map(_norm).join(" ") : "";
//   const hay  = `${name} ${city} ${area} ${facs}`;
//   const toks = _tokens(q);
//   if (!toks.length) return 0;

//   let score = 0;
//   if (hay.includes(_norm(q))) score += 150; // full-phrase bonus
//   for (const tok of toks){
//     if (name.includes(tok)) score += 100;
//     if (city.includes(tok)) score += 40;
//     if (area.includes(tok)) score += 25;
//     if (facs.includes(tok)) score += 15;
//     if (name.startsWith(tok)) score += 50;
//     if (name === tok) score += 200;
//   }
//   // gentle tie-breaks
//   const rating = Number(t.rating)||0;
//   const price  = Number(t.price)||0;
//   score += rating * 2;
//   score -= Math.min(price, 5000) / 200;
//   return score;
// }

// function getComparator(sortBy, q){
//   return (a,b) => {
//     const pa = Number(a.price)||0, pb = Number(b.price)||0;
//     const ra = Number(a.rating)||0, rb = Number(b.rating)||0;

//     switch (sortBy) {
//       case "priceAsc":  return (pa - pb) || (rb - ra) || a.name.localeCompare(b.name);
//       case "priceDesc": return (pb - pa) || (rb - ra) || a.name.localeCompare(b.name);
//       case "ratingDesc":return (rb - ra) || (pa - pb) || a.name.localeCompare(b.name);
//       case "relevance":
//       default: {
//         const sa = relevanceScore(a, q);
//         const sb = relevanceScore(b, q);
//         return (sb - sa) || (rb - ra) || (pa - pb) || a.name.localeCompare(b.name);
//       }
//     }
//   };
// }
// /* ======== /SORT HELPERS ========= */

// async function loadTurfs(){
//   const q        = qs("#txtSearch")?.value?.trim() || "";
//   const sortBy   = qs("#sortBy")?.value || "relevance";

//   // demo: replace with API call when ready
//   // const rows = await api(`/turfs?...`);
//   const rows = demoTurfs(); // mock data

//   // ✅ sort
//   rows.sort(getComparator(sortBy, q));

//   const list = qs("#turfList");
//   list.innerHTML = rows.map(t => `
//     <div class="col">
//       <div class="card h-100 card-hover position-relative">
//         <a href="turf-details.html?tid=${t.id}" class="ratio ratio-16x9">
//           <img class="w-100 h-100 rounded-top" style="object-fit:cover" src="${t.photo}" alt="${t.name}">
//         </a>
//         <div class="card-body">
//           <h5 class="card-title mb-1">${t.name}</h5>
//           <p class="text-muted small mb-2">${t.area}, ${t.city}</p>
//           <div class="d-flex justify-content-between mb-2">
//             <span class="badge text-bg-secondary">₹${t.price}/hr</span>
//             <span class="badge text-bg-success">${t.rating} ★</span>
//           </div>
//           <a class="btn btn-sm btn-primary w-100" href="turf-details.html?tid=${t.id}">View Details</a>
//           <a href="turf-details.html?tid=${t.id}" class="stretched-link" aria-label="Open ${t.name} details"></a>
//         </div>
//       </div>
//     </div>
//   `).join("");
// }

// // mock data
// function demoTurfs(){
//   return [
//     {id:1,name:"Green Field Arena",city:"Mumbai",area:"Andheri",price:800,rating:4.6,photo:"assets/img/myturf.jpg"},
//     {id:2,name:"City Sports Turf",city:"Mumbai",area:"Bandra",price:700,rating:4.4,photo:"assets/img/turff.jpg"},
//     {id:3,name:"Sunrise Arena",city:"Pune",area:"Kothrud",price:650,rating:4.2,photo:"assets/img/turffff.jpg"}
//   ];
// }

// // document.addEventListener("DOMContentLoaded", async () => {
// //   // TODO: fetch filter datasets from API if available
// //   // render turfs
// //   await loadTurfs();
// //   qs("#btnSearch")?.addEventListener("click", ()=>loadTurfs());
// //   qs("#btnReset")?.addEventListener("click", ()=>{ qsa("select, input").forEach(el=>el.value=""); loadTurfs(); });
// // });

// // async function loadTurfs(){
// //   const q = qs("#txtSearch")?.value?.trim() || "";
// //   const state = qs("#fltState")?.value || "";
// //   const city = qs("#fltCity")?.value || "";
// //   const area = qs("#fltArea")?.value || "";
// //   const facility = qs("#fltFacility")?.value || "";
// //   const price = qs("#fltPrice")?.value || "";
// //   const rating = qs("#fltRating")?.value || "";
// //   const sortBy = qs("#sortBy")?.value || "relevance";

// //   // demo: replace with API call
// //   // const data = await api(`/turfs?state=${state}&city=${city}&...`);
// //   const data = demoTurfs(); // mock

// //  const list = qs("#turfList");
// // list.innerHTML = data.map(t => {
// //   const href = `turf-details.html?tid=${t.id}`;
// //   return `
// //     <div class="col">
// //       <!-- position-relative is required for stretched-link -->
// //       <div class="card h-100 card-hover position-relative">

// //         <!-- Make the IMAGE clickable -->
// //         <a href="${href}">
// //           <img class="card-img-top" src="${t.photo}" alt="${t.name}">
// //         </a>

// //         <div class="card-body">
// //           <h5 class="card-title">${t.name}</h5>
// //           <p class="text-muted small mb-1">${t.area}, ${t.city}</p>
// //           <div class="d-flex justify-content-between">
// //             <span class="badge text-bg-secondary">₹${t.price}/hr</span>
// //             <span class="badge text-bg-success">${t.rating} ★</span>
// //           </div>

// //           <!-- Keep the button if you like -->
// //           <a class="btn btn-sm btn-primary w-100 mt-3" href="${href}">View Details</a>

// //           <!-- Make the WHOLE card clickable (image + body) -->
// //           <a href="${href}" class="stretched-link" aria-label="Open ${t.name} details"></a>
// //         </div>
// //       </div>
// //     </div>
// //   `;
// // }).join("");

// // }

// // // mock data
// // function demoTurfs(){
// //   return [
// //     {id:1,name:"Green Field Arena",city:"Mumbai",area:"Andheri",price:800,rating:4.6,photo:"assets/img/myturf.jpg"},
// //     {id:2,name:"City Sports Turf",city:"Mumbai",area:"Bandra",price:700,rating:4.4,photo:"assets/img/turff.jpg"},
// //     {id:3,name:"Sunrise Arena",city:"Pune",area:"Kothrud",price:650,rating:4.2,photo:"assets/img/turffff.jpg"}
// //   ];
// // }
