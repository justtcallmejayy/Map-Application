//StAuth10244: I Jay Choksi, 000887533 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.

// Initialize the map, markers
let map;
let markers = [];

function initMap() {
  // Initialize the map
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 45.5244, lng: 90.3792 },
    zoom: 12,
    mapId: "southern-guild-450915-f7",
  });
}
