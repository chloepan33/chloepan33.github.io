document.addEventListener("DOMContentLoaded", function () {
  const starContainer = document.createElement("div");
  starContainer.classList.add("stars");
  document.body.appendChild(starContainer);

  const starCount = 150; // Increase the number of stars
  for (let i = 0; i < starCount; i++) {
    const star = document.createElement("div");
    star.classList.add("star");

    // Randomize position
    star.style.top = Math.random() * 100 + "vh";
    star.style.left = Math.random() * 100 + "vw";

    // Randomize size for variation
    const size = Math.random() * 3 + 2; // Between 2px and 5px
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;

    // Randomize animation delay for natural twinkling
    star.style.animationDelay = Math.random() * 2 + "s";

    starContainer.appendChild(star);
  }
});
