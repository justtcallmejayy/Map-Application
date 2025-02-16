//StAuth10244: I Jay Choksi, 000887533 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.

// Initialize the map and markers array
let map;
let markers = [];

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 43.255, lng: -79.8711 },
    zoom: 13,
    mapId: "southern-guild-450915-f7",
  });
}

// Function to mark the user's location on the map
function markUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        // Create a marker for the user's location with a custom icon
        new google.maps.Marker({
          position: pos,
          map: map,
          title: "Your Current Location",
          icon: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
        });

        map.setCenter(pos); //This will help center the locatoin of the map in the div.
      },
      (error) => {
        alert("Sorry, Error retrieving your location: " + error.message);
      }
    );
  } else {
    alert("Oops, geolocation is not supported by your browser.");
  }
}

// Attach event listener to the "Find My Location" button using id=geo-btn
const geoBtn = document.getElementById("geo-btn");
if (geoBtn) {
  // Check if the button exists before attaching the event listener and its a boolean check
  geoBtn.addEventListener("click", markUserLocation);
}
