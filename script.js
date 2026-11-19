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

// --- Single-Open Accordion Behavior for Project Cards ---
document.addEventListener("DOMContentLoaded", () => {
  const projectCards = document.querySelectorAll("#project-grid .card");

  const setCardState = (card, open) => {
    card.classList.toggle("is-open", open);
    const hint = card.querySelector(".expand-hint");
    if (hint) {
      hint.textContent = open
        ? "Click to hide details ▴"
        : "Click to view details ▾";
    }
  };

  projectCards.forEach((card) => {
    // အစပိုင်းတွင် အားလုံးကို ပိတ်ထားမည်
    setCardState(card, false);

    card.addEventListener("click", (event) => {
      // Link သို့မဟုတ် Button ကို တိုက်ရိုက်နှိပ်ပါက Card toggle မလုပ်ပါ
      if (event.target.closest("a, button")) return;

      const willOpen = !card.classList.contains("is-open");

      // တခြားပွင့်နေသော Card များကို အလိုလို ပြန်ပိတ်မည်
      projectCards.forEach((otherCard) => {
        if (otherCard !== card) {
          setCardState(otherCard, false);
        }
      });

      // လက်ရှိနှိပ်လိုက်သော Card ကို ဖွင့်/ပိတ် ပြုလုပ်မည်
      setCardState(card, willOpen);
    });
  });

  document.addEventListener("DOMContentLoaded", () => {
  const projectCards = document.querySelectorAll("#project-grid .card");

  const setCardState = (card, open) => {
    card.classList.toggle("is-open", open);
    const hint = card.querySelector(".expand-hint");
    if (hint) {
      hint.textContent = open
        ? "Click to hide details ▴"
        : "Click to view details ▾";
    }
  };

  projectCards.forEach((card) => {
    setCardState(card, false);

    card.addEventListener("click", (event) => {
      if (event.target.closest("a, button")) return;

      const willOpen = !card.classList.contains("is-open");

      projectCards.forEach((otherCard) => {
        if (otherCard !== card) {
          setCardState(otherCard, false);
        }
      });

      setCardState(card, willOpen);
    });
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".filters .filter[data-filter]");
  const projectCards = document.querySelectorAll("#project-grid .card");

  const setCardState = (card, open) => {
    card.classList.toggle("is-open", open);
    const hint = card.querySelector(".expand-hint");
    if (hint) {
      hint.textContent = open
        ? "Click to hide details ▴"
        : "Click to view details ▾";
    }
  };

  const applyFilter = (selectedFilter) => {
    const normalized = (selectedFilter || "all").toLowerCase().trim();

    filterButtons.forEach((btn) => {
      const btnFilter = (btn.dataset.filter || "").toLowerCase().trim();
      const isSelected = btnFilter === normalized;
      btn.classList.toggle("active", isSelected);
      btn.setAttribute("aria-pressed", String(isSelected));
    });

    projectCards.forEach((card) => {
      const cardCat = (card.dataset.category || "").toLowerCase().trim();
      const matches = normalized === "all" || cardCat === normalized;

      card.style.display = matches ? "" : "none";
      if (!matches) {
        setCardState(card, false);
      }
    });
  };

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      applyFilter(btn.dataset.filter);
    });
  });

  projectCards.forEach((card) => {
    setCardState(card, false);

    card.addEventListener("click", (event) => {
      if (event.target.closest("a, button")) return;

      const willOpen = !card.classList.contains("is-open");
      projectCards.forEach((otherCard) => {
        if (otherCard !== card) {
          setCardState(otherCard, false);
        }
      });
      setCardState(card, willOpen);
    });
  });

  applyFilter("all");
});

document.addEventListener("DOMContentLoaded", () => {
  const colLeft = document.getElementById("project-col-left");
  const colRight = document.getElementById("project-col-right");
  const filterButtons = Array.from(
    document.querySelectorAll(".filters .filter[data-filter]")
  );
  const allCards = Array.from(document.querySelectorAll("#project-grid .card"));

  let refillTimeout = null;

  const setCardOpen = (card, open) => {
    card.classList.toggle("is-open", open);
    const hint = card.querySelector(".expand-hint");
    if (hint) {
      hint.textContent = open
        ? "Click to hide details ▴"
        : "Click to view details ▾";
    }
  };

  const refillColumns = () => {
    if (!colLeft || !colRight) return;

    const visibleCards = allCards.filter(
      (card) => card.style.display !== "none"
    );

    if (window.innerWidth <= 768) {
      visibleCards.forEach((card) => colLeft.appendChild(card));
      return;
    }

    visibleCards.forEach((card) => {
      if (colLeft.offsetHeight <= colRight.offsetHeight) {
        colLeft.appendChild(card);
      } else {
        colRight.appendChild(card);
      }
    });
  };

  const scheduleRefill = (delay = 340) => {
    if (refillTimeout) clearTimeout(refillTimeout);
    refillTimeout = setTimeout(refillColumns, delay);
  };

  const filterCards = (filterValue) => {
    const target = (filterValue || "all").toLowerCase().trim();

    filterButtons.forEach((btn) => {
      const val = (btn.dataset.filter || "").toLowerCase().trim();
      const active = val === target;
      btn.classList.toggle("active", active);
      btn.setAttribute("aria-pressed", String(active));
    });

    allCards.forEach((card) => {
      const cat = (card.dataset.category || "").toLowerCase().trim();
      const show = target === "all" || cat === target;
      card.style.display = show ? "" : "none";
      if (!show) setCardOpen(card, false);
    });

    scheduleRefill(0);
  };

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => filterCards(btn.dataset.filter));
  });

  allCards.forEach((card) => {
    setCardOpen(card, false);

    card.addEventListener("click", (e) => {
      if (e.target.closest("a, button")) return;

      const nextState = !card.classList.contains("is-open");
      allCards.forEach((other) => {
        if (other !== card) setCardOpen(other, false);
      });
      setCardOpen(card, nextState);
      scheduleRefill(340);
    });
  });

  window.addEventListener("resize", () => scheduleRefill(120));
  filterCards("all");
});
});