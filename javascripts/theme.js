(function() {
  'use strict';

  // Theme initialization
  function initTheme() {
    // Add smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth';

    // Apply Tailwind utility classes to existing elements
    applyTailwindClasses();

    // Enhance forms with better UX
    enhanceForms();

    // Add loading states to buttons
    enhanceButtons();

    // Improve table interactions
    enhanceTables();

    // Add keyboard navigation
    addKeyboardNavigation();

    // Initialize tooltips
    initTooltips();

    // Add search enhancements
    enhanceSearch();

    // Initialize dropdown menus
    initDropdowns();

    // Add mobile menu toggle
    initMobileMenu();
  }

  // Apply Tailwind utility classes to existing Redmine elements
  function applyTailwindClasses() {
    // Add container classes
    const wrapper = document.querySelector('#wrapper');
    if (wrapper) {
      wrapper.classList.add('min-h-screen', 'flex', 'flex-col');
    }

    // Add responsive navigation classes
    const mainMenu = document.querySelector('#main-menu');
    if (mainMenu) {
      mainMenu.classList.add('bg-white', 'border-b', 'border-gray-200');
      const menuList = mainMenu.querySelector('ul');
      if (menuList) {
        menuList.classList.add('flex', 'space-x-2', 'container', 'mx-auto', 'px-4');
      }
    }

    // Add card classes to content areas
    const contentBoxes = document.querySelectorAll('.box');
    contentBoxes.forEach(box => {
      box.classList.add('bg-white', 'rounded-lg', 'shadow', 'p-6', 'mb-6');
    });

    // Add form classes
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
      form.classList.add('space-y-4');
      
      const fieldsets = form.querySelectorAll('fieldset');
      fieldsets.forEach(fieldset => {
        fieldset.classList.add('space-y-4');
      });
    });

    // Add button classes
    const buttons = document.querySelectorAll('input[type="submit"], input[type="button"], button, .button');
    buttons.forEach(button => {
      if (!button.classList.contains('btn')) {
        button.classList.add('btn');
      }
    });

    // Add table classes
    const tables = document.querySelectorAll('table');
    tables.forEach(table => {
      table.classList.add('w-full', 'bg-white', 'rounded-lg', 'shadow', 'overflow-hidden');
    });

    // Add list classes
    const lists = document.querySelectorAll('ul, ol');
    lists.forEach(list => {
      if (!list.closest('#main-menu')) {
        list.classList.add('space-y-2');
      }
    });
  }

  // Enhance form interactions
  function enhanceForms() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
      // Add floating labels effect
      const inputs = form.querySelectorAll('input[type="text"], input[type="email"], input[type="password"], textarea');
      
      inputs.forEach(input => {
        // Add focus/blur effects
        input.addEventListener('focus', function() {
          this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
          if (!this.value) {
            this.parentElement.classList.remove('focused');
          }
        });

        // Add input validation styling
        input.addEventListener('input', function() {
          if (this.validity.valid) {
            this.classList.remove('invalid');
            this.classList.add('valid');
          } else {
            this.classList.remove('valid');
            this.classList.add('invalid');
          }
        });
      });

      // Add form submission loading state
      form.addEventListener('submit', function() {
        const submitBtn = this.querySelector('input[type="submit"], button[type="submit"]');
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.style.opacity = '0.6';
          submitBtn.style.cursor = 'not-allowed';
          
          // Add loading spinner
          const originalText = submitBtn.value || submitBtn.textContent;
          if (submitBtn.tagName === 'INPUT') {
            submitBtn.value = 'Loading...';
          } else {
            submitBtn.innerHTML = '<span style="display: inline-block; animation: spin 1s linear infinite;">⟳</span> Loading...';
          }
        }
      });
    });
  }

  // Enhance button interactions
  function enhanceButtons() {
    const buttons = document.querySelectorAll('.button, input[type="submit"], input[type="button"], button');
    
    buttons.forEach(button => {
      // Add ripple effect
      button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
          ripple.remove();
        }, 600);
      });
    });

    // Add ripple CSS
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
      button, .button, input[type="submit"], input[type="button"] {
        position: relative;
        overflow: hidden;
      }
      
      .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
      }
      
      @keyframes ripple {
        to {
          transform: scale(2);
          opacity: 0;
        }
      }
      
      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
    `;
    document.head.appendChild(rippleStyle);
  }

  // Enhance table interactions
  function enhanceTables() {
    const tables = document.querySelectorAll('table');
    
    tables.forEach(table => {
      // Add sortable headers
      const headers = table.querySelectorAll('th');
      headers.forEach(header => {
        if (header.textContent.trim()) {
          header.style.cursor = 'pointer';
          header.style.userSelect = 'none';
          header.title = 'Click to sort';
          
          header.addEventListener('click', function() {
            sortTable(table, Array.from(headers).indexOf(this));
          });
        }
      });

      // Add row selection
      const rows = table.querySelectorAll('tbody tr');
      rows.forEach(row => {
        row.addEventListener('click', function() {
          // Toggle selection
          this.classList.toggle('selected');
        });
      });
    });

    // Add table sorting CSS
    const tableStyle = document.createElement('style');
    tableStyle.textContent = `
      th[data-sort="asc"]:after {
        content: " ↑";
      }
      
      th[data-sort="desc"]:after {
        content: " ↓";
      }
      
      tr.selected {
        background-color: hsl(var(--primary) / 0.1) !important;
      }
    `;
    document.head.appendChild(tableStyle);
  }

  // Simple table sorting function
  function sortTable(table, columnIndex) {
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    const header = table.querySelectorAll('th')[columnIndex];
    
    const isAscending = header.getAttribute('data-sort') !== 'asc';
    
    // Clear all sort indicators
    table.querySelectorAll('th').forEach(th => th.removeAttribute('data-sort'));
    
    // Set current sort direction
    header.setAttribute('data-sort', isAscending ? 'asc' : 'desc');
    
    rows.sort((a, b) => {
      const aValue = a.cells[columnIndex].textContent.trim();
      const bValue = b.cells[columnIndex].textContent.trim();
      
      // Try to parse as numbers
      const aNum = parseFloat(aValue);
      const bNum = parseFloat(bValue);
      
      if (!isNaN(aNum) && !isNaN(bNum)) {
        return isAscending ? aNum - bNum : bNum - aNum;
      }
      
      // String comparison
      return isAscending ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    });
    
    // Reorder rows
    rows.forEach(row => tbody.appendChild(row));
  }

  // Add keyboard navigation
  function addKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
      // Alt + M for main menu
      if (e.altKey && e.key === 'm') {
        e.preventDefault();
        const mainMenu = document.querySelector('#main-menu a');
        if (mainMenu) mainMenu.focus();
      }
      
      // Alt + S for search
      if (e.altKey && e.key === 's') {
        e.preventDefault();
        const search = document.querySelector('input[type="text"]');
        if (search) search.focus();
      }
      
      // Escape to close modals/dropdowns
      if (e.key === 'Escape') {
        const modals = document.querySelectorAll('.modal, .dropdown');
        modals.forEach(modal => modal.style.display = 'none');
      }
    });
  }

  // Initialize tooltips
  function initTooltips() {
    const tooltipElements = document.querySelectorAll('[title]');
    
    tooltipElements.forEach(element => {
      const title = element.getAttribute('title');
      if (title) {
        element.addEventListener('mouseenter', function(e) {
          showTooltip(e, title);
        });
        
        element.addEventListener('mouseleave', function() {
          hideTooltip();
        });
      }
    });
  }

  function showTooltip(e, text) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = text;
    tooltip.style.cssText = `
      position: absolute;
      background: hsl(var(--popover));
      color: hsl(var(--popover-foreground));
      padding: 0.5rem;
      border-radius: var(--radius);
      border: 1px solid hsl(var(--border));
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      z-index: 9999;
      font-size: 0.75rem;
      max-width: 200px;
      pointer-events: none;
    `;
    
    document.body.appendChild(tooltip);
    
    const rect = tooltip.getBoundingClientRect();
    tooltip.style.left = (e.pageX - rect.width / 2) + 'px';
    tooltip.style.top = (e.pageY - rect.height - 10) + 'px';
  }

  function hideTooltip() {
    const tooltip = document.querySelector('.tooltip');
    if (tooltip) {
      tooltip.remove();
    }
  }

  // Enhance search functionality
  function enhanceSearch() {
    const searchInputs = document.querySelectorAll('input[type="text"]');
    
    searchInputs.forEach(input => {
      if (input.placeholder && input.placeholder.toLowerCase().includes('search')) {
        // Add search icon
        const wrapper = document.createElement('div');
        wrapper.style.position = 'relative';
        wrapper.style.display = 'inline-block';
        wrapper.style.width = '100%';
        
        input.parentNode.insertBefore(wrapper, input);
        wrapper.appendChild(input);
        
        const icon = document.createElement('span');
        icon.innerHTML = '🔍';
        icon.style.cssText = `
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
          opacity: 0.5;
        `;
        wrapper.appendChild(icon);
        
        // Add live search (debounced)
        let searchTimeout;
        input.addEventListener('input', function() {
          clearTimeout(searchTimeout);
          searchTimeout = setTimeout(() => {
            // Implement live search logic here
            console.log('Searching for:', this.value);
          }, 300);
        });
      }
    });
  }

  // Dark mode toggle
  function initDarkModeToggle() {
    // Only add if user hasn't explicitly set a preference
    if (!localStorage.getItem('redmine-theme-preference')) {
      const toggle = document.createElement('button');
      toggle.innerHTML = '🌙';
      toggle.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: hsl(var(--card));
        border: 1px solid hsl(var(--border));
        border-radius: 50%;
        width: 40px;
        height: 40px;
        cursor: pointer;
        z-index: 9999;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        transition: all 0.2s ease;
      `;
      
      toggle.addEventListener('click', function() {
        document.documentElement.classList.toggle('dark');
        this.innerHTML = document.documentElement.classList.contains('dark') ? '☀️' : '🌙';
      });
      
      document.body.appendChild(toggle);
    }
  }

  // Initialize theme when DOM is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTheme);
  } else {
    initTheme();
  }

  // Add some utility functions to window for external use
  window.ShadcnTheme = {
    showTooltip,
    hideTooltip,
    sortTable
  };

})();