document.addEventListener('DOMContentLoaded', async () => {
    const map = L.map('map').setView([-34.9285, 138.6007], 13); // Set coordinates to Adelaide


    //OpenStreetMap tile layer to the map
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
  
    const vehicleMarkers = {};
    // Function to update the positions of the vehicles on the map
    const updateVehiclePositions = () => {
      fetch('/api/vehicle_positions')
        .then(response => response.json())
        .then(data => {
          data.forEach(vehicle => {
            const vehicleId = vehicle.id;
            const position = [vehicle.latitude, vehicle.longitude];
            // If a marker for the vehicle already exists, update its position i think?

            if (vehicleMarkers[vehicleId]) {
              vehicleMarkers[vehicleId].setLatLng(position);
            } else {
              //if no marker exists we make one and add it
              const marker = L.marker(position).addTo(map);
              vehicleMarkers[vehicleId] = marker;
            }
          });
        })
        .catch(error => console.error('Error fetching vehicle positions:', error));
    };
  
   // console.table(data);
    setInterval(updateVehiclePositions, 10000); // Update every 10 seconds

    try {
      const userLocation = await getUserLocation();
      const userMarkerIcon = L.icon({
        iconUrl: 'person.jpg',
        iconSize: [25, 41], // Set the size of the icon
        iconAnchor: [12, 41], // Set the anchor point of the icon
      });
      L.marker([userLocation.latitude, userLocation.longitude], { icon: userMarkerIcon }).addTo(map);
    } catch (error) {
      console.error('Error getting user location:', error);
    }
  });

  function getUserLocation() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          (error) => {
            reject(error);
          }
        );
      } else {
        reject(new Error('Geolocation is not supported by this browser.'));
      }
    });
  }

 