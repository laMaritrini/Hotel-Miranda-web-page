// const searchButton = document.querySelector(".search-bar-button");

function Search() {
  const search_query = document.getElementById("search-bar").value;
  if (search_query.toLowerCase().includes("room", "rooms")) {
    window.location.assign("./rooms.html");
    search_query = "";
  } else if (search_query.toLowerCase().includes("about")) {
    window.location.assign("./about-us.html");
  } else if (search_query.toLowerCase().includes("contact")) {
    window.location.assign("./contact.html");
  } else if (search_query.toLowerCase().includes("offers")) {
    window.location.assign("./offers.html");
  } else if (search_query.toLowerCase().includes("home")) {
    window.location.assign("./index.html");
  } else if (search_query.toLowerCase().includes("booking")) {
    window.location.assign("./room-details.html");
  } else {
    // alert("No matches found");
  }
}
