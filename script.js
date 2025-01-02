const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");

const textArray = [
  "MIMIT Malout's Community Forum !!",
  " your hub for all things !!",
  "experience the heart of our campus !!",
  "our dynamic student community !!",
];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000; // Delay between current and next text
let textArrayIndex = 0;
let charIndex = 0;
 
function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    if (!cursorSpan.classList.contains("typing"))
      cursorSpan.classList.add("typing");
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } else {
    cursorSpan.classList.remove("typing");
    setTimeout(erase, newTextDelay);
  }
}

function erase() {
  if (charIndex > 0) {
    if (!cursorSpan.classList.contains("typing"))
      cursorSpan.classList.add("typing");
    typedTextSpan.textContent = textArray[textArrayIndex].substring(
      0,
      charIndex - 1
    );
    charIndex--;
    setTimeout(erase, erasingDelay);
  } else {
    cursorSpan.classList.remove("typing");
    textArrayIndex++;
    if (textArrayIndex >= textArray.length) textArrayIndex = 0;
    setTimeout(type, typingDelay + 800);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // On DOM Load initiate the effect
  if (textArray.length) setTimeout(type, newTextDelay + 250);
});

let progress = 50;
let startX = 0;
let active = 0;
let isDown = false;

const speedWheel = 0.02;
const speedDrag = -0.1;

const getZindex = (array, index) =>
  array.map((_, i) =>
    index === i ? array.length : array.length - Math.abs(index - i)
  );

const $items = document.querySelectorAll(".carousel-item");
const $cursors = document.querySelectorAll(".cursor");

const displayItems = (item, index, active) => {
  const zIndex = getZindex([...$items], active)[index];
  item.style.setProperty("--zIndex", zIndex);
  item.style.setProperty("--active", (index - active) / $items.length);
};

const animate = () => {
  progress = Math.max(0, Math.min(progress, 100));
  active = Math.floor((progress / 100) * ($items.length - 1));

  $items.forEach((item, index) => displayItems(item, index, active));
};
animate();

$items.forEach((item, i) => {
  item.addEventListener("click", () => {
    progress = (i / $items.length) * 100 + 10;
    animate();
  });
});

const handleWheel = (e) => {
  const wheelProgress = e.deltaY * speedWheel;
  progress = progress + wheelProgress;
  animate();
};

const handleMouseMove = (e) => {
  if (e.type === "mousemove") {
    $cursors.forEach(($cursor) => {
      $cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });
  }
  if (!isDown) return;
  const x = e.clientX || (e.touches && e.touches[0].clientX) || 0;
  const mouseProgress = (x - startX) * speedDrag;
  progress = progress + mouseProgress;
  startX = x;
  animate();
};

const handleMouseDown = (e) => {
  isDown = true;
  startX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
};

const handleMouseUp = () => {
  isDown = false;
};

document.addEventListener("mousewheel", handleWheel);
document.addEventListener("mousedown", handleMouseDown);
document.addEventListener("mousemove", handleMouseMove);
document.addEventListener("mouseup", handleMouseUp);
document.addEventListener("touchstart", handleMouseDown);
document.addEventListener("touchmove", handleMouseMove);
document.addEventListener("touchend", handleMouseUp);

const slide = document.querySelector(".slider");
const tarea = document.querySelectorAll(".textarea");
const tSlides = tarea.length;

const first = tarea[0].cloneNode(true);
slide.appendChild(first);

let currentindex = 0;

function shownextSlide() {
  currentindex++;
  slide.style.transition = "transform 0.5s ease-in-out";
  slide.style.transform = `translateX(-${currentindex * 100}%)`;

  if (currentindex === tSlides) {
    setTimeout(() => {
      slide.style.transition = "none";
      slide.style.transform = `translateX(0)`;
      currentindex = 0;
    }, 500);
  }
}

setInterval(shownextSlide, 6000);
