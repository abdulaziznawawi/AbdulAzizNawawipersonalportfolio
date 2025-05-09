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
const srConfig = {
    reset: false, // Prevent animations from resetting when elements leave the viewport
    distance: '80px', // Distance the elements move during the animation
    duration: 2000, // Duration of the animation in milliseconds
    delay: 200, // Delay before the animation starts in milliseconds
    cleanup: false, // Prevent ScrollReveal from removing elements after animation
    mobile: true, // Enable animations on mobile devices
    beforeReveal: (el) => {
        el.style.visibility = 'visible'; // Ensure the element is visible before the animation
        el.style.opacity = '1'; // Set the element's opacity to fully visible
        el.style.transform = 'none'; // Reset any existing transformations
    },
    afterReveal: (el) => {
        el.style.opacity = '1'; // Ensure the element remains fully visible after the animation
        el.style.visibility = 'visible'; // Keep the element visible after the animation
        el.style.transform = 'none'; // Reset any transformations applied during the animation
    }
};

// ----------------------------------- Section Animations Configuration -----------------------------------
const sectionAnimations = [
    // Left and Right animations for home and YouTube sections
    { selector: '.home-content', origin: 'left' }, // Animate home content from the left
    { selector: '.home-image', origin: 'right' }, // Animate home image from the right
    { selector: '.youtube-image', origin: 'left' }, // Animate YouTube image from the left
    { selector: '.youtube-content', origin: 'right' }, // Animate YouTube content from the right

    // Top animation for section headings
    { selector: '.heading', origin: 'top' }, // Animate section headings from the top

    // Bottom animation for various sections
    { selector: '.skills-container, .projects-box, .education, .timeline-content, .timeline-date, .slider', origin: 'bottom' } // Animate skills, projects, education, timeline, and slider from the bottom
];

// ----------------------------------- DOMContentLoaded Event Listener -----------------------------------
document.addEventListener('DOMContentLoaded', () => {
    // Initialize ScrollReveal with global settings
    ScrollReveal(srConfig); // Apply the global ScrollReveal configuration

    // Projects toggle functionality
    const toggleBtn = document.getElementById('toggleProjects'); // Select the toggle button for showing/hiding projects
    const hiddenProjects = document.querySelector('.projects-box.hidden'); // Select the hidden projects container
    const mainProjects = document.querySelector('.projects-box:not(.hidden)'); // Select the main projects container
    const toggleText = toggleBtn.querySelector('.toggle-text'); // Select the text inside the toggle button
    let isExpanded = false; // Initialize the toggle state as collapsed

    // Function to reveal all sections
    function revealAllSections() {
        sectionAnimations.forEach(({ selector, origin }) => {
            ScrollReveal().reveal(selector, {
                ...srConfig, // Use the global ScrollReveal configuration
                origin // Apply the specific animation origin for each section
            });
        });
    }

    // Function to reset section spacing
    function resetSectionSpacing() {
        // Reset all sections
        document.querySelectorAll('section').forEach(section => {
            Object.assign(section.style, {
                display: '', // Reset display property to default
                visibility: 'visible', // Ensure the section is visible
                opacity: '1', // Set the section's opacity to fully visible
                position: 'relative', // Reset position to relative
                zIndex: '1' // Reset z-index to default
            });
        });

        // Reset header and container spacing
        document.querySelector('header').style.marginBottom = '0'; // Remove any bottom margin from the header
        const projectsContainer = document.querySelector('.projects-container'); // Select the projects container
        Object.assign(projectsContainer.style, {
            marginTop: '0', // Reset top margin
            padding: '2rem' // Set padding to 2rem
        });

        // Reset section spacing
        document.querySelector('.skills').style.marginTop = '2rem'; // Add top margin to the skills section
        document.querySelector('.projects').style.marginBottom = '2rem'; // Add bottom margin to the projects section
    }

    // Initial setup
    revealAllSections(); // Reveal all sections on page load
    mainProjects.style.display = 'grid'; // Ensure the main projects container is displayed as a grid
    mainProjects.style.opacity = '1'; // Set the main projects container to fully visible

    // Add an event listener to the toggle button for showing/hiding projects
    toggleBtn.addEventListener('click', () => {
        // Toggle the expanded state (true/false)
        isExpanded = !isExpanded;

        // Add or remove the 'active' class on the toggle button for visual feedback
        toggleBtn.classList.toggle('active');
        
        if (isExpanded) {
            // When the "Show More" button is clicked
            // Clean up any existing ScrollReveal animations on the hidden projects
            ScrollReveal().clean(hiddenProjects);
            
            // Update the styles of the hidden projects container to make it visible
            Object.assign(hiddenProjects.style, {
                display: 'grid', // Display the container as a grid
                opacity: '1', // Make it fully visible
                visibility: 'visible', // Ensure it is visible
                transform: 'none', // Reset any transformations
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', // Responsive grid layout
                gap: '3rem', // Space between grid items
                rowGap: '5rem', // Additional space between rows
                marginTop: '3rem' // Add margin above the hidden projects
            });

            // Update the toggle button text to "Show Less"
            toggleText.textContent = 'Show Less';
            
            // Update the styles of each project card inside the hidden projects container
            hiddenProjects.querySelectorAll('.projects-card').forEach(card => {
                Object.assign(card.style, {
                    display: 'flex', // Use flexbox for layout
                    flexDirection: 'column', // Stack items vertically
                    alignItems: 'center', // Center items horizontally
                    justifyContent: 'center', // Center items vertically
                    textAlign: 'center', // Center-align text
                    padding: '5rem 2rem', // Add padding inside the card
                    gap: '3rem', // Space between elements inside the card
                    height: '600px' // Set a fixed height for the card
                });
            });
            
            // Smoothly scroll to the hidden projects section
            hiddenProjects.scrollIntoView({ behavior: 'smooth', block: 'start' });

        } else {
            // When the "Show Less" button is clicked
            // Hide the hidden projects container
            hiddenProjects.style.display = 'none';

            // Ensure the main projects container is displayed as a grid
            mainProjects.style.display = 'grid';

            // Update the toggle button text to "Show More"
            toggleText.textContent = 'Show More';

            // Reset the spacing and layout of all sections
            resetSectionSpacing();
            
            // Update the styles of the main projects container
            Object.assign(mainProjects.style, {
                padding: '2rem', // Add padding inside the container
                gap: '2rem' // Space between grid items
            });
            
            // Update the spacing of the projects wrapper
            document.querySelector('.projects-wrapper').style.gap = '2rem';
            
            // Smoothly scroll to the projects section
            document.getElementById('projects').scrollIntoView({
                behavior: 'smooth', // Smooth scrolling animation
                block: 'start' // Align the section to the top of the viewport
            });
            
            // Reinitialize animations for all sections
            revealAllSections();
        }
    });
});
