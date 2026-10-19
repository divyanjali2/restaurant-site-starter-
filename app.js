/**
 * CAFÉ - Coffee & More | Modern Interactive Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initMobileDrawer();
  initSmoothScroll();
  initModalListeners();
});

/* --- Navbar Scroll Effect --- */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

/* --- Mobile Drawer Navigation --- */
function initMobileDrawer() {
  const toggleBtn = document.getElementById('mobileToggle');
  const drawer = document.getElementById('mobileDrawer');
  const backdrop = document.getElementById('drawerBackdrop');
  const closeBtn = document.getElementById('drawerClose');
  const drawerLinks = document.querySelectorAll('.drawer-link');
  const drawerOrderBtn = document.getElementById('drawerOrderBtn');

  function openDrawer() {
    drawer.classList.add('active');
    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('active');
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (toggleBtn) toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (backdrop) backdrop.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
      drawerLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });

  if (drawerOrderBtn) {
    drawerOrderBtn.addEventListener('click', () => {
      closeDrawer();
      openOrderModal('House Special Latte', '4.25');
    });
  }
}

/* --- Smooth Scrolling & Active Nav --- */
function initSmoothScroll() {
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        navLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
      }
    });
  });
}

/* --- Modal Management --- */
function initModalListeners() {
  const openOrderBtn = document.getElementById('openOrderModalBtn');
  const heroMenuBtn = document.getElementById('heroMenuBtn');
  const viewFullMenuBtn = document.getElementById('viewFullMenuBtn');
  const findLocationBtn = document.getElementById('findLocationBtn');

  if (openOrderBtn) {
    openOrderBtn.addEventListener('click', () => openOrderModal('Signature Brew', '3.80'));
  }

  if (heroMenuBtn) {
    heroMenuBtn.addEventListener('click', () => openModal('menuModalBackdrop'));
  }

  if (viewFullMenuBtn) {
    viewFullMenuBtn.addEventListener('click', () => openModal('menuModalBackdrop'));
  }

  if (findLocationBtn) {
    findLocationBtn.addEventListener('click', () => openModal('locationModalBackdrop'));
  }

  // Close modals on clicking backdrop
  const backdrops = document.querySelectorAll('.modal-backdrop');
  backdrops.forEach(backdrop => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        backdrop.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-backdrop.active, .lightbox-backdrop.active').forEach(m => {
        m.classList.remove('active');
      });
      const drawer = document.getElementById('mobileDrawer');
      const drawerBackdrop = document.getElementById('drawerBackdrop');
      if (drawer) drawer.classList.remove('active');
      if (drawerBackdrop) drawerBackdrop.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

/* --- Order Modal Operations --- */
function openOrderModal(itemName, itemPrice) {
  const nameEl = document.getElementById('orderItemName');
  const priceEl = document.getElementById('orderItemPrice');

  if (nameEl) nameEl.textContent = itemName;
  if (priceEl) priceEl.textContent = itemPrice.startsWith('$') ? itemPrice : `$${itemPrice}`;

  openModal('orderModalBackdrop');
}

function handlePlaceOrder(e) {
  e.preventDefault();
  const itemName = document.getElementById('orderItemName').textContent;
  const size = document.getElementById('orderSize').value;
  const name = document.getElementById('customerName').value;
  const pickup = document.getElementById('pickupTime').value;

  closeModal('orderModalBackdrop');
  e.target.reset();

  showToast(`🎉 Thank you, ${name}! Your order for "${itemName}" has been received. Ready for pickup in ${pickup === 'asap' ? '15 minutes' : pickup}.`);
}

/* --- Full Menu Filter --- */
function filterMenu(category, btnElement) {
  const tabs = document.querySelectorAll('.tab-btn');
  tabs.forEach(t => t.classList.remove('active'));
  btnElement.classList.add('active');

  const cards = document.querySelectorAll('.full-menu-card');
  cards.forEach(card => {
    if (category === 'all' || card.getAttribute('data-category') === category) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });
}

/* --- Feature Stories Modal --- */
const storyData = {
  coffee: {
    title: 'Quality Coffee Sourcing',
    content: `
      <p style="margin-bottom: 14px; font-size: 0.95rem; line-height: 1.6;">At <strong>Café</strong>, we travel directly to smallholder farm cooperatives across Colombia, Ethiopia, and Guatemala. Every single batch of green beans is ethically sourced, Fair Trade certified, and roasted in micro-batches right here each week.</p>
      <p style="margin-bottom: 14px; font-size: 0.95rem; line-height: 1.6;">Our state-of-the-art La Marzocco espresso machines are calibrated hourly to ensure optimum water pressure and temperature stability, bringing forth notes of wild berries, chocolate fudge, and toasted hazelnut in every pull.</p>
      <div style="background-color: #FAF5F0; padding: 14px; border-radius: 8px; border-left: 4px solid #653B24; font-size: 0.88rem; color: #653B24;">
        <strong>Barista's Tip:</strong> Try our single-origin Ethiopian Guji pour-over with no milk to experience delicate floral and citrus nectar notes.
      </div>
    `
  },
  bakery: {
    title: 'Fresh & Delicious Daily Baking',
    content: `
      <p style="margin-bottom: 14px; font-size: 0.95rem; line-height: 1.6;">Our master pastry chefs start their shift every morning at 4:30 AM. Using French cultured butter, unbleached organic flours, and pure fruit purees, nothing is ever frozen or pre-packaged.</p>
      <p style="margin-bottom: 14px; font-size: 0.95rem; line-height: 1.6;">From our 48-hour fermented golden croissants to velvety cheesecakes and artisanal ciabatta bread, we believe every bite should delight the senses as much as our morning brew.</p>
      <div style="background-color: #FAF5F0; padding: 14px; border-radius: 8px; border-left: 4px solid #653B24; font-size: 0.88rem; color: #653B24;">
        <strong>Daily Special:</strong> Fresh out of the oven every morning at 7:30 AM and 11:30 AM!
      </div>
    `
  },
  ambience: {
    title: 'Our Cozy Atmosphere',
    content: `
      <p style="margin-bottom: 14px; font-size: 0.95rem; line-height: 1.6;">We thoughtfully designed every corner of Café to feel like a natural extension of your living room. Reclaimed cedar tables, warm 2700K pendant illumination, abundant natural greenery, and soothing acoustic jazz create the sanctuary you deserve.</p>
      <p style="margin-bottom: 14px; font-size: 0.95rem; line-height: 1.6;">Equipped with high-speed fiber Wi-Fi, quiet work nooks, comfortable lounge armchairs, and sunny patio seating, we invite you to linger as long as you desire.</p>
      <div style="background-color: #FAF5F0; padding: 14px; border-radius: 8px; border-left: 4px solid #653B24; font-size: 0.88rem; color: #653B24;">
        <strong>Community Note:</strong> We offer pet-friendly outdoor seating with complimentary water bowls and dog treats!
      </div>
    `
  }
};

function openStoryModal(type) {
  const story = storyData[type];
  if (!story) return;

  const titleEl = document.getElementById('storyModalTitle');
  const contentEl = document.getElementById('storyModalContent');

  if (titleEl) titleEl.textContent = story.title;
  if (contentEl) contentEl.innerHTML = story.content;

  openModal('storyModalBackdrop');
}

/* --- Lightbox Gallery --- */
function openLightbox(imgSrc, caption) {
  const lightbox = document.getElementById('lightboxBackdrop');
  const imgEl = document.getElementById('lightboxImg');
  const captionEl = document.getElementById('lightboxCaption');

  if (imgEl) imgEl.src = imgSrc;
  if (captionEl) captionEl.textContent = caption;

  if (lightbox) {
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeLightbox() {
  const lightbox = document.getElementById('lightboxBackdrop');
  if (lightbox) {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
}

/* --- Newsletter Submission --- */
function handleNewsletter(e) {
  e.preventDefault();
  const input = document.getElementById('newsletterEmail');
  const email = input.value.trim();

  if (email) {
    showToast(`☕ Welcome to the Café family! A 15% discount code has been sent to ${email}.`);
    input.value = '';
  }
}

/* --- Legal Modal --- */
function showLegalModal(title) {
  const titleEl = document.getElementById('storyModalTitle');
  const contentEl = document.getElementById('storyModalContent');

  if (titleEl) titleEl.textContent = title;
  if (contentEl) {
    contentEl.innerHTML = `
      <p style="margin-bottom: 12px; font-size: 0.92rem; line-height: 1.6;">This website is designed for Café | Coffee & More. We are dedicated to transparent service, guest satisfaction, and protecting your personal details.</p>
      <p style="font-size: 0.92rem; line-height: 1.6;">We never sell personal information, and your email is exclusively used for coffee club perks, invitations, and seasonal updates.</p>
    `;
  }

  openModal('storyModalBackdrop');
}

/* --- Toast Notification Utility --- */
function showToast(message) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = message;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(15px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4500);
}
