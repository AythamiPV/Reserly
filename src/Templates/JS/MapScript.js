// Initialize the map centered on Gran Canaria
var map = L.map('map').setView([28.1235, -15.4363], 10);

// Add OpenStreetMap base layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Variable to store the marker (only one allowed)
var singleMarker = null;

// Function to get and show user location
function showUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var userLat = position.coords.latitude;
            var userLng = position.coords.longitude;

            // Remove existing marker if present
            if (singleMarker) {
                map.removeLayer(singleMarker);
            }

            singleMarker = L.marker([userLat, userLng]).addTo(map);
            singleMarker.bindPopup("Your current location").openPopup();
            map.setView([userLat, userLng], 13);
        }, function(error) {
            console.error("Error getting location: ", error);
        });
    } else {
        console.error("Geolocation not supported by this browser.");
    }
}

// Function to allow adding a single manual marker
function enableManualLocation() {
    map.off('click'); // Remove previous event listeners
    map.on('click', function(e) {
        // Remove existing marker if present
        if (singleMarker) {
            map.removeLayer(singleMarker);
        }

        singleMarker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
        singleMarker.bindPopup("Custom marker").openPopup();
    });
}

// Create buttons in the map without interfering with interactions
var buttonsContainer = L.control({position: 'topright'});
buttonsContainer.onAdd = function () {
    var div = L.DomUtil.create('div', 'map-buttons');
    div.innerHTML = '<button id="locationBtn">Current Location</button>' +
        '<button id="markerBtn">Add Marker</button>';

    L.DomEvent.disableClickPropagation(div); // Prevent clicks on buttons from affecting the map
    return div;
};
buttonsContainer.addTo(map);

// Assign events to buttons
setTimeout(() => {
    document.getElementById('locationBtn').addEventListener('click', showUserLocation);
    document.getElementById('markerBtn').addEventListener('click', enableManualLocation);
}, 100);