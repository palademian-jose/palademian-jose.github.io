(function () {
  var root = document.documentElement;
  root.classList.add('js');

  // Theme toggle: follows the system until the visitor chooses.
  var button = document.getElementById('theme');
  function current() {
    if (root.dataset.theme) return root.dataset.theme;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }
  button.addEventListener('click', function () {
    var next = current() === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (e) {}
  });

  document.getElementById('year').textContent = new Date().getFullYear();

  // Reveal sections as they enter the viewport.
  var targets = document.querySelectorAll('.block-head, .project, .card, .skills > div, .about-grid > *, .contact h2');
  if (!('IntersectionObserver' in window)) return;
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px' });
  targets.forEach(function (el, i) {
    el.classList.add('reveal');
    if (el.classList.contains('card')) el.style.transitionDelay = (i % 3) * 70 + 'ms';
    observer.observe(el);
  });
})();
