// --- Theme Toggle Functionality (Dark / Light Mode) ---
const themeToggleBtn = document.getElementById('themeToggle');
const bodyElement = document.body;

// 1. Page ဖွင့်လိုက်တဲ့အခါ Local Storage ထဲမှာ သိမ်းထားတဲ့ Theme ရှိမရှိ စစ်ဆေးခြင်း
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
  bodyElement.classList.add('light-mode');
}

// 2. ခလုတ်ကို နှိပ်လိုက်တဲ့အခါ Theme ပြောင်းလဲပေးခြင်း
if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    bodyElement.classList.toggle('light-mode');
    
    // ရွေးချယ်ထားသော Theme ကို Local Storage ထဲတွင် သိမ်းဆည်းထားခြင်း
    if (bodyElement.classList.contains('light-mode')) {
      localStorage.setItem('theme', 'light');
    } else {
      localStorage.setItem('theme', 'dark');
    }
  });
}

// 2. Project Category Filtering
const filterBtns = document.querySelectorAll('.filter');
const projectCards = document.querySelectorAll('#project-grid .card');

filterBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterBtns.forEach((b) => b.setAttribute('aria-pressed', 'false'));
    btn.setAttribute('aria-pressed', 'true');

    const filter = btn.getAttribute('data-filter');
    projectCards.forEach((card) => {
      if (filter === 'all' || card.getAttribute('data-category') === filter) {
        card.hidden = false;
      } else {
        card.hidden = true;
      }
    });
  });
});

// 3. Click-to-Expand Project Cards (Mobile & Desktop Support)
projectCards.forEach((card) => {
  card.addEventListener('click', () => {
    card.classList.toggle('is-expanded');
  });
});