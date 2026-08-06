# 🐔 A Imam Poultry Farm - Project Documentation

🌐 **Live Website URL:** [https://www.aimampoultryfarm.online](https://www.aimampoultryfarm.online)

Welcome to the documentation for **A Imam Poultry Farm** website. This is a premium, responsive, bilingual web platform built to showcase free-range Desi Murga (Country Chicken), organic eggs, and high-vitality chicks.

---

## 🛠️ Technology Stack (Technologies & Frameworks)

This project is built using **Vanilla Web Technologies** to ensure maximum loading speed, SEO friendliness, and visual performance. **No heavy JavaScript frameworks (such as React, Vue, Next.js, or Vite) were used**, which keeps the site lightweight (under 50ms initial load time) and extremely easy to deploy on any hosting provider.

Below is the list of technologies and libraries utilized in this project:

### 1. Core Technologies
* **HTML5**: Structured semantic layout (`<header>`, `<main>`, `<section>`, `<footer>`, etc.) optimized for screen readers and SEO.
* **CSS3 (Vanilla)**: Styling layout built using **CSS Flexbox** and **CSS Grid** for grids, custom transitions, animations (`slideUp`, `slideDown`), and a glassmorphism header design.
* **Vanilla JavaScript (ES6+)**: Custom DOM manipulation, scroll listener handling, validation checks, and dictionary-based translations.

### 2. External Fonts & Icons
* **Google Fonts**:
  * `Outfit`: Used for headings and numbers. Highly readable and modern design.
  * `Plus Jakarta Sans`: Used for the body text, providing a clean and professional layout.
* **Font Awesome v6.4.0 (CDN)**: Integrated via stylesheet for premium vector icons (social media, navigation, owner details, WhatsApp).

### 3. Integrated Third-Party APIs
* **Google Maps Embed API**: Interactive iframe embedded to show directions and precise location of the farm in Chandoli, Alwar, Rajasthan.
* **WhatsApp Send API**: Deep linking with pre-filled message text dynamic translation to open WhatsApp chat in a new tab.

---

## 📂 Project Structure

```bash
yusuf Anti/
├── assets/                 # Image assets (Logo, chicken, chicks, eggs, shed, hero)
├── index.html              # Main HTML entry file & SEO Schema markup
├── style.css               # Core design system stylesheet & media queries
├── script.js               # Event handlers, scroll spy, filtering, and prefill logic
├── translations.js         # Text dictionaries for English (en) and Hindi (hi)
└── README.md               # Project documentation (this file)
```

---

## ⚙️ Core Architecture & Logic

### 1. Bilingual System (i18n)
* **Dictionary File**: The translations are isolated inside [translations.js](translations.js).
* **HTML Markup**: Elements requiring translation contain the `data-i18n` attribute pointing to a translation key. Inputs use `data-i18n-placeholder`.
* **Execution**: In [script.js](script.js), the `updateLanguage(lang)` function updates the page:
  * Loops over all `[data-i18n]` tags and swaps inner HTML.
  * Loops over all `[data-i18n-placeholder]` tags and swaps the input placeholders.
  * Dynamically changes the body's font family depending on the language (enhancing Hindi characters).

### 2. SEO & Schema Markup (Structured Data)
* **Metadata**: Standard titles, descriptions, and keywords optimized for poultry searches in Alwar, Rajasthan.
* **JSON-LD Schema**: Included inside the HTML `<head>`. Search engine crawlers (Google, Bing) read this block to display the farm as a verified `LocalBusiness` directly on Search results. It registers:
  * Name, owner, and logo image.
  * Precise geo-coordinates (latitude/longitude) of the farm.
  * Business address and contact details.

### 3. Gallery Filter System
* **Markup**: Images in the gallery are grouped under categories: `birds`, `farm`, `sheds`.
* **JavaScript Handling**: Filter buttons change class active state, select the targeted data-filter attribute, and hide/reveal items using CSS opacity and scale transforms.

### 4. Interactive Inquiry Autofill
* **Behavior**: Clicking "Inquire Now" on a product card:
  1. Finds the closest product card name.
  2. Translates the product name dynamically to match the active language.
  3. Formulates a custom request message and writes it directly to the Message text area.
  4. Scrolls page smoothly to the contact form section and focuses the text area.

### 5. Contact & Direct Messaging System
* **Contact Form Submission (Simulated)**: Submission of the contact form is handled client-side in [script.js](script.js). It performs standard validation and displays a successful toast notification. *Note: It is currently a simulated success mechanism and does not send emails to a live backend.*
* **Direct WhatsApp Messaging**: The "Chat on WhatsApp" button triggers a direct deep-link redirect to WhatsApp (`https://api.whatsapp.com/send`) targeting the owner's number with a localized, pre-filled inquiry message.

---

## 🚀 How to Run Locally

Since the project is built on static vanilla files, it does not require a local build command like `npm run dev` or a server engine. 

1. **Option A (Double Click)**:
   * Simply double-click `index.html` to open it in your browser.
2. **Option B (Recommended - Live Server)**:
   * If you are using VS Code, install the "Live Server" extension, right-click `index.html`, and select **Open with Live Server**. This serves the site over a local IP and auto-refreshes on edits.

---

## 🎨 Design Customization (CSS Variables)

Colors and fonts are managed via CSS variables in `:root` inside [style.css](style.css). You can easily update these variables to change the entire theme instantly:

```css
:root {
  --primary: #1e4d3a;          /* Deep Forest Green */
  --primary-light: #2d6a4f;    /* Light Forest Green */
  --secondary: #d4a373;        /* Warm Gold/Sand */
  --bg-main: #fafaf8;          /* Organic light-grey background */
  ...
}
```
