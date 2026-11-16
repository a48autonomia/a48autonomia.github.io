'use strict';

const config = window.A48_CONFIG || {};
const toggle = document.getElementById('menu-toggle');
const list = document.getElementById('nav-list');
if (toggle && list) {
  const closeMenu = () => {
    list.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menu');
  };
  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') !== 'true';
    list.classList.toggle('open', expanded);
    toggle.setAttribute('aria-expanded', String(expanded));
    toggle.setAttribute('aria-label', expanded ? 'Fechar menu' : 'Abrir menu');
  });
  list.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMenu();
  });
}

const whatsappUrl = new URL(`https://wa.me/${config.whatsapp}`);
whatsappUrl.searchParams.set('text', 'Olá! Gostaria de conversar sobre um projeto com a A48 Autonomia.');
const contactTag = document.querySelector('.contact-tag');
if (contactTag) {
  const link = document.createElement('a');
  link.className = 'btn contact-direct';
  link.dataset.whatsapp = '';
  link.textContent = 'Conversar pelo WhatsApp ↗';
  contactTag.after(link);
}
const mobileLink = document.querySelector('.mobile-action a');
if (mobileLink) {
  mobileLink.dataset.whatsapp = '';
  mobileLink.textContent = 'Conversar pelo WhatsApp ↗';
}
document.querySelectorAll('[data-whatsapp]').forEach(link => {
  link.href = whatsappUrl.href;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
});

const form = document.getElementById('quote-form');
if (form) {
  const status = document.getElementById('form-status');
  const submit = form.querySelector('[type="submit"]');
  const configured = /^[a-z0-9-]{16,128}$/i.test(config.formsubmitId || '');
  const phone = form.elements.namedItem('phone');
  let sending = false;

  if (configured) {
    form.action = `https://formsubmit.co/${config.formsubmitId}`;
  } else {
    status.textContent = 'O envio pelo formulário estará disponível em breve. Você já pode falar conosco pelo WhatsApp.';
    form.querySelectorAll('input, select, textarea, button').forEach(field => { field.disabled = true; });
  }

  phone.addEventListener('input', () => phone.setCustomValidity(''));
  form.addEventListener('submit', event => {
    if (!configured || sending || form.elements.namedItem('_honey').value) {
      event.preventDefault();
      return;
    }
    const digits = phone.value.replace(/\D/g, '').replace(/^55(?=\d{10,11}$)/, '');
    if (!/^[1-9]\d9\d{8}$/.test(digits) && !/^[1-9]\d[2-5]\d{7}$/.test(digits)) {
      event.preventDefault();
      phone.setCustomValidity('Informe um telefone brasileiro com DDD, por exemplo (48) 99999-9999.');
      phone.reportValidity();
      return;
    }
    sending = true;
    submit.disabled = true;
    submit.textContent = 'Continuando para verificação…';
    status.textContent = 'Conclua a verificação antispam na próxima página para finalizar o envio.';
    // POST normal: o reCAPTCHA do provedor continua ativo.
    // Nenhuma confirmação de entrega é simulada no navegador.
  });
  window.addEventListener('pageshow', () => {
    sending = false;
    if (configured) {
      submit.disabled = false;
      submit.textContent = 'Enviar solicitação ↗';
      status.textContent = '';
    }
  });
}
