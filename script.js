const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navAnchors = document.querySelectorAll('.nav-links a');
const yearElement = document.getElementById('year');
const contactForm = document.querySelector('.contact-form');

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navAnchors.forEach((anchor) => {
    anchor.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

if (contactForm) {
  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const button = contactForm.querySelector('button[type="submit"]');
    const status = contactForm.querySelector('.form-status');
    const formData = new FormData(contactForm);

    if (status) {
      status.textContent = '';
      status.className = 'form-status';
    }

    if (button) {
      button.textContent = 'Sending...';
      button.disabled = true;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          phone: formData.get('phone'),
          service: formData.get('service'),
          message: formData.get('message'),
          website: formData.get('website')
        })
      });

      if (!response.ok) {
        throw new Error('Unable to send inquiry at the moment.');
      }

      contactForm.reset();
      if (status) {
        status.textContent = 'Thank you. Your inquiry has been received.';
        status.classList.add('success');
      }
    } catch (error) {
      if (status) {
        status.textContent = error.message || 'Something went wrong. Please email contact@brutechgyan.com.';
        status.classList.add('error');
      }
    } finally {
      if (button) {
        button.textContent = 'Send Inquiry';
        button.disabled = false;
      }
    }
  });
}
