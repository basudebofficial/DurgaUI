const cards = document.querySelectorAll('.tilt-card');

cards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * 10;
    const rotateY = ((x - centerX) / centerX) * -10;

    card.style.transform = `scale(1.05) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    card.style.boxShadow = `${rotateY * 2}px ${-rotateX * 2}px 20px rgba(0,0,0,0.3)`;
  });

  card.addEventListener('mouseenter', () => {
    card.classList.remove('shine'); // restart if already running
    void card.offsetWidth; // trigger reflow
    card.classList.add('shine');
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = `scale(1) rotateX(0deg) rotateY(0deg)`;
    card.style.boxShadow = '0 0 10px rgba(0,0,0,0.15)';
  });
});
//Scroll-BgColor
const header = document.getElementById('header25');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});
// Pages
function showPage(className) {
  // Hide all sections
  const pages = document.querySelectorAll('.pge-about, .pge-contact, .pge-collaborate, .pge-privacy, .pge-terms');
  pages.forEach(page => page.style.display = 'none');

  // Show the selected section
  const selectedPage = document.querySelector(`.${className}`);
  if (selectedPage) {
    selectedPage.style.display = 'block';
    document.body.classList.add('noscroll');

    // Push a new state into browser history
    history.pushState({ pageOpen: true }, '', '');
  }
}

function closePge() {
  // Hide all sections
  const pages = document.querySelectorAll('.pge-about, .pge-contact, .pge-collaborate, .pge-privacy, .pge-terms');
  pages.forEach(page => page.style.display = 'none');
  document.body.classList.remove('noscroll');

  // Go back in history if we pushed a state
  if (history.state && history.state.pageOpen) {
    history.back();
  }
}

// Handle browser "back" button
window.addEventListener('popstate', function (event) {
  closePge(); // Close any open page
});
//Link
document.querySelectorAll('[data-click-link]').forEach(el => {
  el.addEventListener('click', () => {
    let url = el.getAttribute('data-click-link');

    // If it doesn't start with http or https, assume it's relative
    if (!/^https?:\/\//i.test(url)) {
      url = window.location.origin + (url.startsWith("/") ? url : "/" + url);
    }

    window.location.href = url;
  });
});
// Mobile Menu
function openMenu() {
  document.getElementById("mob-menu").classList.add("active");
}
function closeMenu() {
  document.getElementById("mob-menu").classList.remove("active");
}
// Disable right-click
  document.addEventListener('contextmenu', e => e.preventDefault());

  // Disable dragging
  document.addEventListener('dragstart', e => e.preventDefault());

  // Block Ctrl+Shift+I, Ctrl+U, F12, etc.
  document.addEventListener('keydown', e => {
    if (
      e.key === "F12" ||
      (e.ctrlKey && e.shiftKey && ["I", "C", "J"].includes(e.key.toUpperCase())) ||
      (e.ctrlKey && e.key.toLowerCase() === "u")
    ) {
      e.preventDefault();
    }
  });
  let devtools = { open: false };

  const threshold = 160; // px difference to detect devtools
  const checkDevTools = () => {
    const widthThreshold = window.outerWidth - window.innerWidth > threshold;
    const heightThreshold = window.outerHeight - window.innerHeight > threshold;
    if (widthThreshold || heightThreshold) {
      devtools.open = true;
      document.body.innerHTML = '<div style="background:black;width:100vw;height:100vh"></div>';
    }
  };

  setInterval(checkDevTools, 500);
//Video
  const video = document.getElementById('h-vid');

  // Pause if video is not visible in viewport
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && document.visibilityState === "visible") {
        video.play();
      } else {
        video.pause();
      }
    });
  }, {
    threshold: 0.5
  });

  observer.observe(video);

  // Also pause/play when tab visibility changes
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      video.pause();
    } else {
      // Play only if it's still in the viewport
      const rect = video.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      if (isVisible) video.play();
    }
  });
