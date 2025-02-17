//StAuth10244: I Jay Choksi, 000887533 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.

let map;
let markers = [];
let infoWindow;
let userLocation = null; // Global variable to store the user's location
let directionsService;
let directionsRenderer;

// Array of preloaded attractions (example markers)
const attractions = [
  {
    name: "Hamilton Public Library-Central",
    lat: 43.259199458470086,
    lng: -79.8704214400625,
    category: "library",
    description:
      "The central branch of Hamilton Public Library offers a vast collection of books, comfortable reading spaces, and engaging community programs.",
  },
  {
    name: "Gage Park",
    lat: 43.2422435194995,
    lng: -79.82836645775953,
    category: "park",
    description:
      "A beloved green oasis featuring landscaped gardens, walking paths, and recreational facilities perfect for family outings.",
  },
  {
    name: "Redchurch Cafe",
    lat: 43.25570574820305,
    lng: -79.86717859063792,
    category: "cafe",
    description:
      "A charming cafe known for its artisanal coffee, cozy ambiance, and creative menu for casual meet-ups.",
  },
  {
    name: "Art Gallery of Hamilton",
    lat: 43.257503851476656,
    lng: -79.87232080810973,
    category: "art",
    description:
      "A vibrant cultural venue showcasing a dynamic mix of contemporary and classical artworks along with engaging exhibitions.",
  },
  {
    name: "Victoria Park",
    lat: 43.26265349081492,
    lng: -79.88428533996898,
    category: "park",
    description:
      "An expansive urban park with lush green spaces, scenic water features, and playgrounds—ideal for picnics and community gatherings.",
  },
  {
    name: "Detour Cafe Hamilton",
    lat: 43.25146099405451,
    lng: -79.86780831665781,
    category: "cafe",
    description:
      "A trendy bistro serving gourmet coffee and innovative dishes in a stylish atmosphere for food enthusiasts.",
  },
  {
    name: "Albion Falls",
    lat: 43.20400770646516,
    lng: -79.805219778701,
    category: "falls",
    description:
      "A stunning natural waterfall that captivates visitors with its powerful cascade and picturesque surroundings.",
  },
  {
    name: "Sherman Falls",
    lat: 43.23886818267005,
    lng: -79.97176920372416,
    category: "falls",
    description:
      "A hidden gem renowned for its scenic beauty and tranquil ambiance, providing a serene nature escape.",
  },
  {
    name: "Rooney's",
    lat: 43.2481586696763,
    lng: -79.84050621805028,
    category: "cafe",
    description:
      "A vibrant cafe celebrated for its unique coffee blends and inviting atmosphere—perfect for a quality caffeine fix.",
  },
  {
    name: "The Gully Cafe",
    lat: 43.26599538800686,
    lng: -79.8637803224675,
    category: "cafe",
    description:
      "A relaxed and eclectic cafe offering expertly brewed coffee, delicious snacks, and a welcoming space to unwind.",
  },
];

function initMap() {
  // Center the map on Hamilton, Ontario
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 43.255, lng: -79.8711 },
    zoom: 13,
    mapId: "southern-guild-450915-f7",
  });

  // Initialize the Directions Service and Renderer
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();
  directionsRenderer.setMap(map);

  infoWindow = new google.maps.InfoWindow();

  // Create markers for each preloaded attraction
  attractions.forEach((attraction) => {
    const marker = new google.maps.Marker({
      position: { lat: attraction.lat, lng: attraction.lng },
      map: map,
      title: attraction.name,
    });

    // Store the marker's category for filtering
    marker.category = attraction.category;

    // Add a click listener to display an info window with details and a "Get Directions" button
    marker.addListener("click", () => {
      infoWindow.setContent(
        `<h5>${attraction.name}</h5>
         <p>${attraction.description}</p>
         <button class="btn btn-sm btn-primary" onclick="getDirections(${attraction.lat}, ${attraction.lng})">Get Directions</button>`
      );
      infoWindow.open(map, marker);
    });

    markers.push(marker);
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

        // Store user location globally
        userLocation = pos;

        // Create a marker for the user's location with a custom icon
        new google.maps.Marker({
          position: pos,
          map: map,
          title: "Your Current Location",
          icon: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
        });

        // Center the map on the user's location
        map.setCenter(pos);
      },
      (error) => {
        alert("Sorry, error retrieving your location: " + error.message);
      }
    );
  } else {
    alert("Oops, geolocation is not supported by your browser.");
  }
}
function addNewMarker(e) {
  e.preventDefault();
  const address = document.getElementById("address").value;
  const name = document.getElementById("name").value;
  const description = document.getElementById("description").value;
  const category = document.getElementById("category").value;

  const geocoder = new google.maps.Geocoder();
  geocoder.geocode({ address: address }, (results, status) => {
    if (status === "OK") {
      const location = results[0].geometry.location;
      const marker = new google.maps.Marker({
        position: location,
        map: map,
        title: name,
      });
      marker.category = category;
      marker.addListener("click", () => {
        infoWindow.setContent(
          `<h5>${name}</h5><p>${description}</p>
           <button class="btn btn-sm btn-primary" onclick="getDirections(${location.lat()}, ${location.lng()})">Get Directions</button>`
        );
        infoWindow.open(map, marker);
      });
      markers.push(marker);
      map.setCenter(location);
      document.getElementById("markerForm").reset();
    } else {
      alert("Geocode was not successful for the following reason: " + status);
    }
  });
}

// Function to get directions from the user's location to the selected destination marker
function getDirections(destLat, destLng) {
  if (!userLocation) {
    alert("Please use 'Find My Location' to set your current location first.");
    return;
  }

  const request = {
    origin: userLocation,
    destination: { lat: destLat, lng: destLng },
    travelMode: google.maps.TravelMode.DRIVING,
  };

  directionsService.route(request, (result, status) => {
    if (status === google.maps.DirectionsStatus.OK) {
      directionsRenderer.setDirections(result);
    } else {
      alert("Directions request failed due to: " + status);
    }
  });
}

// Attach event listeners after the DOM content has loaded
document.addEventListener("DOMContentLoaded", () => {
  // Attach filter button event listeners
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const category = btn.getAttribute("data-category");
      filterMarkers(category);
    });
  });

  // Attach "Find My Location" button event listener
  const geoBtn = document.getElementById("geo-btn");
  if (geoBtn) {
    geoBtn.addEventListener("click", markUserLocation);
  }

  // Attach the new marker form submit event listener (if implemented)
  const markerForm = document.getElementById("markerForm");
  if (markerForm) {
    markerForm.addEventListener("submit", addNewMarker);
  }
});

// Function to filter markers by category
function filterMarkers(category) {
  markers.forEach((marker) => {
    if (category === "all" || marker.category === category) {
      marker.setMap(map);
    } else {
      marker.setMap(null);
    }
  });
}
