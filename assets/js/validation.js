function isEmail(v){ return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }
function required(v){ return v!=null && String(v).trim()!==""; }
