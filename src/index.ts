import './index.css';

import {
  animateCounter,
  animatePercentageCounter,
  animateSectionsHistory,
  parallaxGallerieImage,
  stepsLine,
} from 'src/typescript/gsap';

import { initNavbar } from './typescript/components/navbar';
import { initContactEmailFlow } from './typescript/contact';
import { initBgParallax, initFadeByStep } from './typescript/global-animations';
import { initIosIframeTapFix } from './typescript/utils/ios-iframe-tap-fix';

window.Webflow ||= [];
window.Webflow.push(() => {
  initIosIframeTapFix();
  initNavbar();
  initContactEmailFlow();
  initFadeByStep();
  initBgParallax();
  animateSectionsHistory();
  stepsLine();
  animateCounter();
  animatePercentageCounter();
  if (window.location.pathname === '/') {
    parallaxGallerieImage();
  }
});

// Garantie Heading Sticky
const leftContent = document.querySelector<HTMLElement>('.guaranteest_content-left');

// Vérifier si leftContent existe et si la largeur de l'écran est supérieure à 767px
if (leftContent && window.innerWidth > 767) {
  leftContent.style.position = 'sticky';
  leftContent.style.top = '50px'; // devient sticky 50px avant le haut
}
