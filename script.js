// ----------------------------------- Mobile Menu Toggle -----------------------------------
let menuIcon = document.querySelector('#menu-icon'); // Select the menu icon element
let navbar = document.querySelector('.navbar'); // Select the navbar element

// Toggle the mobile menu when the menu icon is clicked
menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x'); // Toggle the "bx-x" class to change the menu icon to a close icon
    navbar.classList.toggle('active'); // Toggle the "active" class to show or hide the navbar
};

// ----------------------------------- Scroll-Based Active Link -----------------------------------
let sections = document.querySelectorAll('section'); // Select all section elements
let navLinks = document.querySelectorAll('header nav a'); // Select all navigation links in the header

// Update the active navigation link based on the current scroll position
window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY; // Get the current vertical scroll position
        let offset = sec.offsetTop - 150; // Calculate the section's top offset minus 150px for better alignment
        let height = sec.offsetHeight; // Get the height of the section
        let id = sec.getAttribute('id'); // Get the ID of the section

        // Check if the current scroll position is within the section
        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active'); // Remove the "active" class from all navigation links
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active'); // Add the "active" class to the current link
            });
        }
    });

    // Add a sticky class to the header when scrolling down
    let header = document.querySelector('header'); // Select the header element
    header.classList.toggle('sticky', window.scrollY > 100); // Add the "sticky" class if the scroll position is greater than 100px

    // Close the mobile menu when scrolling
    menuIcon.classList.remove('bx-x'); // Remove the "bx-x" class to reset the menu icon
    navbar.classList.remove('active'); // Remove the "active" class to hide the navbar
};

// ----------------------------------- Typed.js Initialization -----------------------------------
const typed = new Typed('.multiple-text', {
    strings: ['Programmer', 'Student', 'Youtuber'], // Array of strings to type
    typeSpeed: 100, // Speed of typing in milliseconds
    backSpeed: 100, // Speed of deleting in milliseconds
    backDelay: 1000, // Delay before typing starts again in milliseconds
    loop: true // Enable looping of the typing effect
});

// ----------------------------------- Slider Functionality -----------------------------------
// Select all slide elements from the DOM
let slides = document.querySelectorAll('.slide'); // This selects all elements with the class "slide" and stores them in a NodeList.

// Select the container that holds all slides and allows for horizontal movement
let sliderTrack = document.querySelector('.slider-track'); // This selects the element with the class "slider-track" that contains all the slides.

// Keep track of which slide is currently being shown (starts at 0 for the first slide)
let currentIndex = 0; // This variable keeps track of the current slide index.

// Function that handles the logic for transitioning between slides
function moveSlide(direction) {
    // Get the width of a single slide for calculating movement distance
    const slideWidth = slides[0].clientWidth; // Dynamically calculates the width of the first slide to ensure responsiveness.

    // Store the total number of slides for boundary checking
    const totalSlides = slides.length; // Stores the total number of slides to determine boundaries.

    // Handle sliding in the forward direction
    if (direction === 'next') {
        // Check if we're on the last slide
        if (currentIndex === totalSlides - 1) {
            // Temporarily remove transition for instant repositioning
            sliderTrack.style.transition = 'none'; // Disables smooth transitions to reposition the slider instantly.

            // Move to a position before the first slide
            currentIndex = -1; // Temporarily set the index to -1 to simulate a seamless loop.

            // Apply the transform to move slides without animation
            sliderTrack.style.transform = `translateX(${-currentIndex * slideWidth}px)`; // Moves the slider track to the left by the width of one slide.

            // Force the browser to acknowledge the style changes before continuing
            sliderTrack.offsetHeight; // Forces a reflow to ensure the transition reset is applied.

            // Re-enable smooth transitions for the next movement
            sliderTrack.style.transition = 'transform 0.5s ease'; // Re-enables smooth transitions for the next slide movement.

            // Move to the first slide
            currentIndex = 0; // Resets the index to 0 to show the first slide.
        } else {
            // If not on the last slide, simply move to the next one
            currentIndex++; // Increment the index to move to the next slide.
        }
    } else {
        // Handle sliding in the backward direction
        if (currentIndex === 0) {
            // If on the first slide, prepare to move to the last slide

            // Remove transition for instant repositioning
            sliderTrack.style.transition = 'none'; // Disables smooth transitions to reposition the slider instantly.

            // Move to a position after the last slide
            currentIndex = totalSlides; // Temporarily set the index to the total number of slides to simulate a seamless loop.

            // Apply the transform without animation
            sliderTrack.style.transform = `translateX(${-currentIndex * slideWidth}px)`; // Moves the slider track to the right by the width of one slide.

            // Force browser to process the style changes
            sliderTrack.offsetHeight; // Forces a reflow to ensure the transition reset is applied.

            // Re-enable smooth transitions
            sliderTrack.style.transition = 'transform 0.5s ease'; // Re-enables smooth transitions for the next slide movement.

            // Move to the last slide
            currentIndex = totalSlides - 1; // Resets the index to the last slide.
        } else {
            // If not on the first slide, simply move to the previous one
            currentIndex--; // Decrement the index to move to the previous slide.
        }
    }

    // Update the slider's position based on the new currentIndex
    updateSlider(); // Calls the function to update the slider's position.
}

// Update slider position
function updateSlider() {
    const slideWidth = slides[0].clientWidth; // Dynamically calculates the width of the first slide to ensure responsiveness.
    sliderTrack.style.transform = `translateX(${-currentIndex * slideWidth}px)`; // Moves the slider track to the correct position based on the current index.
}

// Event listeners for next and previous buttons
document.querySelector('.next').onclick = () => moveSlide('next'); // Adds a click event listener to the "next" button to move to the next slide.
document.querySelector('.prev').onclick = () => moveSlide('prev'); // Adds a click event listener to the "prev" button to move to the previous slide.

// Handle window resize
window.addEventListener('resize', updateSlider); // Adds an event listener to update the slider's position when the window is resized.

// ----------------------------------- ScrollReveal Configuration -----------------------------------
// Define configuration object for ScrollReveal animations
const srConfig = {
    reset: false, // Prevents animations from replaying when scrolling back
    distance: '80px', // Distance elements move during animation
    duration: 2000, // Animation duration in milliseconds
    delay: 200, // Delay before animation starts
    cleanup: false // Prevents cleanup of animation styles
};

// Create new ScrollReveal instance with configuration
const sr = ScrollReveal(srConfig);

// Set up reveal animations for different elements grouped by animation direction
// Top animations
sr.reveal('.home-content, .youtube-content, .heading', { origin: 'top' });
// Bottom animations
sr.reveal('.home-img, .skills-container, .projects-box, .timeline-content, .timeline-date, .slider', { origin: 'bottom' });
// Left animations
sr.reveal('.home-content h1, .home-image, .youtube-image', { origin: 'left' });
// Right animations
sr.reveal('.home-content p, .home-content, .youtube-content', { origin: 'right' });

// ----------------------------------- Show More Projects -----------------------------------
// Wait for DOM to fully load before initializing
document.addEventListener('DOMContentLoaded', () => {
    // Get references to key DOM elements
    const toggleBtn = document.getElementById('toggleProjects'); // Show More button
    const hiddenProjects = document.querySelector('.projects-box.hidden'); // Hidden projects container
    const mainProjects = document.querySelector('.projects-box:not(.hidden)'); // Main projects container

    // Set up initial display states
    if (mainProjects) {
        mainProjects.style.display = 'grid'; // Show main projects in grid layout
        mainProjects.style.opacity = '1'; // Ensure main projects are fully visible
    }

    if (hiddenProjects) {
        hiddenProjects.style.display = 'none'; // Hide additional projects initially
    }

    // Add click event handler for the show more button
    toggleBtn.addEventListener('click', () => {
        // Configure hidden projects container with initial animation state
        Object.assign(hiddenProjects.style, {
            display: 'grid', // Show as grid layout
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', // Responsive grid columns
            gap: '3rem', // Space between grid items
            opacity: '0', // Start transparent for fade in
            visibility: 'visible', // Make visible but transparent
            transform: 'translateY(40px)' // Start position for slide up animation
        });

        // Animate in the hidden projects after initial setup
        setTimeout(() => {
            Object.assign(hiddenProjects.style, {
                opacity: '1', // Fade in to full opacity
                transform: 'translateY(0)', // Slide up to final position
                transition: 'all 0.5s ease' // Smooth animation
            });

            // Re-initialize animations for education section
            sr.reveal('.education', { 
                origin: 'bottom', // Slide up from bottom
                distance: '80px', // Movement distance
                duration: 2000, // Animation duration
                delay: 300, // Slight delay after projects
                reset: false // Prevent animation reset
            });
            // Re-initialize animations for achievements section
            sr.reveal('.achievements', { 
                origin: 'bottom', // Slide up from bottom
                distance: '80px', // Movement distance
                duration: 2000, // Animation duration
                delay: 400, // Delayed after education
                reset: false // Prevent animation reset
            });
            // Re-initialize animations for YouTube section
            sr.reveal('.youtube', { 
                origin: 'bottom', // Slide up from bottom
                distance: '80px', // Movement distance
                duration: 2000, // Animation duration
                delay: 500, // Delayed after achievements
                reset: false // Prevent animation reset
            });
        }, 50); // Short delay for initial setup

        // Hide the show more button since it's no longer needed
        toggleBtn.style.display = 'none';

        // Scroll to show the newly revealed projects
        setTimeout(() => {
            hiddenProjects.scrollIntoView({ // Scroll hidden projects into view
                behavior: 'smooth', // Smooth scrolling animation
                block: 'start' // Align to top of viewport
            });
        }, 100); // Delay scroll until after animation starts
    });
});
