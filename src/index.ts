import './index.css';

import {
  animateButtonNav,
  animateButtonSecondary,
  animateButtonTertiary,
  animateCounter,
  animateFeaturesHp,
  animateFeaturesItems,
  animatePercentageCounter,
  animateSectionLp,
  animateSections,
  animateSectionsHistory,
  animateSectionsHp,
  animateSectionsSlideRight,
  contactSection,
  initNavbarAnimation,
  parallaxGallerieImage,
  parallaxServiceImage,
  stepsAnimation,
  stepsLine,
  updateFooterYear,
} from '$utils/gsap';

window.Webflow ||= [];
window.Webflow.push(() => {
  initNavbarAnimation();
  animateButtonSecondary();
  animateButtonTertiary();
  animateButtonNav();
  updateFooterYear();

  // Vérifier si l'URL est celle de la page d'accueil
  if (window.location.pathname === '/' || window.location.pathname === '/') {
    animateFeaturesHp();
    stepsAnimation();
    animateSectionsHp();
    parallaxServiceImage();
    parallaxGallerieImage();
    animateSectionsSlideRight('.section_lp-testimonial');
    animateSections();
  }

  // Vérifier si l'URL contient 'a-propos'
  if (window.location.href.includes('a-propos')) {
    animateSectionLp(); // Appeler la fonction uniquement si 'a-propos' est dans l'URL
    animateSectionsHistory();
    animateSectionsSlideRight('.section_slider-galerie');
    stepsLine();
    animateCounter();
    animatePercentageCounter();
  }

  // Vérifier si l'URL contient 'a-propos'
  if (window.location.href.includes('contact')) {
    contactSection();
  }

  // Vérifier si l'URL contient 'architecte', 'constructeur' ou 'maitre-oeuvre'
  if (/architecte|constructeur|maitre-oeuvre/.test(window.location.href)) {
    animateSectionLp(); // Appeler la fonction uniquement si un des termes est dans l'URL
    parallaxGallerieImage();
    animateFeaturesItems();
    animateSectionsSlideRight('.section_lp-testimonial');
    animateSections();
    contactSection();
  }
});

// Sélectionner tous les <h2> dans .legal-notices_rich-text-block et leur attribuer la classe heading-style-h3
const headings = document.querySelectorAll('.legal-notices_rich-text-block h2');

// Ajouter la classe heading-style-h3 à chaque <h2>
headings.forEach((heading) => {
  heading.classList.add('heading-style-h3');
});

// Garantie Heading Sticky
const leftContent = document.querySelector<HTMLElement>('.guaranteest_content-left');

// Vérifier si leftContent existe et si la largeur de l'écran est supérieure à 767px
if (leftContent && window.innerWidth > 767) {
  leftContent.style.position = 'sticky';
  leftContent.style.top = '50px'; // devient sticky 50px avant le haut
}
