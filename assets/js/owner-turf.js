// document.addEventListener("DOMContentLoaded", ()=>{
//   const tid = urlParam("tid");
//   if(tid){ loadExisting(tid); }

//   qs("#turfForm").addEventListener("submit", async (e)=>{
//     e.preventDefault();
//     const payload = {
//       name: qs("#name").value.trim(),
//       price: Number(qs("#price").value||0),
//       address: qs("#address").value.trim(),
//       facilities: qs("#facilities").value.split(",").map(s=>s.trim()).filter(Boolean),
//       mapUrl: qs("#mapUrl").value.trim()
//     };
//     // Files: use FormData when wiring
//     // const res = tid ? await api(`/owner/turfs/${tid}`, {method:"PUT", body:payload}) : await api(`/owner/turfs`, {method:"POST", body:payload});
//     toast("Saved (demo). Redirecting…");
//     setTimeout(()=>location.href="owner-dashboard.html", 600);
//   });
// });

// async function loadExisting(tid){
//   // const t = await api(`/owner/turfs/${tid}`);
//   const t = { name:"Green Field Arena", price:800, address:"Andheri, Mumbai", facilities:["Parking","Floodlights"], mapUrl:"https://maps.google.com" };
//   qs("#name").value = t.name;
//   qs("#price").value = t.price;
//   qs("#address").value = t.address;
//   qs("#facilities").value = t.facilities.join(", ");
//   qs("#mapUrl").value = t.mapUrl;
// }

// // assets/js/owner-turf.js

// // Safe shims
// window.qs  = window.qs  || ((s, el=document) => el.querySelector(s));
// window.qsa = window.qsa || ((s, el=document) => [...el.querySelectorAll(s)]);
// const toast = window.toast || ((m)=>alert(m));

// document.addEventListener('DOMContentLoaded', () => {
//   const form   = document.getElementById('turfForm');
//   const videos = document.getElementById('videos');

//   if (!form) return;

//   // validate on choose
//   videos?.addEventListener('change', () => validateVideos(videos));

//   // validate on submit
//   form.addEventListener('submit', async (e) => {
//     const ok = await validateVideos(videos);
//     if (!ok) { e.preventDefault(); e.stopImmediatePropagation(); }
//   });
// });

// /**
//  * Validates:
//  *  - Max files = data-max-count (default 3)
//  *  - Each video duration between data-min-seconds..data-max-seconds (default 10..30s)
//  *  - Combined size ≤ data-max-total-mb (default 100MB)
//  * Returns Promise<boolean>.
//  */
// async function validateVideos(inputEl) {
//   if (!inputEl) return true;

//   const files = Array.from(inputEl.files || []);
//   if (!files.length) return true; // optional field

//   const maxCount = Number(inputEl.dataset.maxCount || 3);
//   const minSec   = Number(inputEl.dataset.minSeconds || 10);
//   const maxSec   = Number(inputEl.dataset.maxSeconds || 30);
//   const maxTotal = Number(inputEl.dataset.maxTotalMb || 100) * 1024 * 1024;

//   // count
//   if (files.length > maxCount) {
//     toast(`You can upload at most ${maxCount} videos.`);
//     inputEl.value = "";
//     return false;
//   }

//   // total size
//   const totalSize = files.reduce((sum, f) => sum + f.size, 0);
//   if (totalSize > maxTotal) {
//     toast(`Total video size must be ≤ ${(maxTotal/1048576).toFixed(0)} MB. Selected: ${(totalSize/1048576).toFixed(1)} MB.`);
//     inputEl.value = "";
//     return false;
//   }

//   // duration checks
//   try {
//     await Promise.all(files.map((f) => checkDuration(f, minSec, maxSec)));
//   } catch (msg) {
//     toast(msg || 'One or more videos have invalid duration.');
//     inputEl.value = "";
//     return false;
//   }

//   return true;
// }

// function checkDuration(file, minSec, maxSec) {
//   return new Promise((resolve, reject) => {
//     const url = URL.createObjectURL(file);
//     const v = document.createElement('video');
//     v.preload = 'metadata';
//     v.muted = true;
//     v.src = url;

//     v.onloadedmetadata = () => {
//       URL.revokeObjectURL(url);
//       const dur = v.duration;
//       if (isNaN(dur)) return reject(`Could not read duration for "${file.name}".`);
//       if (dur < minSec || dur > maxSec) {
//         return reject(`"${file.name}" must be between ${minSec}s and ${maxSec}s (got ${Math.round(dur)}s).`);
//       }
//       resolve();
//     };

//     v.onerror = () => {
//       URL.revokeObjectURL(url);
//       reject(`Could not load "${file.name}".`);
//     };
//   });
// }

// assets/js/owner-turf.js

// ---------- Safe shims ----------
window.qs  = window.qs  || ((s, el=document) => el.querySelector(s));
window.qsa = window.qsa || ((s, el=document) => [...el.querySelectorAll(s)]);
window.toast = window.toast || ((m)=>alert(m));
window.urlParam = window.urlParam || (k => new URLSearchParams(location.search).get(k));

// ---------- Page boot ----------
document.addEventListener("DOMContentLoaded", () => {
  const tid    = urlParam("tid");
  const form   = qs("#turfForm");
  const videos = qs("#videos");

  if (tid) loadExisting(tid);
  if (!form) return;

  // Validate videos when user selects files
  videos?.addEventListener("change", () => validateVideos(videos));

  // Single submit handler (validates videos first, then proceeds with your save logic)
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const ok = await validateVideos(videos);
    if (!ok) return; // block submit if invalid

    const payload = {
      name: qs("#name").value.trim(),
      price: Number(qs("#price").value || 0),
      address: qs("#address").value.trim(),
      facilities: qs("#facilities").value.split(",").map(s => s.trim()).filter(Boolean),
      mapUrl: qs("#mapUrl").value.trim()
    };

    // NOTE: When wiring to backend, switch to FormData to send photos & videos.
    // const fd = new FormData();
    // Object.entries(payload).forEach(([k,v]) => fd.append(k, Array.isArray(v) ? JSON.stringify(v) : v));
    // for (const f of (qs("#photos")?.files || [])) fd.append("photos", f);
    // for (const v of (videos?.files || [])) fd.append("videos", v);
    // const res = tid
    //   ? await api(`/owner/turfs/${tid}`, { method:"PUT", body: fd })
    //   : await api(`/owner/turfs`,       { method:"POST", body: fd });

    toast("Saved (demo). Redirecting…");
    setTimeout(() => location.href = "owner-dashboard.html", 600);
  });
});

// ---------- Demo prefiller ----------
async function loadExisting(tid){
  // const t = await api(`/owner/turfs/${tid}`);
  const t = { name:"Green Field Arena", price:800, address:"Andheri, Mumbai", facilities:["Parking","Floodlights"], mapUrl:"https://maps.google.com" };
  qs("#name").value = t.name;
  qs("#price").value = t.price;
  qs("#address").value = t.address;
  qs("#facilities").value = (t.facilities || []).join(", ");
  qs("#mapUrl").value = t.mapUrl || "";
}

// ---------- Validation: up to 3 videos, each 10–30s, total ≤ 100 MB ----------
async function validateVideos(inputEl){
  if (!inputEl) return true;
  const files = Array.from(inputEl.files || []);
  if (!files.length) return true; // optional field

  const maxCount = Number(inputEl.dataset.maxCount || 3);
  const minSec   = Number(inputEl.dataset.minSeconds || 10);
  const maxSec   = Number(inputEl.dataset.maxSeconds || 30);
  const maxTotal = Number(inputEl.dataset.maxTotalMb || 100) * 1024 * 1024;

  // Count
  if (files.length > maxCount) {
    toast(`You can upload at most ${maxCount} videos.`);
    inputEl.value = "";
    return false;
  }

  // Total size
  const totalSize = files.reduce((sum, f) => sum + f.size, 0);
  if (totalSize > maxTotal) {
    toast(`Total video size must be ≤ ${(maxTotal/1048576).toFixed(0)} MB. Selected: ${(totalSize/1048576).toFixed(1)} MB.`);
    inputEl.value = "";
    return false;
  }

  // Durations
  try {
    await Promise.all(files.map(f => checkDuration(f, minSec, maxSec)));
  } catch (msg) {
    toast(msg || "One or more videos have invalid duration.");
    inputEl.value = "";
    return false;
  }

  return true;
}

function checkDuration(file, minSec, maxSec){
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const v = document.createElement("video");
    v.preload = "metadata";
    v.muted = true;
    v.src = url;

    v.onloadedmetadata = () => {
      URL.revokeObjectURL(url);
      const dur = v.duration;
      if (isNaN(dur)) return reject(`Could not read duration for "${file.name}".`);
      if (dur < minSec || dur > maxSec) {
        return reject(`"${file.name}" must be between ${minSec}s and ${maxSec}s (got ${Math.round(dur)}s).`);
      }
      resolve();
    };
    v.onerror = () => {
      URL.revokeObjectURL(url);
      reject(`Could not load "${file.name}".`);
    };
  });
}
