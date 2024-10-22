import './index.css';

import {
  animateButtonHover,
  animateSections,
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
  stepsAnimation();
  animateSections();
  animateTestimonialSection();
  parallaxServiceImage();
  animateButtonHover();
  parallaxGallerieImage();
});

// Sélectionner tous les <h2> dans .legal-notices_rich-text-block et leur attribuer la classe heading-style-h3
const headings = document.querySelectorAll('.legal-notices_rich-text-block h2');

// Ajouter la classe heading-style-h3 à chaque <h2>
headings.forEach((heading) => {
  heading.classList.add('heading-style-h3');
});
