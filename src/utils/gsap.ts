import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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

// Timeline Guarantees - ABOUT PAGE
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

// STEPS ANIMATION - HOMEPAGE
const animateStep = (stepId: string, direction: 'right' | 'left'): void => {
  const xValue = direction === 'right' ? 100 : -100; // 100px vers la droite ou -100px vers la gauche

  gsap.from(stepId, {
    x: xValue, // Déplacement en fonction de la direction
    opacity: 0, // Commence invisible
    duration: 1.5,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: stepId,
      start: 'top 80%', // L'animation démarre lorsque le haut de l'élément atteint 80% du viewport
      toggleActions: 'play none none reverse', // Joue l'animation à l'entrée et la renverse à la sortie
    },
  });
};

// Fonction d'animation pour plusieurs étapes avec directions différentes
export const stepsAnimation = (): void => {
  // Appliquer l'animation avec direction spécifique pour chaque étape
  animateStep('#step1', 'right');
  animateStep('#step2', 'left');
  animateStep('#step3', 'right');
  animateStep('#step4', 'left');
};

// SECTION APPARITION -
export const animateSections = (): void => {
  // Sélectionner toutes les sections à animer
  const elements = [
    '.section_lp-maps',
    '.section_hp-services',
    '.section_lp-features.is-first',
    '.section_lp-features.is-twice',
    '.section_lp-advantages',
    '.section_lp-catch-phrase',
  ];

  // Appliquer l'animation à chaque section
  elements.forEach((selector) => {
    gsap.from(selector, {
      y: 50, // L'élément commencera 50px plus bas que sa position finale
      opacity: 0, // Commence invisible
      duration: 1.5, // Durée de l'animation
      ease: 'power3.out', // Utilise une ease similaire à celle de stepsLine
      scrollTrigger: {
        trigger: selector,
        start: 'top 80%', // Démarre lorsque le haut de l'élément atteint 80% du viewport
        toggleActions: 'play reverse play reverse', // Joue l'animation à l'entrée et l'inverse à la sortie
      },
    });
  });
};

// Animation pour faire apparaître 'section_lp-testimonial' avec un slide right
export const animateTestimonialSection = (): void => {
  gsap.from('.section_lp-testimonial', {
    x: 100, // L'élément commencera 100px à droite de sa position finale
    opacity: 0, // Commence invisible
    duration: 3, // Durée de l'animation
    ease: 'power3.out', // Transition fluide
    scrollTrigger: {
      trigger: '.section_lp-testimonial',
      start: 'top 80%', // L'animation démarre lorsque le haut de l'élément atteint 80% du viewport
      toggleActions: 'play reverse play reverse', // Joue l'animation à l'entrée et l'inverse à la sortie
    },
  });
};

// Fonction pour animer le parallax sur .hp-services_image
export const parallaxServiceImage = (): void => {
  // Sélectionner toutes les divs hp-services_item avec leurs images
  const items = document.querySelectorAll('.hp-services_item');

  // Appliquer l'effet parallax à chaque item
  items.forEach((item) => {
    const image = item.querySelector('.hp-services_image');

    if (image) {
      gsap.fromTo(
        image,
        { y: -100 }, // Position initiale de l'image (parallax à -50px)
        {
          y: 100, // La valeur finale lorsque l'élément est visible
          ease: 'none', // Effet linéaire pour un parallax fluide
          scrollTrigger: {
            trigger: item, // Utiliser chaque div hp-services_item comme déclencheur
            start: 'top bottom', // Démarre lorsque le haut de l'élément atteint le bas du viewport
            end: 'bottom top', // Fin lorsque le bas de l'élément atteint le haut du viewport
            scrub: true, // Liaison avec le scroll pour un effet fluide
          },
        }
      );
    }
  });
};

// Fonction pour animer le bouton au survol
export const animateButtonHover = (): void => {
  // Sélectionner tous les boutons avec la classe .button.is-secondary
  const buttons = document.querySelectorAll('.button.is-secondary');

  buttons.forEach((button) => {
    // Cast l'élément en HTMLElement
    const btn = button as HTMLElement;

    // Définir les styles de base
    btn.style.backgroundColor = '#ffffff'; // Couleur de fond initiale
    btn.style.color = '#1e303c'; // Couleur de texte initiale
    btn.style.border = '2px solid #1e303c'; // Bordure du bouton
    btn.style.position = 'relative'; // Positionnement pour l'animation

    // Ajouter un événement pour le survol (mouseenter)
    btn.addEventListener('mouseenter', () => {
      gsap.to(btn, {
        backgroundColor: '#1e303c', // Couleur finale du fond
        color: '#ffffff', // Couleur finale du texte
        duration: 0.4,
        ease: 'power1.inOut',
        onStart: () => {
          btn.style.cursor = 'pointer'; // Changer le curseur lors du survol
        },
      });
    });

    // Ajouter un événement pour la sortie de souris (mouseleave)
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, {
        backgroundColor: '#ffffff', // Revenir à la couleur initiale du fond
        color: '#1e303c', // Revenir à la couleur initiale du texte
        duration: 0.4,
        ease: 'power1.inOut',
      });
    });
  });
};

// Fonction pour animer le parallax sur .lp-galery_list
export const parallaxGallerieImage = (): void => {
  const items = document.querySelectorAll('.lp-galery_list');

  // Appliquer l'effet parallax à chaque item
  items.forEach((item) => {
    // Pour la colonne gauche
    const leftImages = item.querySelectorAll('.lp-galery_lightbox-link.is-left-col');
    if (leftImages.length) {
      gsap.fromTo(
        leftImages,
        { y: 0 },
        {
          y: -75,
          ease: 'none', // Effet linéaire pour un parallax fluide
          scrollTrigger: {
            trigger: '.lp-galery_list', // Utiliser chaque div lp-galery_lightbox-link comme déclencheur
            start: 'top bottom', // Démarre lorsque le haut de l'élément atteint le bas du viewport
            end: 'bottom 200', // Fin lorsque le bas de l'élément atteint le haut du viewport
            scrub: true, // Liaison avec le scroll pour un effet fluide
          },
        }
      );
    }

    // Pour la colonne centrale
    const centerImages = item.querySelectorAll('.lp-galery_lightbox-link.is-center-col');
    if (centerImages.length) {
      gsap.fromTo(
        centerImages,
        { y: 0 }, // Position initiale de l'image (parallax à -100px)
        {
          y: 125, // La valeur finale lorsque l'élément est visible
          ease: 'none', // Effet linéaire pour un parallax fluide
          scrollTrigger: {
            trigger: '.lp-galery_list', // Utiliser chaque div lp-galery_lightbox-link comme déclencheur
            start: 'top bottom', // Démarre lorsque le haut de l'élément atteint le bas du viewport
            end: 'bottom 200', // Fin lorsque le bas de l'élément atteint le haut du viewport
            scrub: true, // Liaison avec le scroll pour un effet fluide
          },
        }
      );
    }

    // Pour la colonne droite
    const rightImages = item.querySelectorAll('.lp-galery_lightbox-link.is-right-col');
    if (rightImages.length) {
      gsap.fromTo(
        rightImages,
        { y: 0 }, // Position initiale de l'image (parallax à -50px)
        {
          y: -100, // La valeur finale lorsque l'élément est visible
          ease: 'none', // Effet linéaire pour un parallax fluide
          scrollTrigger: {
            trigger: '.lp-galery_list', // Utiliser chaque div lp-galery_lightbox-link comme déclencheur
            start: 'top bottom', // Démarre lorsque le haut de l'élément atteint le bas du viewport
            end: 'bottom 200', // Fin lorsque le bas de l'élément atteint le haut du viewport
            scrub: true, // Liaison avec le scroll pour un effet fluide
          },
        }
      );
    }
  });
};
