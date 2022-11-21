import { comunidades } from "./españa_comunidades.js";

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
// let response;

let userPosition = [];
let address;
let geocoder;
let map;

function initMap() {
  let sortedHotels = [];
  const hotelMiranda = { lat: 40.42739376579836, lng: -3.7142062351779046 };
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 5,
    center: hotelMiranda,
  });
  const infoWindow = new google.maps.InfoWindow({
    content: "",
    disableAutoPan: true,
  });
  const svgMarker = {
    path: "M32 0C14.3 0 0 14.3 0 32S14.3 64 32 64V448c-17.7 0-32 14.3-32 32s14.3 32 32 32H208V448h96v64H480c17.7 0 32-14.3 32-32s-14.3-32-32-32V64c17.7 0 32-14.3 32-32s-14.3-32-32-32H32zm80 96h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H112c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16zm112 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H240c-8.8 0-16-7.2-16-16V112zM368 96h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H368c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16zM96 208c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H112c-8.8 0-16-7.2-16-16V208zm144-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H240c-8.8 0-16-7.2-16-16V208c0-8.8 7.2-16 16-16zm112 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H368c-8.8 0-16-7.2-16-16V208zm-3 152.2c3.3 12.8-7.8 23.8-21 23.8H184c-13.3 0-24.3-10.9-21-23.8c10.6-41.5 48.2-72.2 93-72.2s82.5 30.7 93 72.2z",
    fillColor: "#BEAD8E",
    fillOpacity: 1,
    strokeWeight: 0,
    rotation: 0,
    scale: 0.05,
    anchor: new google.maps.Point(15, 30),
    scaledSize: new google.maps.Size(2, 5),
  };

  if (!locations) return null;
  const markers = locations.map((position, i) => {
    let marker = new google.maps.Marker({
      position,
      icon: svgMarker,
      map: map,
    });

    marker.addListener("click", () => {
      infoWindow.open(map, marker);
    });
    return marker;
  });
  new markerClusterer.MarkerClusterer({ map, markers });

  geocoder = new google.maps.Geocoder();

  /////////////////////////////
  const submitButton = document.getElementById("submit");
  submitButton.addEventListener("click", codeAddress);

  function codeAddress() {
    address = document.getElementById("input").value;
    geocoder.geocode({ address: address }, function (results, status) {
      if (status == "OK") {
        map.setCenter(results[0].geometry.location);
        const destinations = locations.map((loc) => ({
          lat: loc.lat,
          lng: loc.lng,
        }));
        var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location,
        });
        calculateDistance(address, destinations);
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  }

  marker = new google.maps.Marker({
    map,
  });

  const buttonRequest = document.getElementById("buttonRequest");
  let pos = {};
  buttonRequest.addEventListener("click", () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          infoWindow.setPosition(pos);
          infoWindow.setContent("You are here!");
          infoWindow.open(map);
          map.setCenter(pos);
          userPosition.push(pos);
          const destinations = locations.map((loc) => ({
            lat: loc.lat,
            lng: loc.lng,
          }));
          const origin = new google.maps.LatLng(
            userPosition[0].lat,
            userPosition[0].lng
          );
          calculateDistance(origin, destinations);
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      handleLocationError(false, infoWindow, map.getCenter());
    }
  });
  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
      browserHasGeolocation
        ? "Error: The Geolocation service failed."
        : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(map);
  }

  function calculateDistance(origin, destinations) {
    const service = new google.maps.DistanceMatrixService();
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

        deleteMarkers(sortedHotels);

        for (let i = 0; i < locations.length; i++) {
          sortedHotels.push({ ...locations[i], ...distances[i] });
        }
        console.log(sortedHotels, "hotel");

        sortedHotels.sort((a, b) => {
          return a.distance.value - b.distance.value;
        });

        for (let hotel of sortedHotels) {
          const direction = document.createElement("li");
          direction.classList.add("direction");
          const distance = document.createElement("div");
          distance.classList.add("distance");
          direction.innerText = `${hotel.direction} `;
          distance.innerText = `Distance: ${hotel.distance.text}`;
          document.getElementById("response").appendChild(direction);
          document.getElementById("response").appendChild(distance);
        }
      });
  }
  function deleteMarkers(sortedHotels) {
    sortedHotels.length = 0;
  }

  const select = document.getElementById("comunidadesAuto");
  comunidadesAutonomas.map((item) => {
    const comunidad = document.createElement("option");
    (comunidad.textContent = item),
      (comunidad.value = item),
      select.appendChild(comunidad);
  });

  select.addEventListener("change", () => {
    selectComunidad();
  });

  function selectComunidad() {
    let index = select.selectedIndex;

    let marker = new google.maps.Polygon({
      paths: comunidades[index - 1],
      strokeColor: "#135846",
      strokeOpacity: 1,
      strokeWeight: 2,
      fillColor: "#5AD07A",
      fillOpacity: 0.8,
    });
    map = new google.maps.Map(document.getElementById("map"), {
      zoom: 6.3,
      center: comunidades[index - 1][0][0],
    });
    const markers = locations.map((position, i) => {
      let marker = new google.maps.Marker({
        position,
        icon: svgMarker,
        map: map,
      });

      marker.addListener("click", () => {
        infoWindow.open(map, marker);
      });
      return marker;
    });

    select.addEventListener("change", () => marker.setMap(null));
    marker.setMap(map);
  }
}

window.initMap = initMap;
// Comunidades autonomas:

const comunidadesAutonomas = [
  "Andalucía",
  "Aragón",
  "Asturias, Principado de",
  "Balears, Illes",
  "Canarias",
  "Cantabria",
  "Castilla y León",
  "Castilla - La Mancha",
  "Cataluña / Catalunya",
  "Comunitat Valenciana",
  "Extremadura",
  "Galicia",
  "Madrid, Comunidad de",
  "Murcia, Región de",
  "Navarra, Comunidad Foral de",
  "País Vasco / Euskadi",
  "Rioja, La",
  "Ceuta",
  "Melilla",
];

// FORM

const inputName = document.getElementById("input-name");
const inputNumber = document.getElementById("input-number");
const inputEmail = document.getElementById("input-email");
const inputSubject = document.getElementById("input-subject");
const inputMessage = document.getElementById("input-message");
const sendButton = document.getElementById("send-form");
const confirmMessage = document.getElementById("confirm-text");
const errorMessage = document.getElementById("error-text");
const errorEmail = document.getElementById("error-email");

const messageResponse = (e) => {
  const regex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/;
  e.preventDefault();

  if (
    !inputName.value ||
    !inputNumber.value ||
    !inputEmail.value ||
    !inputSubject.value ||
    !inputMessage.value
  ) {
    errorMessage.style.display = "block";
    confirmMessage.style.display = "none";
    return false;
  } else if (!regex.test(inputEmail.value)) {
    errorEmail.style.display = "block";
    confirmMessage.style.display = "none";
    errorMessage.style.display = "none";
    return false;
  } else {
    confirmMessage.style.display = "block";
    errorEmail.style.display = "none";
    errorMessage.style.display = "none";
    inputName.value = null;
    inputNumber.value = null;
    inputSubject.value = null;
    inputEmail.value = null;
    inputMessage.value = null;
    return true;
  }
};

sendButton.addEventListener("click", messageResponse);
