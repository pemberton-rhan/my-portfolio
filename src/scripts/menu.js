// Phone menu: the Menu button opens and closes the nav.
const button = document.querySelector('.menu');
const nav = document.getElementById('mainnav');
button?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  button.setAttribute('aria-expanded', String(open));
});
