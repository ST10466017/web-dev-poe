// map.js — initialize Leaflet map with two markers
document.addEventListener('DOMContentLoaded', () => {
  const mapEl = document.getElementById('map');
  if(!mapEl) return;

  // Set a reasonable center - Cape Town
  const map = L.map(mapEl).setView([-33.9249, 18.4241], 10);

  // OpenStreetMap tile layer (no API key)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  // Add example markers (example coordinates)
  const locations = [
    {title:'Community Kitchen — Woodstock', coords:[-33.9300,18.4550]},
    {title:'After-school Centre — Khayelitsha', coords:[-34.0416,18.6340]}
  ];

  locations.forEach(loc=>{
    L.marker(loc.coords).addTo(map).bindPopup(`<strong>${loc.title}</strong>`);
  });
});
