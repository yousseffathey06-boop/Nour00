const floatingLayer = document.querySelector(".floating-layer");
function createFloatingHeart(symbols = ["♡", "♥", "✧"]) {
  const heart = document.createElement("span");
  heart.className = "floating-heart";
  heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
  heart.style.left = `${Math.random() * 100}%`;
  heart.style.fontSize = `${14 + Math.random() * 24}px`;
  heart.style.animationDuration = `${6 + Math.random() * 7}s`;
  floatingLayer.appendChild(heart);
  heart.addEventListener("animationend", () => heart.remove());
}
setInterval(() => createFloatingHeart(), 700);

const magicButton = document.getElementById("magicButton");
const magicMessage = document.getElementById("magicMessage");
magicButton.addEventListener("click", () => {
  magicMessage.hidden = false;
  magicButton.textContent = "Wish sent with love 💗";
  for (let i = 0; i < 45; i++) {
    setTimeout(() => createFloatingHeart(["💗", "♡", "✨", "♥", "🎉"]), i * 35);
  }
});

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
document.querySelectorAll(".photo-button").forEach((button) => {
  button.addEventListener("click", () => {
    lightboxImage.src = button.querySelector("img").src;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
  });
});
function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
}
document.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeLightbox();
});
