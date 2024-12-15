'use client '

document.addEventListener('DOMContentLoaded', () => {
    const menuIcon = document.querySelector('#menu-icon');
    const navbar = document.querySelector('.navbar');

    menuIcon.addEventListener('click', () => {
        menuIcon.classList.toggle('bx-x');
        navbar.classList.toggle('active');
    });

    // Close menu when a nav item is clicked
    document.querySelectorAll('.navbar a').forEach(link => {
        link.addEventListener('click', () => {
            menuIcon.classList.remove('bx-x');
            navbar.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links and active state
    document.querySelectorAll('.navbar a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            // Remove active class from all links
            document.querySelectorAll('.navbar a').forEach(link => {
                link.classList.remove('active');
            });

            // Add active class to clicked link
            this.classList.add('active');

            // Smooth scroll to the target section
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Set active class based on scroll position
    function setActiveNavItem() {
        const sections = document.querySelectorAll('section');
        const navItems = document.querySelectorAll('.navbar a');

        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 150 && rect.bottom >= 150) {
                navItems.forEach(item => item.classList.remove('active'));
                navItems[index].classList.add('active');
            }
        });
    }

    // Add scroll event listener
    window.addEventListener('scroll', setActiveNavItem);

    // Call setActiveNavItem on page load
    setActiveNavItem();


    // Download CV button functionality
    const downloadCVButton = document.querySelector('a.button[href="#"]');
    if (downloadCVButton) {
        downloadCVButton.addEventListener('click', (e) => {
            e.preventDefault();
            // Replace 'path/to/your/cv.pdf' with the actual path to your CV file
            window.open('path/to/your/cv.pdf', '_blank');
        });
    }

    // Hire me button functionality
    const hireMeButton = document.querySelectorAll('a.button')[1];
    if (hireMeButton) {
        hireMeButton.addEventListener('click', (e) => {
            e.preventDefault();
            // Scroll to the contact section
            document.querySelector('#contact').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }

    // Form submission
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Here you would typically send the form data to a server
            // For this example, we'll just log it to the console
            const formData = new FormData(contactForm);
            console.log('Form submitted with data:', Object.fromEntries(formData));
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }

    // Skills Animation
    function checkSkills() {
        const skillsSection = document.querySelector('.skills');
        if (!skillsSection) return;

        const sectionPos = skillsSection.getBoundingClientRect().top;
        const screenPos = window.innerHeight / 1.3;

        if (sectionPos < screenPos) {
            // Animate technical skills
            document.querySelectorAll('.skill-bar .bar span').forEach(span => {
                span.classList.add('animate');
            });

            // Animate professional skills
            document.querySelectorAll('.circle .mask.full').forEach(circle => {
                circle.style.animation = 'fill 1s ease-in-out forwards';
            });

            // Remove scroll listener once animated
            window.removeEventListener('scroll', checkSkills);
        }
    }

    // Add scroll listener for skills animation
    window.addEventListener('scroll', checkSkills);
    // Check on initial load
    checkSkills();

    // Multiple text animation
    const multipleText = document.querySelector('.multiple-text');
    const roles = ['UI/UX Designer', 'Web Developer', 'App Developer'];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeText() {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            multipleText.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            multipleText.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typingSpeed = 1000; // Pause before deleting
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
        }

        setTimeout(typeText, typingSpeed);
    }

    typeText(); // Start the typing animation
});