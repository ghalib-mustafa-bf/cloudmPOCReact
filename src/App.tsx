import React, { useState, useEffect } from 'react';
import { HelpCircle, ChevronRight, ShoppingCart } from 'lucide-react';
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

  const addToQuote = (product: Product) => {
    setCart(prev => [...prev, {
      product,
      quantity: 100,
      timestamp: new Date()
    }]);
    alert(`${product.name} added to quote!`);
  };

  const showPricing = (product: Product) => {
    const tiers = product.pricingTiers;
    alert(
      `Pricing for ${product.name}:\n\n` +
      tiers.map(tier => 
        `${tier.min}${tier.max === Infinity ? '+' : `-${tier.max}`} users: $${tier.price}/user/month`
      ).join('\n') +
      '\n\nContact sales for custom enterprise pricing.'
    );
  };

  const generateQuote = () => {
    alert(
      'Quote Generation (Salesforce Revenue Cloud Integration):\n\n' +
      '✓ Creating quote in Revenue Cloud\n' +
      '✓ Applying volume discounts\n' +
      '✓ Calculating taxes and fees\n' +
      '✓ Generating PDF document\n' +
      '✓ Sending to your email\n\n' +
      'Quote #Q-2024-1234 has been created!'
    );
  };

  const viewCart = () => {
    const cartSummary = cart.map(item => 
      `• ${item.product.name} (${item.quantity} users)`
    ).join('\n');
    
    alert(
      'Your Quote Summary:\n\n' + 
      cartSummary +
      '\n\nTotal Items: ' + cart.length +
      '\n\nClick "Convert to Order" to proceed with purchase.'
    );
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        <nav className="nav">
          <div className="nav-left">
            <div className="logo">
              <svg width="120" height="40" viewBox="0 0 120 40">
                <text x="0" y="30" fontFamily="Arial" fontSize="28" fontWeight="bold" fill="#1a1f3a">
                  cloudm
                </text>
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
                    <stop offset="100%" style={{ stopColor: '#ff6b35', stopOpacity: 0.8 }} />
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
                  <circle cx="350" cy="100" r="25" fill="#ff6b35" opacity="0.6">
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
                <line x1="325" y1="125" x2="225" y2="225" stroke="#ff6b35" strokeWidth="2" opacity="0.3" strokeDasharray="5,5">
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
          onClick={viewCart}
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
    </div>
  );
}

export default App;