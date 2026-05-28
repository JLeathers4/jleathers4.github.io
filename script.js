// Portfolio navigation alignment and active-section tracking
(() => {
  const navLinks = Array.from(document.querySelectorAll('.nav a[href^="#"]'));
  const sections = navLinks
    .map((link) => {
      const id = link.getAttribute('href').slice(1);
      const section = document.getElementById(id);
      return section ? { id, section, link } : null;
    })
    .filter(Boolean);

  function headerOffset() {
    const header = document.querySelector('.topbar');
    return header ? Math.ceil(header.getBoundingClientRect().height + 6) : 78;
  }

  navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return;

      const target = document.getElementById(href.slice(1));
      if (!target) return;

      event.preventDefault();

      const y = target.getBoundingClientRect().top + window.scrollY - headerOffset();
      window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
      history.replaceState(null, '', href);
    });
  });

  function setActiveNav() {
    if (!sections.length) return;

    const offset = headerOffset() + 24;
    let active = sections[0];

    for (const item of sections) {
      if (item.section.offsetTop - offset <= window.scrollY) {
        active = item;
      }
    }

    sections.forEach(({ link }) => link.classList.remove('active'));
    active.link.classList.add('active');
  }

  window.addEventListener('scroll', setActiveNav, { passive: true });
  window.addEventListener('resize', setActiveNav);
  window.addEventListener('load', setActiveNav);
  setActiveNav();
})();
