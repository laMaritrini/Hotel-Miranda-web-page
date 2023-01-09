import {rooms} from "../data/roomsData.js";

const pagination_element = document.getElementById("pagination");
const list_rooms = document.getElementById("rooms");

let current_page = 1;
let rows = 6;

function DisplayList(items, wrapper, rows_per_page, page) {
  wrapper.innerHTML = "";
  page--;

  let start = rows_per_page * page;
  let end = start + rows_per_page;
  let paginatedItems = items.slice(start, end);

  for (let i = 0; i < paginatedItems.length; i++) {
    let item = paginatedItems[i];

    const roomBlock = document.createElement("div");
    roomBlock.classList.add("room-block");
    const containerDuplexRoom = document.createElement("div");
    containerDuplexRoom.classList.add("container-duplex-room");
    const anchor = document.createElement("a");
    anchor.classList.add("room-detail");
    anchor.href = "./room-details.html";
    const image = document.createElement("img");
    image.classList.add("image", "image-rooms");
    image.src = `${item.photo}`;
    const blockCenterRoom = document.createElement("div");
    blockCenterRoom.classList.add("block-center-room");
    const title = document.createElement("h3");
    title.classList.add("sub-title");
    title.innerText = `${item.title}`;
    const paragraph = document.createElement("p");
    paragraph.classList.add("paragraph");
    paragraph.innerText = `${item.description}`;
    const price = document.createElement("p");
    price.classList.add("block-center__price");
    price.innerText = `$${item.price}`;
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
    wrapper.appendChild(roomBlock);
  }
}
function SetupPagination(items, wrapper, rows_per_page) {
  wrapper.innerHTML = "";

  let page_count = Math.ceil(items.length / rows_per_page);
  for (let i = 1; i < page_count + 1; i++) {
    let btn = PaginationButton(i, items);
    wrapper.appendChild(btn);
  }
}

function PaginationButton(page, items) {
  let button = document.createElement("button");
  button.innerText = page;

  if (current_page == page) button.classList.add("active");

  button.addEventListener("click", function () {
    current_page = page;
    DisplayList(items, list_rooms, rows, current_page);

    let current_btn = document.querySelector(".pagination button.active");
    current_btn.classList.remove("active");

    button.classList.add("active");
    toTop();
  });

  return button;
}
const toTop = () => {
  document.documentElement.scrollTo({
    behavior: "smooth",
    top: 0,
  });
};

const select = document.getElementById("select-room");

select.addEventListener("change", (e) => {
  switch (e.target.value) {
    case "smaller":
      rooms.sort((a, b) => {
        return a.price - b.price;
      });

      DisplayList(rooms, list_rooms, rows, current_page);
      break;
    case "bigger":
      rooms.sort((a, b) => {
        return b.price - a.price;
      });

      DisplayList(rooms, list_rooms, rows, current_page);
      break;
    default:
      DisplayList(rooms, list_rooms, rows, current_page);
  }
});



DisplayList(rooms, list_rooms, rows, current_page);
SetupPagination(rooms, pagination_element, rows);
