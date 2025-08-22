const BASE_URL = process.env.REACT_APP_API_BASE || "https://health-backend-04x7.onrender.com/api";

async function handle(res){
  if(!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function fetchResources(location, type){
  const url = `${BASE_URL}/resources?location=${encodeURIComponent(location)}&type=${encodeURIComponent(type)}`;
  return handle(await fetch(url));
}

export async function fetchDonors(city, bloodGroup){
  const url = `${BASE_URL}/donors?city=${encodeURIComponent(city)}&bloodGroup=${encodeURIComponent(bloodGroup)}`;
  return handle(await fetch(url));
}

export async function loginUser(username, password){
  const url = `${BASE_URL}/auth/login`;
  return handle(await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  }));
}

export async function submitFeedback(name, email, message){
  const url = `${BASE_URL}/feedback`;
  return handle(await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, message })
  }));
}
