
/* ============================================================
   VESTIS — Clothing E-Commerce
   Main JavaScript
   ============================================================ */

'use strict';

/* ==================== SEED DATA ==================== */
const DEFAULT_PRODUCTS = [
  {
    id: 1,
    name: 'Linen Overshirt',
    category: 'Men',
    price: 1899,
    description: 'A relaxed-fit overshirt crafted from 100% breathable linen. Perfect for layering over a tee or wearing open as a light jacket. Available in a range of natural tones.',
    images: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&q=80',
      'https://images.unsplash.com/photo-1598032895397-b9472444bf93?w=600&q=80',
      'https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=600&q=80'
    ],
    reviews: [
      { rating: 5, text: 'Absolutely love the fabric quality. Looks great on any occasion.', date: '12 Mar 2025' },
      { rating: 4, text: 'Fits well and feels premium. Slightly longer than expected.', date: '28 Feb 2025' }
    ]
  },
  {
    id: 2,
    name: 'Slim Fit Chinos',
    category: 'Men',
    price: 1599,
    description: 'Tailored slim-fit chinos with a mid-rise waist and tapered leg. Made from a stretch-cotton blend for all-day comfort. Versatile enough for both casual and smart-casual settings.',
    images: [
      'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80',
      'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&q=80'
    ],
    reviews: [
      { rating: 5, text: 'Perfect fit. Exactly the cut I was looking for.', date: '5 Apr 2025' }
    ]
  },
  {
    id: 3,
    name: 'Classic White Tee',
    category: 'Unisex',
    price: 699,
    description: 'An essential wardrobe staple. Made from 200gsm combed cotton for a structured yet soft feel. Pre-washed to minimise shrinkage. Crew neck with a slightly oversized silhouette.',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&q=80'
    ],
    reviews: [
      { rating: 4, text: 'Great everyday tee. Holds shape after multiple washes.', date: '20 Jan 2025' },
      { rating: 5, text: 'Bought three of these. The quality is unmatched at this price.', date: '1 Feb 2025' }
    ]
  },
  {
    id: 4,
    name: 'Knit Merino Pullover',
    category: 'Women',
    price: 2499,
    description: 'A finely knitted pullover in 100% Merino wool. Naturally temperature-regulating and incredibly soft against the skin. Features a ribbed hem, cuffs, and a relaxed round neck.',
    images: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80',
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&q=80'
    ],
    reviews: [
      { rating: 5, text: 'So soft and elegant. Got a lot of compliments wearing this.', date: '15 Mar 2025' }
    ]
  },
  {
    id: 5,
    name: 'Wide-Leg Trousers',
    category: 'Women',
    price: 1799,
    description: 'High-waisted wide-leg trousers with a fluid drape. Cut from a lightweight woven fabric with subtle sheen. Pairs effortlessly with tucked-in blouses or fitted knits.',
    images: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4b4f7e?w=600&q=80',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80'
    ],
    reviews: []
  },
  {
    id: 6,
    name: 'Structured Blazer',
    category: 'Unisex',
    price: 3299,
    description: 'A single-breasted structured blazer with notch lapels and padded shoulders. Fully lined interior with two button closure. Elevates any outfit instantly — from denim to tailored trousers.',
    images: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
      'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=600&q=80'
    ],
    reviews: [
      { rating: 4, text: 'Sharp look. Slightly stiff at first but loosened up.', date: '8 Apr 2025' },
      { rating: 5, text: 'Best blazer I have owned. Looks expensive and feels it too.', date: '22 Mar 2025' }
    ]
  },
  {
    id: 7,
    name: 'Ribbed Tank Top',
    category: 'Women',
    price: 549,
    description: 'A form-fitting ribbed tank top in a stretchy cotton-elastane blend. Versatile layering piece that works as a base layer or standalone top. Available in multiple neutral shades.',
    images: [
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80'
    ],
    reviews: [
      { rating: 5, text: 'Super comfortable and fits perfectly.', date: '11 Apr 2025' }
    ]
  },
  {
    id: 8,
    name: 'Denim Jacket',
    category: 'Unisex',
    price: 2199,
    description: 'A timeless rigid denim jacket with a trucker-style cut. Raw hem finish and branded metal buttons. Slightly oversized for that authentic vintage feel. Gets better with age.',
    images: [
      'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=600&q=80',
      'https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=600&q=80'
    ],
    reviews: [
      { rating: 4, text: 'Looks great but runs a little large.', date: '3 Apr 2025' }
    ]
  }
];

/* ==================== STATE ==================== */
const STATE = {
  currentView: 'home',
  currentProduct: null,
  selectedRating: 0,
};

/* ==================== STORAGE HELPERS ==================== */
function getProducts() {
  try {
    const stored = localStorage.getItem('vestis_products');
    return stored ? JSON.parse(stored) : DEFAULT_PRODUCTS;
  } catch { return DEFAULT_PRODUCTS; }
}

function saveProducts(products) {
  localStorage.setItem('vestis_products', JSON.stringify(products));
}

function getCart() {
  try {
    const stored = localStorage.getItem('vestis_cart');
    return stored ? JSON.parse(stored) : [];
  } catch { return []; }
}

function saveCart(cart) {
  localStorage.setItem('vestis_cart', JSON.stringify(cart));
}

function getUser() {
  try {
    const stored = localStorage.getItem('vestis_user');
    return stored ? JSON.parse(stored) : null;
  } catch { return null; }
}

function saveUser(user) {
  localStorage.setItem('vestis_user', JSON.stringify(user));
}

function clearUser() {
  localStorage.removeItem('vestis_user');
}

/* ==================== HELPERS ==================== */
function formatPrice(n) {
  return '₹' + Number(n).toLocaleString('en-IN');
}

function avgRating(reviews) {
  if (!reviews || reviews.length === 0) return 0;
  return reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
}

function renderStars(rating, total) {
  const full = Math.round(rating);
  let html = '';
  for (let i = 1; i <= 5; i++) {
    html += `<span style="color:${i <= full ? '#f0a500' : '#ddd'}">★</span>`;
  }
  if (total !== undefined) {
    html += `<span class="count">(${total})</span>`;
  }
  return html;
}

function today() {
  return new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

/* ==================== VIEW SWITCHING ==================== */
function showView(viewId) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  const target = document.getElementById('view-' + viewId);
  if (target) {
    target.classList.add('active');
    // Make auth-view flex-center work
    if (viewId === 'login') target.style.display = 'flex';
    else target.style.display = '';
  }

  // Highlight active nav
  document.querySelectorAll('.nav-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.view === viewId);
  });

  STATE.currentView = viewId;

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ==================== PRODUCT GRID ==================== */
function renderProductGrid() {
  const grid = document.getElementById('product-grid');
  const products = getProducts();
  grid.innerHTML = '';

  products.forEach(product => {
    const avg = avgRating(product.reviews);
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.id = product.id;
    card.innerHTML = `
      <img class="product-card-img"
           src="${product.images[0]}"
           alt="${product.name}"
           loading="lazy"
           onerror="this.src='https://placehold.co/300x400/f2f2f2/aaa?text=No+Image'" />
      <div class="product-card-body">
        <p class="product-card-category">${product.category}</p>
        <p class="product-card-name">${product.name}</p>
        <div class="product-card-meta">
          <span class="product-card-price">${formatPrice(product.price)}</span>
          <span class="star-display">
            ${renderStars(avg, product.reviews.length)}
          </span>
        </div>
      </div>
    `;
    card.addEventListener('click', () => openProductDetail(product.id));
    grid.appendChild(card);
  });
}

/* ==================== PRODUCT DETAIL ==================== */
function openProductDetail(productId) {
  const products = getProducts();
  const product = products.find(p => p.id === productId);
  if (!product) return;

  STATE.currentProduct = product;

  // Main image
  const mainImg = document.getElementById('gallery-main-img');
  mainImg.src = product.images[0];
  mainImg.alt = product.name;

  // Thumbnails
  const thumbsWrap = document.getElementById('gallery-thumbs');
  thumbsWrap.innerHTML = '';
  product.images.forEach((url, i) => {
    const thumb = document.createElement('img');
    thumb.className = 'gallery-thumb' + (i === 0 ? ' active' : '');
    thumb.src = url;
    thumb.alt = product.name;
    thumb.loading = 'lazy';
    thumb.onerror = () => { thumb.src = 'https://placehold.co/64x80/f2f2f2/aaa?text=Img'; };
    thumb.addEventListener('click', () => {
      mainImg.src = url;
      thumbsWrap.querySelectorAll('.gallery-thumb').forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
    });
    thumbsWrap.appendChild(thumb);
  });

  // Info
  document.getElementById('detail-title').textContent = product.name;
  document.getElementById('detail-price').textContent = formatPrice(product.price);
  document.getElementById('detail-desc').textContent = product.description;

  const avg = avgRating(product.reviews);
  document.getElementById('detail-rating').innerHTML = `
    <span class="stars">${renderStars(avg)}</span>
    <span>${avg > 0 ? avg.toFixed(1) : 'No ratings'} · ${product.reviews.length} review${product.reviews.length !== 1 ? 's' : ''}</span>
  `;

  // Reset review input
  STATE.selectedRating = 0;
  document.getElementById('review-text').value = '';
  updateStarInput(0);

  renderReviews(product);
  showView('product');
}

function renderReviews(product) {
  const list = document.getElementById('review-list');
  list.innerHTML = '';
  if (product.reviews.length === 0) {
    list.innerHTML = '<p class="no-reviews">No reviews yet. Be the first to review!</p>';
    return;
  }
  [...product.reviews].reverse().forEach(rv => {
    const card = document.createElement('div');
    card.className = 'review-card';
    card.innerHTML = `
      <div class="review-card-header">
        <span class="review-stars">${renderStars(rv.rating)}</span>
        <span class="review-date">${rv.date}</span>
      </div>
      <p class="review-text-display">${escapeHtml(rv.text)}</p>
    `;
    list.appendChild(card);
  });
}

function escapeHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

/* ==================== STAR INPUT ==================== */
function updateStarInput(rating) {
  document.querySelectorAll('#star-input span').forEach((s, i) => {
    s.classList.toggle('active', i < rating);
  });
}

document.querySelectorAll('#star-input span').forEach(s => {
  s.addEventListener('click', () => {
    STATE.selectedRating = parseInt(s.dataset.val);
    updateStarInput(STATE.selectedRating);
  });
  s.addEventListener('mouseenter', () => updateStarInput(parseInt(s.dataset.val)));
});

document.getElementById('star-input').addEventListener('mouseleave', () => {
  updateStarInput(STATE.selectedRating);
});

/* Submit Review */
document.getElementById('submit-review').addEventListener('click', () => {
  const text = document.getElementById('review-text').value.trim();
  if (!STATE.selectedRating) { alert('Please select a star rating.'); return; }
  if (!text) { alert('Please write a review.'); return; }

  const products = getProducts();
  const idx = products.findIndex(p => p.id === STATE.currentProduct.id);
  if (idx < 0) return;

  products[idx].reviews.push({ rating: STATE.selectedRating, text, date: today() });
  saveProducts(products);

  STATE.currentProduct = products[idx];

  // Update avg in detail
  const avg = avgRating(products[idx].reviews);
  document.getElementById('detail-rating').innerHTML = `
    <span class="stars">${renderStars(avg)}</span>
    <span>${avg.toFixed(1)} · ${products[idx].reviews.length} review${products[idx].reviews.length !== 1 ? 's' : ''}</span>
  `;

  renderReviews(products[idx]);
  STATE.selectedRating = 0;
  document.getElementById('review-text').value = '';
  updateStarInput(0);
});

/* ==================== CART ==================== */
function openCart() {
  document.getElementById('cart-panel').classList.remove('hidden');
  document.getElementById('cart-overlay').classList.remove('hidden');
  renderCartPanel();
}

function closeCart() {
  document.getElementById('cart-panel').classList.add('hidden');
  document.getElementById('cart-overlay').classList.add('hidden');
}

function addToCart(productId) {
  const products = getProducts();
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const cart = getCart();
  const existing = cart.find(i => i.id === productId);
  if (existing) {
    existing.qty = (existing.qty || 1) + 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      qty: 1
    });
  }
  saveCart(cart);
  updateCartBadge();
  openCart();
}

function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter(i => i.id !== productId);
  saveCart(cart);
  updateCartBadge();
  renderCartPanel();
}

function updateCartBadge() {
  const cart = getCart();
  const total = cart.reduce((s, i) => s + (i.qty || 1), 0);
  document.getElementById('cart-count').textContent = total;
}

function renderCartPanel() {
  const cart = getCart();
  const itemsWrap = document.getElementById('cart-items');

  if (cart.length === 0) {
    itemsWrap.innerHTML = '<div class="cart-empty">Your cart is empty.<br>Start adding items!</div>';
    document.getElementById('cart-total-price').textContent = '₹0';
    return;
  }

  itemsWrap.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
    const qty = item.qty || 1;
    total += item.price * qty;
    const el = document.createElement('div');
    el.className = 'cart-item';
    el.innerHTML = `
      <img class="cart-item-img"
           src="${item.image}"
           alt="${item.name}"
           onerror="this.src='https://placehold.co/64x80/f2f2f2/aaa?text=Img'" />
      <div>
        <p class="cart-item-name">${item.name}</p>
        <p class="cart-item-price">${formatPrice(item.price)} × ${qty}</p>
      </div>
      <button class="cart-item-remove" data-id="${item.id}" aria-label="Remove">✕</button>
    `;
    itemsWrap.appendChild(el);
  });

  // Bind remove buttons
  itemsWrap.querySelectorAll('.cart-item-remove').forEach(btn => {
    btn.addEventListener('click', () => removeFromCart(parseInt(btn.dataset.id)));
  });

  document.getElementById('cart-total-price').textContent = formatPrice(total);
}

document.getElementById('close-cart').addEventListener('click', closeCart);
document.getElementById('cart-overlay').addEventListener('click', closeCart);

document.getElementById('checkout-btn').addEventListener('click', () => {
  const user = getUser();
  if (!user) {
    closeCart();
    showView('login');
    return;
  }
  alert('Order placed successfully! (Demo — no backend)');
  saveCart([]);
  updateCartBadge();
  closeCart();
});

/* Detail page cart/buy actions */
document.getElementById('detail-add-cart').addEventListener('click', () => {
  if (STATE.currentProduct) addToCart(STATE.currentProduct.id);
});

document.getElementById('detail-buy-now').addEventListener('click', () => {
  if (!STATE.currentProduct) return;
  addToCart(STATE.currentProduct.id);
  closeCart();
  openCart();
});

/* ==================== AUTH — LOGIN ==================== */
const VALID_EMAIL = 'kkmenon@gmail.com';
const VALID_PASS  = '123456789';

document.getElementById('login-submit').addEventListener('click', () => {
  const email = document.getElementById('login-email').value.trim();
  const pass  = document.getElementById('login-password').value;
  const errEl = document.getElementById('login-error');

  if (email === VALID_EMAIL && pass === VALID_PASS) {
    errEl.classList.add('hidden');
    saveUser({ email, phone: '+91 98765 43210' });
    updateAuthUI();
    showView('home');
  } else {
    errEl.classList.remove('hidden');
  }
});

/* Allow Enter key on login */
['login-email','login-password'].forEach(id => {
  document.getElementById(id).addEventListener('keydown', e => {
    if (e.key === 'Enter') document.getElementById('login-submit').click();
  });
});

/* ==================== AUTH — LOGOUT ==================== */
document.getElementById('logout-btn').addEventListener('click', () => {
  clearUser();
  updateAuthUI();
  showView('home');
});

function updateAuthUI() {
  const user = getUser();
  const loginBtn   = document.getElementById('login-nav-btn');
  const profileBtn = document.getElementById('profile-nav-btn');

  if (user) {
    loginBtn.style.display = 'none';
    profileBtn.style.display = '';
    // populate profile
    document.getElementById('pf-email').textContent = user.email;
    document.getElementById('profile-name').textContent = user.email.split('@')[0];
  } else {
    loginBtn.style.display = '';
    profileBtn.style.display = 'none';
  }
}

/* ==================== NAV ROUTING ==================== */
document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const view = btn.dataset.view;
    if (!view) return;

    if (view === 'cart') {
      openCart();
      return;
    }

    if (view === 'profile') {
      const user = getUser();
      if (!user) { showView('login'); return; }
      showView('profile');
      return;
    }

    showView(view);
  });
});

/* Logo click → home */
document.querySelector('.logo-wrap').addEventListener('click', () => showView('home'));

/* Back button on product detail */
document.getElementById('back-to-home').addEventListener('click', () => {
  showView('home');
});

/* ==================== BANNER CLOSE ==================== */
document.getElementById('close-banner').addEventListener('click', () => {
  document.getElementById('top-banner').style.display = 'none';
});

/* ==================== SELLER FEATURE ==================== */
document.getElementById('seller-submit').addEventListener('click', () => {
  const title    = document.getElementById('seller-title').value.trim();
  const price    = parseFloat(document.getElementById('seller-price').value);
  const desc     = document.getElementById('seller-desc').value.trim();
  const category = document.getElementById('seller-category').value;
  const imgRaw   = document.getElementById('seller-images').value.trim();
  const errEl    = document.getElementById('seller-error');
  const sucEl    = document.getElementById('seller-success');

  errEl.classList.add('hidden');
  sucEl.classList.add('hidden');

  if (!title || !price || price <= 0 || !desc || !imgRaw) {
    errEl.classList.remove('hidden');
    return;
  }

  const images = imgRaw.split('\n').map(s => s.trim()).filter(Boolean);
  if (images.length === 0) {
    errEl.classList.remove('hidden');
    return;
  }

  const products = getProducts();
  const newId = products.reduce((mx, p) => Math.max(mx, p.id), 0) + 1;

  const newProduct = {
    id: newId,
    name: title,
    category,
    price,
    description: desc,
    images,
    reviews: []
  };

  products.push(newProduct);
  saveProducts(products);

  sucEl.classList.remove('hidden');

  // Reset form
  document.getElementById('seller-title').value = '';
  document.getElementById('seller-price').value = '';
  document.getElementById('seller-desc').value = '';
  document.getElementById('seller-images').value = '';

  // Refresh grid in background
  renderProductGrid();

  setTimeout(() => sucEl.classList.add('hidden'), 3000);
});

/* ==================== INIT ==================== */
function init() {
  // Initialise localStorage with defaults if empty
  if (!localStorage.getItem('vestis_products')) {
    saveProducts(DEFAULT_PRODUCTS);
  }

  renderProductGrid();
  updateCartBadge();
  updateAuthUI();
  showView('home');
}

init();
