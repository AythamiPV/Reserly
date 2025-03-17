// Initialize the mapScript centered on Gran Canaria
var mapScript = L.map('mapScript').setView([28.1235, -15.4363], 10);

// Add OpenStreetMap base layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mapScript);

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
                mapScript.removeLayer(singleMarker);
            }

            singleMarker = L.marker([userLat, userLng]).addTo(mapScript);
            singleMarker.bindPopup("Your current location").openPopup();
            mapScript.setView([userLat, userLng], 13);
        }, function(error) {
            console.error("Error getting location: ", error);
        });
    } else {
        console.error("Geolocation not supported by this browser.");
    }
}

// Function to allow adding a single manual marker
function enableManualLocation() {
    mapScript.off('click'); // Remove previous event listeners
    mapScript.on('click', function(e) {
        // Remove existing marker if present
        if (singleMarker) {
            mapScript.removeLayer(singleMarker);
        }

        singleMarker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(mapScript);
        singleMarker.bindPopup("Custom marker").openPopup();
    });
}

// Create buttons in the mapScript without interfering with interactions
var buttonsContainer = L.control({position: 'topright'});
buttonsContainer.onAdd = function () {
    var div = L.DomUtil.create('div', 'mapScript-buttons');
    div.innerHTML = '<button id="locationBtn">Current Location</button>' +
        '<button id="markerBtn">Add Marker</button>';

    L.DomEvent.disableClickPropagation(div); // Prevent clicks on buttons from affecting the mapScript
    return div;
};
buttonsContainer.addTo(mapScript);

// Assign events to buttons
setTimeout(() => {
    document.getElementById('locationBtn').addEventListener('click', showUserLocation);
    document.getElementById('markerBtn').addEventListener('click', enableManualLocation);
}, 100);