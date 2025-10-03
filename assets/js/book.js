// // document.addEventListener("DOMContentLoaded", ()=>{
// //   const tid = urlParam("tid");
// //   const tname = decodeURIComponent(urlParam("tname")||"");
// //   const price = Number(urlParam("price")||0);
// //   if(!tid) return location.href="index.html";

// //   qs("#sumTurf").textContent = tname;

// //   // simple slot generator 6am-11pm
// //   renderSlots();

// //   qs("#slotDate").addEventListener("change", renderSlots);
// //   qs("#duration").addEventListener("change", updateSummary);
// //   qs("#btnProceed").addEventListener("click", proceed);

// //   function renderSlots(){
// //     const cont = qs("#slots"); cont.innerHTML="";
// //     const d = qs("#slotDate").value || new Date().toISOString().slice(0,10);
// //     if(!qs("#slotDate").value) qs("#slotDate").value = d;

// //     for(let h=6; h<=22; h++){
// //       const t = `${String(h).padStart(2,"0")}:00`;
// //       const btn = document.createElement("button");
// //       btn.className="btn btn-outline-primary btn-sm";
// //       btn.textContent=t;
// //       btn.addEventListener("click", ()=>{
// //         qsa("#slots .btn").forEach(b=>b.classList.remove("active"));
// //         btn.classList.add("active");
// //         qs("#sumDate").textContent = d;
// //         qs("#sumTime").textContent = t;
// //         updateSummary();
// //       });
// //       cont.appendChild(btn);
// //     }
// //   }

// //   function updateSummary(){
// //     const durMin = Number(qs("#duration").value||60);
// //     qs("#sumDur").textContent = `${durMin/60} hr`;
// //     const amount = Math.round(price * (durMin/60));
// //     qs("#sumAmount").textContent = formatINR(amount);
// //   }

// //   async function proceed(){
// //     const date = qs("#sumDate").textContent;
// //     const time = qs("#sumTime").textContent;
// //     const durMin = Number(qs("#duration").value||60);
// //     if(!date || !time) return toast("Please select a slot.");

// //     // Create booking (PENDING_PAYMENT)
// //     // const resp = await api("/bookings",{method:"POST", body:{ turfId:tid, date, time, duration:durMin }});
// //     // const bookingId = resp.bookingId;

// //     const bookingId = "BK" + Math.random().toString(36).slice(2,8).toUpperCase(); // demo
// //     location.href = `payment.html?bookingId=${bookingId}&amount=${Math.round(price*(durMin/60))}`;
// //   }
// // });


// //--------




// safety shims in case utils.js isn't loaded first (single copy)
// window.qs = window.qs || ((s, el=document) => el.querySelector(s));
// window.qsa = window.qsa || ((s, el=document) => [...el.querySelectorAll(s)]);
// window.readQuery = window.readQuery || (k => new URLSearchParams(location.search).get(k));
// window.toast = window.toast || (m => alert(m));

// document.addEventListener("DOMContentLoaded", ()=>{
//   // Accept either ?tid= or ?turfId=, and optional ?tname=&price=
//   const tid   = readQuery("tid") || readQuery("turfId");
//   let   tname = decodeURIComponent(readQuery("tname") || "");
//   let   price = Number(readQuery("price") || 0);
//   if(!tid) return location.href="index.html";

//   // Elements
//   const sumTurf   = qs("#sumTurf");
//   const sumDate   = qs("#sumDate");
//   const sumTime   = qs("#sumTime");
//   const sumDur    = qs("#sumDur");
//   const sumAmount = qs("#sumAmount");
//   const dateInput = qs("#slotDate");
//   const proceed   = qs("#btnProceed");
//   const duration  = qs("#duration"); // kept in UI; disabled when slots selected

//   // Selected hourly starts keyed as "offset|HH:MM"
//   const selected = new Set();

//   // Build slot plan: 06:00..23:00 (same day), plus 00:00..02:00 (next day)
//   function buildSlots(){
//     const arr = [];
//     for (let h=6; h<=23; h++){            // same day
//       const start = pad2(h)+":00";
//       const end   = pad2((h+1)%24)+":00";
//       const endOffset = (h+1) >= 24 ? 1 : 0;
//       arr.push({ start, end, startOffset:0, endOffset });
//     }
//     for (let h=0; h<=1; h++){             // next day
//       const start = pad2(h)+":00";
//       const end   = pad2(h+1)+":00";
//       arr.push({ start, end, startOffset:1, endOffset:1 });
//     }
//     return arr;
//   }

//   (async function init(){
//     // Fallback to API if name/price not in query
//     if (!tname || !price) {
//       try {
//         const turf = await api(`/turfs/${Number(tid)}`);
//         tname = tname || turf?.name || `Turf #${tid}`;
//         price = price || Number(turf?.price || 0);
//       } catch {}
//     }
//     sumTurf.textContent = tname || `Turf #${tid}`;
//     renderSlots();
//     dateInput.addEventListener("change", onDateChange);
//     if (duration) duration.addEventListener("change", updateSummary);
//     proceed.addEventListener("click", onProceed);
//   })();

//   function onDateChange(){
//     selected.clear();
//     sumTime.textContent = "—";
//     updateSummary();
//     renderSlots();
//   }

//   function renderSlots(){
//     const cont = qs("#slots"); cont.innerHTML = "";
//     const d = dateInput.value || new Date().toISOString().slice(0,10);
//     if (!dateInput.value) dateInput.value = d;

//     buildSlots().forEach(s => {
//       const key = `${s.startOffset}|${s.start}`;
//       const btn = document.createElement("button");
//       btn.type = "button";
//       btn.className = "btn btn-outline-primary btn-sm";
//       btn.dataset.key = key;
//       btn.dataset.offset = String(s.startOffset);
//       btn.dataset.start = s.start;

//       const crossesDay = s.endOffset > s.startOffset;
//       const label = `${to12h(s.start)}–${to12h(s.end)}${ (s.startOffset===1 || crossesDay) ? " (next day)" : "" }`;
//       btn.textContent = label;

//       if (selected.has(key)) btn.classList.add("active");

//       btn.addEventListener("click", ()=>{
//         sumDate.textContent = d;
//         if (selected.has(key)) { selected.delete(key); btn.classList.remove("active"); }
//         else { selected.add(key); btn.classList.add("active"); }
//         updateSummary();
//       });

//       cont.appendChild(btn);
//     });
//   }

//   function updateSummary(){
//     const count = selected.size;
//     const items = [...selected]
//       .map(k => {
//         const [off, start] = k.split("|");
//         const end = nextHour(start);
//         const crossesDay = start === "23:00"; // 23:00→00:00 wraps
//         return { off: Number(off), start, end, crossesDay };
//       })
//       .sort((a,b)=> a.off - b.off || a.start.localeCompare(b.start));

//     sumTime.textContent = items.length
//       ? items.map(s => {
//           const suffix = (s.off===1 || s.crossesDay) ? " (next day)" : "";
//           return `${to12h(s.start)}–${to12h(s.end)}${suffix}`;
//         }).join(", ")
//       : "—";

//     sumDur.textContent = count ? `${count} hr${count>1 ? "s" : ""}` : "—";

//     const amount = (Number(price)||0) * count;
//     sumAmount.textContent = (amount || 0).toLocaleString("en-IN");

//     if (duration) {
//       if (count > 0) { duration.value = 60; duration.disabled = true; }
//       else { duration.disabled = false; }
//     }

//     proceed.disabled = count === 0;
//   }

//   async function onProceed(){
//     const d = dateInput.value;
//     if (!d || selected.size === 0) return toast("Please select at least one slot.");

//     const slots = [...selected]
//       .map(k => {
//         const [off, start] = k.split("|");
//         return { start, dateOffset: Number(off) }; // 0 = same day, 1 = next day
//       })
//       .sort((a,b)=> a.dateOffset - b.dateOffset || a.start.localeCompare(b.start));

//     const amount = (Number(price)||0) * slots.length;

//     const resp = await api("/bookings", {
//       method: "POST",
//       body: {
//         turfId: Number(tid),
//         customerId: getUser().id,
//         slotDate: d,               // base date (YYYY-MM-DD)
//         slots,                     // [{start:"23:00",dateOffset:0}, {start:"00:00",dateOffset:1}]
//         unitPrice: Number(price)||0,
//         amount
//       }
//     });

//     location.href = `payment.html?bookingId=${resp.id}`;
//   }

//   // helpers
//   function pad2(n){ return String(n).padStart(2,"0"); }
//   function nextHour(hhmm){
//     const h = (parseInt(hhmm.slice(0,2),10) + 1) % 24;
//     return pad2(h)+":00";
//   }
//   function to12h(hhmm){
//     let h = parseInt(hhmm.slice(0,2),10);
//     const m = hhmm.slice(3,5);
//     const am = h < 12;
//     const h12 = (h % 12) || 12;
//     return `${h12}:${m} ${am ? "AM" : "PM"}`;
//   }
// });
// safety shims (won't override if utils.js already loaded)


//-------------
window.qs = window.qs || ((s, el=document) => el.querySelector(s));
window.qsa = window.qsa || ((s, el=document) => [...el.querySelectorAll(s)]);
window.readQuery = window.readQuery || (k => new URLSearchParams(location.search).get(k));
window.toast = window.toast || (m => alert(m));

document.addEventListener("DOMContentLoaded", ()=>{
  // Accept either ?tid= or ?turfId=, and optional ?tname=&price=
  const tid   = readQuery("tid") || readQuery("turfId");
  let   tname = decodeURIComponent(readQuery("tname") || "");
  let   price = Number(readQuery("price") || 0);
  if(!tid) return location.href="index.html";

  // Elements
  const sumTurf   = qs("#sumTurf");
  const sumDate   = qs("#sumDate");
  const sumTime   = qs("#sumTime");
  const sumDur    = qs("#sumDur");
  const sumAmount = qs("#sumAmount");
  const dateInput = qs("#slotDate");
  const proceed   = qs("#btnProceed");
  const duration  = qs("#duration"); // kept in UI; disabled when slots selected
  const selectAll = qs("#selectAllSlots"); // <-- new

  // Selected hourly starts as keys like "offset|HH:MM"
  const selected = new Set();

  // Build slot plan: 06:00..23:00 (offset 0), plus 00:00..02:00 (offset 1)
  function buildSlots(){
    const arr = [];
    for (let h=6; h<=23; h++){            // same day
      const start = pad2(h)+":00";
      const end   = pad2((h+1)%24)+":00";
      const endOffset = (h+1) >= 24 ? 1 : 0;
      arr.push({ start, end, startOffset:0, endOffset });
    }
    for (let h=0; h<=1; h++){             // next day (till 2 AM end)
      const start = pad2(h)+":00";
      const end   = pad2(h+1)+":00";
      arr.push({ start, end, startOffset:1, endOffset:1 });
    }
    return arr;
  }

  (async function init(){
    // Fallback to API if name/price not carried in query
    if (!tname || !price) {
      try {
        const turf = await api(`/turfs/${Number(tid)}`);
        tname = tname || turf?.name || `Turf #${tid}`;
        price = price || Number(turf?.price || 0);
      } catch {}
    }
    sumTurf.textContent = tname || `Turf #${tid}`;
    renderSlots();
    dateInput.addEventListener("change", onDateChange);
    if (duration) duration.addEventListener("change", updateSummary);
    proceed.addEventListener("click", onProceed);
    if (selectAll) selectAll.addEventListener("change", onSelectAllChange);
  })();

  function onDateChange(){
    selected.clear();
    sumTime.textContent = "—";
    updateSummary();
    renderSlots();
    syncSelectAllState();
  }

  function renderSlots(){
    const cont = qs("#slots"); cont.innerHTML = "";
    const d = dateInput.value || new Date().toISOString().slice(0,10);
    if (!dateInput.value) dateInput.value = d;

    buildSlots().forEach(s => {
      const key = `${s.startOffset}|${s.start}`; // e.g., "0|06:00" or "1|00:00"
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "btn btn-outline-primary btn-sm";
      btn.dataset.key = key;
      btn.dataset.offset = String(s.startOffset);
      btn.dataset.start = s.start;

      const crossesDay = s.endOffset > s.startOffset;
      const label = `${to12h(s.start)}–${to12h(s.end)}${ (s.startOffset===1 || crossesDay) ? " (next day)" : "" }`;
      btn.textContent = label;

      if (selected.has(key)) btn.classList.add("active");

      btn.addEventListener("click", ()=>{
        sumDate.textContent = d;
        if (selected.has(key)) { selected.delete(key); btn.classList.remove("active"); }
        else { selected.add(key); btn.classList.add("active"); }
        updateSummary();
        syncSelectAllState();
      });

      cont.appendChild(btn);
    });

    syncSelectAllState();
  }

  function updateSummary(){
    const count = selected.size;
    const items = [...selected]
      .map(k => {
        const [off, start] = k.split("|");
        const end = nextHour(start);
        const crossesDay = start === "23:00";
        return { off: Number(off), start, end, crossesDay };
      })
      .sort((a,b)=> a.off - b.off || a.start.localeCompare(b.start));

    sumTime.textContent = items.length
      ? items.map(s => `${to12h(s.start)}–${to12h(s.end)}${ (s.off===1 || s.crossesDay) ? " (next day)" : "" }`).join(", ")
      : "—";

    sumDur.textContent = count ? `${count} hr${count>1 ? "s" : ""}` : "—";

    // Amount = hourly price × number of selected slots
    const amount = (Number(price)||0) * count;
    // Your HTML already has ₹ prefix; show plain number here
    sumAmount.textContent = (amount || 0).toLocaleString("en-IN");

    // Disable duration drop while multi-selecting
    if (duration) {
      if (count > 0) { duration.value = 60; duration.disabled = true; }
      else { duration.disabled = false; }
    }

    proceed.disabled = count === 0;
  }

  async function onProceed(){
    const d = dateInput.value;
    if (!d || selected.size === 0) return toast("Please select at least one slot.");

    const slots = [...selected]
      .map(k => {
        const [off, start] = k.split("|");
        return { start, dateOffset: Number(off) }; // 0 = same day, 1 = next day
      })
      .sort((a,b)=> a.dateOffset - b.dateOffset || a.start.localeCompare(b.start));

    const amount = (Number(price)||0) * slots.length;

    // Create a single booking that contains multiple hourly slots
    const resp = await api("/bookings", {
      method: "POST",
      body: {
        turfId: Number(tid),
        customerId: getUser().id,
        slotDate: d,               // base date (YYYY-MM-DD)
        slots,                     // [{start:"23:00",dateOffset:0}, {start:"00:00",dateOffset:1}]
        unitPrice: Number(price)||0,
        amount
      }
    });

    location.href = `payment.html?bookingId=${resp.id}`;
  }

  // --- Select-all support ---
  function onSelectAllChange(){
    if (!selectAll) return;
    if (selectAll.checked) {
      selectAllSlots();
    } else {
      clearAllSlots();
    }
    updateSummary();
    syncSelectAllState();
  }
  function selectAllSlots(){
    selected.clear();
    buildSlots().forEach(s => selected.add(`${s.startOffset}|${s.start}`));
    qsa('#slots .btn').forEach(b => b.classList.add('active'));
    if (!sumDate.textContent || sumDate.textContent === "—") {
      sumDate.textContent = dateInput.value || new Date().toISOString().slice(0,10);
    }
  }
  function clearAllSlots(){
    selected.clear();
    qsa('#slots .btn').forEach(b => b.classList.remove('active'));
  }
  function syncSelectAllState(){
    if (!selectAll) return;
    const total = buildSlots().length; // 20 hours (6am..2am)
    const sel = selected.size;
    selectAll.indeterminate = sel > 0 && sel < total;
    selectAll.checked = sel > 0 && sel === total;
    if (sel === 0) { selectAll.indeterminate = false; selectAll.checked = false; }
  }

  // helpers
  function pad2(n){ return String(n).padStart(2,"0"); }
  function nextHour(hhmm){
    const h = (parseInt(hhmm.slice(0,2),10) + 1) % 24;
    return pad2(h)+":00";
  }
  function to12h(hhmm){
    let h = parseInt(hhmm.slice(0,2),10);
    const m = hhmm.slice(3,5);
    const am = h < 12;
    const h12 = (h % 12) || 12;
    return `${h12}:${m} ${am ? "AM" : "PM"}`;
  }
});
