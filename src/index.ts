import './index.css';

import {
  animateSections,
  animateTestimonialSection,
  initNavbarAnimation,
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
});

// Sélectionner tous les <h2> dans .legal-notices_rich-text-block et leur attribuer la classe heading-style-h3
const headings = document.querySelectorAll('.legal-notices_rich-text-block h2');

// Ajouter la classe heading-style-h3 à chaque <h2>
headings.forEach((heading) => {
  heading.classList.add('heading-style-h3');
});
