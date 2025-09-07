// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 15, 28, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(30, 144, 255, 0.1)';
    } else {
        navbar.style.background = 'rgba(10, 15, 28, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll('.education-item, .skill-category, .project-card, .contact-item');
animateElements.forEach(el => {
    observer.observe(el);
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section[id]');
const navLinksArray = Array.from(navLinks);

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinksArray.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Typing effect for hero title
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    const originalText = heroTitle.innerHTML;
    const textContent = heroTitle.textContent;
    heroTitle.innerHTML = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < textContent.length) {
            if (textContent.substring(i, i + 17) === 'Ashutosh Kumar Jha') {
                heroTitle.innerHTML += '<span class="highlight">Ashutosh Kumar Jha</span>';
                i += 17;
            } else {
                heroTitle.innerHTML += textContent.charAt(i);
                i++;
            }
            setTimeout(typeWriter, 100);
        }
    };
    
    // Start typing effect after a short delay
    setTimeout(() => {
        heroTitle.innerHTML = originalText; // Fallback to original for immediate display
    }, 100);
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < hero.offsetHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Skill tags hover effect enhancement
const skillTags = document.querySelectorAll('.skill-tag');
skillTags.forEach(tag => {
    tag.addEventListener('mouseenter', () => {
        tag.style.transform = 'scale(1.1) rotate(2deg)';
    });
    
    tag.addEventListener('mouseleave', () => {
        tag.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Project cards tilt effect
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
});

// Contact items click to copy functionality
const contactItems = document.querySelectorAll('.contact-item');
contactItems.forEach(item => {
    const textElement = item.querySelector('span') || item.querySelector('a');
    if (textElement && !item.querySelector('a[href^="http"]')) {
        item.style.cursor = 'pointer';
        item.title = 'Click to copy';
        
        item.addEventListener('click', async () => {
            const text = textElement.textContent.trim();
            try {
                await navigator.clipboard.writeText(text);
                
                // Visual feedback
                const originalBg = item.style.backgroundColor;
                item.style.backgroundColor = 'rgba(0, 255, 0, 0.1)';
                item.style.borderColor = 'rgba(0, 255, 0, 0.3)';
                
                // Create and show copied message
                const copiedMsg = document.createElement('div');
                copiedMsg.textContent = 'Copied!';
                copiedMsg.style.cssText = `
                    position: absolute;
                    top: -30px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: #00FF00;
                    color: #000;
                    padding: 5px 10px;
                    border-radius: 5px;
                    font-size: 0.8rem;
                    z-index: 1000;
                    animation: fadeInOut 2s ease-in-out forwards;
                `;
                
                item.style.position = 'relative';
                item.appendChild(copiedMsg);
                
                setTimeout(() => {
                    item.style.backgroundColor = originalBg;
                    item.style.borderColor = 'rgba(30, 144, 255, 0.1)';
                    if (copiedMsg.parentNode) {
                        copiedMsg.remove();
                    }
                }, 2000);
                
            } catch (err) {
                console.log('Failed to copy text');
            }
        });
    }
});

// Add CSS for copied message animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInOut {
        0% { opacity: 0; transform: translateX(-50%) translateY(10px); }
        20% { opacity: 1; transform: translateX(-50%) translateY(0); }
        80% { opacity: 1; transform: translateX(-50%) translateY(0); }
        100% { opacity: 0; transform: translateX(-50%) translateY(-10px); }
    }
    
    .nav-link.active {
        color: #1E90FF !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(style);

// Loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger animations for elements in view
    const elementsToAnimate = document.querySelectorAll('.hero-content, .about-content');
    elementsToAnimate.forEach(el => {
        el.classList.add('fade-in');
    });
});

// Smooth reveal animation for elements
const revealElements = document.querySelectorAll('.education-item, .skill-category, .project-card');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    revealObserver.observe(el);
});
