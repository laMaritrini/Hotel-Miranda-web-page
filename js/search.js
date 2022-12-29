// const searchButton = document.querySelector(".search-bar-button");

function Search() {
  const search_query = document.getElementById("search-bar").value;
  if (
    search_query.toLowerCase().includes("rooms") ||
    search_query.toLowerCase().includes("duplex") ||
    search_query.toLowerCase().includes("minimal")
  ) {
    window.location.assign("./rooms.html");
  } else if (
    search_query.toLowerCase().includes("about") ||
    search_query.toLowerCase().includes("video") ||
    search_query.toLowerCase().includes("hotel") ||
    search_query.toLowerCase().includes("miranda")
  ) {
    window.location.assign("./about-us.html");
  } else if (search_query.toLowerCase().includes("contact")) {
    window.location.assign("./contact.html");
  } else if (search_query.toLowerCase().includes("offers")) {
    window.location.assign("./offers.html");
  } else if (
    search_query.toLowerCase().includes("home") ||
    search_query.toLowerCase().includes("features")
  ) {
    window.location.assign("./index.html");
  } else if (
    search_query.toLowerCase().includes("book") ||
    search_query.toLowerCase().includes("luxury")
  ) {
    window.location.assign("./room-details.html");
  } else if (
    search_query.toLowerCase().includes("map") ||
    search_query.toLowerCase().includes("address") ||
    search_query.toLowerCase().includes("phone") ||
    search_query.toLowerCase().includes("email")
  ) {
    window.location.assign(`./contact.html#${search_query}`);
  } else if (
    search_query.toLowerCase().includes("services") ||
    search_query.toLowerCase().includes("menu") ||
    search_query.toLowerCase().includes("food")
  ) {
    window.location.assign(`./index.html#${search_query}`);
  } else {
    return false;
  }
}
