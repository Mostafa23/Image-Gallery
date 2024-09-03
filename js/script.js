let currentIndex = 0;
const slider = document.getElementById('slider');
const slides = document.getElementById('slides');
const totalSlidesimg = document.querySelectorAll('.slider_slides_img');
const totalSlides = totalSlidesimg.length;
const doots = document.getElementById("dots");

(function totalDots() {
    doots.innerHTML = Array.from(totalSlidesimg).map((_, index) => `
        <span class="slider_slides_pagination_dot" onclick="currentSlide(${index})"></span>
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
    const dots = document.querySelectorAll('.slider_slides_pagination_dot');
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

slider.addEventListener('mouseover', () => {
    clearInterval(slideInterval);
});

slider.addEventListener('mouseout', () => {
    slideInterval = setInterval(nextSlide, 4000);
});


//touch
let touchStartX = 0;
let touchEndX = 0;

function handleSwipe() {
    if (touchEndX < touchStartX - 10) nextSlide(); 
    if (touchEndX > touchStartX + 10) prevSlide(); 
}

slides.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

slides.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});
