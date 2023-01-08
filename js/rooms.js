const rooms = [
  {
    id: 1,
    photo: "./images/photos/duplex.jpg",
    title: "Premium Double Room",
    description:
      " Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed doeiusmod tempor incididunt ut labore et dolore.",
    price: 345,
  },
  {
    id: 2,
    photo: "./images/photos/duplex2.jpg",
    title: "Minimal Duplex Room",
    description:
      " Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed doeiusmod tempor incididunt ut labore et dolore.",
    price: 335,
  },
  {
    id: 3,
    photo: "./images/photos/duplex3.jpg",
    title: "Minimal Duplex Room",
    description:
      " Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed doeiusmod tempor incididunt ut labore et dolore.",
    price: 370,
  },
  {
    id: 4,
    photo: "./images/photos/duplex4.jpg",
    title: "Double Family Room",
    description:
      " Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed doeiusmod tempor incididunt ut labore et dolore.",
    price: 380,
  },
  {
    id: 5,
    photo: "./images/photos/duplex5.jpg",
    title: "Luxury Duplex Room",
    description:
      " Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed doeiusmod tempor incididunt ut labore et dolore.",
    price: 340,
  },
  {
    id: 6,
    photo: "./images/photos/duplex6.jpg",
    title: "Minimal Room",
    description:
      " Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed doeiusmod tempor incididunt ut labore et dolore.",
    price: 355,
  },
];

const roomsArray = () => {
  for (let room of rooms) {
    const roomBlock = document.createElement("div");
    roomBlock.classList.add("room-block");
    const containerDuplexRoom = document.createElement("div");
    containerDuplexRoom.classList.add("container-duplex-room");
    const anchor = document.createElement("a");
    anchor.classList.add("room-detail");
    anchor.href = "./room-details.html";
    const image = document.createElement("img");
    image.classList.add("image", "image-rooms");
    image.src = `${room.photo}`;
    const blockCenterRoom = document.createElement("div");
    blockCenterRoom.classList.add("block-center-room");
    const title = document.createElement("h3");
    title.classList.add("sub-title");
    title.innerText = `${room.title}`;
    const paragraph = document.createElement("p");
    paragraph.classList.add("paragraph");
    paragraph.innerText = `${room.description}`;
    const price = document.createElement("p");
    price.classList.add("block-center__price");
    price.innerText = `$${room.price}`;
    const priceNight = document.createElement("span");
    priceNight.classList.add("block-center__price--night");
    priceNight.innerText = `/Night`;
    const iconsGroupRoom = document.createElement("div");
    iconsGroupRoom.classList.add("icons-group-room");
    const imgBed = document.createElement("img");
    imgBed.classList.add("icon-rooms");
    imgBed.src = "./images/bed.svg";
    const imgWifi = document.createElement("img");
    imgWifi.classList.add("icon-rooms");
    imgWifi.src = "./images/wifi.svg";
    const imgCar = document.createElement("img");
    imgCar.classList.add("icon-rooms");
    imgCar.src = "./images/car.svg";
    const imgSnowflakes = document.createElement("img");
    imgSnowflakes.classList.add("icon-rooms");
    imgSnowflakes.src = "./images/snowflake.svg";
    const imgDumbbell = document.createElement("img");
    imgDumbbell.classList.add("icon-rooms");
    imgDumbbell.src = "./images/dumbbell.svg";
    const imgCocktail = document.createElement("img");
    imgCocktail.classList.add("icon-rooms");
    imgCocktail.src = "./images/cocktail.svg";
    const anchorBooking = document.createElement("a");
    anchorBooking.classList.add("booking");
    anchorBooking.href = "./room-details.html";
    anchorBooking.innerText = `Booking Now`;

    price.appendChild(priceNight);
    iconsGroupRoom.appendChild(imgBed);
    iconsGroupRoom.appendChild(imgWifi);
    iconsGroupRoom.appendChild(imgCar);
    iconsGroupRoom.appendChild(imgSnowflakes);
    iconsGroupRoom.appendChild(imgDumbbell);
    iconsGroupRoom.appendChild(imgCocktail);

    roomBlock.appendChild(containerDuplexRoom);
    roomBlock.appendChild(blockCenterRoom);
    anchor.appendChild(image);
    blockCenterRoom.appendChild(title);
    blockCenterRoom.appendChild(paragraph);
    blockCenterRoom.appendChild(price);
    blockCenterRoom.appendChild(anchorBooking);
    containerDuplexRoom.appendChild(anchor);
    containerDuplexRoom.appendChild(iconsGroupRoom);
    document.getElementById("rooms").appendChild(roomBlock);
  }
};
roomsArray();

const remove = (rooms) => {
  for (let room of rooms) {
    const roomBlock = document.querySelector(".room-block");
    document.getElementById("rooms").removeChild(roomBlock);
  }
};

const select = document.getElementById("select-room");

select.addEventListener("change", (e) => {
  switch (e.target.value) {
    case "smaller":
      rooms.sort((a, b) => {
        return a.price - b.price;
      });
      remove(rooms);
      roomsArray();
      break;
    case "bigger":
      rooms.sort((a, b) => {
        return b.price - a.price;
      });
      remove(rooms);
      roomsArray();
      break;
    default:
      remove();
      roomsArray();
  }
  console.log(rooms);
});
