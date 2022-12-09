const buttonScroll = document.querySelector(".scroll-top-button");
const toTop = () => {
  document.documentElement.scrollTo({
    behavior: "smooth",
    top: 0,
  });
};

const backToTop = () => {
  setTimeout(toTop, 200);
};

buttonScroll.addEventListener("click", backToTop);
