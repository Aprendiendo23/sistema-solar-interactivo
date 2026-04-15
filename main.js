/*
    Cosmic Curator | Main Interactivity
*/

document.addEventListener('DOMContentLoaded', () => {
    // 1. Smooth Scroll Active Link Highlighting
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    const observerOptions = {
        root: null,
        threshold: 0.3,
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').substring(1) === entry.target.id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));

    // 2. Scroll Animations (Reveal on Scroll)
    const revealElements = document.querySelectorAll('.glass-card, .title-lg, .content-block, .feature-card, .mission-card');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        revealObserver.observe(el);
    });

    // 3. Parallax Effect & Scroll Progress
    const scrollProgress = document.querySelector('.scroll-progress');

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        
        // Update progress bar
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = (scrolled / height) * 100;
        if (scrollProgress) scrollProgress.style.width = progress + '%';

        const heroVisual = document.querySelector('.hero-visual');
        if (heroVisual) {
            heroVisual.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
        
        // Cosmic Glow moves slower
        const glow1 = document.querySelector('.glow-1');
        const glow2 = document.querySelector('.glow-2');
        if (glow1) glow1.style.transform = `translateY(${scrolled * 0.05}px)`;
        if (glow2) glow2.style.transform = `translateY(${-scrolled * 0.05}px)`;
    });

    // 4. Accordion Interactivity (Ensure only one open at a time)
    const details = document.querySelectorAll('details');
    details.forEach(targetDetail => {
        targetDetail.addEventListener('toggle', () => {
            if (targetDetail.open) {
                details.forEach(detail => {
                    if (detail !== targetDetail) {
                        detail.open = false;
                    }
                });
            }
        });
    });

    // 5. Star Path Comet Animation (Dynamic progress if needed)
    // For now it's static in HTML, but we could animate it
    const starPathProgress = document.querySelector('.star-path-progress');
    const starPathHead = document.querySelector('.star-path-head');
    
    if (starPathProgress && starPathHead) {
        // Simple entry animation
        setTimeout(() => {
            const width = starPathProgress.style.width;
            starPathProgress.style.width = '0%';
            starPathHead.style.left = '0%';
            
            setTimeout(() => {
                starPathProgress.style.transition = 'width 2s cubic-bezier(0.4, 0, 0.2, 1)';
                starPathHead.style.transition = 'left 2s cubic-bezier(0.4, 0, 0.2, 1)';
                starPathProgress.style.width = width;
                starPathHead.style.left = width;
            }, 100);
        }, 500);
    }

    // 6. Rocket Button Logic
    const rocketFAB = document.querySelector('.fab');
    const launchBtn = document.querySelector('.hero-actions .btn-primary');

    const launchRocket = (targetId = 'home') => {
        // Visual effects
        rocketFAB.classList.add('rocket-active', 'engine-on');
        
        // Scroll
        const targetElement = targetId === 'home' ? document.body : document.getElementById(targetId);
        targetElement.scrollIntoView({ behavior: 'smooth' });

        // Cleanup after scroll
        setTimeout(() => {
            rocketFAB.classList.remove('rocket-active', 'engine-on');
            // Little bounce effect
            rocketFAB.style.transform = 'scale(1.2)';
            setTimeout(() => {
                rocketFAB.style.transform = '';
            }, 300);
        }, 1500);
    };

    // Navbar Explorar button
    const navbarExploreBtn = document.querySelector('.navbar .btn-primary');
    if (navbarExploreBtn) {
        navbarExploreBtn.addEventListener('click', () => launchRocket('planets'));
    }

    // Hero Learn More button
    const learnMoreBtn = document.getElementById('learn-more-btn');
    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', () => launchRocket('artemis'));
    }

    if (rocketFAB) {
        rocketFAB.addEventListener('click', () => launchRocket('home'));
    }

    if (launchBtn) {
        launchBtn.addEventListener('click', (e) => {
            e.preventDefault();
            launchRocket('origin');
        });
    }

    // Also the footer brand should go to home
    const footerBrand = document.querySelector('.footer-brand');
    if (footerBrand) {
        footerBrand.addEventListener('click', () => launchRocket('home'));
    }

    // Download button
    const downloadBtn = document.getElementById('download-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', downloadPlanetsData);
    }

    // Share button
    const shareBtn = document.getElementById('share-btn');
    if (shareBtn) {
        shareBtn.addEventListener('click', sharePage);
    }

    // Cursor follower for planets table
    const tableRows = document.querySelectorAll('.planet-row');
    tableRows.forEach(row => {
        row.style.cursor = 'pointer';
    });

    // Enhanced hover effects for feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.boxShadow = '0 0 30px rgba(233, 196, 0, 0.15)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.boxShadow = '';
        });
    });

    // Interactive star counter animation
    const statValues = document.querySelectorAll('.stat-value');
    statValues.forEach(stat => {
        stat.addEventListener('click', () => {
            stat.style.transform = 'scale(1.1)';
            setTimeout(() => stat.style.transform = '', 300);
        });
    });

    // Solar system planets interactivity
    const ssPlanets = document.querySelectorAll('.ss-planet');
    const tooltip = document.getElementById('planet-tooltip');
    
    ssPlanets.forEach(planet => {
        planet.addEventListener('click', () => {
            const planetName = planet.dataset.planet;
            
            // Remove active from all
            ssPlanets.forEach(p => p.classList.remove('active'));
            planet.classList.add('active');
            
            // Show in tooltip
            if (tooltip) {
                tooltip.textContent = planetName;
            }
        });
    });

    // Set planet colors from data attribute
    ssPlanets.forEach(planet => {
        const color = planet.dataset.color;
        planet.querySelector('.ss-planet-dot').style.setProperty('--planet-color', color);
        planet.querySelector('.ss-planet-dot').style.background = color;
        planet.querySelector('.ss-planet-dot').style.boxShadow = `0 0 10px ${color}`;
    });

    // Pause orbit on hover for better interaction
    ssPlanets.forEach(planet => {
        planet.addEventListener('mouseenter', () => {
            planet.style.animationPlayState = 'paused';
        });
        planet.addEventListener('mouseleave', () => {
            planet.style.animationPlayState = 'running';
        });
    });

    // Sun card click handlers for additional info
    const sunCards = document.querySelectorAll('.sun-card');
    sunCards.forEach(card => {
        card.addEventListener('click', () => {
            const info = card.dataset.info;
            console.log('Sun section clicked:', info);
            // Could expand to show more detailed info
        });
    });
});
