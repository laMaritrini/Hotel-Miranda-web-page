const locations = [
  {
    lat: 36.621031798420155,
    lng: -4.49623326888524,
    name: "Andalucía",
    comunidad: 0,
  },

  {
    lat: 36.5144613597142,
    lng: -4.638791991537523,
    name: " Andalucía",
    comunidad: 0,
  },
  {
    lat: 27.758038962138382,
    lng: -15.566572750275627,
    name: " Canarias",
    comunidad: 4,
  },
  {
    lat: 28.355297057619204,
    lng: -13.878716576738322,
    name: " Canarias",
    comunidad: 4,
  },
  {
    lat: 41.828025936421525,
    lng: 3.0848639818443946,
    name: "Cataluña",
    comunidad: 8,
  },
  {
    lat: 41.82544716665779,
    lng: 3.0789740553841107,
    name: "Cataluña",
    comunidad: 8,
  },
  {
    lat: 43.36931894604953,
    lng: -8.392517689571964,
    name: "Galicia",
    comunidad: 11,
  },
  {
    lat: 42.39957389819846,
    lng: -8.817410683503802,
    name: "Galicia",
    comunidad: 11,
  },
  {
    lat: 40.413712695460674,
    lng: -3.6711455816917886,
    name: "Madrid, Comunidad de",
    comunidad: 12,
  },
  {
    lat: 40.422337158255964,
    lng: -3.669849898610936,
    name: "Madrid, Comunidad de",
    comunidad: 12,
  },
  {
    lat: 40.42739376579836,
    lng: -3.7142062351779046,
    name: "Madrid, Comunidad de",
    comunidad: 12,
  },
  {
    lat: 40.42006058574931,
    lng: -3.6887875226964026,
    name: "Madrid, Comunidad de",
    comunidad: 12,
  },
];
let marker;
let response;

let userPosition = [];
let address;
let geocoder;
let map;

function initMap() {
  const hotelMiranda = { lat: 40.42739376579836, lng: -3.7142062351779046 };
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: hotelMiranda,
  });
  const infoWindow = new google.maps.InfoWindow({
    content: "",
    disableAutoPan: true,
  });
  const svgMarker = {
    path: "M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
    fillColor: "red",
    fillOpacity: 0.6,
    strokeWeight: 0,
    rotation: 0,
    scale: 2.5,
    anchor: new google.maps.Point(15, 30),
  };
  const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  if (!locations) return null;
  const markers = locations.map((position, i) => {
    const label = labels[i % labels.length];
    let marker = new google.maps.Marker({
      position,
      icon: svgMarker,
      map: map,
    });

    marker.addListener("click", () => {
      infoWindow.setContent(label);
      infoWindow.open(map, marker);
    });
    return marker;
  });
  new markerClusterer.MarkerClusterer({ map, markers });

  const locationButton = document.createElement("button");

  locationButton.textContent = "Pan to Current Location";
  locationButton.classList.add("custom-map-control-button");
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);

  function findLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          infoWindow.setPosition(pos);
          infoWindow.setContent("You are here!");
          infoWindow.open(map);
          map.setCenter(pos);
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      handleLocationError(false, infoWindow, map.getCenter());
    }
  }

  locationButton.addEventListener("click", findLocation);

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
      browserHasGeolocation
        ? "Error: The Geolocation service failed."
        : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(map);
  }

  geocoder = new google.maps.Geocoder();

  const inputText = document.getElementById("input");

  const submitButton = document.getElementById("submit");

  marker = new google.maps.Marker({
    map,
  });
  map.addListener("click", (e) => {
    geocode({ location: e.latLng });
  });
  submitButton.addEventListener("click", () =>
    geocode({ address: inputText.value })
  );
}

function geocode(request) {
  geocoder
    .geocode(request)
    .then((result) => {
      const { results } = result;
      console.log(results[0].geometry.location);
      map.setCenter(results[0].geometry.location);
      marker.setPosition(results[0].geometry.location);
      marker.setMap(map);

      return results;
    })
    .catch((e) => {
      alert("Geocode was not successful for the following reason: " + e);
    });

  const buttonRequest = document.createElement("button");

  buttonRequest.textContent = "Find my nearest locations";

  map.controls[google.maps.ControlPosition.LEFT_CENTER].push(buttonRequest);
  console.log(buttonRequest, "btt");
  buttonRequest.addEventListener("click", () => {
    console.log("first");
  });
  // if (userPosition.length) {
  //   const destinations = locations.map((loc) => ({
  //     lat: loc.lat,
  //     lng: loc.lng,
  //   }));
  //   const origin = new google.maps.LatLng(
  //     userPosition[0].lat,
  //     userPosition[0].lng
  //   );
  //   calculateDistance(origin, destinations);
  // } else if (address) {
  //   calculateDistance(address, destinations);
  // }

  function calculateDistance(origin, destinations) {
    let service = new google.maps.DistanceMatrixService();
    service
      .getDistanceMatrix({
        origins: [origin],
        destinations: destinations,
        travelMode: "DRIVING",
      })
      .then((response) => {
        console.log(response);
        const locations = response.destinationAddresses.map((direction) => ({
          direction: direction,
        }));
        const distances = response.rows[0].elements.map((distance) => ({
          distance: distance.distance,
        }));

        let sortedHotels = [];
        for (let i = 0; i < locations.length; i++) {
          sortedHotels.push({ ...locations[i], ...distances[i] });
        }
        console.log(sortedHotels, "hotel");
        sortedHotels.sort((a, b) => {
          return a.distance.value - b.distance.value;
        });

        for (let hotel of sortedHotels) {
          const direction = document.createElement("p");
          const distance = document.createElement("p");
          direction.innerText = `${hotel.direction} `;
          distance.innerText = `${hotel.distance.text}`;
          document.getElementById("response").appendChild(direction);
          document.getElementById("response").appendChild(distance);
        }
      });
  }
}
console.log(userPosition, "user");

window.initMap = initMap;
