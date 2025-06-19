# FrontEnd-Battle-VIBE CODING COMPETITION-(IIT BHUBANESWAR)-Website

Synergy Solutions - Interactive Corporate Website
(Recommendation: Create a GIF like the one above showcasing the site's interactivity and animations to place here)
📖 About The Project
Synergy Solutions is a modern, fully-responsive, and highly interactive front-end project for a fictional tech corporation. It is designed to showcase advanced UI/UX concepts, dynamic content handling, and sophisticated animations using vanilla JavaScript, HTML5, and CSS3. The project includes multiple pages, a simulated e-commerce flow, and detailed data visualizations, all built to be visually appealing and engaging.
🌐 Live Demo
View the live project here!
(Replace this with your GitHub Pages link after deployment)
✨ Key Features
This project is packed with features that demonstrate a wide range of front-end development skills:
Multi-Page Layout & E-Commerce Flow:
Homepage (index.html): A comprehensive landing page with multiple sections to introduce the company.
Services Detail Page (services-detail.html): An in-depth look at the company's "BSS/OSS Capabilities" with an auto-playing, interactive tab system and detailed UI mockups.
Checkout Page (payment.html): A secure and clean checkout page that pulls items from localStorage, validates user input, and simulates a payment process.
Interactive UI/UX Components:
Dynamic Modals: A generic modal system for displaying details, plus a custom-styled "Resource Modal" for testimonials and pricing.
Interactive Tabs: Two distinct tab systems—one on the homepage and a more advanced, auto-switching version on the services detail page.
Dynamic Portfolio Slider: A case study slider that dynamically updates content, images, and links.
Client Testimonial Carousel: A sleek, auto-playing carousel for client feedback.
Shopping Cart: "Add to Cart" functionality that uses localStorage to persist data across pages, with a live-updating cart counter.
Clickable Elements with Tooltips: Nearly every interactive element provides a descriptive tooltip on hover using the data-info attribute.
Sophisticated Animations & Effects:
Preloader: An animated logo and progress bar on initial page load.
On-Scroll Animations: Elements elegantly fade and slide into view as the user scrolls, powered by the IntersectionObserver API.
Liquid Hero Background: An interactive hero background that subtly reacts to mouse movement.
Ripple Effect: A Material Design-inspired ripple effect on all clickable elements for satisfying user feedback.
Page Transitions: Smooth, animated transitions between tabs on the services detail page, featuring a loading spinner.
Data Visualization & Dynamic Content:
Product Injection: Product cards on the homepage are dynamically generated from a JavaScript array.
Sustainability Charts: Interactive bar charts with filtering capabilities to visualize emissions data.
Form Validation: The contact and payment forms include real-time validation for user inputs.
🛠️ Tech Stack
This project was built from the ground up using core web technologies, with no external frameworks.
HTML5: Semantic and well-structured markup.
CSS3:
Modern layout techniques (Flexbox, Grid).
CSS Variables (:root) for easy theming and maintenance.
Advanced animations, transitions, and clip-path.
Fully responsive design with media queries.
JavaScript (ES6+):
DOM manipulation for all dynamic content and interactivity.
IntersectionObserver for efficient scroll animations.
localStorage for the shopping cart state management.
Modular logic within a single script file to handle different pages.
Libraries:
Font Awesome: For a wide range of high-quality icons.
Google Fonts: For modern, professional typography (Roboto, Montserrat, Orbitron).
📂 File Structure
The repository is organized into the main pages and their corresponding assets.
Generated code
/
├── index.html          # Main landing page with all core sections.
├── services-detail.html# Detailed services page with advanced tab system.
├── payment.html        # Checkout page with forms and cart summary.
├── style.css           # Global stylesheet for all pages.
├── script.js           # Global JavaScript for index.html and services-detail.html.
├── payment.js          # JavaScript specific to the payment page.
└── README.md           # This file.
Use code with caution.
🚀 Getting Started
To run this project locally, simply follow these steps:
Clone the repository:
Generated sh
git clone https://github.com/your-github-username/your-repo-name.git
Use code with caution.
Sh
Navigate to the project directory:
Generated sh
cd your-repo-name
Use code with caution.
Sh
Open index.html in your browser:
You can directly open the file in your browser.
For a better experience, use a live server extension (like "Live Server" in VS Code) to serve the files.
💡 Code Highlights
A few interesting implementation details from the project:
1. Page-Specific JavaScript Logic
The main script.js file handles logic for both index.html and services-detail.html. This is managed by checking the id of the <body> tag, preventing errors and keeping the code organized.
Generated javascript
// in script.js
if (document.body.id === 'services-detail-page') {
    // Run all the logic specific to the services detail page...
    const capabilityTabButtons = document.querySelectorAll('.capability-tab-btn');
    // ...
}
Use code with caution.
JavaScript
2. Dynamic Content from JS Arrays
To simulate fetching data from a backend, content for products, portfolio cases, and testimonials is stored in JavaScript arrays and dynamically injected into the DOM on page load.
Generated javascript
// in script.js
const productsData = [
    { category: "Signature Collection", name: "Luxe Hydration Set", price: "$120.00", ... },
    // ... more products
];

productsData.forEach(product => {
    const card = document.createElement('div');
    // ... create and append product card HTML
    productGrid.appendChild(card);
});
Use code with caution.
JavaScript
3. Efficient Scroll Animations
The IntersectionObserver API is used to trigger animations only when an element enters the viewport. This is far more performant than using scroll event listeners.
Generated javascript
// in script.js
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
        }
    });
}, { threshold: 0.1 });

animatedScrollElements.forEach(el => scrollObserver.observe(el));
