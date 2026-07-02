// ── Modal data ──
  const modalData = {
    cleaning: {
      eyebrow: 'Cleaning Materials & Equipment',
      title: 'Full Product Range',
      desc: 'We stock a comprehensive range of industrial and commercial cleaning equipment and protective gear — suitable for schools, government offices, healthcare facilities, and corporate environments.',
      products: [
        'Elbow Pump Wall-Mounted',
        'InfectiGuard Auto Urinal Dispenser',
        'Digital Inline Kit 360ml',
        'Bucket 8L Blue',
        'Soap Dispenser 1.2L',
        'Grass Broom with Handle',
        'Rake Metal (Yellow)',
        'Whiska Broom with Metal Handle',
        'Blue Scrub Long Handle Hard White',
        'Broom Deluxe Wooden Handle & Head',
        'Platform Broom Hard 300mm',
        'Toilet Brush Set Round Grey Plastic',
        'Body Brush Premium White',
        'Prism Conti Suit Reflective (Chest 36 / Waist 32)',
        'Wipe Stand Floor',
        'Wall Stand S/Steel',
        'Hand Dryer 2.3KW S/Steel',
        'Refuse Bag Black 80Mic 2X-HD 5×20\'s 750×950',
      ]
    },
    stationery: {
  eyebrow: 'Stationery & Office Supplies',
  title: 'Full Product Range',
  desc: 'Bulk office essentials and school stationery for corporate procurement, institutions, and schools — always available, competitively priced, and delivered on time.',
  products: [
    'Mondi Rotatrim A4 Copy Paper 80g',
    'Typek A4 Copy Paper 80g White',
    'Bantex Lever Arch File A4 Board',
    'Croxley Hardcover Manuscript Book 2 Quire',
    'Pilot G2 Gel Ink Pen Black Fine',
    'Bic Cristal Medium Ballpoint Pen Blue 50s',
    'Pritt Glue Stick Jumbo 43g',
    'Pentel Maxiflo Whiteboard Marker Bullet',
    'Trex Stationery Scissor 210mm',
    '(Bulk corporate and school orders welcome)',
  ]
},

    sanitary: {
      eyebrow: 'Toilet Paper & Sanitary Products',
      title: 'Full Product Range',
      desc: 'Bulk sanitary supplies for institutions, clinics, schools, and commercial facilities — always available, competitively priced, and delivered on time.',
      products: [
        'Toilet Roll Holder 3 Rolls S/Steel',
        'Toilet Roll Holder 3s Premium White',
        'Toilet Roll Holder 2 Rolls White',
        'Decca Toilet Tissue Dispenser',
        'Twinsaver Platform (Toilet Tissue)',
        'Sanitary Bag Dispenser',
        'Sanitary Bag Refills 100s SO4 SP 500s',
        'Sanitary Towel Bin Large S/Steel',
        'Refuse Bag Black 80Mic 2X-HD 5×20\'s',
        '(Bulk toilet roll orders welcome)',
      ]
    },
        amenities: {
      eyebrow: 'Bathroom Amenities',
      title: 'Luxury Guest Toiletry Collection',
      desc: 'Premium guest hospitality packages featuring elegant personal care items and curated bath formulas. A complete set of premium liquids, boxed dry essentials, and bath treatments for an upscale bathroom experience.',
      products: [
        'Vitalising Shampoo ',
        'Comfort Shower Gel )',
        'Relaxing Bath Salts ',
        'Foaming Body Lotion',
        'Wrapped Pleated Body Soap',
        'Face Towel',
        'Shaving Kit',
        'Shower Cap',
        'Vanity Pack',
        '(Custom luxury amenity kits available on request)',
      ]
    }

  };

  // ── Modal logic ──
  const overlay = document.getElementById('modalOverlay');
  const modalClose = document.getElementById('modalClose');

  function openModal(key) {
    const d = modalData[key];
    if (!d) return;

    document.getElementById('modalEyebrow').textContent = d.eyebrow;
    document.getElementById('modalTitle').textContent = d.title;
    document.getElementById('modalDesc').textContent = d.desc;

    const grid = document.getElementById('modalProductGrid');
    grid.innerHTML = d.products.map(p =>
      `<div class="product-item"><span class="product-dot">✓</span><span>${p}</span></div>`
    ).join('');

    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  modalClose.addEventListener('click', closeModal);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  // Close modal and smooth scroll to contact when CTA clicked
  document.getElementById('modalCtaLink').addEventListener('click', () => closeModal());

  // ── Sticky nav ──
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });

  // ── Mobile menu ──
  document.getElementById('hamburger').addEventListener('click', () => {
    document.getElementById('navLinks').classList.toggle('open');
  });
  document.querySelectorAll('#navLinks a').forEach(a =>
    a.addEventListener('click', () => document.getElementById('navLinks').classList.remove('open'))
  );

  // ── Scroll reveal ──
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const siblings = el.parentNode.querySelectorAll('.service-card, .coverage-card, .why-card');
      const idx = Array.from(siblings).indexOf(el);
      const delay = idx >= 0 ? idx * 110 : 0;
      setTimeout(() => el.classList.add('visible'), delay);
      observer.unobserve(el);
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-up, .service-card, .coverage-card, .why-card').forEach(el => observer.observe(el));

  // ── Smooth scroll ──
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });

  // ── Scroll spy: highlight current section in nav ──
  // Only anchors that point to an in-page id (#services, #about, #contact)
  // are eligible — "coverage.html" style links are skipped since they're
  // separate pages and can't be scroll-spied from here.
  const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');
  const spySectionIds = Array.from(navAnchors)
    .map(a => a.getAttribute('href').slice(1))
    .filter(id => id && document.getElementById(id));

  const spySections = spySectionIds
    .map(id => document.getElementById(id))
    .filter(Boolean);

  function setActiveNavLink(id) {
    navAnchors.forEach(a => a.classList.remove('active'));
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (link) link.classList.add('active');
  }

  if (spySections.length) {
    const spyObserver = new IntersectionObserver((entries) => {
      // Pick the entry closest to the top of the viewport among those intersecting
      const visible = entries.filter(e => e.isIntersecting);
      if (visible.length === 0) return;

      visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      setActiveNavLink(visible[0].target.id);
    }, {
      rootMargin: '-40% 0px -55% 0px', // narrow band near vertical center of viewport
      threshold: 0
    });

    spySections.forEach(sec => spyObserver.observe(sec));

    // Set correct active link immediately on load (before any scrolling)
    window.addEventListener('DOMContentLoaded', () => {
      let current = spySections[0];
      let closest = Infinity;
      spySections.forEach(sec => {
        const dist = Math.abs(sec.getBoundingClientRect().top);
        if (dist < closest) { closest = dist; current = sec; }
      });
      if (current) setActiveNavLink(current.id);
    });
  }


document.getElementById("copyright").textContent =
    `© ${new Date().getFullYear()} SparkleClean Enterprises. All rights reserved.`;
