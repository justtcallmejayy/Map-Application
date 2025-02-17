//StAuth10244: I Jay Choksi, 000887533 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.

let map;
let markers = [];
let infoWindow;

// Array of preloaded attractions with name, latitude, longitude, category, and description
// Array of preloaded attractions (example markers)
const attractions = [
  {
    name: "Hamilton Public Library-Central",
    lat: 43.259199458470086,
    lng: -79.8704214400625,
    category: "library",
    description:
      "The central branch of Hamilton Public Library offers a vast collection of books, comfortable reading spaces, and engaging community programs, making it a vibrant hub for lifelong learning.",
  },
  {
    name: "Gage Park",
    lat: 43.2422435194995,
    lng: -79.82836645775953,
    category: "park",
    description:
      "A beloved green oasis in Hamilton featuring beautifully landscaped gardens, serene walking paths, and recreational facilities—perfect for family outings or a peaceful afternoon stroll.",
  },
  {
    name: "Redchurch Cafe",
    lat: 43.25570574820305,
    lng: -79.86717859063792,
    category: "cafe",
    description:
      "A charming local cafe known for its artisanal coffee, cozy ambiance, and creative menu, making it an ideal spot for coffee enthusiasts and casual meet-ups.",
  },
  {
    name: "Art Gallery of Hamilton",
    lat: 43.257503851476656,
    lng: -79.87232080810973,
    category: "art",
    description:
      "A vibrant cultural venue that showcases a dynamic mix of contemporary and classical artworks, engaging exhibitions, and community events that inspire creativity.",
  },
  {
    name: "Victoria Park",
    lat: 43.26265349081492,
    lng: -79.88428533996898,
    category: "park",
    description:
      "An expansive urban park offering lush green spaces, scenic water features, and well-equipped playgrounds—a perfect setting for picnics, outdoor activities, and community gatherings.",
  },
  {
    name: "Detour Cafe Hamilton",
    lat: 43.25146099405451,
    lng: -79.86780831665781,
    category: "cafe",
    description:
      "A trendy bistro that serves gourmet coffee and innovative dishes in a stylish atmosphere, attracting both foodies and casual diners alike.",
  },
  {
    name: "Albion Falls",
    lat: 43.20400770646516,
    lng: -79.805219778701,
    category: "falls",
    description:
      "A stunning natural waterfall that captivates visitors with its powerful cascade and picturesque surroundings, offering a refreshing escape into nature.",
  },
  {
    name: "Sherman Falls",
    lat: 43.23886818267005,
    lng: -79.97176920372416,
    category: "falls",
    description:
      "A hidden gem renowned for its scenic beauty and tranquil ambiance, Sherman Falls provides a serene backdrop for a rejuvenating nature experience.",
  },
  {
    name: "Rooney's",
    lat: 43.2481586696763,
    lng: -79.84050621805028,
    category: "cafe",
    description:
      "A vibrant cafe celebrated for its unique coffee blends and inviting atmosphere, making it a favorite destination for locals seeking a quality caffeine fix.",
  },
  {
    name: "The Gully Cafe",
    lat: 43.26599538800686,
    lng: -79.8637803224675,
    category: "cafe",
    description:
      "A relaxed and eclectic cafe that offers expertly brewed coffee, delicious snacks, and a welcoming space to unwind or catch up with friends.",
  },
];

function initMap() {
  // Center the map on Hamilton, Ontario
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 43.255, lng: -79.8711 },
    zoom: 12,
    mapId: "southern-guild-450915-f7",
  });

  infoWindow = new google.maps.InfoWindow();

  // Create markers for each preloaded attraction
  attractions.forEach((attraction) => {
    const marker = new google.maps.Marker({
      position: { lat: attraction.lat, lng: attraction.lng },
      map: map,
      title: attraction.name,
    });

    // Store the marker's category for filtering purposes
    marker.category = attraction.category;

    // Add a click listener to show an info window with the attraction's details
    marker.addListener("click", () => {
      infoWindow.setContent(
        `<h5>${attraction.name}</h5><p>${attraction.description}</p>`
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

        new google.maps.Marker({
          position: pos,
          map: map,
          title: "Your Current Location",
          icon: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
        });

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

// Function to add a new marker based on form input
function addNewMarker(e) {
  e.preventDefault();

  // Get form input values
  const address = document.getElementById("address").value;
  const name = document.getElementById("name").value;
  const description = document.getElementById("description").value;
  const category = document.getElementById("category").value;

  // Create a geocoder instance
  const geocoder = new google.maps.Geocoder();

  geocoder.geocode({ address: address }, (results, status) => {
    if (status === "OK") {
      // Get the location from the geocoding result
      const location = results[0].geometry.location;

      // Create a new marker at the geocoded location
      const marker = new google.maps.Marker({
        position: location,
        map: map,
        title: name,
      });

      // Assign the selected category to the marker for filtering
      marker.category = category;

      // Attach an info window to the new marker using form inputs
      marker.addListener("click", () => {
        infoWindow.setContent(`<h5>${name}</h5><p>${description}</p>`);
        infoWindow.open(map, marker);
      });

      // Add the new marker to the markers array
      markers.push(marker);

      // Optionally, center the map on the new marker
      map.setCenter(location);

      // Optionally, reset the form after successful marker creation
      document.getElementById("markerForm").reset();
    } else {
      alert("Geocode was not successful for the following reason: " + status);
    }
  });
}

// Attach event listeners after the DOM content has loaded
document.addEventListener("DOMContentLoaded", () => {
  // Filter button event listeners
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const category = btn.getAttribute("data-category");
      filterMarkers(category);
    });
  });

  // "Find My Location" button event listener
  const geoBtn = document.getElementById("geo-btn");
  if (geoBtn) {
    geoBtn.addEventListener("click", markUserLocation);
  }

  // Attach the new marker form submit event listener
  const markerForm = document.getElementById("markerForm");
  if (markerForm) {
    markerForm.addEventListener("submit", addNewMarker);
  }
});
