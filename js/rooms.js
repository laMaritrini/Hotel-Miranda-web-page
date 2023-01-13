import { rooms } from "../data/roomsData.js";

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
    roomBlock.innerHTML = `
    <div class="room-block">
          <div class="container-duplex-room">
            <a class="room-detail" href="room-details.html">
              <img
                class="image image-rooms"
                src=${item.photo}
                alt=""
              />
            </a>
            <div class="icons-group-room">
              <img class="icon-rooms" src="./images/bed.svg" alt="bed" />
              <img class="icon-rooms" src="./images/wifi.svg" alt="wifi" />
              <img class="icon-rooms" src="./images/car.svg" alt="car" />
              <img
                class="icon-rooms"
                src="./images/snowflake.svg"
                alt="snowflake"
              />
              <img
                class="icon-rooms"
                src="./images/dumbbell.svg"
                alt="dumbbell"
              />
              <img
                class="icon-rooms"
                src="./images/cocktail.svg"
                alt="cocktail"
              />
            </div>
          </div>
          <div class="block-center-room">
            <h3 class="sub-title"><a href=./room-details.html>${item.title}</a></h3>
            <p class="paragraph">
            ${item.description}
            </p>

            <p class="block-center__price inline">
              $${item.price}<span class="block-center__price--night">/Night</span>
            </p>
            <p class="booking inline">
              <a href="./room-details.html">Booking Now</a>
            </p>
          </div>
        </div>
    `;

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
