import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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

// History
export const animateSectionsHistory = (): void => {
  if (!document.querySelector('.section_history')) return;

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
