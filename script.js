document.addEventListener('DOMContentLoaded', () => {
    // Typewriter Effect for Tagline
    const taglines = [
        "AI/ML Research & Software Engineer", 
        "EECS @ UC Berkeley", 
        "AI/ML Researcher", 
        "Innovator", 
        "Software Engineer"
    ];
    const typedTaglineEl = document.getElementById('typed-tagline');
    let taglineIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeTagline() {
        const currentTagline = taglines[taglineIndex];
        
        if (!isDeleting) {
            // Typing
            typedTaglineEl.textContent = currentTagline.slice(0, charIndex + 1);
            charIndex++;

            // Check if we've finished typing
            if (charIndex === currentTagline.length) {
                isDeleting = true;
                // Pause before deleting
                setTimeout(typeTagline, 2000);
            } else {
                // Continue typing
                setTimeout(typeTagline, 100);
            }
        } else {
            // Deleting
            typedTaglineEl.textContent = currentTagline.slice(0, charIndex);
            charIndex--;

            // Check if we've finished deleting
            if (charIndex === 0) {
                isDeleting = false;
                // Move to next tagline
                taglineIndex = (taglineIndex + 1) % taglines.length;
                setTimeout(typeTagline, 500);
            } else {
                // Continue deleting
                setTimeout(typeTagline, 50);
            }
        }
    }

    // Start the typewriter effect
    typeTagline();

    // Theme Toggle
    const themeSwitch = document.getElementById('theme-switch');
    
    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
        document.body.classList.add('dark-mode');
        themeSwitch.checked = true;
    }

    themeSwitch.addEventListener('change', () => {
        document.body.classList.toggle('dark-mode');
        
        // Save theme preference
        const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
    });

    // Smooth Navigation Scroll
    const navLinks = document.querySelectorAll('.sticky-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            // Highlight active nav item
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Section Reveal on Scroll
    const sections = document.querySelectorAll('.section');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Update nav link based on visible section
                const sectionId = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('data-section') === sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Initial positioning of about section
    const aboutSection = document.getElementById('about');
    aboutSection.classList.add('reveal');

    // Scroll Reveal Animations for Experience
    const timelineItems = document.querySelectorAll('.timeline-item');
    const observerOptionsExperience = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observerExperience = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Delay each item's reveal for a staggered effect
                setTimeout(() => {
                    entry.target.classList.add('reveal');
                }, index * 200); // 200ms delay between each item
            }
        });
    }, observerOptionsExperience);

    timelineItems.forEach(item => {
        observerExperience.observe(item);
    });
});