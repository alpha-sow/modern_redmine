// Modern Redmine Theme - Custom JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Add smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

  // Enhanced table row hover effects
  const tableRows = document.querySelectorAll('table.list tr');
  tableRows.forEach(row => {
    row.addEventListener('mouseenter', function() {
      this.style.transform = 'translateX(5px)';
    });
    
    row.addEventListener('mouseleave', function() {
      this.style.transform = 'translateX(0)';
    });
  });

  // Form validation enhancements
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    inputs.forEach(input => {
      input.addEventListener('blur', function() {
        if (!this.value.trim()) {
          this.style.borderColor = '#e74c3c';
          this.style.boxShadow = '0 0 0 3px rgba(231, 76, 60, 0.2)';
        } else {
          this.style.borderColor = '#27ae60';
          this.style.boxShadow = '0 0 0 3px rgba(39, 174, 96, 0.2)';
        }
      });
    });
  });

  // Auto-hide flash messages after 5 seconds
  const flashMessages = document.querySelectorAll('.flash');
  flashMessages.forEach(flash => {
    setTimeout(() => {
      flash.style.opacity = '0';
      flash.style.transform = 'translateY(-20px)';
      setTimeout(() => {
        flash.style.display = 'none';
      }, 300);
    }, 5000);
  });

  // Add loading states to form submissions
  const submitButtons = document.querySelectorAll('input[type="submit"], button[type="submit"]');
  submitButtons.forEach(button => {
    button.addEventListener('click', function() {
      this.style.opacity = '0.7';
      this.style.pointerEvents = 'none';
      const originalText = this.value || this.textContent;
      this.value = 'Processing...';
      this.textContent = 'Processing...';
      
      // Reset after 3 seconds if form hasn't been submitted
      setTimeout(() => {
        this.style.opacity = '1';
        this.style.pointerEvents = 'auto';
        this.value = originalText;
        this.textContent = originalText;
      }, 3000);
    });
  });

  // Keyboard shortcuts
  document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K for quick search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      const searchInput = document.querySelector('#q');
      if (searchInput) {
        searchInput.focus();
        searchInput.select();
      }
    }
    
    // Ctrl/Cmd + N for new issue
    if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
      e.preventDefault();
      const newIssueLink = document.querySelector('a[href*="/issues/new"]');
      if (newIssueLink) {
        window.location.href = newIssueLink.href;
      }
    }
  });

  // Add tooltips to truncated text
  const truncatedElements = document.querySelectorAll('[title]');
  truncatedElements.forEach(element => {
    if (element.scrollWidth > element.clientWidth) {
      element.style.cursor = 'help';
    }
  });

  // Dark mode toggle (optional)
  const darkModeToggle = document.createElement('button');
  darkModeToggle.textContent = '🌙';
  darkModeToggle.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: rgba(255, 255, 255, 0.2);
    border: none;
    color: white;
    padding: 10px;
    border-radius: 50%;
    cursor: pointer;
    z-index: 1001;
    font-size: 16px;
    transition: all 0.3s ease;
  `;
  
  darkModeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    this.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
  });
  
  document.body.appendChild(darkModeToggle);

  // Add CSS for dark mode
  const darkModeStyles = document.createElement('style');
  darkModeStyles.textContent = `
    .dark-mode {
      filter: invert(1) hue-rotate(180deg);
    }
    .dark-mode img,
    .dark-mode video,
    .dark-mode iframe {
      filter: invert(1) hue-rotate(180deg);
    }
  `;
  document.head.appendChild(darkModeStyles);

  console.log('Modern Redmine Theme loaded successfully!');
});