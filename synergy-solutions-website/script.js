document.addEventListener('DOMContentLoaded', () => {
    // --- Preloader ---
    // ... (your existing preloader code) ...
    const preloader = document.getElementById('preloader');
    if (preloader) {
        const minPreloaderDisplayTime = 2200;
        let pageLoadStartTime = Date.now();

        window.addEventListener('load', () => {
            const timeSincePageLoadStarted = Date.now() - pageLoadStartTime;
            const remainingPreloaderTime = Math.max(0, minPreloaderDisplayTime - timeSincePageLoadStarted);

            setTimeout(() => {
                preloader.classList.add('loaded');
            }, remainingPreloaderTime);
        });

        setTimeout(() => {
            if (!preloader.classList.contains('loaded')) {
                preloader.classList.add('loaded');
                console.warn("Preloader fallback: Forcing hide.");
            }
        }, 8000);
    }

    // --- Mobile Menu Toggle ---
    // ... (your existing mobile menu code) ...
    const menuToggle = document.querySelector('.menu-toggle');
    const navUl = document.querySelector('nav ul');
    const header = document.querySelector('header');

    if (menuToggle && navUl) {
        menuToggle.addEventListener('click', () => {
            navUl.classList.toggle('active');
            menuToggle.innerHTML = navUl.classList.contains('active') ? '<i class="fas fa-times"></i>' : '☰';
        });
        navUl.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navUl.classList.contains('active')) {
                    navUl.classList.remove('active');
                    menuToggle.innerHTML = '☰';
                }
            });
        });
    }

    // --- Active Nav Link Highlighting on Scroll ---
    // ... (your existing active nav link code) ...
    const sections = document.querySelectorAll('main section[id]');
    const navLinks = document.querySelectorAll('nav ul li a.nav-link');

    function changeNavOnScroll() {
        if (!header) return;
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - (header.offsetHeight + 70)) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active-link');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active-link');
            }
        });
    }
    window.addEventListener('scroll', changeNavOnScroll);
    changeNavOnScroll();


    // --- Ripple Effect Implementation ---
    // ... (your existing ripple effect code) ...
    function createRipple(event) {
        const item = event.currentTarget;
        if (item.classList.contains('no-ripple') || item.disabled) {
            return;
        }
        const existingRipple = item.querySelector('.ripple-effect');
        if (existingRipple) {
            existingRipple.remove();
        }

        const circle = document.createElement('span');
        const diameter = Math.max(item.clientWidth, item.clientHeight);
        const radius = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`;
        const rect = item.getBoundingClientRect();
        circle.style.left = `${event.clientX - rect.left - radius}px`;
        circle.style.top = `${event.clientY - rect.top - radius}px`;
        circle.classList.add('ripple-effect');
        item.appendChild(circle);

        setTimeout(() => {
            if (circle.parentElement) circle.remove();
        }, 600);
    }
    document.querySelectorAll('.clickable-element').forEach(item => {
        item.addEventListener('click', createRipple);
    });


    // --- Generic Modal Logic ---
    // ... (your existing modal logic) ...
    const modal = document.getElementById('genericModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalMessage = document.getElementById('modalMessage');
    const modalImage = document.getElementById('modalImage');
    const closeModalBtn = modal ? modal.querySelector('.close-modal-btn') : null;

    function openModal(title, message, imageUrl = null) {
        if (!modal || !modalTitle || !modalMessage || !modalImage) return;
        modalTitle.textContent = title;
        modalMessage.innerHTML = message;
        if (imageUrl) {
            modalImage.src = imageUrl;
            modalImage.style.display = 'block';
        } else {
            modalImage.style.display = 'none';
        }
        modal.style.display = 'flex';
    }
    if(closeModalBtn) closeModalBtn.onclick = () => { if(modal) modal.style.display = 'none'; }
    window.onclick = (event) => {
        if (event.target == modal) {
            if(modal) modal.style.display = 'none';
        }
    }
    document.querySelectorAll('.services-section .tab-image.clickable-element').forEach(img => {
        img.addEventListener('click', function() {
            openModal(this.alt || "Service Feature", `Detailed view of ${this.alt || 'this feature'}. <br>More descriptive text about this feature could go here.`, this.src);
        });
    });

    // --- Hero Animations ---
    // ... (your existing hero animation code) ...
    const heroSection = document.getElementById('hero');
    if (heroSection) {
        const liquidBackground = heroSection.querySelector('.hero-background-liquid');
        if (liquidBackground) {
            heroSection.addEventListener('mousemove', (e) => {
                const rect = heroSection.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const mouseXPercent = (x / rect.width) * 100;
                const mouseYPercent = (y / rect.height) * 100;

                liquidBackground.style.setProperty('--mouse-x', `${mouseXPercent}%`);
                liquidBackground.style.setProperty('--mouse-y', `${mouseYPercent}%`);
                liquidBackground.style.setProperty('--mouse-x-inv', `${100 - mouseXPercent}%`);
                liquidBackground.style.setProperty('--mouse-y-inv', `${100 - mouseYPercent}%`);
            });
        }
        const heroTagline = heroSection.querySelector('.animate-hero-tagline');
        const heroH1Line1 = heroSection.querySelector('.hero-h1-line1');
        const heroH1Line2 = heroSection.querySelector('.hero-h1-line2');
        const heroP = heroSection.querySelector('.animate-hero-p');
        const heroCta = heroSection.querySelector('.animate-hero-cta');

        const heroObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if(heroTagline) heroTagline.classList.add('is-visible');
                    if(heroH1Line1) heroH1Line1.classList.add('is-visible');
                    if(heroH1Line2) heroH1Line2.classList.add('is-visible');
                    if(heroP) heroP.classList.add('is-visible');
                    if(heroCta) heroCta.classList.add('is-visible');
                    heroObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        if(heroSection) heroObserver.observe(heroSection);
    }


    // --- Services Tabs (BSS/OSS Inspired - Main Page) ---
    // ... (your existing main page BSS tabs code) ...
    const bssTabButtons = document.querySelectorAll('.bss-tab-buttons .tab-button');
    const bssTabContents = document.querySelectorAll('.bss-tab-content-area .tab-content');
    if (bssTabButtons.length > 0 && bssTabContents.length > 0) {
        bssTabButtons.forEach(button => {
            button.addEventListener('click', () => {
                bssTabButtons.forEach(btn => btn.classList.remove('active'));
                bssTabContents.forEach(content => content.classList.remove('active'));

                button.classList.add('active');
                const targetTab = document.getElementById(button.dataset.tab);
                if (targetTab) {
                    targetTab.classList.add('active');
                }
            });
        });
        const initialActiveBssTab = document.querySelector('.bss-tab-buttons .tab-button.active');
        if (initialActiveBssTab) {
            const initialActiveBssContent = document.getElementById(initialActiveBssTab.dataset.tab);
            if (initialActiveBssContent) initialActiveBssContent.classList.add('active');
        }
    }

    // --- Featured Products "Add to Bag" & Cart Logic ---
    // ... (your existing product/cart code) ...
    let cart = JSON.parse(localStorage.getItem('synergyShopCart')) || [];
    const cartCounter = document.getElementById('cart-counter');
    const productAddedNotification = document.getElementById('product-added-notification');
    const productsData = [
        { category: "Signature Collection", name: "Luxe Hydration Set", price: "$120.00", image: "https://picsum.photos/seed/product1/400/400", hoverImage: "https://picsum.photos/seed/product1alt/400/400" },
        { category: "New Arrivals", name: "Radiance Elixir", price: "$75.00", image: "https://picsum.photos/seed/product2/400/400" },
        { category: "Essentials", name: "Soothing Hand Cream", price: "$25.00", image: "https://picsum.photos/seed/product3/400/400", hoverImage: "https://picsum.photos/seed/product3alt/400/400" },
        { category: "Travel Size", name: "Mini Fragrance Mist", price: "$30.00", image: "https://picsum.photos/seed/product4/400/400" }
    ];

    function updateCartCounter() {
        if(cartCounter) cartCounter.textContent = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    }
    function showProductAddedNotification(productName) {
        if (!productAddedNotification) return;
        productAddedNotification.textContent = `${productName} added to cart!`;
        productAddedNotification.classList.add('show');
        setTimeout(() => {
            productAddedNotification.classList.remove('show');
        }, 2000);
    }
    function addToCart(product) {
        const existingProductIndex = cart.findIndex(item => item.name === product.name);
        if (existingProductIndex > -1) {
            cart[existingProductIndex].quantity = (cart[existingProductIndex].quantity || 1) + 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        localStorage.setItem('synergyShopCart', JSON.stringify(cart));
        updateCartCounter();
        showProductAddedNotification(product.name);
    }

    const productGrid = document.querySelector('.product-grid');
    if (productGrid && productsData.length > 0) {
        productsData.forEach(product => {
            const card = document.createElement('div');
            card.classList.add('product-card', 'clickable-element');
            card.dataset.info = `View ${product.name}`;
            let hoverImgHtml = product.hoverImage ? `<img src="${product.hoverImage}" alt="${product.name} - alt view" class="product-image-hover">` : '';
            card.innerHTML = `
                <div class="product-image-container">
                    <img src="${product.image}" alt="${product.name}" class="product-image ${!product.hoverImage ? 'no-main-fade' : ''}">
                    ${hoverImgHtml}
                </div>
                <div class="product-info">
                    <div class="product-category">${product.category}</div>
                    <h3 class="product-name">${product.name}</h3>
                    <div class="product-price">${product.price}</div>
                    <button class="add-to-bag-btn clickable-element" data-product-name="${product.name}" data-info="Add ${product.name} to Bag"><i class="fas fa-shopping-bag"></i> Add to Bag</button>
                </div>
            `;
            productGrid.appendChild(card);
            card.querySelector('.add-to-bag-btn').addEventListener('click', (e) => {
                e.stopPropagation();
                addToCart(product);
            });
            card.addEventListener('click', (e) => {
                if(e.target.classList.contains('add-to-bag-btn') || e.target.closest('.add-to-bag-btn')) return;
                openModal(product.name, `More details about ${product.name}. Price: ${product.price}. Category: ${product.category}. <br> This could be a longer description.`, product.image);
            });
        });
        document.querySelectorAll('.product-grid .clickable-element').forEach(item => {
             item.addEventListener('click', createRipple);
        });
    }
    updateCartCounter();

    // --- Dynamic Portfolio Section ---
    // ... (your existing portfolio code) ...
    const caseStudies = [
        { title: "SWITCH - SOPRA STERIA KICK OFF 2025", tags: ["NORWAY", "B2E EVENT"], image: "https://picsum.photos/seed/sopra/600/375", number: "01", link: "#case-details-1" },
        { title: "GRAND HOTEL OSLO 150 YEARS", tags: ["INTERNATIONAL", "NORWAY", "BRAND ACTIVATION"], image: "https://picsum.photos/seed/grandhotel/600/375", number: "02", link: "#case-details-2" },
        { title: "NATO MINISTERS MEETING OSLO", tags: ["NORWAY", "B2B EVENT", "GOVERNMENT"], image: "https://picsum.photos/seed/nato/600/375", number: "03", link: "#case-details-3" }
    ];
    const portfolioSliderElement = document.querySelector('.dynamic-portfolio-section .case-study-slider');
    const portfolioTitleElement = document.querySelector('.dynamic-portfolio-section .case-title');
    const portfolioTagsElement = document.querySelector('.dynamic-portfolio-section .case-tags');
    const portfolioReadMoreLink = document.querySelector('.dynamic-portfolio-section .read-more-btn-dynamic');
    const portfolioNumberDisplay = document.querySelector('.dynamic-portfolio-section .large-number-display');
    const portfolioPrevBtn = document.querySelector('.dynamic-portfolio-section .prev-case');
    const portfolioNextBtn = document.querySelector('.dynamic-portfolio-section .next-case');
    const allCasesGrid = document.getElementById('all-cases-grid');
    let currentCaseIndex = 0;

    async function updatePortfolioSlide(index) {
        if (!portfolioSliderElement || !portfolioTitleElement || !portfolioTagsElement || !portfolioReadMoreLink || !portfolioNumberDisplay) return;
        const currentImgSlide = portfolioSliderElement.querySelector('.case-study-slide-item.active');
        const textElements = [portfolioTitleElement, portfolioTagsElement, portfolioReadMoreLink, portfolioNumberDisplay];

        textElements.forEach(el => el.classList.add('animating-out'));
        await new Promise(resolve => setTimeout(resolve, 300));
        if (currentImgSlide) {
            currentImgSlide.classList.remove('active');
            currentImgSlide.classList.add('exiting');
        }

        currentCaseIndex = (index + caseStudies.length) % caseStudies.length;
        const caseData = caseStudies[currentCaseIndex];

        portfolioTitleElement.textContent = caseData.title;
        portfolioTagsElement.innerHTML = caseData.tags.map(tag => `<span class="tag clickable-element" data-info="Tag: ${tag}">${tag}</span>`).join('');
        portfolioReadMoreLink.href = caseData.link;
        portfolioNumberDisplay.textContent = caseData.number;

        portfolioTagsElement.querySelectorAll('.clickable-element').forEach(item => item.addEventListener('click', createRipple));

        portfolioReadMoreLink.onclick = (e) => {
            e.preventDefault();
            openModal(caseData.title, `Detailed information about "${caseData.title}". Tags: ${caseData.tags.join(', ')}.`, caseData.image);
        };

        textElements.forEach(el => { el.classList.remove('animating-out'); el.classList.add('animating-in'); });

        let nextImgSlide = portfolioSliderElement.querySelector(`[data-index="${currentCaseIndex}"]`);
        if (!nextImgSlide) {
            nextImgSlide = document.createElement('div');
            nextImgSlide.classList.add('case-study-slide-item'); nextImgSlide.dataset.index = currentCaseIndex;
            const img = document.createElement('img'); img.src = caseData.image; img.alt = caseData.title;
            nextImgSlide.appendChild(img);
            portfolioSliderElement.appendChild(nextImgSlide);
        }
        portfolioSliderElement.querySelectorAll('.case-study-slide-item.exiting').forEach(s => s.classList.remove('exiting'));

        requestAnimationFrame(() => {
            nextImgSlide.classList.add('active');
            textElements.forEach(el => {
                 el.classList.remove('animating-in');
                 if(el === portfolioNumberDisplay) el.classList.add('visible');
            });
        });

        const dynamicPortfolioSection = document.querySelector('.dynamic-portfolio-section');
        if (dynamicPortfolioSection) {
            const useLightText = window.innerWidth < 992;
            portfolioTitleElement.style.color = useLightText ? 'var(--portfolio-text-light)' : 'var(--portfolio-text-dark)';
            portfolioTagsElement.querySelectorAll('.tag').forEach(t => {
                t.style.color = useLightText ? 'var(--portfolio-text-light)' : 'var(--portfolio-pink)';
                t.style.borderColor = useLightText ? 'var(--portfolio-text-light)' : 'var(--portfolio-pink)';
            });
        }
    }
    if (portfolioPrevBtn && portfolioNextBtn && caseStudies.length > 0) {
        portfolioPrevBtn.addEventListener('click', () => updatePortfolioSlide(currentCaseIndex - 1));
        portfolioNextBtn.addEventListener('click', () => updatePortfolioSlide(currentCaseIndex + 1));
        updatePortfolioSlide(0);
        if (allCasesGrid) {
            caseStudies.forEach(cs => {
                const caseDiv = document.createElement('div');
                caseDiv.classList.add('clickable-element'); caseDiv.dataset.info = `View ${cs.title} details`;
                caseDiv.style.cssText = "border:1px solid #ccc; padding:15px; border-radius:5px; width: 250px; text-align:left; cursor:pointer;";
                caseDiv.innerHTML = `<h4>${cs.title}</h4><img src="${cs.image}" alt="${cs.title}" style="width:100%; height:auto; margin-top:10px; border-radius:3px;"><p style="font-size:0.8em; margin-top:5px;">${cs.tags.join(', ')}</p>`;
                caseDiv.addEventListener('click', () => openModal(cs.title, `Details for "${cs.title}". Tags: ${cs.tags.join(', ')}.`, cs.image));
                allCasesGrid.appendChild(caseDiv);
            });
            document.querySelectorAll('#all-cases-grid .clickable-element').forEach(item => item.addEventListener('click', createRipple));
        }
    }
    window.addEventListener('resize', () => { if (portfolioTitleElement && caseStudies.length > 0) updatePortfolioSlide(currentCaseIndex); });

    // --- Brand Kit Settings Cog Icons & Item Click (Main Page) ---
    // ... (your existing brand kit code) ...
    document.querySelectorAll('.services-section .brand-kit-settings').forEach(cog => {
        cog.addEventListener('click', function(e) {
            e.stopPropagation();
            openModal(`Settings for ${this.dataset.brand}`, `Configure ${this.dataset.brand}'s brand assets.`);
        });
    });
    document.querySelectorAll('.services-section .brand-kit-list .brand-kit-item').forEach(item => {
        item.addEventListener('click', function(e) {
            if (e.target.classList.contains('brand-kit-settings') || e.target.closest('.brand-kit-settings')) return;
            openModal(`Brand Kit: ${this.dataset.brand}`, `Overview of ${this.dataset.brand}'s brand kit.`);
        });
    });

    // --- Client Logos Animations ---
    // ... (your existing client logos code) ...
    const clientLogoPairs = document.querySelectorAll('.clients-section .client-logo-pair');
    const meetCustomersBtn = document.querySelector('.clients-section .meet-customers-btn');

    const clientObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('is-visible');
                }, index * 200);

                if (entry.target === meetCustomersBtn) {
                     setTimeout(() => entry.target.classList.add('is-visible'), clientLogoPairs.length * 200 + 100);
                }
            }
        });
    }, { threshold: 0.1 });

    clientLogoPairs.forEach(pair => clientObserver.observe(pair));
    if (meetCustomersBtn) clientObserver.observe(meetCustomersBtn);

    document.querySelectorAll('.clients-section .client-logo-item').forEach(logo => {
        logo.addEventListener('click', function() {
            openModal(`About ${this.dataset.client}`, `Info about our work with ${this.dataset.client}.`);
        });
    });
    if(meetCustomersBtn) {
        meetCustomersBtn.addEventListener('click', function() {
            openModal("Our Customers", "Here you would find more details about all our valued customers and case studies.");
        });
    }

    // --- Testimonial Carousel ---
    // ... (your existing testimonial code) ...
    const testimonialTrack = document.querySelector('.testimonial-carousel');
    const testimonialsData = [
        { quote: "Synergy Solutions transformed our approach to data. Their platform is intuitive and powerful!", author: "Jane Doe, CEO of ECorp" },
        { quote: "The team at Synergy is exceptional. They understood our needs and delivered beyond expectations.", author: "John Smith, CTO of ICorp" },
        { quote: "We've seen a significant ROI since implementing their analytics tools. Highly recommended!", author: "Alice Brown, Marketing at The Agency" },
        { quote: "Their innovative solutions helped us streamline our workflow and improve efficiency drastically.", author: "Mike Wilson, Operations Lead" }
    ];
    if (testimonialTrack) { testimonialTrack.innerHTML = ''; }
    testimonialsData.forEach(t => {
        if(testimonialTrack){
            const slide = document.createElement('div');
            slide.classList.add('testimonial-slide');
            slide.innerHTML = `<p>"${t.quote}"</p><h4>- ${t.author}</h4>`;
            testimonialTrack.appendChild(slide);
        }
    });
    const testimonialSlides = testimonialTrack ? Array.from(testimonialTrack.children) : [];
    const prevTestimonialBtn = document.querySelector('.prev-testimonial');
    const nextTestimonialBtn = document.querySelector('.next-testimonial');
    let testimonialIndex = 0;

    function moveTestimonialSlides() {
        if (!testimonialTrack || testimonialSlides.length === 0) return;
        const slideWidth = testimonialSlides[0].offsetWidth;
        testimonialTrack.style.transform = `translateX(-${testimonialIndex * slideWidth}px)`;

        testimonialSlides.forEach((slide, idx) => {
            slide.classList.remove('active-testimonial-content');
            if (idx === testimonialIndex) {
                setTimeout(() => slide.classList.add('active-testimonial-content'), 50);
            }
        });
    }
    if (testimonialSlides.length > 0 && prevTestimonialBtn && nextTestimonialBtn) {
        prevTestimonialBtn.addEventListener('click', () => { testimonialIndex = (testimonialIndex - 1 + testimonialSlides.length) % testimonialSlides.length; moveTestimonialSlides(); });
        nextTestimonialBtn.addEventListener('click', () => { testimonialIndex = (testimonialIndex + 1) % testimonialSlides.length; moveTestimonialSlides(); });
        window.addEventListener('resize', moveTestimonialSlides);
        moveTestimonialSlides();
    }

    // --- Sustainability Chart ---
    // ... (your existing sustainability chart code) ...
    const emissionsBarChart = document.querySelector('.emissions-chart-container .bar-chart');
    const emissionsChartWrapper = document.querySelector('.emissions-chart-container .bar-chart-wrapper');
    const yAxisLabelsContainer = emissionsChartWrapper ? emissionsChartWrapper.querySelector('.y-axis-labels') : null;
    const emissionsData = [
        { label: "Ocean V.", value: 549, type: "new-build" }, { label: "Hist. Reno", value: 278, type: "refurbishment" },
        { label: "Sky T.", value: 875, type: "new-build" }, { label: "Green L.", value: 617, type: "new-build" },
        { label: "Eco-Ref.", value: 506, type: "refurbishment" }, { label: "City C.", value: 36, type: "new-build"},
        { label: "Parkside", value: 881, type: "new-build" }, { label: "Urban R.", value: 185, type: "refurbishment" },
        { label: "The V.", value: 550, type: "new-build" }, { label: "Lakeview", value: 191, type: "new-build"},
        { label: "Campus R.", value: 539, type: "refurbishment" }, { label: "Proj. Z", value: 122, type: "new-build" }
    ];
    function renderEmissionsChart(filteredData) {
        if (!emissionsBarChart || !emissionsChartWrapper || !yAxisLabelsContainer) return;
        emissionsBarChart.innerHTML = ''; yAxisLabelsContainer.innerHTML = '';
        let maxDataValue = Math.max(...filteredData.map(item => item.value), 600);
        if (maxDataValue > 0) { maxDataValue = Math.ceil(maxDataValue / 200) * 200; } else { maxDataValue = 1000; }

        const tickCount = 5;
        for (let i = tickCount; i >= 0; i--) {
            const val = Math.round((maxDataValue / tickCount) * i);
            yAxisLabelsContainer.insertAdjacentHTML('afterbegin', `<span>${val}</span>`);
        }

        filteredData.forEach(item => {
            const barItem = document.createElement('div');
            barItem.className = 'bar-item clickable-element';
            barItem.dataset.value = item.value; barItem.dataset.type = item.type;
            barItem.dataset.info = `Project: ${item.label}, Value: ${item.value}`;
            barItem.innerHTML = `<span class="bar-value-display">${item.value}</span><span class="bar-label">${item.label}</span>`;
            barItem.addEventListener('click', createRipple);
            emissionsBarChart.appendChild(barItem);
            setTimeout(() => { barItem.style.height = `${(item.value / maxDataValue) * 100}%`; barItem.classList.add('filtered-in'); }, 50);
            barItem.addEventListener('click', () => openModal(`Emissions: ${item.label}`, `Emissions for ${item.label}: ${item.value} kgCO2e/m2 (type: ${item.type}).`));
        });
        emissionsChartWrapper.querySelectorAll('.target-line').forEach(line => {
            const target = parseInt(line.dataset.target);
            line.style.bottom = `${(target / maxDataValue) * 100}%`;
            line.style.display = (target <= maxDataValue && target > 0) ? 'block' : 'none';
        });
    }
    if (document.querySelector('.sustainability-section .filter-btn')) {
        renderEmissionsChart(emissionsData);
        document.querySelectorAll('.sustainability-section .filter-btn').forEach(button => {
            button.addEventListener('click', function() {
                document.querySelectorAll('.sustainability-section .filter-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                const type = this.dataset.filter;
                renderEmissionsChart(type === 'all' ? emissionsData : emissionsData.filter(d => d.type === type));
            });
        });
    }
    document.querySelectorAll('.download-chart-data, .download-report-btn').forEach(btn => {
        btn.addEventListener('click', function() { openModal("Download Initiated", `Simulated download for "${this.dataset.info}".`); });
    });
    document.querySelectorAll('.metric-bar-chart .year-bar').forEach(bar => {
        bar.addEventListener('click', function(){
            openModal(`${this.dataset.info}`, `In ${this.querySelector('.year-label').textContent}, value: ${this.querySelector('.year-value').textContent}.`);
        });
    });

    // --- Contact Form ---
    // ... (your existing contact form code) ...
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    if (contactForm && formMessage) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); formMessage.textContent = 'Sending...';
            setTimeout(() => {
                formMessage.textContent = 'Message sent! We will reply soon.'; formMessage.style.color = 'var(--text-light)';
                contactForm.reset();
                setTimeout(() => { formMessage.textContent = ''; }, 5000);
            }, 1500);
        });
    }

    // --- Footer Current Year ---
    // ... (your existing footer code) ...
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    // --- Scroll-triggered Animations ---
    // ... (your existing scroll animation code) ...
    const animatedScrollElements = document.querySelectorAll('.animate-on-scroll');
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1 });

    animatedScrollElements.forEach(el => scrollObserver.observe(el));


    // --- Functionality for services-detail.html ---
    if (document.body.id === 'services-detail-page') {
        const capabilityTabButtons = document.querySelectorAll('.capability-tab-btn');
        const capabilityTabContents = document.querySelectorAll('.capability-content-area .capability-tab-content'); // More specific selector
        const transitionOverlay = document.querySelector('.capability-transition-overlay');
        const detailBottomNavItems = document.querySelectorAll('.services-detail-bottom-nav .nav-item');

        let currentTabIndex = 0;
        let autoSwitchTimer = null;
        const AUTO_SWITCH_INTERVAL = 5000; // 5 seconds interval
        const CONTENT_TRANSITION_DURATION = 400; // 0.4 seconds for content fade in/out (match CSS)

        function showTransitionOverlay() {
            if (transitionOverlay) transitionOverlay.classList.add('visible');
        }
        function hideTransitionOverlay() {
            if (transitionOverlay) transitionOverlay.classList.remove('visible');
        }

        function switchToTab(nextIndex) {
            if (!capabilityTabButtons[nextIndex] || !capabilityTabContents[nextIndex]) {
                console.warn(`Attempted to switch to non-existent tab index: ${nextIndex}`);
                return;
            }

            const currentButton = capabilityTabButtons[currentTabIndex];
            const currentContent = capabilityTabContents[currentTabIndex];

            const nextButton = capabilityTabButtons[nextIndex];
            const nextContent = capabilityTabContents[nextIndex];

            showTransitionOverlay();

            if (currentButton) currentButton.classList.remove('active');
            if (currentContent) currentContent.classList.add('fade-out'); // Start fade-out

            setTimeout(() => {
                if (currentContent) {
                    currentContent.classList.remove('active'); // This will set display:none via CSS
                    currentContent.classList.remove('fade-out'); // Reset for next time
                }

                if (nextButton) nextButton.classList.add('active');
                if (nextContent) {
                    nextContent.classList.add('active'); // This triggers display:flex and fade-in
                }
                
                currentTabIndex = nextIndex;
                hideTransitionOverlay();
            }, CONTENT_TRANSITION_DURATION);
        }

        function startAutoSwitch() {
            stopAutoSwitch(); // Clear any existing timer before starting a new one
            autoSwitchTimer = setInterval(() => {
                const nextIndex = (currentTabIndex + 1) % capabilityTabButtons.length;
                switchToTab(nextIndex);
            }, AUTO_SWITCH_INTERVAL);
        }

        function stopAutoSwitch() {
            clearInterval(autoSwitchTimer);
            autoSwitchTimer = null;
        }

        if (capabilityTabButtons.length > 0 && capabilityTabContents.length > 0) {
            capabilityTabButtons.forEach((button, index) => {
                button.addEventListener('click', () => {
                    if (index === currentTabIndex && autoSwitchTimer === null) return; // Do nothing if clicking current tab & auto-switch is already off

                    stopAutoSwitch();
                    switchToTab(index);
                    // To restart auto-switching after manual interaction (optional):
                    // setTimeout(startAutoSwitch, AUTO_SWITCH_INTERVAL * 2); 
                });
            });

            // Initialize the first tab state correctly
            let initialActiveIndex = 0;
            capabilityTabButtons.forEach((btn, idx) => {
                if (btn.classList.contains('active')) { // Respect HTML active class if present
                    initialActiveIndex = idx;
                }
                btn.classList.remove('active'); // Clean slate for JS control
            });
            capabilityTabContents.forEach(content => content.classList.remove('active'));

            currentTabIndex = initialActiveIndex;
            if (capabilityTabButtons[currentTabIndex]) capabilityTabButtons[currentTabIndex].classList.add('active');
            if (capabilityTabContents[currentTabIndex]) capabilityTabContents[currentTabIndex].classList.add('active');
            
            startAutoSwitch();
        }

        // Make mockup elements clickable on services-detail.html
        document.querySelectorAll('#services-detail-page .content-visual .clickable-element').forEach(el => {
            el.addEventListener('click', function(e) {
                // Prevent tab switch if a clickable element inside a tab is clicked and already handling it.
                // This assumes the element itself doesn't also have a tab-switching role.
                // e.stopPropagation(); // Be careful with stopPropagation, might have unintended side effects.

                const info = this.dataset.info || "Mockup Element";
                let title = info;
                 if(this.querySelector('h4')) title = this.querySelector('h4').textContent;
                 else if (info.length > 30) title = info.substring(0,27) + "...";
                
                openModal(title, `Details for: ${info}.<br>This demonstrates an interactive element within the BSS/OSS mockup.`);
            });
        });
        
        detailBottomNavItems.forEach(item => {
            if (item.href && item.href.includes('services-detail.html')) {
                 item.classList.add('active');
            } else {
                 item.classList.remove('active');
            }
        });
    }


    // --- Tooltip for data-info hover ---
    // ... (your existing tooltip code from previous turn, ensures it's initialized once) ...
    let tooltip = document.getElementById('element-tooltip');
    if (!tooltip) {
        tooltip = document.createElement('div');
        tooltip.id = 'element-tooltip';
        tooltip.style.position = 'fixed';
        tooltip.style.background = 'black';
        tooltip.style.color = 'white';
        tooltip.style.padding = '5px 10px';
        tooltip.style.borderRadius = '4px';
        tooltip.style.fontSize = '12px';
        tooltip.style.zIndex = '10000';
        tooltip.style.display = 'none';
        tooltip.style.pointerEvents = 'none'; 
        document.body.appendChild(tooltip);
    }

    document.querySelectorAll('.clickable-element[data-info]').forEach(el => {
        el.addEventListener('mouseenter', (e) => {
            if (el.dataset.info && tooltip) {
                tooltip.textContent = el.dataset.info;
                tooltip.style.display = 'block';
            }
        });
        el.addEventListener('mousemove', (e) => {
            if (el.dataset.info && tooltip && tooltip.style.display === 'block') {
                let x = e.clientX + 15;
                let y = e.clientY + 15;
                const tooltipRect = tooltip.getBoundingClientRect();

                if (x + tooltipRect.width > window.innerWidth) {
                    x = e.clientX - tooltipRect.width - 5;
                }
                if (y + tooltipRect.height > window.innerHeight) {
                    y = e.clientY - tooltipRect.height - 5;
                }
                 if (x < 0) x = 5;
                 if (y < 0) y = 5;

                tooltip.style.left = `${x}px`;
                tooltip.style.top = `${y}px`;
            }
        });
        el.addEventListener('mouseleave', () => {
            if (tooltip) tooltip.style.display = 'none';
        });
    });

    // --- Generic Click Handler for data-info (fallback for modal pop-ups) ---
    // ... (your existing generic click handler code, ensure selectors are up-to-date) ...
    document.querySelectorAll('.clickable-element[data-info]').forEach(el => {
        let hasSpecificHandler = false;
        const specificSelectors = [
            '.add-to-bag-btn', '.product-card',
            '.bss-tab-buttons .tab-button', '.services-section .tab-image',
            '.brand-kit-item', '.brand-kit-settings',
            '.client-logo-item', '.meet-customers-btn',
            '.portfolio-nav-btn', '.read-more-btn-dynamic', '#all-cases-grid .clickable-element',
            '.bar-item', '.year-bar',
            '.filter-btn', '.download-chart-data', '.download-report-btn',
            '.capability-tab-btn', // Already handled by services-detail specific logic
            '#services-detail-page .content-visual .clickable-element', // Already handled by services-detail specific logic
            '.nav-link',
            'input', 'textarea',
            'button[type="submit"]',
            '#cart-icon-link', '.close-modal-btn',
            '.bss-oss-bottom-nav button', '.bss-oss-bottom-nav a',
            '.services-detail-bottom-nav button', '.services-detail-bottom-nav a', // for services detail page nav too
            '.testimonial-button'
        ];

        for (const selector of specificSelectors) {
            if (el.matches(selector) || el.closest(selector)) {
                hasSpecificHandler = true;
                break;
            }
        }
        
        if (el.tagName === 'A' && el.getAttribute('href') && (el.getAttribute('href').startsWith('#') || el.getAttribute('href').endsWith('.html') || el.getAttribute('href').startsWith('http'))) {
            hasSpecificHandler = true;
        }


        if (!hasSpecificHandler) {
            el.addEventListener('click', function(e){
                if (this.tagName === 'A' && this.getAttribute('href') && this.getAttribute('href') !== '#') {
                     if (!this.getAttribute('href').endsWith('.html') && !this.getAttribute('href').startsWith('http')) {
                        e.preventDefault();
                     } else {
                        return;
                     }
                }
                const infoText = this.dataset.info || "No specific information available.";
                let title = (this.textContent.trim().substring(0,30) || this.alt || "Information");
                if (title.length === 0 && this.querySelector('i')) title = "Icon Action";
                if (title.length === 0) title = "Details";
                
                openModal(title, `Details for: ${infoText}.<br>This is a generic information pop-up. More specific content can be added based on the element clicked.`);
            });
        }
    });

}); // End DOMContentLoaded