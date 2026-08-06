document.addEventListener("DOMContentLoaded", () => {
  let currentLang = "en";

  // Elements
  const header = document.querySelector("header");
  const hamburger = document.getElementById("hamburger");
  const navLinksList = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-links a");
  const langSwitch = document.getElementById("lang-switch");
  const langSlider = document.querySelector(".lang-slider");
  const filterBtns = document.querySelectorAll(".filter-btn");
  const galleryItems = document.querySelectorAll(".gallery-item");
  const contactForm = document.getElementById("contact-form");
  const toast = document.getElementById("toast");
  const scrollTop = document.getElementById("scroll-top");
  const whatsappBtn = document.getElementById("whatsapp-btn");

  // Multi-Language Toggle
  const updateLanguage = (lang) => {
    currentLang = lang;

    // Translate all elements with data-i18n attribute
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (translations[lang] && translations[lang][key]) {
        el.innerHTML = translations[lang][key];
      }
    });

    // Translate elements with data-i18n-placeholder attribute
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      if (translations[lang] && translations[lang][key]) {
        el.setAttribute("placeholder", translations[lang][key]);
      }
    });

    // Apply specific fonts/styling if needed
    if (lang === "hi") {
      document.body.style.fontFamily = "'Outfit', 'Plus Jakarta Sans', sans-serif";
    } else {
      document.body.style.fontFamily = "'Plus Jakarta Sans', sans-serif";
    }
  };

  if (langSwitch) {
    langSwitch.addEventListener("click", () => {
      if (currentLang === "en") {
        langSlider.style.transform = "translateX(38px)";
        document.getElementById("btn-en").classList.remove("active");
        document.getElementById("btn-hi").classList.add("active");
        updateLanguage("hi");
      } else {
        langSlider.style.transform = "translateX(0px)";
        document.getElementById("btn-hi").classList.remove("active");
        document.getElementById("btn-en").classList.add("active");
        updateLanguage("en");
      }
    });
  }

  // Mobile Menu Toggle
  if (hamburger) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navLinksList.classList.toggle("active");
    });
  }

  // Close mobile menu when clicking a link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navLinksList.classList.remove("active");
    });
  });

  // Sticky Header on Scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    // Show/hide scroll to top button
    if (window.scrollY > 500) {
      scrollTop.classList.add("show");
    } else {
      scrollTop.classList.remove("show");
    }
  });

  // Scroll Spy for Nav Active States
  const sections = document.querySelectorAll("section");
  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - 120) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });

  // Scroll to Top Click
  if (scrollTop) {
    scrollTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  // Gallery Filter
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filterValue = btn.getAttribute("data-filter");

      galleryItems.forEach((item) => {
        if (filterValue === "all" || item.getAttribute("data-category") === filterValue) {
          item.style.display = "block";
          setTimeout(() => {
            item.style.opacity = "1";
            item.style.transform = "scale(1)";
          }, 50);
        } else {
          item.style.opacity = "0";
          item.style.transform = "scale(0.8)";
          setTimeout(() => {
            item.style.display = "none";
          }, 350);
        }
      });
    });
  });

  // Form Validation & Mock Submission
  const showToast = (message, isError = false) => {
    toast.textContent = message;
    toast.className = isError ? "toast error show" : "toast show";
    setTimeout(() => {
      toast.classList.remove("show");
    }, 4000);
  };

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("form-name-input").value.trim();
      const phone = document.getElementById("form-phone-input").value.trim();
      const message = document.getElementById("form-msg-input").value.trim();

      if (!name || !phone || !message) {
        const errText = translations[currentLang]["toast_error"];
        showToast(errText, true);
        return;
      }

      // Simulated success
      const successText = translations[currentLang]["toast_success"];
      showToast(successText, false);
      contactForm.reset();
    });
  }

  // WhatsApp Dynamic Integration
  if (whatsappBtn) {
    whatsappBtn.addEventListener("click", () => {
      // Pre-filled WhatsApp message
      const number = "919352182948"; // Owner's WhatsApp number
      const messageText = currentLang === "en"
        ? "Hello A Imam Poultry Farm, I would like to inquire about Desi Chicken and Eggs."
        : "नमस्ते ए इमाम पोल्ट्री फार्म, मैं देसी चिकन और अंडे के बारे में पूछताछ करना चाहता हूँ।";

      const whatsappUrl = `https://api.whatsapp.com/send?phone=${number}&text=${encodeURIComponent(messageText)}`;
      window.open(whatsappUrl, "_blank");
    });
  }

  // Product cards dynamic inquiry prefill
  const productButtons = document.querySelectorAll(".product-btn");
  productButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const card = e.target.closest(".product-card");
      const titleEl = card.querySelector("h4[data-i18n]");
      const key = titleEl.getAttribute("data-i18n");
      const productName = translations[currentLang][key] || "Product";

      // Prefill contact form message
      const msgInput = document.getElementById("form-msg-input");
      if (msgInput) {
        msgInput.value = currentLang === "en"
          ? `I am interested in buying: ${productName}. Please share price details.`
          : `मैं खरीदने में रुचि रखता हूँ: ${productName}। कृपया मूल्य विवरण साझा करें।`;

        // Scroll to form
        document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
        msgInput.focus();
      }
    });
  });
  // ─── Lightbox ───────────────────────────────────────────────────────────────
  let scale = 1, isDragging = false, startX, startY, tx = 0, ty = 0;
  const lbInner    = document.getElementById('lbInner');
  const lbOverlay  = document.getElementById('lightbox');
  const lbContainer = document.getElementById('lbContainer');

  // Open / close helpers (global so inline onclick can call them too)
  window.openLightbox = function(src, alt) {
    document.getElementById('lbImg').src = src;
    document.getElementById('lbImg').alt = alt || '';
    resetZoom();
    lbOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // prevent background scroll
  };
  window.closeLightbox = function() {
    lbOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };
  window.zoom = function(d) { scale = Math.min(5, Math.max(0.5, scale + d)); applyT(); };
  function resetZoom() { scale = 1; tx = 0; ty = 0; applyT(); }
  window.resetZoom = resetZoom;
  function applyT() {
    lbInner.style.transform = `translate(${tx}px,${ty}px) scale(${scale})`;
  }

  // ── Gallery items → open lightbox on click ──────────────────────────────────
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (img) openLightbox(img.src, img.alt);
    });
    // Show a zoom-in cursor hint on the thumbnail
    item.style.cursor = 'zoom-in';
  });

  // Also make the farm section image clickable
  const farmImg = document.querySelector('.farm-img-container img');
  if (farmImg) {
    farmImg.style.cursor = 'zoom-in';
    farmImg.addEventListener('click', () => openLightbox(farmImg.src, farmImg.alt));
  }

  // ── Mouse-wheel zoom ────────────────────────────────────────────────────────
  lbContainer.addEventListener('wheel', e => {
    e.preventDefault();
    zoom(e.deltaY < 0 ? 0.15 : -0.15);
  }, { passive: false });

  // ── Drag / pan ──────────────────────────────────────────────────────────────
  lbContainer.addEventListener('mousedown', e => {
    if (e.target === lbOverlay || e.target === lbContainer) return; // backdrop click handled separately
    isDragging = true;
    startX = e.clientX - tx;
    startY = e.clientY - ty;
    lbInner.style.cursor = 'grabbing';
    e.preventDefault();
  });
  window.addEventListener('mousemove', e => {
    if (!isDragging) return;
    tx = e.clientX - startX;
    ty = e.clientY - startY;
    applyT();
  });
  window.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      lbInner.style.cursor = 'grab';
    }
  });

  // ── Touch support (pinch-to-zoom + drag) ────────────────────────────────────
  let lastTouchDist = null;
  lbContainer.addEventListener('touchstart', e => {
    if (e.touches.length === 1) {
      isDragging = true;
      startX = e.touches[0].clientX - tx;
      startY = e.touches[0].clientY - ty;
    } else if (e.touches.length === 2) {
      isDragging = false;
      lastTouchDist = Math.hypot(
        e.touches[1].clientX - e.touches[0].clientX,
        e.touches[1].clientY - e.touches[0].clientY
      );
    }
  }, { passive: true });
  lbContainer.addEventListener('touchmove', e => {
    if (e.touches.length === 1 && isDragging) {
      tx = e.touches[0].clientX - startX;
      ty = e.touches[0].clientY - startY;
      applyT();
    } else if (e.touches.length === 2 && lastTouchDist) {
      const dist = Math.hypot(
        e.touches[1].clientX - e.touches[0].clientX,
        e.touches[1].clientY - e.touches[0].clientY
      );
      zoom((dist - lastTouchDist) * 0.005);
      lastTouchDist = dist;
    }
  }, { passive: true });
  lbContainer.addEventListener('touchend', () => { isDragging = false; lastTouchDist = null; });

  // ── Close on backdrop click ─────────────────────────────────────────────────
  lbOverlay.addEventListener('click', e => {
    if (e.target === lbOverlay || e.target === lbContainer) closeLightbox();
  });

  // ── Keyboard: Escape to close ───────────────────────────────────────────────
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === '+' || e.key === '=') zoom(0.2);
    if (e.key === '-') zoom(-0.2);
    if (e.key === '0') resetZoom();
  });

  // Initialize Language
  updateLanguage("en");
});
