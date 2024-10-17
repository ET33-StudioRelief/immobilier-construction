import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Enregistre ScrollTrigger avec GSAP
gsap.registerPlugin(ScrollTrigger);

// Fonction d'animation pour plusieurs éléments
export const stepsLine = (): void => {
  // Sélectionner tous les éléments à animer
  const elements = [
    '.guarantees_timeline-right.is-one',
    '.guarantees_timeline-right.is-two',
    '.guarantees_timeline-right.is-three',
    '.guarantees_timeline-right.is-four',
    '.guarantees_timeline-right.is-five',
  ];

  // Appliquer l'animation à chaque élément
  elements.forEach((selector) => {
    gsap.from(selector, {
      opacity: 0,
      duration: 1.5,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: selector,
        start: 'top 80%',
        toggleActions: 'play reverse play reverse', // Jouer et inverser l'animation à l'entrée et à la sortie
      },
    });
  });
};

// Navbar
export const initNavbarAnimation = (): void => {
  const navbar = document.querySelector('.navbar') as HTMLElement;
  let lastScrollY = window.scrollY; // Stocke la position de défilement précédente

  // Cache la navbar initialement
  gsap.set(navbar, { y: 0 }); // S'assurer que la navbar commence à sa position initiale

  // Fonction pour gérer le défilement
  const onScroll = () => {
    const currentScrollY = window.scrollY; // Récupère la position de défilement actuelle

    const offset = navbar.offsetHeight + 3 * parseFloat(getComputedStyle(navbar).paddingTop);

    if (currentScrollY > lastScrollY && currentScrollY > offset) {
      // Si on fait défiler vers le bas
      gsap.to(navbar, { y: -offset, duration: 0.2, ease: 'power1.inOut' }); // Masque la navbar
    } else if (currentScrollY < lastScrollY) {
      // Si on fait défiler vers le haut
      gsap.to(navbar, { y: 0, duration: 0.2, ease: 'power1.inOut' }); // Affiche la navbar
    }

    lastScrollY = currentScrollY; // Met à jour la position de défilement
  };

  // Débouncer l'événement scroll
  let timeout: number; // Changez ici
  window.addEventListener('scroll', () => {
    clearTimeout(timeout);
    timeout = window.setTimeout(onScroll, 100); // Utilisez window.setTimeout
  });
};
