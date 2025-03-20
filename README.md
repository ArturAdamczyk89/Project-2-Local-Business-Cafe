# Cafe Aroma - Interactive Cafe Website

A responsive, interactive website for a fictional coffee shop with menu browsing, shopping cart functionality, and contact features. Built with HTML, CSS, and JavaScript.

![Cafe Aroma Website Screenshot](<cafe aroma Screenshot.jpg>)

## Live Demo

[Visit Cafe Aroma Website](https://arturadamczyk89.github.io/Project-2-Local-Business-Cafe/)

## Features

- **Responsive Design**:
  - Mobile-first approach with optimized layouts for all screen sizes
  - Hamburger menu for mobile navigation
  - Fluid grid layouts that adapt to various devices

- **Interactive Menu System**:
  - Category-based menu navigation (Coffee, Drinks, Snacks & Pastries)
  - Real-time filtering of menu items by type
  - Detailed product cards with descriptions and pricing

- **Shopping Cart Functionality**:
  - Add/remove items with quantity controls
  - Real-time cart total calculation
  - Cart data persistence using localStorage
  - Checkout process simulation
  - All achived via using local storage

- **User Experience**:
  - Smooth animations and transitions
  - Form validation for contact form
  - High-contrast, accessible color scheme
  - Intuitive navigation between pages

## Technologies Used

- HTML (Semantic elements)
- CSS (Flexbox, Grid, Variables, Media Queries)
- JavaScript
- SVG icons for cart and interface elements

## Site Structure

The website consists of several key pages:

- **Home Page**: Introduction to the cafe with feature highlights
- **About Page**: Cafe history, philosophy, and customer testimonials
- **Menu Pages**:
- Menu Categories: Overview of all menu sections
- Coffee Menu: Various coffee options with filtering
- Drinks Menu: Non-coffee beverages with filtering
- Snacks Menu: Food items and pastries with filtering
- **Contact Page**: Contact form and cafe location information

## JavaScript Features

The site includes several interactive JavaScript features:

- **Mobile Navigation**: Toggle menu for smaller screens
- **Menu Filtering**: Dynamic filtering of menu items by category
- **Shopping Cart**: Complete cart system with add/remove functionality
- **Form Validation**: Client-side validation for the contact form
- **LocalStorage**: Persistent cart data between sessions

## Code Structure

- `index.html`: Main homepage
- `about.html`: About page with cafe information
- `contact.html`: Contact page with form
- `/menu/`: Directory containing menu pages
- `index.html`: Menu categories overview
- `coffee.html`: Coffee menu items
- `drinks.html`: Non-coffee beverages
- `snacks.html`: Food items and pastries
- `/assets/`: Directory containing all static files
- `/css/styles.css`: Main stylesheet
- `/js/script.js`: JavaScript functionality
- `/images/`: Image assets used throughout the site

## Testing

### HTML Validation
The HTML code was validated using the Minify HTML Validator. [Minify HTML Validator](https://www.minifier.org/html-validator).

![Minify HTML Validator Result](<cafe aroma Html Validator.jpg>)

As indicated in the html validator. No errors were found.

### CSS Validation
The CSS code was validated using the ![W3C CSS Validation Service](<cafe aroma CSS Validator.jpg>)

The CSS file passed CSS validity check with W3C.

### JavaScript Validation
![JSHint](<Javascript Validator.jpg>)

The javascript validator didn't reveal any specific errors. By default it only revealed warnings (about using functionalities not available in earlier versions of javascript i.e using arrow functions-Because by default it assumes that you are using a earlier version of javascript). As suggested in the validators metrics section in the upper right corner -> Prior to pasting in my javascript file I've updated the validation parameters by pasting in the following line /* jshint esversion: 9 */ at the very top before pasting in my code. Afterwards there were no further warnings.

### Other Issues

While there weren't specific issues pointed out in the validators there were issues with fixing broken links on the website due to moving the main index.html ahead in the folder structure -> for easier deployment purposes on github pages, as suggested by my coding mentor. Broken relative navigation links were updated on the other index.html pages and began to work again.

### Lighthouse Test
![Cafe Aroma Lightouse Test](<Lighthouse Test.jpg>)

These scores indicate that the website is well-optimized for performance and user experience, with excellent accessibility features and search engine optimization.

## Credits and Acknowledgements

- SVG icons for cart functionality and UI elements
- [W3C Validators](https://validator.w3.org/) for code validation tools
- Midjourney AI for creating the Images seen on the website

## Contact

artur.adamczyk89@gmail.com

---

Created by Your Name | 2025