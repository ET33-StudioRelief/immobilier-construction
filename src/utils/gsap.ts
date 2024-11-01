import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* GLOBAL */
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

/*BUTTON*/
// Fonction pour animer les boutons au survol
export const animateButtonTertiary = (): void => {
  // Sélectionner tous les boutons avec les classes .button.is-navbar-cta et .button.is-tertiary
  const buttons = document.querySelectorAll('.button.is-tertiary');

  buttons.forEach((button) => {
    const btn = button as HTMLElement;

    // Définir les styles de base
    btn.style.backgroundImage = 'linear-gradient(90deg, #1e303c 0%, #346c75 85%)';
    btn.style.color = '#ffffff';
    btn.style.border = '2px solid transparent'; // Bordure du bouton

    // Ajouter un événement pour le survol (mouseenter)
    btn.addEventListener('mouseenter', () => {
      gsap.to(btn, {
        backgroundImage: 'linear-gradient(90deg, #ffffff 0%, #fffefe 85%)', // Couleur finale du fond
        color: '#1e303c', // Couleur finale du texte
        borderColor: '#1e303c', // Couleur de bordure
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
        backgroundImage: 'linear-gradient(90deg, #1e303c 0%, #346c75 85%)', // Revenir à la couleur initiale du fond
        color: '#ffffff', // Revenir à la couleur initiale du texte
        duration: 0.4,
        ease: 'power1.inOut',
      });
    });
  });
};

/*BUTTON*/
// Fonction pour animer le button CTA NAVBAR
export const animateButtonNav = (): void => {
  // Sélectionner tous les boutons avec les classes .button.is-navbar-cta et .button.is-tertiary
  const buttons = document.querySelectorAll('.button.is-primary.is-nav');

  buttons.forEach((button) => {
    const btn = button as HTMLElement;

    // Définir les styles de base
    btn.style.backgroundColor = '#ffffff';
    btn.style.color = '#1e303c';
    btn.style.border = '2px solid transparent'; // Bordure du bouton

    // Ajouter un événement pour le survol (mouseenter)
    btn.addEventListener('mouseenter', () => {
      gsap.to(btn, {
        backgroundColor: 'transparent', // Couleur finale du fond
        color: '#ffffff', // Couleur finale du texte
        borderColor: '#ffffff', // Couleur de bordure
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
        backgroundColor: '#ffffff', // Couleur finale du fond
        color: '#1e303c', // Revenir à la couleur initiale du texte
        duration: 0.4,
        ease: 'power1.inOut',
      });
    });
  });
};

/*BUTTON*/
// Fonction pour animer le bouton secondary au survol
export const animateButtonSecondary = (): void => {
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
        backgroundImage: 'linear-gradient(90deg, #1e303c 0%, #346c75 85%)', // Changer en dégradé
        color: '#ffffff', // Couleur finale du texte
        duration: 0.4, // Durée de l'animation d'entrée
        ease: 'power1.inOut', // Type d'animation d'entrée
        onStart: () => {
          btn.style.cursor = 'pointer'; // Changer le curseur lors du survol
        },
      });
    });

    // Ajouter un événement pour la sortie de souris (mouseleave)
    btn.addEventListener('mouseleave', () => {
      // Réinitialiser le dégradé et les couleurs avec une animation fluide
      gsap.fromTo(
        btn,
        {
          backgroundImage: 'linear-gradient(90deg, #1e303c 0%, #346c75 85%)', // Valeur initiale pour l'animation
          color: '#ffffff', // Valeur initiale pour le texte
        },
        {
          backgroundImage: 'linear-gradient(90deg, #ffffff 0%, #fffefe 85%)', // Nouveau dégradé de blanc
          backgroundColor: '#ffffff', // Revenir à la couleur initiale du fond
          color: '#1e303c', // Revenir à la couleur initiale du texte
          duration: 0.6, // Durée de l'animation de sortie pour plus de douceur
          ease: 'power1.out', // Type d'animation de sortie
        }
      );
    });
  });
};

// SECTION APPARITION GLOBALE-
export const contactSection = (): void => {
  // Sélectionner toutes les sections à animer
  const elements = ['.section_contact'];

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

// Fonction pour mettre à jour l'année dans le footer
export function updateFooterYear(): void {
  const currentYear: number = new Date().getFullYear(); // Obtenez l'année actuelle
  const footerYearElement: HTMLElement | null = document.querySelector('.footer_year');

  if (footerYearElement) {
    footerYearElement.textContent = currentYear.toString(); // Mettez à jour le contenu
  }
}

/* SECTIONS */
// Animation pour faire apparaître plusieurs sections avec un slide depuis la droite
export const animateSectionsSlideRight = (): void => {
  // Liste des sélecteurs pour chaque section à animer
  const sections = ['.section_lp-testimonial', '.section_slider-galerie'];

  // Appliquer l'animation à chaque section
  sections.forEach((selector) => {
    // Vérifier si on est sur un écran supérieur à 767px pour '.section_lp-testimonial'
    if (selector === '.section_lp-testimonial' && window.innerWidth <= 767) return;

    gsap.from(selector, {
      x: 100, // Commence 100px à droite de la position finale
      opacity: 0, // Commence invisible
      duration: 3, // Durée de l'animation
      ease: 'power3.out', // Transition fluide
      scrollTrigger: {
        trigger: selector,
        start: 'top 80%', // L'animation démarre lorsque le haut de l'élément atteint 80% du viewport
        toggleActions: 'play reverse play reverse', // Joue l'animation à l'entrée et l'inverse à la sortie
      },
    });
  });
};

// SECTION APPARITION GLOBALE
export const animateSections = (): void => {
  // Sélectionner toutes les sections à animer
  const elements = [
    '.section_lp-catch-phrase',
    '.lp-maps_component .margin-bottom.margin-xxlarge',
    '.lp-features .margin-bottom.margin-large',
    '.section_hp-services .margin-bottom.margin-xxlarge',
  ];

  // Appliquer l'animation à chaque section
  elements.forEach((selector) => {
    // Condition pour '.section_lp-catch-phrase' sur les petits écrans
    const isCatchPhrase = selector === '.section_lp-catch-phrase';
    const isSmallScreen = window.innerWidth < 767;

    gsap.from(selector, {
      y: 50, // L'élément commencera 50px plus bas que sa position finale
      opacity: 0, // Commence invisible
      duration: 1.5, // Durée de l'animation
      ease: 'power3.out', // Utilise une ease similaire à celle de stepsLine
      scrollTrigger: {
        trigger: selector,
        start: 'top 80%',
        toggleActions:
          isCatchPhrase && isSmallScreen ? 'play none none none' : 'play reverse play reverse', // Joue l'animation une seule fois pour .section_lp-catch-phrase sur les petits écrans
      },
    });
  });
};

/* HOME PAGE */
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

/* HOME PAGE */
// Fonction d'animation pour plusieurs étapes avec directions différentes
export const stepsAnimation = (): void => {
  // Appliquer l'animation avec direction spécifique pour chaque étape
  animateStep('#step1', 'right');
  animateStep('#step2', 'left');
  animateStep('#step3', 'right');
  animateStep('#step4', 'left');
  animateStep('#step5', 'right');
};

/* HOME PAGE */
// SECTION APPARITION HomePage -
export const animateSectionsHp = (): void => {
  // Sélectionner toutes les sections à animer
  const elements = [
    '.section_hp-services',
    '.section_hp-step_heading',
    '.accueil_faq .margin-bottom.margin-xxlarge',
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

/* HOME PAGE */
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

/* LandingPage */
// SECTION APPARITION//
export const animateSectionLp = (): void => {
  // Sélectionner toutes les sections à animer
  const elements = [
    '.section_lp-features.is-first',
    '.section_lp-features.is-twice',
    '.section_lp-advantages',
    '.section_stats',
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

// Fonction pour animer le parallax sur .lp-galery_list
export const parallaxGallerieImage = (): void => {
  const items = document.querySelectorAll('.lp-galery_list');

  // Activer la fonction seulement si la largeur de l'écran est supérieure à 767px
  if (window.innerWidth <= 767) return;

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

/* À PROPOS */
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
    const element = document.querySelector(selector); // Vérifiez si l'élément existe

    if (element) {
      // Si l'élément existe, appliquez l'animation
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
    }
    // Ligne de console supprimée pour éviter les messages d'erreur
  });
};

// Lp Features_item
export const animateFeaturesItems = (): void => {
  // Sélectionner tous les éléments avec la classe .lp-features_item
  const featuresItems = document.querySelectorAll('.lp-features_item');

  // Appliquer l'animation à chaque élément
  featuresItems.forEach((item) => {
    gsap.from(item, {
      y: 50, // L'élément commence 50px plus bas que sa position finale
      opacity: 0, // Commence invisible
      duration: 2, // Durée de l'animation
      ease: 'power3.out', // Utilise une ease similaire à celle de stepsLine
      scrollTrigger: {
        trigger: item,
        start: 'top 80%', // Démarre lorsque le haut de l'élément atteint 80% du viewport
        toggleActions: 'play reverse play reverse', // Joue l'animation à l'entrée et l'inverse à la sortie
      },
    });
  });
};

// History
export const animateSectionsHistory = (): void => {
  gsap.from('.section_history', {
    y: 50, // L'élément commencera 50px plus bas que sa position finale
    opacity: 0, // Commence invisible
    duration: 1.5, // Durée de l'animation
    ease: 'power3.out', // Utilise une ease similaire à celle de stepsLine
    scrollTrigger: {
      trigger: '.section_history',
      start: 'top 80%', // Démarre lorsque le haut de l'élément atteint 80% du viewport
      toggleActions: 'play reverse play reverse', // Joue l'animation à l'entrée et l'inverse à la sortie
    },
  });
};

// Counter Function - +300
export function animateCounter(): void {
  const statsElement = document.getElementById('stats_compt');

  // Vérifier si l'élément existe
  if (!statsElement) return; // Quitter la fonction si l'élément n'est pas trouvé

  const countObj = { count: 0 }; // Objet pour le compteur

  // Configuration de ScrollTrigger
  ScrollTrigger.create({
    trigger: '.section_stats',
    start: 'top 80%',
    onEnter: () => {
      countObj.count = 0; // Réinitialiser le compteur
      gsap.to(countObj, {
        count: 300,
        duration: 2,
        ease: 'power3.out',
        onUpdate: () => {
          statsElement.textContent = `+${Math.round(countObj.count)}`; // Ajout du symbole '+' devant le nombre
        },
        onComplete: () => {
          statsElement.textContent = '+300'; // Assurer que le texte final est bien '+300'
        },
      });
    },
  });
}

// Counter Function - 100%
export function animatePercentageCounter(): void {
  const percElement = document.getElementById('stats-perc');

  // Vérifier si l'élément existe
  if (!percElement) return; // Quitter la fonction si l'élément n'est pas trouvé

  const percObj = { percent: 0 }; // Objet pour le compteur de pourcentage

  // Configuration de ScrollTrigger
  ScrollTrigger.create({
    trigger: '.section_stats', // Utilisez le même trigger pour que cela fonctionne avec la section appropriée
    start: 'top 80%',
    onEnter: () => {
      percObj.percent = 0; // Réinitialiser le compteur
      gsap.to(percObj, {
        percent: 100,
        duration: 2,
        ease: 'power3.out',
        onUpdate: () => {
          percElement.textContent = `+${Math.round(percObj.percent)}%`; // Ajout du symbole '%' à la fin
        },
        onComplete: () => {
          percElement.textContent = '+100%'; // Assurer que le texte final est bien '+100%'
        },
      });
    },
  });
}
