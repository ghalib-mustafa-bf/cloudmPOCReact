import React, { useState, useEffect } from 'react';
import { HelpCircle, ChevronRight, ShoppingCart, X, Check, Trash2 } from 'lucide-react';
import './App.css';

// Types
interface PricingTier {
  min: number;
  max: number;
  price: number;
}

interface Product {
  id: string;
  name: string;
  description: string;
  icon: string;
  basePrice: string;
  discountBadge: string;
  pricingTiers: PricingTier[];
}

interface CartItem {
  product: Product;
  quantity: number;
  timestamp: Date;
}

// Products Data
const productsData: Product[] = [
  {
    id: 'migrate-microsoft',
    name: 'CloudM Migrate for Microsoft',
    description: 'Migrate your email, contacts, calendars and files to Microsoft 365 from over 20 source platforms, including Google Workspace.',
    icon: '📊',
    basePrice: '24.99',
    discountBadge: 'Save 30% on 500+ users',
    pricingTiers: [
      { min: 1, max: 99, price: 35 },
      { min: 100, max: 499, price: 25 },
      { min: 500, max: 999, price: 20 },
      { min: 1000, max: Infinity, price: 15 }
    ]
  },
  {
    id: 'migrate-google',
    name: 'CloudM Migrate for Google',
    description: 'Migrate your email, contacts, calendars and files to Google Workspace. Perfect for Microsoft 365 or legacy platform migrations.',
    icon: '🔄',
    basePrice: '24.99',
    discountBadge: 'Volume discounts available',
    pricingTiers: [
      { min: 1, max: 99, price: 35 },
      { min: 100, max: 499, price: 25 },
      { min: 500, max: 999, price: 20 },
      { min: 1000, max: Infinity, price: 15 }
    ]
  },
  {
    id: 'backup',
    name: 'CloudM Backup',
    description: 'Protect your organization\'s Google Workspace data from accidental deletion, malicious users and cyber attacks.',
    icon: '🛡️',
    basePrice: '9.99',
    discountBadge: 'Enterprise pricing available',
    pricingTiers: [
      { min: 1, max: 99, price: 15 },
      { min: 100, max: 499, price: 10 },
      { min: 500, max: Infinity, price: 8 }
    ]
  },
  {
    id: 'archive',
    name: 'CloudM Archive',
    description: 'Reduce the cost of license renewals and control your future spend with CloudM Archive. Automate license reassignment.',
    icon: '🗄️',
    basePrice: '19.99',
    discountBadge: 'Bulk pricing available',
    pricingTiers: [
      { min: 1, max: 99, price: 25 },
      { min: 100, max: 499, price: 20 },
      { min: 500, max: Infinity, price: 15 }
    ]
  },
  {
    id: 'automate',
    name: 'CloudM Automate',
    description: 'Save time and money by automating your core business processes with bespoke workflows and dynamic user groups.',
    icon: '⚙️',
    basePrice: '14.99',
    discountBadge: 'Custom pricing available',
    pricingTiers: [
      { min: 1, max: 99, price: 20 },
      { min: 100, max: 499, price: 15 },
      { min: 500, max: Infinity, price: 12 }
    ]
  },
  {
    id: 'signatures',
    name: 'CloudM Signatures',
    description: 'Ensure your email signatures are up to date and consistent across the whole organization with dynamic assignment.',
    icon: '✉️',
    basePrice: '4.99',
    discountBadge: 'Free trial available',
    pricingTiers: [
      { min: 1, max: 99, price: 7 },
      { min: 100, max: 499, price: 5 },
      { min: 500, max: Infinity, price: 4 }
    ]
  }
];

function App() {
  // State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [userCount, setUserCount] = useState(100);
  const [totalPrice, setTotalPrice] = useState(0);
  const [discountInfo, setDiscountInfo] = useState('');
  
  // Modal states
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Notification state
  const [notification, setNotification] = useState<{ show: boolean; message: string }>({ show: false, message: '' });

  // Calculate price when user count changes
  useEffect(() => {
    calculatePrice();
  }, [userCount]);

  const calculatePrice = () => {
    const tiers = productsData[0].pricingTiers; // Using Migrate for Microsoft as example
    const tier = tiers.find(t => userCount >= t.min && userCount <= t.max);
    const pricePerUser = tier ? tier.price : tiers[0].price;
    const total = userCount * pricePerUser;
    
    const basePrice = userCount * tiers[0].price;
    const discount = basePrice - total;
    const discountPercent = Math.round((discount / basePrice) * 100);
    
    setTotalPrice(total);
    
    if (discountPercent > 0) {
      setDiscountInfo(
        `${discountPercent}% volume discount applied (saving $${discount.toLocaleString()})`
      );
    } else {
      setDiscountInfo('Standard pricing applied');
    }
  };

  const showNotification = (message: string) => {
    setNotification({ show: true, message });
    setTimeout(() => {
      setNotification({ show: false, message: '' });
    }, 3000);
  };

  const addToQuote = (product: Product) => {
    setCart(prev => [...prev, {
      product,
      quantity: 100,
      timestamp: new Date()
    }]);
    showNotification(`${product.name} added to quote!`);
  };

  const removeFromCart = (index: number) => {
    setCart(prev => prev.filter((_, i) => i !== index));
    showNotification('Item removed from quote');
  };

  const updateQuantity = (index: number, newQuantity: number) => {
    if (newQuantity > 0) {
      setCart(prev => prev.map((item, i) => 
        i === index ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const showPricing = (product: Product) => {
    setSelectedProduct(product);
    setShowPricingModal(true);
  };

  const generateQuote = () => {
    setShowQuoteModal(true);
  };

  const calculateCartTotal = () => {
    return cart.reduce((total, item) => {
      const tier = item.product.pricingTiers.find(t => 
        item.quantity >= t.min && item.quantity <= t.max
      );
      const price = tier ? tier.price : item.product.pricingTiers[0].price;
      return total + (price * item.quantity);
    }, 0);
  };

  return (
    <div className="app-container">
      {/* Notification Toast */}
      <div className={`notification ${notification.show ? 'show' : ''}`}>
        <Check size={20} />
        <span>{notification.message}</span>
      </div>

      {/* Header */}
      <header className="header">
        <nav className="nav">
          <div className="nav-left">
            <div className="logo">
              <svg xmlns="http://www.w3.org/2000/svg" width="150" height="35.616" viewBox="0 0 150 35.616">
                <path d="M510.314,57.144a9.227,9.227,0,0,1,.806-3.984,8.025,8.025,0,0,1,2.205-2.846,9.786,9.786,0,0,1,3.3-1.731,13.77,13.77,0,0,1,4.126-.593,12.249,12.249,0,0,1,5.264,1.091,8.726,8.726,0,0,1,3.7,3.225,8.783,8.783,0,0,1,3.652-3.225,11.819,11.819,0,0,1,5.169-1.091,14.135,14.135,0,0,1,4.078.569,9.229,9.229,0,0,1,3.272,1.707,8.164,8.164,0,0,1,2.181,2.846,9.237,9.237,0,0,1,.806,3.984V72.462h-5.406V58.946q0-3.272-1.47-4.671a5.542,5.542,0,0,0-3.983-1.4,5.639,5.639,0,0,0-4.055,1.565q-1.636,1.565-1.636,5.074V72.462h-5.406V59.515q0-3.509-1.636-5.074a6.157,6.157,0,0,0-8.039-.142q-1.518,1.423-1.518,4.695V72.462h-5.406Z" transform="translate(-398.87 -37.51)" fill="#f06742"/>
                <path d="M106.884,2.513a2.3,2.3,0,0,1,.759-1.9A3.3,3.3,0,0,1,109.777,0a5.426,5.426,0,0,1,1.565.214q.711.213.948.308v34.43h-5.406Z" transform="translate(-83.542 0.001)" fill="#0e1c43"/>
                <path d="M152.541,47.992a13.857,13.857,0,0,1,5.146.948,12.674,12.674,0,0,1,4.149,2.632,12.155,12.155,0,0,1,2.751,3.984,12.944,12.944,0,0,1,0,9.959,12.139,12.139,0,0,1-2.751,3.984,12.961,12.961,0,0,1-4.149,2.656,14.1,14.1,0,0,1-10.291,0,12.941,12.941,0,0,1-4.149-2.656,12.125,12.125,0,0,1-2.751-3.984,12.944,12.944,0,0,1,0-9.959,12.142,12.142,0,0,1,2.751-3.984A12.655,12.655,0,0,1,147.4,48.94a13.851,13.851,0,0,1,5.146-.948m0,20.345a7.462,7.462,0,0,0,2.988-.593,6.744,6.744,0,0,0,2.347-1.66,7.873,7.873,0,0,0,1.518-2.466,8.356,8.356,0,0,0,.546-3.059,8.744,8.744,0,0,0-.546-3.106,7.487,7.487,0,0,0-1.518-2.49,6.914,6.914,0,0,0-2.347-1.636,7.887,7.887,0,0,0-6,0,6.962,6.962,0,0,0-2.324,1.636,7.462,7.462,0,0,0-1.518,2.49,8.73,8.73,0,0,0-.546,3.106,8.344,8.344,0,0,0,.546,3.059,7.845,7.845,0,0,0,1.518,2.466,6.789,6.789,0,0,0,2.324,1.66,7.41,7.41,0,0,0,3.012.593" transform="translate(-109.035 -37.511)" fill="#0e1c43"/>
                <path d="M400.879,2.513a2.335,2.335,0,0,1,.735-1.9A3.2,3.2,0,0,1,403.724,0a5.424,5.424,0,0,1,1.565.214q.712.213.949.308V21.909a16.957,16.957,0,0,1-.972,6.023,11.919,11.919,0,0,1-2.68,4.268,10.985,10.985,0,0,1-4.031,2.561,14.613,14.613,0,0,1-5.074.854,13.615,13.615,0,0,1-5.146-.948,12.411,12.411,0,0,1-4.055-2.608,11.86,11.86,0,0,1-2.679-3.984,12.886,12.886,0,0,1-.972-5.027A13.424,13.424,0,0,1,381.554,18a12.157,12.157,0,0,1,2.561-3.984,11.5,11.5,0,0,1,3.841-2.608,12.322,12.322,0,0,1,4.813-.925,10.486,10.486,0,0,1,4.837,1.067,9.629,9.629,0,0,1,3.272,2.585Zm.095,20.535a8.519,8.519,0,0,0-.553-3.072,7.843,7.843,0,0,0-1.513-2.5,6.815,6.815,0,0,0-2.33-1.656,7.871,7.871,0,0,0-6.029,0,7.293,7.293,0,0,0-2.33,1.632,7.043,7.043,0,0,0-1.513,2.472,8.984,8.984,0,0,0-.528,3.12,8.778,8.778,0,0,0,.528,3.1,7.078,7.078,0,0,0,1.513,2.449,7.19,7.19,0,0,0,5.356,2.232,7.669,7.669,0,0,0,3-.576,6.842,6.842,0,0,0,2.33-1.584,7.279,7.279,0,0,0,1.513-2.448,8.791,8.791,0,0,0,.553-3.169" transform="translate(-297.506 0.001)" fill="#0e1c43"/>
                <path d="M21.625,70.755a11.9,11.9,0,0,1-1.4.782,15.749,15.749,0,0,1-1.9.759,17.019,17.019,0,0,1-2.419.593,17.832,17.832,0,0,1-3.059.237,15.089,15.089,0,0,1-4.98-.806,11.72,11.72,0,0,1-4.079-2.395,11.341,11.341,0,0,1-2.774-3.913A13.219,13.219,0,0,1,0,60.654a13.857,13.857,0,0,1,1-5.406,11.228,11.228,0,0,1,2.75-3.984A11.73,11.73,0,0,1,7.9,48.822a15.62,15.62,0,0,1,5.146-.83,17.81,17.81,0,0,1,3.96.379,10.288,10.288,0,0,1,2.656.948,3.987,3.987,0,0,1,1.47,1.281,2.643,2.643,0,0,1,.451,1.423,2.762,2.762,0,0,1-.64,1.755,6.878,6.878,0,0,1-1.209,1.233,9.136,9.136,0,0,0-2.466-1.541,9.594,9.594,0,0,0-3.984-.735,9.335,9.335,0,0,0-3.012.474,6.466,6.466,0,0,0-2.419,1.447,6.9,6.9,0,0,0-1.612,2.419,9.034,9.034,0,0,0-.593,3.438,9.184,9.184,0,0,0,.616,3.557,6.436,6.436,0,0,0,1.707,2.419,7,7,0,0,0,2.514,1.4,10.139,10.139,0,0,0,3.082.451,9.55,9.55,0,0,0,3.818-.64,17.229,17.229,0,0,0,1.968-.972Z" transform="translate(0 -37.511)" fill="#0e1c43"/>
                <path d="M266.8,53.545a2.289,2.289,0,0,1,.759-1.921,3.393,3.393,0,0,1,2.134-.593,5.425,5.425,0,0,1,1.565.213q.712.213.948.308V64.026a7.1,7.1,0,0,0,1.518,4.908,6.962,6.962,0,0,0,9.3,0,7.1,7.1,0,0,0,1.518-4.908V53.545a2.289,2.289,0,0,1,.759-1.921,3.309,3.309,0,0,1,2.087-.593,5.608,5.608,0,0,1,1.612.213q.711.213.949.308V65.212a10.843,10.843,0,0,1-.83,4.339,8.869,8.869,0,0,1-2.371,3.248,10.469,10.469,0,0,1-3.675,2.016,16.371,16.371,0,0,1-9.39,0,10.216,10.216,0,0,1-3.652-2.016,9.229,9.229,0,0,1-2.371-3.248,10.575,10.575,0,0,1-.854-4.339Z" transform="translate(-208.532 -39.887)" fill="#0e1c43"/>
              </svg>
            </div>
            
            <ul className="nav-links">
              <li><a href="#products">Products</a></li>
              <li><a href="#solutions">Solutions</a></li>
              <li><a href="#resources">Resources</a></li>
              <li><a href="#partners">Partners</a></li>
              <li><a href="#services">Services</a></li>
            </ul>
          </div>
          
          <div className="nav-right">
            <a href="#support" className="support-link">
              Support
              <HelpCircle size={16} />
            </a>
            <span className="partners-text">Partners</span>
            <a href="#demo" className="book-demo-btn">
              Book a demo
              <ChevronRight size={16} />
            </a>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-gradient" />
        
        <div className="hero-content">
          <div className="hero-left">
            <h1>Cloud migration software and Google Workspace solutions for Google Workspace and Microsoft 365</h1>
            <p>
              CloudM empowers IT teams to <strong>migrate, archive and backup</strong> data 
              through frictionless, secure and automated products. Making migrations easy, improving 
              data compliance and reducing costs.
            </p>
            <a href="#get-started" className="get-started-btn">
              Get Started <ChevronRight size={16} className="inline" />
            </a>
            
            <div className="partner-badges">
              <div className="partner-badge">
                <svg width="20" height="20" viewBox="0 0 20 20">
                  <rect width="20" height="20" fill="#00BCF2"/>
                  <rect x="0" y="0" width="10" height="10" fill="#F25022"/>
                  <rect x="10" y="0" width="10" height="10" fill="#7FBA00"/>
                  <rect x="0" y="10" width="10" height="10" fill="#00A4EF"/>
                  <rect x="10" y="10" width="10" height="10" fill="#FFB900"/>
                </svg>
                <span>Microsoft Partner</span>
              </div>
              <div className="partner-badge">
                <svg width="20" height="20" viewBox="0 0 20 20">
                  <circle cx="10" cy="10" r="10" fill="#4285F4"/>
                  <path d="M10 5 L15 10 L10 15 L5 10 Z" fill="white"/>
                </svg>
                <span>Google Cloud Partner</span>
              </div>
            </div>
          </div>
          
          <div className="hero-right">
            <div className="hero-graphic">
              <svg width="450" height="450" viewBox="0 0 450 450">
                <defs>
                  <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#4285f4', stopOpacity: 0.8 }} />
                    <stop offset="100%" style={{ stopColor: '#f06742', stopOpacity: 0.8 }} />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                
                <g transform="translate(225, 225)">
                  <circle r="80" fill="url(#grad1)" opacity="0.2"/>
                  <circle r="60" fill="url(#grad1)" opacity="0.3"/>
                  <circle r="40" fill="url(#grad1)" opacity="0.5"/>
                  
                  <path d="M -30 5 Q -30 -10 -15 -10 Q -15 -20 0 -20 Q 15 -20 15 -10 Q 30 -10 30 5 Q 30 15 15 15 L -15 15 Q -30 15 -30 5" 
                        fill="white" filter="url(#glow)"/>
                </g>
                
                <g>
                  <circle cx="100" cy="100" r="25" fill="#4285f4" opacity="0.6">
                    <animate attributeName="cy" values="100;120;100" dur="3s" repeatCount="indefinite"/>
                  </circle>
                  <text x="100" y="105" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold">G</text>
                </g>
                
                <g>
                  <circle cx="350" cy="100" r="25" fill="#f06742" opacity="0.6">
                    <animate attributeName="cy" values="100;80;100" dur="3.5s" repeatCount="indefinite"/>
                  </circle>
                  <text x="350" y="105" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold">M</text>
                </g>
                
                <g>
                  <circle cx="100" cy="350" r="25" fill="#34a853" opacity="0.6">
                    <animate attributeName="cx" values="100;120;100" dur="4s" repeatCount="indefinite"/>
                  </circle>
                  <text x="100" y="355" textAnchor="middle" fill="white" fontSize="16">📁</text>
                </g>
                
                <g>
                  <circle cx="350" cy="350" r="25" fill="#fbbc04" opacity="0.6">
                    <animate attributeName="cx" values="350;330;350" dur="3.2s" repeatCount="indefinite"/>
                  </circle>
                  <text x="350" y="355" textAnchor="middle" fill="white" fontSize="16">📧</text>
                </g>
                
                <line x1="125" y1="125" x2="225" y2="225" stroke="#4285f4" strokeWidth="2" opacity="0.3" strokeDasharray="5,5">
                  <animate attributeName="stroke-dashoffset" values="0;10" dur="1s" repeatCount="indefinite"/>
                </line>
                <line x1="325" y1="125" x2="225" y2="225" stroke="#f06742" strokeWidth="2" opacity="0.3" strokeDasharray="5,5">
                  <animate attributeName="stroke-dashoffset" values="0;10" dur="1.2s" repeatCount="indefinite"/>
                </line>
                <line x1="125" y1="325" x2="225" y2="225" stroke="#34a853" strokeWidth="2" opacity="0.3" strokeDasharray="5,5">
                  <animate attributeName="stroke-dashoffset" values="0;10" dur="1.4s" repeatCount="indefinite"/>
                </line>
                <line x1="325" y1="325" x2="225" y2="225" stroke="#fbbc04" strokeWidth="2" opacity="0.3" strokeDasharray="5,5">
                  <animate attributeName="stroke-dashoffset" values="0;10" dur="1.6s" repeatCount="indefinite"/>
                </line>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* E-commerce Banner */}
      <section className="ecommerce-banner">
        <span className="new-badge">NEW</span>
        <h2>Direct Purchase Now Available</h2>
        <p>Buy CloudM solutions online with transparent pricing, instant quotes, and volume discounts</p>
      </section>

      {/* Products Section */}
      <section className="products" id="products">
        <div className="section-header">
          <h2>Our Products</h2>
          <p>Choose the right CloudM solution for your needs</p>
        </div>
        
        <div className="rating">
          Our Customers Say ★★★★★
        </div>
        
        <div className="product-grid">
          {productsData.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-icon">
                {product.icon}
              </div>
              
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              
              <div className="card-pricing">
                <div className="price-display">${product.basePrice}</div>
                <div className="price-period">per user / month</div>
                <div className="discount-badge">
                  {product.discountBadge}
                </div>
              </div>
              
              <a href="#" className="find-out-more">
                Find out more <ChevronRight size={16} className="inline" />
              </a>
              
              <div className="ecommerce-actions">
                <button 
                  onClick={() => addToQuote(product)}
                  className="btn-buy"
                >
                  Add to Quote
                </button>
                <button 
                  onClick={() => showPricing(product)}
                  className="btn-pricing"
                >
                  Pricing
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Section */}
      <section className="trust-section">
        <h2 className="trust-text">Trusted by over 50,000 global customers</h2>
        <div className="partner-logos">
          {['Uber', 'Booking.com', 'NETFLIX', 'Spotify'].map((partner) => (
            <svg key={partner} viewBox="0 0 100 30" className="partner-logo">
              <text x="0" y="20" fontFamily="Arial" fontSize="20" fill="white">
                {partner}
              </text>
            </svg>
          ))}
        </div>
      </section>

      {/* Pricing Calculator */}
      <section className="pricing-section">
        <div className="section-header">
          <h2>Real-Time Pricing Calculator</h2>
          <p>Powered by Salesforce Revenue Cloud</p>
        </div>
        
        <div className="calculator-container">
          <h3>Calculate Your CloudM Investment</h3>
          
          <div className="quantity-selector">
            <label htmlFor="userCount">Number of Users:</label>
            <input
              type="number"
              id="userCount"
              className="quantity-input"
              value={userCount}
              onChange={(e) => setUserCount(parseInt(e.target.value) || 0)}
              min="1"
            />
          </div>
          
          <div className="calc-price-display">
            <div className="calc-total-price">
              ${totalPrice.toLocaleString()}
            </div>
            <div className="calc-discount-info">{discountInfo}</div>
          </div>
          
          <button
            onClick={generateQuote}
            className="generate-quote-btn"
          >
            Generate Quote →
          </button>
        </div>
      </section>

      {/* Cart Preview */}
      {cart.length > 0 && (
        <div
          onClick={() => setShowCartModal(true)}
          className="cart-preview active"
        >
          <ShoppingCart size={20} />
          View Quote ({cart.length} items)
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 CloudM POC - Salesforce Revenue Cloud Integration Demo</p>
        <p style={{ marginTop: '10px', opacity: 0.6, fontSize: '14px' }}>
          This is a proof of concept demonstration
        </p>
      </footer>

      {/* Pricing Modal */}
      {showPricingModal && selectedProduct && (
        <div className="modal-overlay" onClick={() => setShowPricingModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Pricing for {selectedProduct.name}</h3>
              <button className="modal-close" onClick={() => setShowPricingModal(false)}>
                <X size={24} />
              </button>
            </div>
            <div className="modal-body">
              <div className="pricing-tiers">
                {selectedProduct.pricingTiers.map((tier, index) => (
                  <div key={index} className="pricing-tier">
                    <div className="tier-users">
                      {tier.min}{tier.max === Infinity ? '+' : `-${tier.max}`} users
                    </div>
                    <div className="tier-price">
                      ${tier.price}
                      <span>/user/month</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="pricing-note">
                <p>Contact sales for custom enterprise pricing and additional volume discounts.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cart Modal */}
      {showCartModal && (
        <div className="modal-overlay" onClick={() => setShowCartModal(false)}>
          <div className="modal-content cart-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Your Quote Summary</h3>
              <button className="modal-close" onClick={() => setShowCartModal(false)}>
                <X size={24} />
              </button>
            </div>
            <div className="modal-body">
              {cart.length === 0 ? (
                <p className="empty-cart">Your quote is empty</p>
              ) : (
                <>
                  <div className="cart-items">
                    {cart.map((item, index) => {
                      const tier = item.product.pricingTiers.find(t => 
                        item.quantity >= t.min && item.quantity <= t.max
                      );
                      const price = tier ? tier.price : item.product.pricingTiers[0].price;
                      const itemTotal = price * item.quantity;
                      
                      return (
                        <div key={index} className="cart-item">
                          <div className="cart-item-icon">{item.product.icon}</div>
                          <div className="cart-item-details">
                            <h4>{item.product.name}</h4>
                            <div className="cart-item-pricing">
                              ${price}/user × 
                              <input
                                type="number"
                                value={item.quantity}
                                onChange={(e) => updateQuantity(index, parseInt(e.target.value) || 0)}
                                className="quantity-inline-input"
                                min="1"
                              />
                              users = ${itemTotal.toLocaleString()}
                            </div>
                          </div>
                          <button 
                            className="remove-item"
                            onClick={() => removeFromCart(index)}
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                  <div className="cart-total">
                    <span>Total:</span>
                    <span className="total-amount">${calculateCartTotal().toLocaleString()}</span>
                  </div>
                  <div className="cart-actions">
                    <button className="btn-secondary" onClick={() => setShowCartModal(false)}>
                      Continue Shopping
                    </button>
                    <button className="btn-primary" onClick={() => {
                      setShowCartModal(false);
                      setShowQuoteModal(true);
                    }}>
                      Generate Quote
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Quote Generation Modal */}
      {showQuoteModal && (
        <div className="modal-overlay" onClick={() => setShowQuoteModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Quote Generation</h3>
              <button className="modal-close" onClick={() => setShowQuoteModal(false)}>
                <X size={24} />
              </button>
            </div>
            <div className="modal-body">
              <div className="quote-generation">
                <div className="quote-step completed">
                  <Check size={20} />
                  <span>Creating quote in Revenue Cloud</span>
                </div>
                <div className="quote-step completed">
                  <Check size={20} />
                  <span>Applying volume discounts</span>
                </div>
                <div className="quote-step completed">
                  <Check size={20} />
                  <span>Calculating taxes and fees</span>
                </div>
                <div className="quote-step completed">
                  <Check size={20} />
                  <span>Generating PDF document</span>
                </div>
                <div className="quote-step completed">
                  <Check size={20} />
                  <span>Sending to your email</span>
                </div>
              </div>
              <div className="quote-success">
                <h4>Quote #Q-2024-1234 has been created!</h4>
                <p>Check your email for the detailed quote document.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;