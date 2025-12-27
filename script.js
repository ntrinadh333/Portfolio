// Enhanced script with smooth animations, PDF generation, and interactivity
window.addEventListener('DOMContentLoaded', () => {
  // Set current year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // Resume download handler
  const btn = document.getElementById('download-resume');
  btn.addEventListener('click', generateResumePDF);

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Observe elements for fade-in animation on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'slideInUp 0.6s ease-out forwards';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.project-card, .skill-group, .experience-item').forEach(el => {
    observer.observe(el);
  });

  // Add ripple effect to buttons
  document.querySelectorAll('.btn').forEach(button => {
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

      const existing = this.querySelector('.ripple');
      if (existing) existing.remove();

      this.appendChild(ripple);
    });
  });

  // Add active state to navbar links on scroll
  window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').slice(1) === current) {
        link.classList.add('active');
      }
    });
  });

  // Parallax effect on hero section
  window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrollY = window.scrollY;
    if (hero && scrollY < hero.offsetHeight) {
      hero.style.backgroundPosition = `0 ${scrollY * 0.5}px`;
    }
  });
});

function generateResumePDF() {
  // Create a link element and trigger download
  const link = document.createElement('a');
  link.href = 'assets/Trinadh Resume.pdf';
  link.download = 'Trinadh_Nallabothu_Resume.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

