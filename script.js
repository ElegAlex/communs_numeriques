document.addEventListener('DOMContentLoaded', () => {

    // --- Menu Hamburger ---
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (navToggle && mainNav) {
        navToggle.addEventListener('click', () => {
            const isOpen = mainNav.classList.toggle('nav-open');
            document.body.classList.toggle('nav-open', isOpen);
            navToggle.setAttribute('aria-expanded', isOpen);
            navToggle.setAttribute('aria-label', isOpen ? 'Fermer le menu' : 'Ouvrir le menu');
        });

        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                // Vérifie si le lien est une ancre sur la même page ou un lien vers une autre page du site
                // (ne commence pas par #, http, ou n'est pas un mailto/tel)
                const isSamePageAnchor = href && href.startsWith('#') && 
                                        (window.location.pathname === link.pathname || '/' + link.pathname === window.location.pathname);

                const isInternalPageLink = href && !href.startsWith('#') && 
                                           !href.startsWith('http') && 
                                           !href.startsWith('mailto:') && 
                                           !href.startsWith('tel:');
                
                if (mainNav.classList.contains('nav-open')) {
                    if (isSamePageAnchor || isInternalPageLink) {
                        mainNav.classList.remove('nav-open');
                        document.body.classList.remove('nav-open');
                        navToggle.setAttribute('aria-expanded', 'false');
                        navToggle.setAttribute('aria-label', 'Ouvrir le menu');
                        // Pour les ancres, le comportement de défilement est géré par CSS ou par défaut
                    }
                    // Pour les liens externes ou spéciaux, le menu se fermera avec le changement de page.
                }
            });
        });
    }

    // --- Animations au scroll avec IntersectionObserver ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, observerInstance) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Lire le délai de transition CSS pour le respecter
                    const delay = parseFloat(getComputedStyle(entry.target).transitionDelay) * 1000;
                    setTimeout(() => {
                        entry.target.classList.add('is-visible');
                    }, delay || 0); // S'il n'y a pas de délai, exécuter immédiatement
                    
                    observerInstance.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1, // Déclenche quand 10% de l'élément est visible
            // rootMargin: "0px 0px -50px 0px" // Option: déclencher un peu avant que l'élément n'atteigne le bas
        });

        animatedElements.forEach(el => observer.observe(el));
    } else {
        // Fallback pour les navigateurs ne supportant pas IntersectionObserver
        animatedElements.forEach(el => el.classList.add('is-visible'));
    }

    // --- Mise à jour de l'année dans le footer ---
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Optionnel: Active link highlighting in nav (basic version) ---
    // (Pour une version plus robuste, surtout avec des ancres, il faudrait plus de logique)
    // const navLinks = document.querySelectorAll('.main-nav a');
    // const currentPath = window.location.pathname;
    // const currentHash = window.location.hash;

    // navLinks.forEach(link => {
    //     const linkPath = new URL(link.href).pathname;
    //     const linkHash = new URL(link.href).hash;

    //     // Simple path match
    //     if (linkPath === currentPath && (linkHash === currentHash || (linkHash === '' && currentHash === ''))) {
    //         if(!link.href.endsWith('#hero') && currentHash ==='#hero'){} // Do not activate other links if on #hero
    //         else if (currentPath === '/' && link.getAttribute('href') === '#hero' && (currentHash === '' || currentHash === '#hero')) {
    //            link.classList.add('active'); // Activate #hero on homepage
    //         } else if (linkPath !== '/' || (linkPath === '/' && link.getAttribute('href') !== '#hero') ) {
    //             link.classList.add('active');
    //         }
    //     }
        
    //     // Special case for homepage #hero when other hashes are present
    //     if (currentPath === '/' && (currentHash !== '' && currentHash !== '#hero') && link.getAttribute('href') === '#hero') {
    //         link.classList.remove('active');
    //     }
    // });


    // --- Active link highlighting in nav (plus robuste pour les ancres sur la page d'accueil) ---
    const navLinks = document.querySelectorAll('.main-nav a');
    const sections = document.querySelectorAll('main > section[id]'); // Sections sur la page d'accueil

    function changeActiveLink() {
        let currentSectionId = 'hero'; // Par défaut sur 'hero'

        // Vérifier si on est sur une autre page que la page d'accueil
        const pathName = window.location.pathname;
        if (pathName !== '/' && pathName !== '/index.html') {
            navLinks.forEach(link => {
                // Si le href du lien correspond au chemin actuel (sans le slash de début si pathName est '/')
                const linkHref = link.getAttribute('href');
                if (linkHref === pathName || linkHref === pathName.substring(1)) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
            return; // Ne pas exécuter la logique de scroll pour les autres pages
        }

        // Logique pour la page d'accueil avec sections
        let maxVisibleArea = 0;
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
            
            // Si la section est visible et occupe le plus d'espace à l'écran
            // Ou si le haut de la section est très proche du haut du viewport (pour sections courtes)
            const sectionTopOffset = Math.abs(rect.top - varHeaderHeight);
            const isMostlyVisible = visibleHeight > 0 && (visibleHeight > maxVisibleArea || (sectionTopOffset < window.innerHeight / 3 && visibleHeight > window.innerHeight * 0.1));

            if (isMostlyVisible) {
                maxVisibleArea = visibleHeight;
                currentSectionId = section.id;
            }
        });
        
        // Si aucune section n'est "principalement" visible (ex: tout en bas après la dernière section)
        // on peut vérifier si on a scrollé au-delà du milieu de la dernière section.
        if (maxVisibleArea === 0 && sections.length > 0) {
            const lastSection = sections[sections.length - 1];
            const lastSectionRect = lastSection.getBoundingClientRect();
            if (lastSectionRect.top < window.innerHeight / 2 && lastSectionRect.bottom < window.innerHeight / 2) {
                 // Si le bas de la dernière section est au-dessus du milieu de l'écran, on est probablement après.
            }
        }


        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }

    const varHeaderHeight = document.getElementById('main-header') ? document.getElementById('main-header').offsetHeight : 70;

    // Appeler pour la page d'accueil au chargement et au scroll
    if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
        window.addEventListener('scroll', changeActiveLink);
        window.addEventListener('load', changeActiveLink); // Aussi au chargement
    } else {
        // Pour les autres pages, juste matcher le lien exact
         navLinks.forEach(link => {
            const linkPath = new URL(link.href, window.location.origin).pathname;
            if (linkPath === window.location.pathname) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    // --- Reading progress bar ---
    const progressBar = document.getElementById("reading-progress");
    if (progressBar) {
        const updateProgress = () => {
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
            progressBar.style.width = progress + "%";
        };
        window.addEventListener("scroll", updateProgress);
        window.addEventListener("resize", updateProgress);
        updateProgress();
    }

    // --- Scrolly visuals in the mémoire page ---
    document.body.classList.add('js-enabled');
    const steps = document.querySelectorAll('.interactive-overview .step');
    const visuals = document.querySelectorAll('.interactive-overview .visual-pane .visual');

    if (steps.length && visuals.length && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const index = entry.target.dataset.step;
                    visuals.forEach(v => {
                        v.classList.toggle('active', v.dataset.step === index);
                    });
                }
            });
        }, { threshold: 0.5 });

        steps.forEach(step => observer.observe(step));
    }

    // --- Back to top button ---
    const backToTop = document.getElementById("back-to-top");
    if (backToTop) {
        const toggleBackToTop = () => {
            if (window.scrollY > 300) {
                backToTop.classList.add("visible");
            } else {
                backToTop.classList.remove("visible");
            }
        };
        window.addEventListener("scroll", toggleBackToTop);
        backToTop.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
        toggleBackToTop();
    }


});
