// ===== COOKIE BANNER =====
function dismissCookie() {
  const banner = document.getElementById('cookieBanner');
  banner.classList.add('hidden');
  localStorage.setItem('cookieDismissed', 'true');
}

// Check if cookie was already dismissed
if (localStorage.getItem('cookieDismissed') === 'true') {
  document.getElementById('cookieBanner').classList.add('hidden');
}

// ===== NAVBAR =====
function toggleMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  
  hamburger.classList.toggle('active');
  mobileMenu.classList.toggle('active');
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===== PARTICLES =====
function createParticles() {
  const particlesContainer = document.getElementById('particles');
  const particleCount = 50;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
      position: absolute;
      width: ${Math.random() * 4 + 1}px;
      height: ${Math.random() * 4 + 1}px;
      background: var(--accent-red);
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      opacity: ${Math.random() * 0.5 + 0.2};
      animation: float-particle ${Math.random() * 10 + 10}s linear infinite;
    `;
    particlesContainer.appendChild(particle);
  }
}

// Create floating particle animation
const style = document.createElement('style');
style.textContent = `
  @keyframes float-particle {
    0% { transform: translateY(0) translateX(0); opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 1; }
    100% { transform: translateY(-100vh) translateX(${Math.random() * 200 - 100}px); opacity: 0; }
  }
`;
document.head.appendChild(style);

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ===== FAQ TOGGLE =====
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-q');
    const answer = item.querySelector('.faq-a');
    
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all other items
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
      });
      
      // Toggle current item
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

// ===== AOS (Animate On Scroll) =====
function initAOS() {
  const elements = document.querySelectorAll('[data-aos]');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aos-animate');
      }
    });
  }, {
    threshold: 0.1
  });
  
  elements.forEach(element => {
    observer.observe(element);
  });
}

// ===== HERO CARDS HOVER =====
function initHeroCards() {
  const cards = document.querySelectorAll('.hcard');
  
  cards.forEach((card, index) => {
    card.addEventListener('mouseenter', () => {
      card.style.zIndex = 10;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.zIndex = '';
    });
  });
}

// ===== STAT COUNTER =====
function animateStats() {
  const stats = document.querySelectorAll('.stat-num');
  
  stats.forEach(stat => {
    const target = parseInt(stat.textContent);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      
      if (stat.textContent.includes('+')) {
        stat.textContent = Math.floor(current) + '+';
      } else if (stat.textContent.includes('%')) {
        stat.textContent = Math.floor(current) + '%';
      } else {
        stat.textContent = Math.floor(current) + '/7';
      }
    }, 16);
  });
}

// ===== TYPING EFFECT =====
function typeWriter(element, text, speed = 50) {
  let i = 0;
  element.textContent = '';
  
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

// ===== PARALLAX EFFECT =====
function initParallax() {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-glow');
    
    parallaxElements.forEach((element, index) => {
      const speed = 0.5 + (index * 0.1);
      element.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });
}


// ===== PRICE OPTIONS =====
function initPriceOptions() {
  const productCards = document.querySelectorAll('.product-card');
  
  productCards.forEach(card => {
    const priceOptions = card.querySelectorAll('.price-option');
    const buyButton = card.querySelector('.btn-primary');
    
    priceOptions.forEach((option, index) => {
      option.addEventListener('click', () => {
        // Remove selected from all options
        priceOptions.forEach(opt => opt.classList.remove('selected'));
        
        // Add selected to clicked option
        option.classList.add('selected');
        
        // Update buy button text
        const period = option.querySelector('.price-period').textContent;
        const price = option.querySelector('.price-amount').textContent;
        const productName = card.querySelector('.product-name').textContent;
        
        buyButton.textContent = `Buy ${productName} (${period}) - ${price}`;
        buyButton.setAttribute('onclick', `openPaymentModal('${productName}', '${price}', '${period}')`);
      });
    });
    
    // Select first option by default
    if (priceOptions.length > 0) {
      priceOptions[0].click();
    }
  });
}

// ===== ADVANCED PAYMENT MODAL =====
let selectedProduct = '';
let selectedPrice = '';
let selectedPeriod = '';
let currentStep = 1;

function openPaymentModal(productName, price, period) {
  selectedProduct = productName;
  selectedPrice = price;
  selectedPeriod = period;
  currentStep = 1;
  
  // Update modal content
  document.getElementById('modalProductName').textContent = productName;
  document.getElementById('modalProductPrice').textContent = price;
  document.getElementById('modalProductPeriod').textContent = period;
  
  // Calculate totals
  updateOrderTotals(price);
  
  // Set product icon based on product name
  const productIcons = {
    'TrollMacker': '🐟',
    'NoRCE Security Guard': '🛡️',
    'MBE': '⚡'
  };
  const icon = productIcons[productName] || '🔥';
  document.getElementById('modalProductIcon').textContent = icon;
  
  // Show modal
  const modal = document.getElementById('paymentModal');
  modal.classList.add('active');
  
  // Reset payment selection and auto-select card
  document.querySelectorAll('.payment-option').forEach(option => {
    option.classList.remove('selected');
  });
  document.querySelectorAll('.form-section').forEach(form => {
    form.style.display = 'none';
  });
  
  // Auto-select card payment as default
  const cardOptions = document.querySelectorAll('.payment-option');
  if (cardOptions.length > 0) {
    // Find the card option by checking its onclick attribute
    for (let option of cardOptions) {
      if (option.onclick && option.onclick.toString().includes('card')) {
        option.classList.add('selected');
        document.getElementById('cardForm').style.display = 'block';
        updatePaymentProgress(2);
        break;
      }
    }
  }
  
  // Reset progress
  updatePaymentProgress(1);
}

function closePaymentModal() {
  const modal = document.getElementById('paymentModal');
  modal.classList.remove('active');
  currentStep = 1;
}

function updateOrderTotals(price) {
  const subtotal = parseFloat(price.replace('$', ''));
  const fee = subtotal * 0.03; // 3% processing fee
  const total = subtotal + fee;
  
  document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
  document.getElementById('fee').textContent = `$${fee.toFixed(2)}`;
  document.getElementById('total').textContent = `$${total.toFixed(2)}`;
}

function updatePaymentProgress(step) {
  currentStep = step;
  
  // Update step indicators
  document.querySelectorAll('.progress-step').forEach((stepEl, index) => {
    if (index < step) {
      stepEl.classList.add('active');
    } else {
      stepEl.classList.remove('active');
    }
  });
}

function selectPayment(method) {
  // Reset all selections
  document.querySelectorAll('.payment-option').forEach(option => {
    option.classList.remove('selected');
  });
  
  // Hide all forms
  document.querySelectorAll('.form-section').forEach(form => {
    form.style.display = 'none';
  });
  
  // Select clicked option
  event.currentTarget.classList.add('selected');
  
  // Show corresponding form
  if (method === 'paypal') {
    document.getElementById('paypalForm').style.display = 'block';
    updatePaymentProgress(2);
  } else if (method === 'card') {
    document.getElementById('cardForm').style.display = 'block';
    updatePaymentProgress(2);
  } else if (method === 'paysafe') {
    document.getElementById('paysafeForm').style.display = 'block';
    updatePaymentProgress(2);
  } else if (method === 'crypto') {
    document.getElementById('cryptoForm').style.display = 'block';
    updatePaymentProgress(2);
    generateQRCode();
  }
}

function selectCrypto(currency) {
  // Update active tab
  document.querySelectorAll('.crypto-tab').forEach(tab => {
    tab.classList.remove('active');
  });
  event.target.classList.add('active');
  
  // Update address and amount based on currency
  const addresses = {
    btc: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
    eth: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
    usdt: 'TN3W4H6rK2ce4vG9H1VYxWQK3WJ4DxM'
  };
  
  const amounts = {
    btc: '0.0005 BTC',
    eth: '0.008 ETH',
    usdt: '25 USDT'
  };
  
  document.querySelector('.address-text input').value = addresses[currency];
  document.getElementById('cryptoAmount').textContent = amounts[currency];
  
  // Regenerate QR code
  generateQRCode(addresses[currency]);
}

function generateQRCode(text = '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa') {
  const canvas = document.getElementById('qrCode');
  const ctx = canvas.getContext('2d');
  canvas.width = 200;
  canvas.height = 200;
  
  // Simple QR code placeholder (in real implementation, use a QR code library)
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, 200, 200);
  ctx.fillStyle = '#000000';
  
  // Draw a simple pattern as QR code placeholder
  for (let i = 0; i < 20; i++) {
    for (let j = 0; j < 20; j++) {
      if (Math.random() > 0.5) {
        ctx.fillRect(i * 10, j * 10, 10, 10);
      }
    }
  }
}

function copyAddress() {
  const addressInput = document.querySelector('.address-text input');
  addressInput.select();
  document.execCommand('copy');
  
  // Show feedback
  const copyBtn = document.querySelector('.copy-btn');
  const originalHTML = copyBtn.innerHTML;
  copyBtn.innerHTML = '<i class="fas fa-check"></i>';
  copyBtn.style.background = '#28a745';
  
  setTimeout(() => {
    copyBtn.innerHTML = originalHTML;
    copyBtn.style.background = '';
  }, 2000);
}

function openDiscordPayment() {
  window.open('https://discord.gg/tenASXNq78', '_blank');
}

function showDiscordMessage() {
  showNotification('Not currently available', 'Please join our Discord server for payment options');
}

function showNotification(title, message) {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.innerHTML = `
    <div class="notification-icon">
      <i class="fas fa-info-circle"></i>
    </div>
    <div class="notification-content">
      <div class="notification-title">${title}</div>
      <div class="notification-message">${message}</div>
    </div>
    <button class="notification-close" onclick="this.parentElement.remove()">
      <i class="fas fa-times"></i>
    </button>
  `;
  
  // Add to page
  document.body.appendChild(notification);
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.remove();
    }
  }, 5000);
}

function processPayment(event) {
  event.preventDefault();
  
  const selectedPayment = document.querySelector('.payment-option.selected');
  if (!selectedPayment) {
    alert('Please select a payment method');
    return;
  }
  
  const method = selectedPayment.onclick.toString().match(/'([^']+)'/)[1];
  
  // Validate based on payment method
  let isValid = true;
  const paymentData = {
    product: selectedProduct,
    price: selectedPrice,
    period: selectedPeriod,
    method: method
  };
  
  if (method === 'paypal') {
    const email = document.querySelector('#paypalForm input[type="email"]').value;
    if (!email || !email.includes('@')) {
      alert('Please enter a valid PayPal email address');
      isValid = false;
    } else {
      paymentData.email = email;
      showPaymentProcessing();
      
      setTimeout(() => {
        const paypalForm = document.querySelector('#paypalPaymentForm');
        paypalForm.submit();
      }, 2000);
    }
  } else if (method === 'card') {
    const cardNumber = document.querySelector('#cardForm input[name="cardNumber"]').value;
    const expiry = document.querySelector('#cardForm input[name="expiry"]').value;
    const cvv = document.querySelector('#cardForm input[name="cvv"]').value;
    const cardholder = document.querySelector('#cardForm input[name="cardholder"]').value;
    
    if (!cardNumber || !expiry || !cvv || !cardholder) {
      alert('Please fill in all card details');
      isValid = false;
    } else {
      paymentData.cardDetails = { last4: cardNumber.slice(-4) };
      showPaymentProcessing();
      
      setTimeout(() => {
        completePayment(paymentData);
      }, 3000);
    }
  } else if (method === 'paysafe') {
    const pin = document.querySelector('#paysafeForm input[name="paysafePin"]').value;
    const pinConfirm = document.querySelector('#paysafeForm input[name="paysafePinConfirm"]').value;
    
    if (!pin || !pinConfirm) {
      alert('Please enter your Paysafecard PIN');
      isValid = false;
    } else if (pin !== pinConfirm) {
      alert('PIN codes do not match');
      isValid = false;
    } else if (pin.length !== 16) {
      alert('Paysafecard PIN must be 16 digits');
      isValid = false;
    } else {
      paymentData.paysafePin = pin.slice(-4) + '****';
      showPaymentProcessing();
      
      setTimeout(() => {
        completePayment(paymentData);
      }, 2500);
    }
  } else if (method === 'crypto') {
    showPaymentProcessing();
    
    // Simulate crypto payment monitoring
    setTimeout(() => {
      completePayment(paymentData);
    }, 5000);
  }
  
  if (!isValid) {
    return;
  }
}

function showPaymentProcessing() {
  updatePaymentProgress(3);
  
  // Show processing state
  const forms = document.querySelectorAll('.form-section');
  forms.forEach(form => {
    if (form.style.display !== 'none') {
      const buttons = form.querySelectorAll('button');
      buttons.forEach(btn => {
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
      });
    }
  });
}

function completePayment(paymentData) {
  // Show success message
  const successHTML = `
    <div class="payment-success">
      <div class="success-icon">
        <i class="fas fa-check-circle"></i>
      </div>
      <h3>Payment Successful!</h3>
      <p>Your ${paymentData.product} (${paymentData.period}) license key has been sent to your email.</p>
      <div class="success-details">
        <div class="detail-item">
          <span>Transaction ID:</span>
          <strong>#${Math.random().toString(36).substr(2, 9).toUpperCase()}</strong>
        </div>
        <div class="detail-item">
          <span>Amount:</span>
          <strong>${paymentData.price}</strong>
        </div>
      </div>
      <button class="btn-primary btn-full" onclick="closePaymentModal()">
        <i class="fas fa-check"></i>
        Complete
      </button>
    </div>
  `;
  
  const modalBody = document.querySelector('.modal-body');
  modalBody.innerHTML = successHTML;
  
  // Add success animation
  setTimeout(() => {
    document.querySelector('.payment-success').classList.add('show');
  }, 100);
}

// ===== PERFORMANCE OPTIMIZATIONS =====
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// ===== LOADING SCREEN =====
function hideLoadingScreen() {
  const loadingScreen = document.getElementById('loadingScreen');
  if (loadingScreen) {
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
    }, 1000);
  }
}

// ===== PAGE TRANSITIONS =====
function showPageTransition() {
  const transition = document.getElementById('pageTransition');
  if (transition) {
    transition.classList.add('active');
    setTimeout(() => {
      transition.classList.remove('active');
    }, 600);
  }
}

// ===== ENHANCED ANIMATIONS =====
function initEnhancedAnimations() {
  // Animate section titles on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const titleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.section-title').forEach(title => {
    titleObserver.observe(title);
  });

  // Add ripple effect to buttons
  document.querySelectorAll('.btn-primary, .btn-ghost').forEach(button => {
    button.classList.add('interactive-element');
  });
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
  // Hide loading screen after page load
  hideLoadingScreen();
  
  createParticles();
  initFAQ();
  initAOS();
  initHeroCards();
  animateStats();
  initParallax();
  initPriceOptions();
  initEnhancedAnimations();
  
  // Add form submit listeners
  const paypalForm = document.querySelector('#paypalPaymentForm');
  if (paypalForm) {
    paypalForm.addEventListener('submit', processPayment);
  }
  
  const cardForm = document.querySelector('#cardPaymentForm');
  if (cardForm) {
    cardForm.addEventListener('submit', processPayment);
  }
  
  const paysafeForm = document.querySelector('#paysafePaymentForm');
  if (paysafeForm) {
    paysafeForm.addEventListener('submit', processPayment);
  }
  
  // Add input formatting and modal listeners
  setupInputFormatting();
  setupModalListeners();
});

// ===== MODAL EVENT LISTENERS =====
function setupModalListeners() {
  // Close modal on backdrop click
  const modalBackdrop = document.querySelector('.modal-backdrop');
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', closePaymentModal);
  }
  
  // Close modal on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closePaymentModal();
    }
  });

  // Page transitions for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        showPageTransition();
        setTimeout(() => {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }, 300);
      }
    });
  });
}

// ===== LAZY LOADING =====
const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src || img.src;
      img.classList.add('loaded');
      observer.unobserve(img);
    }
  });
});

document.querySelectorAll('img[loading="lazy"]').forEach(img => {
  imageObserver.observe(img);
});