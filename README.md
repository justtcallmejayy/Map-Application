# CitySights Hub

## Overview

CitySights Hub is a web mapping application designed for tourists exploring Hamilton, Ontario. The application displays a variety of local attractions on a Google Map, allowing users to interact with markers, filter locations by category, add new attractions via a form, and obtain directions from their current location to any attraction.

## Features

- **Google Map Integration:**  
  The map is centered on Hamilton, Ontario and displays at least 10 preloaded markers representing various attractions.

- **Info Windows:**  
  Clicking on any marker displays an info window containing unique details about that location (name, description) along with a "Get Directions" button.

- **Filtering:**  
  Users can filter markers by category (e.g., Cafe, Park, Library) using Bootstrap-styled filter buttons.

- **Geolocation:**  
  A "Find My Location" button leverages the Geolocation API to mark the user's current position on the map with a custom icon.

- **Add New Attraction:**  
  Users can add new markers by entering an address, name, description, and selecting a category from a dropdown menu. The application uses the Geocoding API to convert addresses into GPS coordinates and adds the marker with an info window.

- **Directions:**  
  Users can obtain driving directions from their current location to any selected attraction via the "Get Directions" button in each info window.

- **Responsive Design:**  
  The application is styled with Bootstrap and includes responsive design features, ensuring an optimal experience on desktop and mobile devices (including the iPhone SE).

## Technologies Used

- **HTML5 & CSS3** (with Bootstrap for styling and responsive design)
- **JavaScript** (Google Maps JavaScript API, Geolocation API, Directions API, Geocoding API)
- **Git** for version control and commit history

## Setup and Installation

1. **Clone or Download the Repository:**
   ```bash
   git clone https://github.com/justtcallmejayy/Map-Application.git
