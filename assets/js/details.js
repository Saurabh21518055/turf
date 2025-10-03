document.addEventListener("DOMContentLoaded", async ()=>{
  const tid = urlParam("tid");
  if(!tid) return location.href="index.html";

  // const turf = await api(`/turfs/${tid}`, {});
  const turf = { id:tid, name:"Green Field Arena", address:"Andheri, Mumbai", rating:4.6, price:800,
    facilities:["Parking","Floodlights","Washroom"], mapUrl:"https://maps.google.com", photos:[
      "assets/img/turff.jpg","assets/img/turffff.jpg","assets/img/myturf.jpg"
    ], reviews: [{name:"Aman",rating:5,comment:"Great turf!"},{name:"Riya",rating:4,comment:"Good lights."}]
  };

  qs("#turfName").textContent = turf.name;
  qs("#turfAddress").textContent = turf.address;
  qs("#rating").textContent = turf.rating;
  qs("#price").textContent = turf.price;
  qs("#mapUrl").href = turf.mapUrl;

  // photos
  const inner = qs("#carouselInner");
  inner.innerHTML = turf.photos.map((p,i)=>`
    <div class="carousel-item ${i===0?'active':''}">
      <img src="${p}" class="d-block w-100" alt="photo ${i+1}">
    </div>`).join("");

  // facilities
  qs("#facilities").innerHTML = turf.facilities.map(f=>`<span class="badge text-bg-light border">${f}</span>`).join("");

  // reviews
  qs("#reviews").innerHTML = turf.reviews.map(r=>`
    <div class="card">
      <div class="card-body">
        <div class="d-flex align-items-center justify-content-between">
          <strong>${r.name}</strong><span class="badge text-bg-success">${r.rating} ★</span>
        </div>
        <div class="small text-muted mt-1">${r.comment}</div>
      </div>
    </div>`).join("");

  // book button
  const btn = qs("#btnBook");
  btn.href = `book-slot.html?tid=${turf.id}&tname=${encodeURIComponent(turf.name)}&price=${turf.price}`;
});
