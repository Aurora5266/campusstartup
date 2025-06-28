// Campus Startup Marketplace Application
class CampusMarketplace {
  constructor() {
    this.currentSection = 'marketplace';
    this.walletBalance = 250.00;
    this.cart = [];
    this.transactions = [
      { id: 1, description: 'Initial Deposit', amount: 250.00, type: 'credit', date: '2024-06-25' },
      { id: 2, description: 'TechStart Mobile App', amount: -15.99, type: 'debit', date: '2024-06-24' },
      { id: 3, description: 'EcoPackage Delivery', amount: -8.50, type: 'debit', date: '2024-06-23' }
    ];
    
    this.startups = [
      {
        id: 1,
        name: 'TechStart Solutions',
        founder: 'Alex Chen',
        category: 'Technology',
        product: 'Campus Navigation App',
        price: 15.99,
        description: 'AI-powered campus navigation with real-time updates for classes, dining, and events.',
        badge: 'Featured',
        rating: 4.8,
        orders: 127
      },
      {
        id: 2,
        name: 'EcoPackage',
        founder: 'Maria Rodriguez',
        category: 'Sustainability',
        product: 'Sustainable Delivery Service',
        price: 8.50,
        description: 'Zero-waste delivery service using biodegradable packaging for campus food orders.',
        badge: 'Eco-Friendly',
        rating: 4.9,
        orders: 89
      },
      {
        id: 3,
        name: 'StudyBuddy',
        founder: 'Jordan Taylor',
        category: 'Education',
        product: 'Peer Tutoring Platform',
        price: 12.00,
        description: 'Connect with top students in your courses for personalized tutoring sessions.',
        badge: 'Popular',
        rating: 4.7,
        orders: 203
      },
      {
        id: 4,
        name: 'CampusEats',
        founder: 'Sam Patel',
        category: 'Food & Dining',
        product: 'Meal Planning Service',
        price: 25.99,
        description: 'Personalized meal plans with local restaurant partnerships and dietary preferences.',
        badge: 'New',
        rating: 4.6,
        orders: 45
      },
      {
        id: 5,
        name: 'FitCampus',
        founder: 'Riley Johnson',
        category: 'Health & Fitness',
        product: 'Campus Fitness Tracker',
        price: 9.99,
        description: 'Track your fitness goals with campus gym integration and student challenges.',
        badge: 'Trending',
        rating: 4.5,
        orders: 156
      },
      {
        id: 6,
        name: 'BookSwap',
        founder: 'Casey Kim',
        category: 'Education',
        product: 'Textbook Exchange Platform',
        price: 5.00,
        description: 'Buy, sell, and rent textbooks directly from fellow students at discounted prices.',
        badge: 'Community Choice',
        rating: 4.8,
        orders: 312
      }
    ];

    this.mentors = [
      {
        id: 1,
        name: 'Dr. Sarah Williams',
        title: 'Professor of Entrepreneurship',
        expertise: 'Business Strategy, Market Analysis',
        rating: 4.9,
        sessions: 45,
        available: true
      },
      {
        id: 2,
        name: 'Michael Chen',
        title: 'Tech Industry Veteran',
        expertise: 'Product Development, Scaling',
        rating: 4.8,
        sessions: 67,
        available: true
      },
      {
        id: 3,
        name: 'Lisa Thompson',
        title: 'Alumni Entrepreneur',
        expertise: 'Funding, Investment Strategy',
        rating: 4.7,
        sessions: 23,
        available: false
      }
    ];

    this.init();
  }

  init() {
    this.setupEventListeners();
    this.renderMarketplace();
    this.updateWalletDisplay();
  }

  setupEventListeners() {
    // Navigation
    document.addEventListener('click', (e) => {
      if (e.target.matches('.nav-link')) {
        e.preventDefault();
        const section = e.target.getAttribute('data-section');
        this.showSection(section);
      }
    });

    // Wallet modal
    document.addEventListener('click', (e) => {
      if (e.target.matches('.wallet-btn')) {
        this.showWalletModal();
      }
      if (e.target.matches('.close-btn') || e.target.matches('.modal')) {
        this.hideWalletModal();
      }
    });

    // Search and filters
    document.addEventListener('input', (e) => {
      if (e.target.matches('#searchInput')) {
        this.filterStartups();
      }
    });

    document.addEventListener('change', (e) => {
      if (e.target.matches('#categoryFilter')) {
        this.filterStartups();
      }
    });

    // Purchase buttons
    document.addEventListener('click', (e) => {
      if (e.target.matches('.purchase-btn')) {
        const startupId = parseInt(e.target.getAttribute('data-startup-id'));
        this.purchaseProduct(startupId);
      }
    });

    // Add funds button
    document.addEventListener('click', (e) => {
      if (e.target.matches('.add-funds-btn')) {
        this.addFunds();
      }
    });
  }

  showSection(sectionName) {
    // Update navigation
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
    });
    document.querySelector(`[data-section="${sectionName}"]`).classList.add('active');

    // Update content
    this.currentSection = sectionName;
    const content = document.getElementById('main-content');
    
    switch(sectionName) {
      case 'marketplace':
        this.renderMarketplace();
        break;
      case 'startups':
        this.renderStartupShowcase();
        break;
      case 'mentors':
        this.renderMentorConnect();
        break;
      case 'analytics':
        this.renderAnalytics();
        break;
      default:
        this.renderMarketplace();
    }
  }

  renderMarketplace() {
    const content = document.getElementById('main-content');
    content.innerHTML = `
      <div class="hero">
        <h1>Campus Startup Marketplace</h1>
        <p>Discover innovative products and services created by your fellow students</p>
        <div class="cta-buttons">
          <button class="btn btn-primary nav-link" data-section="startups">Browse Startups</button>
          <button class="btn btn-secondary nav-link" data-section="mentors">Find Mentors</button>
        </div>
      </div>

      <div class="stats">
        <div class="stat-card">
          <div class="stat-number">156</div>
          <div class="stat-label">Active Startups</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">2.3k</div>
          <div class="stat-label">Students Served</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">89%</div>
          <div class="stat-label">Satisfaction Rate</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">$12k</div>
          <div class="stat-label">Revenue Generated</div>
        </div>
      </div>

      <h2 style="margin-bottom: 2rem; text-align: center;">Featured Startups</h2>
      <div class="search-filters">
        <div class="form-group search-box">
          <input type="text" id="searchInput" placeholder="Search products and services...">
        </div>
        <div class="form-group">
          <select id="categoryFilter" class="filter-select">
            <option value="">All Categories</option>
            <option value="Technology">Technology</option>
            <option value="Education">Education</option>
            <option value="Food & Dining">Food & Dining</option>
            <option value="Health & Fitness">Health & Fitness</option>
            <option value="Sustainability">Sustainability</option>
          </select>
        </div>
      </div>

      <div class="grid" id="startupsGrid">
        ${this.renderStartupCards()}
      </div>
    `;
  }

  renderStartupShowcase() {
    const content = document.getElementById('main-content');
    content.innerHTML = `
      <div style="text-align: center; margin-bottom: 3rem;">
        <h1>Startup Showcase</h1>
        <p style="font-size: 1.125rem; color: var(--text-gray);">Explore innovative solutions created by student entrepreneurs</p>
      </div>

      <div class="search-filters">
        <div class="form-group search-box">
          <input type="text" id="searchInput" placeholder="Search startups...">
        </div>
        <div class="form-group">
          <select id="categoryFilter" class="filter-select">
            <option value="">All Categories</option>
            <option value="Technology">Technology</option>
            <option value="Education">Education</option>
            <option value="Food & Dining">Food & Dining</option>
            <option value="Health & Fitness">Health & Fitness</option>
            <option value="Sustainability">Sustainability</option>
          </select>
        </div>
      </div>

      <div class="grid" id="startupsGrid">
        ${this.renderStartupCards(true)}
      </div>
    `;
  }

  renderMentorConnect() {
    const content = document.getElementById('main-content');
    content.innerHTML = `
      <div style="text-align: center; margin-bottom: 3rem;">
        <h1>Mentor Connect</h1>
        <p style="font-size: 1.125rem; color: var(--text-gray);">Connect with experienced mentors to grow your startup</p>
      </div>

      <div class="grid">
        ${this.mentors.map(mentor => `
          <div class="card">
            <div class="startup-info">
              <div class="startup-avatar">${mentor.name.split(' ').map(n => n[0]).join('')}</div>
              <div>
                <h3>${mentor.name}</h3>
                <p style="margin: 0; color: var(--text-gray);">${mentor.title}</p>
              </div>
            </div>
            <p><strong>Expertise:</strong> ${mentor.expertise}</p>
            <p><strong>Rating:</strong> ⭐ ${mentor.rating} (${mentor.sessions} sessions)</p>
            <div class="card-footer">
              <span class="price">${mentor.available ? 'Available' : 'Busy'}</span>
              <button class="btn btn-primary btn-small" ${!mentor.available ? 'disabled' : ''}>
                ${mentor.available ? 'Connect' : 'Unavailable'}
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  renderAnalytics() {
    const content = document.getElementById('main-content');
    content.innerHTML = `
      <div style="text-align: center; margin-bottom: 3rem;">
        <h1>Analytics Dashboard</h1>
        <p style="font-size: 1.125rem; color: var(--text-gray);">Track marketplace performance and insights</p>
      </div>

      <div class="stats">
        <div class="stat-card">
          <div class="stat-number">$1,247</div>
          <div class="stat-label">Total Revenue</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">89</div>
          <div class="stat-label">Orders This Month</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">4.7</div>
          <div class="stat-label">Average Rating</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">23</div>
          <div class="stat-label">New Startups</div>
        </div>
      </div>

      <div class="grid">
        <div class="card">
          <h3>Top Performing Startups</h3>
          <div style="margin-top: 1rem;">
            ${this.startups
              .sort((a, b) => b.orders - a.orders)
              .slice(0, 3)
              .map((startup, index) => `
                <div style="display: flex; justify-content: space-between; padding: 0.5rem 0; border-bottom: 1px solid var(--border-light);">
                  <span>${index + 1}. ${startup.name}</span>
                  <span style="font-weight: 600;">${startup.orders} orders</span>
                </div>
              `).join('')}
          </div>
        </div>

        <div class="card">
          <h3>Category Performance</h3>
          <div style="margin-top: 1rem;">
            ${['Technology', 'Education', 'Food & Dining', 'Health & Fitness', 'Sustainability']
              .map(category => {
                const count = this.startups.filter(s => s.category === category).length;
                return `
                  <div style="display: flex; justify-content: space-between; padding: 0.5rem 0; border-bottom: 1px solid var(--border-light);">
                    <span>${category}</span>
                    <span style="font-weight: 600;">${count} startups</span>
                  </div>
                `;
              }).join('')}
          </div>
        </div>

        <div class="card">
          <h3>Recent Activity</h3>
          <div style="margin-top: 1rem;">
            <div style="padding: 0.5rem 0; border-bottom: 1px solid var(--border-light);">
              <div style="font-weight: 600;">New startup registered</div>
              <div style="color: var(--text-gray); font-size: 0.875rem;">QuickLaundry - 2 hours ago</div>
            </div>
            <div style="padding: 0.5rem 0; border-bottom: 1px solid var(--border-light);">
              <div style="font-weight: 600;">Large order completed</div>
              <div style="color: var(--text-gray); font-size: 0.875rem;">StudyBuddy - $120.00 - 4 hours ago</div>
            </div>
            <div style="padding: 0.5rem 0;">
              <div style="font-weight: 600;">New mentor joined</div>
              <div style="color: var(--text-gray); font-size: 0.875rem;">Prof. David Lee - 6 hours ago</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  renderStartupCards(detailed = false) {
    return this.startups.map(startup => `
      <div class="card startup-card">
        <div class="badge">${startup.badge}</div>
        <div class="startup-info">
          <div class="startup-avatar">${startup.founder.split(' ').map(n => n[0]).join('')}</div>
          <div>
            <h3>${startup.name}</h3>
            <p style="margin: 0; color: var(--text-gray);">by ${startup.founder}</p>
          </div>
        </div>
        <h4 style="margin: 1rem 0 0.5rem 0;">${startup.product}</h4>
        <p>${startup.description}</p>
        ${detailed ? `
          <div style="margin: 1rem 0;">
            <span style="color: var(--text-gray);">Category: </span>
            <span style="font-weight: 500;">${startup.category}</span>
          </div>
          <div style="margin-bottom: 1rem;">
            <span style="color: var(--text-gray);">Rating: </span>
            <span style="font-weight: 500;">⭐ ${startup.rating} (${startup.orders} orders)</span>
          </div>
        ` : ''}
        <div class="card-footer">
          <span class="price">$${startup.price}</span>
          <button class="btn btn-primary btn-small purchase-btn" data-startup-id="${startup.id}">
            Purchase
          </button>
        </div>
      </div>
    `).join('');
  }

  filterStartups() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const categoryFilter = document.getElementById('categoryFilter').value;

    const filteredStartups = this.startups.filter(startup => {
      const matchesSearch = startup.name.toLowerCase().includes(searchTerm) ||
                           startup.product.toLowerCase().includes(searchTerm) ||
                           startup.description.toLowerCase().includes(searchTerm);
      const matchesCategory = !categoryFilter || startup.category === categoryFilter;
      
      return matchesSearch && matchesCategory;
    });

    const grid = document.getElementById('startupsGrid');
    if (grid) {
      grid.innerHTML = filteredStartups.map(startup => `
        <div class="card startup-card">
          <div class="badge">${startup.badge}</div>
          <div class="startup-info">
            <div class="startup-avatar">${startup.founder.split(' ').map(n => n[0]).join('')}</div>
            <div>
              <h3>${startup.name}</h3>
              <p style="margin: 0; color: var(--text-gray);">by ${startup.founder}</p>
            </div>
          </div>
          <h4 style="margin: 1rem 0 0.5rem 0;">${startup.product}</h4>
          <p>${startup.description}</p>
          <div class="card-footer">
            <span class="price">$${startup.price}</span>
            <button class="btn btn-primary btn-small purchase-btn" data-startup-id="${startup.id}">
              Purchase
            </button>
          </div>
        </div>
      `).join('');
    }
  }

  purchaseProduct(startupId) {
    const startup = this.startups.find(s => s.id === startupId);
    if (!startup) return;

    if (this.walletBalance >= startup.price) {
      this.walletBalance -= startup.price;
      this.transactions.unshift({
        id: this.transactions.length + 1,
        description: startup.product,
        amount: -startup.price,
        type: 'debit',
        date: new Date().toISOString().split('T')[0]
      });

      this.updateWalletDisplay();
      this.showMessage(`Successfully purchased ${startup.product} for $${startup.price}!`, 'success');
    } else {
      this.showMessage('Insufficient funds. Please add money to your wallet.', 'error');
    }
  }

  showWalletModal() {
    const modal = document.getElementById('walletModal');
    if (!modal) {
      this.createWalletModal();
    }
    document.getElementById('walletModal').classList.add('active');
    this.updateWalletModal();
  }

  hideWalletModal() {
    const modal = document.getElementById('walletModal');
    if (modal) {
      modal.classList.remove('active');
    }
  }

  createWalletModal() {
    const modal = document.createElement('div');
    modal.id = 'walletModal';
    modal.className = 'modal';
    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h2>Campus Wallet</h2>
          <button class="close-btn">&times;</button>
        </div>
        <div class="wallet-balance">
          <div style="color: var(--text-gray); margin-bottom: 0.5rem;">Current Balance</div>
          <div class="balance-amount" id="modalBalance">$${this.walletBalance.toFixed(2)}</div>
        </div>
        <button class="btn btn-primary add-funds-btn" style="width: 100%; margin-bottom: 2rem;">Add Funds</button>
        <div class="transaction-history">
          <h3>Recent Transactions</h3>
          <div id="transactionList">
            ${this.renderTransactions()}
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }

  updateWalletModal() {
    const modalBalance = document.getElementById('modalBalance');
    const transactionList = document.getElementById('transactionList');
    
    if (modalBalance) {
      modalBalance.textContent = `$${this.walletBalance.toFixed(2)}`;
    }
    
    if (transactionList) {
      transactionList.innerHTML = this.renderTransactions();
    }
  }

  renderTransactions() {
    return this.transactions.slice(0, 5).map(transaction => `
      <div class="transaction-item">
        <div>
          <div style="font-weight: 500;">${transaction.description}</div>
          <div style="color: var(--text-gray); font-size: 0.875rem;">${transaction.date}</div>
        </div>
        <div class="transaction-amount ${transaction.type === 'credit' ? 'positive' : 'negative'}">
          ${transaction.amount > 0 ? '+' : ''}$${Math.abs(transaction.amount).toFixed(2)}
        </div>
      </div>
    `).join('');
  }

  addFunds() {
    const amount = 50.00; // Simulate adding $50
    this.walletBalance += amount;
    this.transactions.unshift({
      id: this.transactions.length + 1,
      description: 'Funds Added',
      amount: amount,
      type: 'credit',
      date: new Date().toISOString().split('T')[0]
    });

    this.updateWalletDisplay();
    this.updateWalletModal();
    this.showMessage('Successfully added $50.00 to your wallet!', 'success');
  }

  updateWalletDisplay() {
    const walletBtn = document.querySelector('.wallet-btn');
    if (walletBtn) {
      walletBtn.textContent = `Wallet: $${this.walletBalance.toFixed(2)}`;
    }
  }

  showMessage(text, type) {
    const existing = document.querySelector('.message');
    if (existing) {
      existing.remove();
    }

    const message = document.createElement('div');
    message.className = `message ${type}`;
    message.textContent = text;
    
    const container = document.querySelector('.container');
    container.insertBefore(message, container.firstChild);

    setTimeout(() => {
      message.remove();
    }, 5000);
  }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  // Create the main HTML structure
  document.getElementById('root').innerHTML = `
    <nav class="navbar">
      <div class="nav-container">
        <div class="logo">CampusHub</div>
        <ul class="nav-links">
          <li><a href="#" class="nav-link active" data-section="marketplace">Marketplace</a></li>
          <li><a href="#" class="nav-link" data-section="startups">Startups</a></li>
          <li><a href="#" class="nav-link" data-section="mentors">Mentors</a></li>
          <li><a href="#" class="nav-link" data-section="analytics">Analytics</a></li>
        </ul>
        <button class="wallet-btn">Wallet: $250.00</button>
      </div>
    </nav>
    
    <div class="container">
      <div id="main-content"></div>
    </div>
  `;

  // Initialize the marketplace application
  new CampusMarketplace();
});