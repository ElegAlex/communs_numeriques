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

    // --- Table of contents interactions ---
    const tocToggleButton = document.getElementById('toc-toggle-button');
    const toc = document.getElementById('table-of-contents');

    if (tocToggleButton && toc) {
        tocToggleButton.addEventListener('click', () => {
            const isExpanded = tocToggleButton.getAttribute('aria-expanded') === 'true';
            tocToggleButton.setAttribute('aria-expanded', !isExpanded);
            toc.classList.toggle('toc-visible');
        });
    }

    if (toc) {
        const tocLinks = toc.querySelectorAll('a.toc-link');
        const headingMap = {};
        tocLinks.forEach(link => {
            const id = link.getAttribute('href').slice(1);
            const heading = document.getElementById(id);
            if (heading) {
                headingMap[id] = link;
            }
        });

        if ('IntersectionObserver' in window) {
            let currentActive = null;
            // Adjusting rootMargin:
            // - Top margin: Negative of header height + some offset. This ensures a heading isn't highlighted
            //   if it's mostly hidden behind the fixed header.
            // - Bottom margin: Negative to ensure highlighting happens when the heading is well within view,
            //   not just barely peeking from the bottom. e.g., -60% means the bottom 60% of the viewport
            //   is ignored for the "bottom" of the intersection calculation.
            //   A heading is active if its top is between (headerHeight + offset) and (viewportHeight * 0.4).
            const headerHeightForToc = varHeaderHeight + 20; // main header height + some breathing room
            const rootMarginValue = `-${headerHeightForToc}px 0px -${window.innerHeight - headerHeightForToc - 150}px 0px`;
            // This rootMargin means:
            // top: don't consider active if it's above "headerHeightForToc" from the top of viewport
            // bottom: don't consider active if it's below (viewport_height - (headerHeightForToc + 150px)) from the top of viewport
            // This creates a "band" of about 150px high below the header where a heading's top must be to be active.

            const io = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    const link = headingMap[entry.target.id];
                    if (!link) return;

                    if (entry.isIntersecting) {
                        // When a heading enters the target "band"
                        if (currentActive) currentActive.classList.remove('active');
                        link.classList.add('active');
                        currentActive = link;
                         // Optional: Scroll TOC to keep active link visible
                        if (toc.classList.contains('sticky') || toc.classList.contains('toc-visible')) { // Check if TOC is visible
                            const activeLinkRect = link.getBoundingClientRect();
                            const tocRect = toc.getBoundingClientRect();
                            if (activeLinkRect.top < tocRect.top || activeLinkRect.bottom > tocRect.bottom) {
                                link.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
                            }
                        }

                    } else {
                        // Potentially remove active class if it scrolls out of the "band" upwards
                        // This logic might need refinement based on desired behavior for multiple intersecting entries
                        // For now, the new intersecting entry will correctly set 'currentActive'
                    }
                });
            }, {
                rootMargin: rootMarginValue,
                threshold: 0 // Trigger as soon as the element enters/leaves the intersection area
            });

            const observedElements = [];
            Object.keys(headingMap).forEach(id => {
                const headingElement = document.getElementById(id);
                if (headingElement) {
                    io.observe(headingElement);
                    observedElements.push(headingElement);
                }
            });

            // Fallback or initial active link setting for when page loads or if no intersection is detected
            // (e.g. if already scrolled to a section)
            function updateActiveLinkFallback() {
                let bestMatch = null;
                let smallestDistance = Infinity;

                observedElements.forEach(heading => {
                    const rect = heading.getBoundingClientRect();
                    // Check if the heading is reasonably visible (top part of it is below the header and above bottom of viewport)
                    if (rect.top >= headerHeightForToc && rect.top < window.innerHeight) {
                        const distanceToActivationLine = Math.abs(rect.top - headerHeightForToc);
                        if (distanceToActivationLine < smallestDistance) {
                            smallestDistance = distanceToActivationLine;
                            bestMatch = headingMap[heading.id];
                        }
                    }
                });

                if (bestMatch && currentActive !== bestMatch) {
                    if (currentActive) currentActive.classList.remove('active');
                    bestMatch.classList.add('active');
                    currentActive = bestMatch;
                }
            }
            window.addEventListener('scroll', updateActiveLinkFallback, { passive: true });
            document.addEventListener('DOMContentLoaded', updateActiveLinkFallback);


        }

        const sublists = toc.querySelectorAll('li > ul.toc-list');
        sublists.forEach((ul, idx) => {
            ul.id = ul.id || `toc-sublist-${idx}`;
            const li = ul.parentElement;
            const toggle = document.createElement('button');
            toggle.className = 'toc-toggle';
            toggle.setAttribute('aria-controls', ul.id);
            toggle.setAttribute('aria-expanded', 'true');
            toggle.innerHTML = '▾';
            li.insertBefore(toggle, ul);

            const toggleAction = () => {
                const expanded = toggle.getAttribute('aria-expanded') === 'true';
                toggle.setAttribute('aria-expanded', String(!expanded));
                ul.hidden = expanded;
                toggle.innerHTML = expanded ? '▸' : '▾';
            };

            toggle.addEventListener('click', toggleAction);
            toggle.addEventListener('keydown', e => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleAction();
                }
            });
        });
    }
    // --- Reading progress bar ---
    const progressBar = document.getElementById("reading-progress");
    const longFormArticle = document.querySelector(".long-form-article");

    if (progressBar && longFormArticle) {
        const updateProgress = () => {
            const articleRect = longFormArticle.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const headerHeight = varHeaderHeight; // Using the already calculated header height

            // Calculate how much of the article is visible or has been scrolled past,
            // starting from when the top of the article reaches below the header,
            // until the bottom of the article leaves the bottom of the viewport.

            // Scrollable height of the article itself
            const articleScrollableHeight = articleRect.height - (viewportHeight - headerHeight);

            // Current scroll position relative to the article's start (when its top is just below the header)
            // articleRect.top is the distance from the viewport top to the article top.
            // When articleRect.top is headerHeight, we are at the beginning of the readable content.
            // Scrolled distance within the article's "readable" zone:
            let scrolledDistanceInArticle = (headerHeight - articleRect.top);

            let progress = 0;
            if (articleScrollableHeight > 0) {
                // Ensure progress starts at 0 when top of article is at/below header, and caps at 100
                // when bottom of article is at/above viewport bottom.
                if (scrolledDistanceInArticle < 0) { // Before article content starts scrolling into view below header
                    progress = 0;
                } else if (scrolledDistanceInArticle > articleScrollableHeight) { // After article content has scrolled past
                    progress = 100;
                } else {
                    progress = (scrolledDistanceInArticle / articleScrollableHeight) * 100;
                }
            } else {
                // If article is shorter than viewport height (minus header),
                // progress can be 0 if top is below header, 100 if top is above.
                if (articleRect.top < headerHeight && articleRect.bottom > viewportHeight) {
                    progress = 100; // Article fills and exceeds visible area
                } else if (articleRect.top < headerHeight) {
                     progress = 100; // Top of short article is above header
                } else {
                    progress = 0; // Top of short article is below header
                }
            }
            
            progressBar.style.width = Math.min(Math.max(progress, 0), 100) + "%";
        };
        window.addEventListener("scroll", updateProgress, { passive: true });
        window.addEventListener("resize", updateProgress);
        // Call it once to set initial state, perhaps after other layout-affecting JS.
        // Using a small timeout if other scripts might affect layout.
        setTimeout(updateProgress, 50);
    }

    // --- Scrolly visuals in the mémoire page ---
    document.body.classList.add('js-enabled');
    const steps = document.querySelectorAll('.interactive-overview .step');
    const stickyVisual = document.querySelector('#sticky-visual img');

    if (steps.length && stickyVisual && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    stickyVisual.src = entry.target.dataset.image;
                    stickyVisual.alt = entry.target.dataset.alt || '';
                    steps.forEach(s => {
                        s.classList.toggle('step-active', s === entry.target);
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
