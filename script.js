/* ========================================================
   SCROLL SUAVE GLOBAL PARA ÂNCORAS DO MENU
======================================================== */
document.addEventListener('click', function (e) {
  // Procura se o clique veio de algum link do nav
  const link = e.target.closest('nav a');

  if (!link) return;

  const href = link.getAttribute('href');

  // Só intercepta se começar com # e tiver mais de 1 caractere (ex: #secao-cardapio)
  if (href && href.startsWith('#') && href.length > 1) {
    const alvo = document.querySelector(href);

    if (alvo) {
      e.preventDefault(); // Trava o salto seco nativo

      // Descobre a altura do cabeçalho
      const header = document.getElementById('cabecalho');
      const alturaHeader = header ? header.offsetHeight : 0;

      // Posição calculada com precisão
      const topoAlvo = alvo.getBoundingClientRect().top + window.pageYOffset - alturaHeader;

      window.scrollTo({
        top: topoAlvo,
        behavior: 'smooth'
      });
    }
  }
});