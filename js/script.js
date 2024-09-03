let currentIndex = 0;
const slides = document.querySelector('.slides');
const totalSlidesimg = document.querySelectorAll('.slides img');
const totalSlides = slides.children.length;
const doots = document.getElementById("dots");

(function totalDots() {
    doots.innerHTML = Array.from(totalSlidesimg).map((_, index) => `
        <span class="dot" onclick="currentSlide(${index})"></span>
    `).join("");
    updateDots();
})();

function showSlide(index) {
    if (index >= totalSlides) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = totalSlides - 1;
    } else {
        currentIndex = index;
    }
    slides.style.transform = `translateX(-${currentIndex * 100}%)`;
    updateDots();
}

function currentSlide(index) {
    showSlide(index);
}

function updateDots() {
    const dots = document.querySelectorAll('.dot'); 
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}

function nextSlide() {
    showSlide(currentIndex + 1);
}

function prevSlide() {
    showSlide(currentIndex - 1);
}

let slideInterval = setInterval(nextSlide, 4000);

document.querySelector('.slider').addEventListener('mouseover', () => {
    clearInterval(slideInterval);
});

document.querySelector('.slider').addEventListener('mouseout', () => {
    slideInterval = setInterval(nextSlide, 4000);
});

// Swipe functionality
let touchStartX = 0;
let touchEndX = 0;

function handleSwipe() {
    if (touchEndX < touchStartX) nextSlide();
    if (touchEndX > touchStartX) prevSlide();
}

slides.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

slides.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});