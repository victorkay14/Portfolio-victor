// Interactive Features

document.addEventListener('DOMContentLoaded', () => {
    initSkillCards();
    initTestimonialSlider();
    initStatsCounter();
});

// Skill Cards Interaction
function initSkillCards() {
    const skillCards = document.querySelectorAll('.skill-card');

    skillCards.forEach(card => {
        card.addEventListener('click', () => {
            skillCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            showSkillDetails(card.getAttribute('data-skill'));
        });
    });
}

function showSkillDetails(skillType) {
    const details = {
        'web-development': {
            title: 'Web Development Expertise',
            description: 'Specialized in creating responsive, modern websites using HTML5, CSS3, and JavaScript. Experienced in building interactive user interfaces and implementing modern web technologies.',
            experience: '8+ years',
            projects: '40+ websites delivered'
        },
        'video-editing': {
            title: 'Video Editing Mastery',
            description: 'Professional video editing with Adobe Premier Pro and After Effects. Creating engaging content with motion graphics, transitions, and visual effects.',
            experience: '7+ years',
            projects: '200+ videos edited'
        },
        'seo': {
            title: 'SEO Optimization',
            description: 'Expert in technical SEO, content optimization, and search engine ranking. Implementing effective strategies for improved online visibility.',
            experience: '6+ years',
            projects: '100+ websites optimized'
        }
    };

    const detail = details[skillType];
    if (!detail) return;

    const detailsContainer = document.createElement('div');
    detailsContainer.className = 'skill-details-modal glass-effect';
    detailsContainer.innerHTML = `
        <h3>${detail.title}</h3>
        <p>${detail.description}</p>
        <div class="detail-stats">
            <div class="detail-stat">
                <h4>Experience</h4>
                <p>${detail.experience}</p>
            </div>
            <div class="detail-stat">
                <h4>Projects</h4>
                <p>${detail.projects}</p>
            </div>
        </div>
        <button class="close-details">Close</button>
    `;

    const existingModal = document.querySelector('.skill-details-modal');
    if (existingModal) existingModal.remove();

    document.body.appendChild(detailsContainer);

    detailsContainer.querySelector('.close-details').addEventListener('click', () => {
        detailsContainer.remove();
        skillCards.forEach(c => c.classList.remove('active'));
    });
}

// Testimonial Slider
function initTestimonialSlider() {
    const testimonials = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;

    function showSlide(index) {
        testimonials.forEach((slide, i) => {
            slide.style.transform = `translateX(${100 * (i - index)}%)`;
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % testimonials.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + testimonials.length) % testimonials.length;
        showSlide(currentSlide);
    }

    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Initialize slider
    showSlide(currentSlide);

    // Auto slide every 5 seconds
    setInterval(nextSlide, 5000);
}

// Stats Counter Animation
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');

    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;

        const counter = setInterval(() => {
            current += step;
            if (current >= target) {
                element.textContent = target;
                clearInterval(counter);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }

    // Intersection Observer for Stats
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statElements = entry.target.querySelectorAll('.stat-number');
                statElements.forEach(animateCounter);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stats-section').forEach(section => {
        statsObserver.observe(section);
    });
}