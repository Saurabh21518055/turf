// Global config
const BASE_URL = "http://localhost:8080"; // TODO: change per env

// Fetch wrapper with auth header + 401 handling
async function api(path, { method="GET", body, auth=true, headers={} } = {}) {
  const token = localStorage.getItem("auth_token");
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(auth && token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers
    },
    body: body ? JSON.stringify(body) : undefined
  });
  if (res.status === 401) {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_role");
    location.href = "login.html";
    return;
  }
  // handle non-JSON (e.g., PDF)
  const ct = res.headers.get("content-type") || "";
  return ct.includes("application/json") ? res.json() : res.blob();
}

// Quick query helpers
const qs = sel => document.querySelector(sel);
const qsa = sel => Array.from(document.querySelectorAll(sel));
function urlParam(name){ return new URLSearchParams(location.search).get(name); }

