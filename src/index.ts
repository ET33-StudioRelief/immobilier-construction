import './index.css';

import { initNavbarAnimation, stepsLine } from '$utils/gsap';

window.Webflow ||= [];
window.Webflow.push(() => {
  stepsLine();
  initNavbarAnimation();
});
