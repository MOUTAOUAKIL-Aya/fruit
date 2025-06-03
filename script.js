// Variables pour le menu mobile
const hamburger = document.getElementById('hamburger');
const mobileSidebar = document.getElementById('mobileSidebar');
const closeBtn = document.getElementById('closeBtn');

// Créer et ajouter l'overlay
const overlay = document.createElement('div');
overlay.className = 'sidebar-overlay';
overlay.id = 'sidebarOverlay';
document.body.appendChild(overlay);

// Fonction pour ouvrir le menu mobile
function openMobileMenu() {
    mobileSidebar.classList.add('active');
    hamburger.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Empêcher le scroll
}

// Fonction pour fermer le menu mobile
function closeMobileMenu() {
    mobileSidebar.classList.remove('active');
    hamburger.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto'; // Réactiver le scroll
}

// Event listeners pour le menu hamburger
hamburger.addEventListener('click', () => {
    if (mobileSidebar.classList.contains('active')) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
});

// Event listener pour le bouton de fermeture
closeBtn.addEventListener('click', closeMobileMenu);

// Event listener pour l'overlay
overlay.addEventListener('click', closeMobileMenu);

// Fermer le menu quand on clique sur un lien
const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
sidebarLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

// Fermer le menu avec la touche Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileSidebar.classList.contains('active')) {
        closeMobileMenu();
    }
});

// Gestion des filtres de produits
const filterButtons = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Retirer la classe active de tous les boutons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Ajouter la classe active au bouton cliqué
        button.classList.add('active');
        
        // Animation de filtrage (simulation)
        productCards.forEach(card => {
            card.style.opacity = '0.5';
            setTimeout(() => {
                card.style.opacity = '1';
            }, 200);
        });
    });
});

// Gestion des catégories
const categoryCards = document.querySelectorAll('.category-card');

categoryCards.forEach(card => {
    card.addEventListener('click', () => {
        // Retirer la classe active de toutes les catégories
        categoryCards.forEach(c => c.classList.remove('active'));
        // Ajouter la classe active à la catégorie cliquée
        card.classList.add('active');
    });
});

// Gestion des boutons d'ajout au panier
const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

addToCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Animation d'ajout au panier
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i>';
        button.style.background = '#4caf50';
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.style.background = '#7cb342';
        }, 1000);
        
        // Simulation d'ajout au panier
        showNotification('Produit ajouté au panier !');
    });
});

// Gestion des boutons wishlist
const wishlistButtons = document.querySelectorAll('.wishlist-btn');

wishlistButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        
        const icon = button.querySelector('i');
        if (icon.classList.contains('far')) {
            icon.classList.remove('far');
            icon.classList.add('fas');
            button.style.color = '#ff4757';
            showNotification('Produit ajouté aux favoris !');
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
            button.style.color = '#999';
            showNotification('Produit retiré des favoris !');
        }
    });
});

// Fonction pour afficher les notifications
function showNotification(message) {
    // Créer l'élément notification s'il n'existe pas
    let notification = document.getElementById('notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'notification';
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: #4caf50;
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            font-weight: 500;
        `;
        document.body.appendChild(notification);
    }
    
    notification.textContent = message;
    notification.style.transform = 'translateX(0)';
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
    }, 3000);
}

// Gestion du formulaire de newsletter
const newsletterForm = document.querySelector('.newsletter-form');
const emailInput = newsletterForm.querySelector('input[type="email"]');
const subscribeBtn = newsletterForm.querySelector('.subscribe-btn');

subscribeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    const email = emailInput.value.trim();
    
    if (!email) {
        showNotification('Veuillez entrer votre email !');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Veuillez entrer un email valide !');
        return;
    }
    
    // Simulation d'inscription
    const originalText = subscribeBtn.textContent;
    subscribeBtn.textContent = 'EN COURS...';
    subscribeBtn.disabled = true;
    
    setTimeout(() => {
        subscribeBtn.textContent = originalText;
        subscribeBtn.disabled = false;
        emailInput.value = '';
        showNotification('Inscription réussie !');
    }, 2000);
});

// Fonction de validation d'email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Gestion des flèches de navigation des catégories
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const categoriesGrid = document.querySelector('.categories-grid');

if (prevBtn && nextBtn && categoriesGrid) {
    let currentIndex = 0;
    const categories = document.querySelectorAll('.category-card');
    const categoriesToShow = window.innerWidth <= 768 ? 2 : 5;
    
    function updateCategoriesDisplay() {
        const translateX = -(currentIndex * (100 / categoriesToShow));
        categoriesGrid.style.transform = `translateX(${translateX}%)`;
    }
    
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCategoriesDisplay();
        }
    });
    
    nextBtn.addEventListener('click', () => {
        if (currentIndex < categories.length - categoriesToShow) {
            currentIndex++;
            updateCategoriesDisplay();
        }
    });
}

// Gestion du bouton "Show More"
const showMoreBtn = document.querySelector('.show-more-btn');

if (showMoreBtn) {
    showMoreBtn.addEventListener('click', () => {
        // Animation de chargement
        const originalText = showMoreBtn.textContent;
        showMoreBtn.textContent = 'Chargement...';
        showMoreBtn.disabled = true;
        
        setTimeout(() => {
            showMoreBtn.textContent = originalText;
            showMoreBtn.disabled = false;
            showNotification('Plus de produits chargés !');
        }, 1500);
    });
}

// Smooth scroll pour les liens d'ancrage
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

// Animation au scroll pour les éléments
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observer les éléments à animer
const animateElements = document.querySelectorAll('.product-card, .feature, .category-card');
animateElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

// Gestion responsive du menu
function handleResize() {
    if (window.innerWidth > 768) {
        closeMobileMenu();
    }
}

window.addEventListener('resize', handleResize);

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    // Animation d'entrée pour le hero
    const heroText = document.querySelector('.hero-text');
    const heroImage = document.querySelector('.hero-image');
    
    if (heroText && heroImage) {
        heroText.style.opacity = '0';
        heroText.style.transform = 'translateX(-50px)';
        heroImage.style.opacity = '0';
        heroImage.style.transform = 'translateX(50px)';
        
        setTimeout(() => {
            heroText.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            heroImage.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            heroText.style.opacity = '1';
            heroText.style.transform = 'translateX(0)';
            heroImage.style.opacity = '1';
            heroImage.style.transform = 'translateX(0)';
        }, 300);
    }
    
    console.log('Green Grocer website loaded successfully!');
});

// Gestion des erreurs d'images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.style.display = 'none';
        
        // Créer un placeholder
        const placeholder = document.createElement('div');
        placeholder.style.cssText = `
            width: ${this.style.width || '100px'};
            height: ${this.style.height || '100px'};
            background: #f0f0f0;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #999;
            font-size: 12px;
            border-radius: 5px;
        `;
        placeholder.textContent = 'Image';
        
        this.parentNode.insertBefore(placeholder, this);
    });
});

// Performance: Lazy loading pour les images (si supporté)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}