import './index.css';

import {
  animateButtonNav,
  animateButtonSecondary,
  animateButtonTertiary,
  animateSectionLp,
  animateSections,
  animateSectionsHp,
  animateTestimonialSection,
  initNavbarAnimation,
  parallaxGallerieImage,
  parallaxServiceImage,
  stepsAnimation,
  stepsLine,
} from '$utils/gsap';

window.Webflow ||= [];
window.Webflow.push(() => {
  stepsLine();
  initNavbarAnimation();
  animateSections();
  animateTestimonialSection();
  parallaxServiceImage();
  animateButtonSecondary();
  animateButtonTertiary();
  animateButtonNav();

  // Vérifier si l'URL est celle de la page d'accueil
  if (window.location.pathname === '/' || window.location.pathname === '/') {
    stepsAnimation();
    animateSectionsHp();
  }

  // Vérifier si l'URL contient 'a-propos'
  if (window.location.href.includes('a-propos')) {
    parallaxGallerieImage(); // Appeler la fonction uniquement si 'a-propos' est dans l'URL
    animateSectionLp();
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

if (leftContent) {
  leftContent.style.position = 'sticky';
  leftContent.style.top = '50px'; // devient sticky 50px avant le haut
}
