const carouselContainer = document.querySelector('.carousel-container');
const images = carouselContainer.querySelectorAll('img');
const totalImages = images.length;
let index = 0;

document.querySelector('.next-btn').addEventListener('click', () => {
    index = (index + 1) % totalImages;
    carouselContainer.style.transform = `translateX(${-index * 100}%)`;
});

document.querySelector('.prev-btn').addEventListener('click', () => {
    index = (index - 1 + totalImages) % totalImages;
    carouselContainer.style.transform = `translateX(${-index * 100}%)`;
});
