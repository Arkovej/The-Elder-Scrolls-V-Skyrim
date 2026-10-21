const sliderContent = document.getElementById("sliderContent");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const cards = document.querySelectorAll(".card");

let currentIndex = 0;
const visibleCount = 4; // number of visible cards (for cloning)

// Clone cards at the end for infinite loop effect
for (let i = 0; i < visibleCount; i++) {
    const clone = cards[i].cloneNode(true);
    sliderContent.appendChild(clone);
}

// All cards including clones
const allCards = document.querySelectorAll(".card");
const totalCards = cards.length; // original count

function updateSlide(animate = true) {
    const cardWidth = allCards[0].getBoundingClientRect().width;
    const gap = parseFloat(getComputedStyle(sliderContent).gap) || 16;
    const offset = currentIndex * (cardWidth + gap);
    sliderContent.style.transition = animate ? 'transform 0.4s ease' : 'none';
    sliderContent.style.transform = `translateX(-${offset}px)`;
}

nextBtn.addEventListener('click', () => {
    currentIndex++;
    updateSlide(true);

    // When reaching the clones, jump back to the real first card
    if (currentIndex === totalCards) {
        setTimeout(() => {
            sliderContent.style.transition = 'none';
            currentIndex = 0;
            updateSlide(false);
        }, 400);
    }
});

prevBtn.addEventListener('click', () => {
    if (currentIndex === 0) {
        // Jump to the cloned section without animation
        sliderContent.style.transition = 'none';
        currentIndex = totalCards;
        updateSlide(false);

        // Animate back to the real last card
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                currentIndex = totalCards - 1;
                updateSlide(true);
            });
        });
    } else {
        currentIndex--;
        updateSlide(true);
    }
});

// Initial position
updateSlide(false);