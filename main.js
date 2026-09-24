// ==========================================================================
// PORTFOLIO JAVASCRIPT
// Lightweight, responsive, zero-bloat vanilla JS
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

    // ----------------------------------------------------------------------
    // 1. TYPING EFFECT (Hero Subtitle)
    // ----------------------------------------------------------------------
    const typedTextElement = document.getElementById('typedText');
    const roles = ['Backend Developer', 'Game Developer', 'UI/UX Designer'];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function typeLoop() {
        if (!typedTextElement) return;

        const currentRole = roles[roleIndex];

        if (isDeleting) {
            typedTextElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 45;
        } else {
            typedTextElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 105;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            typeSpeed = 2000; // Pause at end of word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 400; // Pause before next word
        }

        setTimeout(typeLoop, typeSpeed);
    }

    if (typedTextElement) {
        setTimeout(typeLoop, 600);
    }

    // ----------------------------------------------------------------------
    // 2. HARDWARE-ACCELERATED 3D TILT EFFECT
    // ----------------------------------------------------------------------
    const tiltElements = document.querySelectorAll('[data-tilt="true"]');
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    if (canHover && tiltElements.length > 0) {
        tiltElements.forEach(card => {
            let rafId = null;

            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const normX = (x / rect.width) - 0.5;
                const normY = (y / rect.height) - 0.5;

                const maxTilt = 8;
                const rotateY = normX * maxTilt;
                const rotateX = -normY * maxTilt;

                if (rafId) cancelAnimationFrame(rafId);
                rafId = requestAnimationFrame(() => {
                    card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
                });
            });

            card.addEventListener('mouseleave', () => {
                if (rafId) cancelAnimationFrame(rafId);
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
            });
        });
    }

    // ----------------------------------------------------------------------
    // 3. AMBIENT 3D PARTICLE CANVAS (HERO BACKGROUND)
    // ----------------------------------------------------------------------
    const canvas = document.getElementById('hero3dCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = canvas.parentElement.offsetWidth;
        let height = canvas.height = canvas.parentElement.offsetHeight;

        const particles = [];
        const particleCount = Math.min(Math.floor(width / 24), 45);

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: Math.random() * 2 + 1,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                alpha: Math.random() * 0.5 + 0.2
            });
        }

        let mouse = { x: width / 2, y: height / 2, active: false };

        window.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            if (e.clientY >= rect.top && e.clientY <= rect.bottom) {
                mouse.x = e.clientX - rect.left;
                mouse.y = e.clientY - rect.top;
                mouse.active = true;
            } else {
                mouse.active = false;
            }
        });

        function renderParticles() {
            ctx.clearRect(0, 0, width, height);

            particles.forEach((p, idx) => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0) p.x = width;
                if (p.x > width) p.x = 0;
                if (p.y < 0) p.y = height;
                if (p.y > height) p.y = 0;

                // Mouse interaction repulsion/attraction
                if (mouse.active) {
                    const dx = mouse.x - p.x;
                    const dy = mouse.y - p.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 120) {
                        p.x -= (dx / dist) * 0.8;
                        p.y -= (dy / dist) * 0.8;
                    }
                }

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 107, 107, ${p.alpha})`;
                ctx.fill();

                // Draw subtle connecting lines
                for (let j = idx + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 90) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(255, 165, 0, ${0.12 * (1 - dist / 90)})`;
                        ctx.lineWidth = 0.8;
                        ctx.stroke();
                    }
                }
            });

            requestAnimationFrame(renderParticles);
        }

        renderParticles();

        window.addEventListener('resize', () => {
            width = canvas.width = canvas.parentElement.offsetWidth;
            height = canvas.height = canvas.parentElement.offsetHeight;
        });
    }

    // ----------------------------------------------------------------------
    // 4. ANIMATED SKILLS PROGRESS BARS
    // ----------------------------------------------------------------------
    const skillBars = document.querySelectorAll('.skill-progress-bar');

    if ('IntersectionObserver' in window) {
        const skillsObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const progress = bar.getAttribute('data-progress');
                    bar.style.width = progress + '%';
                    observer.unobserve(bar);
                }
            });
        }, { threshold: 0.25 });

        skillBars.forEach(bar => skillsObserver.observe(bar));
    } else {
        skillBars.forEach(bar => {
            bar.style.width = bar.getAttribute('data-progress') + '%';
        });
    }

    // ----------------------------------------------------------------------
    // 5. MOBILE NAVIGATION TOGGLE
    // ----------------------------------------------------------------------
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        // Close on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }

    // ----------------------------------------------------------------------
    // 6. SCROLLSPY (ACTIVE NAV LINK) & BACK TO TOP
    // ----------------------------------------------------------------------
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a');
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;

        // Back to top visibility
        if (backToTop) {
            if (scrollY > 400) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }

        // Active link scrollspy
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navItems.forEach(link => {
            link.classList.remove('active');
            if (currentSection && link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }, { passive: true });

});