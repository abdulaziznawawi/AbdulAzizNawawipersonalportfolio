// Select the menu icon and navbar for the mobile menu toggle
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

// Toggle the mobile menu when the menu icon is clicked
menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x'); // Change the menu icon to a close icon
    navbar.classList.toggle('active'); // Show or hide the navbar
};

// Select all sections and navigation links for the scroll-based active link functionality
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

// Update the active navigation link based on the current scroll position
window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY; // Get the current scroll position
        let offset = sec.offsetTop - 150; // Calculate the section's top offset
        let height = sec.offsetHeight; // Get the section's height
        let id = sec.getAttribute('id'); // Get the section's ID

        // Check if the current scroll position is within the section
        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active'); // Remove the active class from all links
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active'); // Add the active class to the current link
            });
        }
    });

    // Add a sticky class to the header when scrolling down
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    // Close the mobile menu when scrolling
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

// Slider functionality
let slides = document.querySelectorAll('.slide'); // Select all slides
let sliderTrack = document.querySelector('.slider-track'); // Select the slider track
let currentIndex = 0; // Track the current slide index

// Move to the previous slide when the "prev" button is clicked
document.querySelector('.prev').onclick = () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length; // Update the index (loop back to the last slide if at the first slide)
    updateSlider(); // Update the slider position
};

// Move to the next slide when the "next" button is clicked
document.querySelector('.next').onclick = () => {
    currentIndex = (currentIndex + 1) % slides.length; // Update the index (loop back to the first slide if at the last slide)
    updateSlider(); // Update the slider position
};

// Update the slider position based on the current index
function updateSlider() {
    const slideWidth = slides[0].clientWidth; // Get the width of a single slide
    sliderTrack.style.transform = `translateX(-${currentIndex * slideWidth}px)`; // Move the slider track to show the current slide
}

// Initialize ScrollReveal for animations
ScrollReveal({
    reset: true, // Reset animations when elements come back into view
    distance: '80px', // Distance for the animation
    duration: 2000, // Animation duration
    delay: 200 // Delay before the animation starts
});

// Define specific animations for different elements
ScrollReveal().reveal('.home-content, .youtube-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .skills-container, .projects-box, .timeline-content, .timeline-date, .slider', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .home-image, .youtube-image', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .home-content, .youtube-content', { origin: 'right' });

// Initialize Typed.js for the typing effect in the home section
const typed = new Typed('.multiple-text', {
    strings: ['Programmer', 'Student', 'Youtuber'], // Text to type
    typeSpeed: 100, // Speed of typing
    backSpeed: 100, // Speed of deleting
    backDelay: 1000, // Delay before typing starts again
    loop: true // Loop the typing effect
});