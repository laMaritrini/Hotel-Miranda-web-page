const checkButton = document.getElementById("check-button");
const noAvailableMessage = document.querySelector(".no-available-message");
const checkIn = document.getElementById("check-in");
const checkOut = document.getElementById("check-out");
const errorMessage = document.querySelector(".error-message");

const messageResp = (e) => {
  e.preventDefault();
  if (checkIn.value.length > 0 && checkOut.value.length > 0) {
    noAvailableMessage.style.display = "block";
    errorMessage.style.display = "none";
  } else if (!checkIn.value || !checkOut.value) {
    errorMessage.style.display = "block";
    noAvailableMessage.style.display = "none";
  } else {
    noAvailableMessage.style.display = "none";
    errorMessage.style.display = "none";
  }
};

checkButton.addEventListener("click", messageResp);
