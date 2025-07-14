// GSAP Animations and Interactive Effects

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Animations object to manage all animations
const animations = {
    init() {
        this.setupHeroAnimations();
        this.setupScrollAnimations();
        this.setupStatCounters();
        this.setupSkillCards();
        this.setupProjectCards();
        this.setupTestimonialSlider();
    },

    setupHeroAnimations() {
        // Hero section entrance animation
        gsap.from('.hero-content h1', {
            y: 100,
            opacity: 0,
            duration: 1,
            ease: 'power4.out'
        });

        gsap.from('.hero-content .subtitle', {
            y: 50,
            opacity: 0,
            duration: 1,
            delay: 0.3,
            ease: 'power4.out'
        });

        gsap.from('.hero-content .hero-description', {
            y: 50,
            opacity: 0,
            duration: 1,
            delay: 0.5,
            ease: 'power4.out'
        });

        gsap.from('.cta-buttons', {
            y: 50,
            opacity: 0,
            duration: 1,
            delay: 0.7,
            ease: 'power4.out'
        });
    },

    setupScrollAnimations() {
        // About section animations
        gsap.from('.profile-container', {
            scrollTrigger: {
                trigger: '.profile-container',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            x: -100,
            opacity: 0,
            duration: 1,
            ease: 'power4.out'
        });

        // Timeline animations
        gsap.from('.timeline-item', {
            scrollTrigger: {
                trigger: '.timeline',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power4.out'
        });

        // Skills section animations
        gsap.from('.skill-card', {
            scrollTrigger: {
                trigger: '.skills-grid',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power4.out'
        });

        // Projects section animations
        gsap.from('.project-card', {
            scrollTrigger: {
                trigger: '.projects-grid',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power4.out'
        });
    },

    setupStatCounters() {
        // Animate number counters
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            
            gsap.to(counter, {
                scrollTrigger: {
                    trigger: counter,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                },
                innerHTML: target,
                duration: 2,
                snap: { innerHTML: 1 },
                ease: 'power1.inOut'
            });
        });
    },

    setupSkillCards() {
        // Skill cards hover effect
        const skillCards = document.querySelectorAll('.skill-card');

        skillCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    scale: 1.05,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    scale: 1,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });

            // Show skill details on click
            card.addEventListener('click', () => {
                const details = card.querySelector('.skill-details');
                gsap.to(details, {
                    height: 'auto',
                    opacity: 1,
                    duration: 0.5,
                    ease: 'power2.out'
                });
            });
        });
    },

    setupProjectCards() {
        // Project cards hover and click effects
        const projectCards = document.querySelectorAll('.project-card');

        projectCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    y: -10,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    y: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });

            // Show project details on click
            card.addEventListener('click', () => {
                const details = card.querySelector('.project-details');
                if (details.classList.contains('hidden')) {
                    details.classList.remove('hidden');
                    gsap.from(details, {
                        height: 0,
                        opacity: 0,
                        duration: 0.5,
                        ease: 'power2.out'
                    });
                } else {
                    gsap.to(details, {
                        height: 0,
                        opacity: 0,
                        duration: 0.5,
                        ease: 'power2.in',
                        onComplete: () => details.classList.add('hidden')
                    });
                }
            });
        });
    },

    setupTestimonialSlider() {
        const slider = document.querySelector('.testimonials-slider');
        const slides = document.querySelectorAll('.testimonial-card');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        let currentSlide = 0;

        // Hide all slides except first
        slides.forEach((slide, index) => {
            if (index !== 0) {
                gsap.set(slide, { opacity: 0, display: 'none' });
            }
        });

        // Next slide function
        const nextSlide = () => {
            gsap.to(slides[currentSlide], {
                opacity: 0,
                duration: 0.5,
                onComplete: () => {
                    slides[currentSlide].style.display = 'none';
                    currentSlide = (currentSlide + 1) % slides.length;
                    slides[currentSlide].style.display = 'block';
                    gsap.to(slides[currentSlide], {
                        opacity: 1,
                        duration: 0.5
                    });
                }
            });
        };

        // Previous slide function
        const prevSlide = () => {
            gsap.to(slides[currentSlide], {
                opacity: 0,
                duration: 0.5,
                onComplete: () => {
                    slides[currentSlide].style.display = 'none';
                    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
                    slides[currentSlide].style.display = 'block';
                    gsap.to(slides[currentSlide], {
                        opacity: 1,
                        duration: 0.5
                    });
                }
            });
        };

        // Add click events to buttons
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);

        // Auto-advance slides
        setInterval(nextSlide, 5000);
    }
};

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    animations.init();
});