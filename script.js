// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.innerHTML = navLinks.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            if (menuToggle) {
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });
}

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (header) {
        header.classList.toggle('scrolled', window.scrollY > 50);
    }
});

// Typing Animation for Hero Subtitle
const text = "Full-Stack Developer";
const typingText = document.querySelector(".typing-text");

let charIndex = 0;
let isDeleting = false;

function type() {
    const currentText = text.substring(0, charIndex);
    typingText.textContent = currentText;

    if (!isDeleting && charIndex < text.length) {
        charIndex++;
        setTimeout(type, 100);
    } else if (isDeleting && charIndex > 0) {
        charIndex--;
        setTimeout(type, 50);
    } else {
        isDeleting = !isDeleting;
        setTimeout(type, 1000);
    }
}

// Scroll reveal animation
function scrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const revealTop = reveal.getBoundingClientRect().top;
        const revealPoint = 100;
        
        if (revealTop < windowHeight - revealPoint) {
            reveal.classList.add('active');
        } else {
            reveal.classList.remove('active');
        }
    });
}

// Animate Progress Bars on Scroll
const skillItems = document.querySelectorAll('.skill-item');

const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressFill = entry.target.querySelector('.progress-fill');
            const targetWidth = progressFill.style.width;
            progressFill.style.width = '0';
            setTimeout(() => {
                progressFill.style.width = targetWidth;
            }, 100);
        }
    });
}, { threshold: 0.5 });

skillItems.forEach(item => {
    skillsObserver.observe(item);
});

// Fade-in Animation for Timeline Items
const timelineItems = document.querySelectorAll('.timeline-item');

const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.2 });

timelineItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    timelineObserver.observe(item);
});

// Animate cards on scroll
const cards = document.querySelectorAll('.card, .project-card');

const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            // Staggered animation
            entry.target.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        }
    });
}, { threshold: 0.1 });

cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    cardObserver.observe(card);
});

// Project Filter Functionality
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        filterBtns.forEach(btn => btn.classList.remove('active'));
        btn.classList.add('active');
        
        // Filter projects
        const filter = btn.dataset.filter;
        projectCards.forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Contact Form Handling with EmailJS
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Change button state
        const submitBtn = contactForm.querySelector('.submit-btn');
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Send email using EmailJS
        emailjs.sendForm('default_service', 'template_w1fz8ll', contactForm)
            .then(() => {
                formStatus.textContent = 'Message sent successfully!';
                formStatus.className = 'form-status success';
                contactForm.reset();
            }, (error) => {
                console.error('FAILED...', error);
                formStatus.textContent = 'Oops! Something went wrong. Please try again.';
                formStatus.className = 'form-status error';
            })
            .finally(() => {
                submitBtn.innerHTML = '<span class="btn-text">Send Message</span><span class="btn-icon"><i class="fas fa-paper-plane"></i></span>';
                submitBtn.disabled = false;
                
                // Hide status message after 5 seconds
                setTimeout(() => {
                    formStatus.textContent = '';
                    formStatus.className = 'form-status';
                }, 5000);
            });
    });
}
// Input label animation
document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
    input.addEventListener('focus', () => {
        input.previousElementSibling.style.color = 'var(--primary)';
    });
    
    input.addEventListener('blur', () => {
        if (!input.value) {
            input.previousElementSibling.style.color = '#666';
        }
    });
});

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Start typing animation
    setTimeout(type, 1000);
    
    // Initialize scroll reveal
    window.addEventListener('scroll', scrollReveal);
    window.addEventListener('load', scrollReveal);
    
    // Trigger initial reveal check
    scrollReveal();
});
