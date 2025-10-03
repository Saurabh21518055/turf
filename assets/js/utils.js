function formatINR(n){ return Number(n||0).toLocaleString("en-IN"); }
function toast(msg){ alert(msg); } // replace with Bootstrap toast if you like

// simple debounce
function debounce(fn, wait=300){
  let t; return (...args)=>{ clearTimeout(t); t=setTimeout(()=>fn(...args), wait); };
}
