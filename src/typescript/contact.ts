// Fonction pour gérer la redirection de confirmation
/*export const handleConfirmationRedirect = (): void => {
  // Si nous sommes sur la page de confirmation
  if (window.location.pathname.includes('/confirmation')) {
    // Récupérer le dernier formulaire soumis depuis le localStorage
    const lastFormId = localStorage.getItem('lastFormSubmitted');

    setTimeout(function () {
      let newPath = '/confirmation'; // chemin par défaut

      // Déterminer le nouveau chemin selon le formulaire soumis
      switch (lastFormId) {
        case 'wf-form-Form-Lp-Architecte':
          newPath = '/landing/architecte/confirmation';
          break;
        case 'wf-form-Form-Lp-Constructeur':
          newPath = '/landing/constructeur/confirmation';
          break;
        case 'wf-form-Form-Lp-Maitre-oeuvre':
          newPath = '/landing/maitre-oeuvre/confirmation';
          break;
      }

      // Modifier l'URL
      if (window.location.pathname !== newPath) {
        window.history.replaceState(null, '', newPath);
      }

      // Nettoyer le localStorage
      localStorage.removeItem('lastFormSubmitted');
    }, 100);
  }

  // Écouter la soumission des formulaires
  const forms = document.querySelectorAll(
    '#wf-form-Form-Lp-Architecte, #wf-form-Form-Lp-Constructeur, #wf-form-Form-Lp-Maitre-oeuvre'
  );
  forms.forEach((form) => {
    form.addEventListener('submit', function () {
      // Sauvegarder l'ID du formulaire soumis
      localStorage.setItem('lastFormSubmitted', this.id);
    });
  });
};*/

const CONTACT_EMAIL_STORAGE_KEY = 'contactEmail';

function normalizePathname(pathname: string): string {
  return pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
}

/**
 * Récupère la valeur de `#email-contact` et la met en cache lors de la soumission
 * du formulaire `#contract-form`.
 *
 * Ne bloque PAS la soumission (important pour les formulaires Webflow).
 */
export function cacheContactEmailOnSubmit(): void {
  const form = document.getElementById('contract-form') as HTMLFormElement | null;
  if (!form) return;

  const emailField = document.getElementById('email-contact') as HTMLInputElement | null;
  if (!emailField) return;

  // Évite d'empiler plusieurs listeners si la fonction est appelée plusieurs fois
  const alreadyBound = form.getAttribute('data-contact-email-bound') === 'true';
  if (alreadyBound) return;
  form.setAttribute('data-contact-email-bound', 'true');

  form.addEventListener('submit', () => {
    const emailValue = (emailField.value || '').trim();
    if (!emailValue) return;
    localStorage.setItem(CONTACT_EMAIL_STORAGE_KEY, emailValue);
  });
}

/**
 * Sur la page `/confirmation`, affiche l'email mis en cache dans `#field-contact`.
 */
export function displayCachedContactEmailOnConfirmation(): void {
  const pathname = normalizePathname(window.location.pathname);
  if (!pathname.includes('/confirmation')) return;

  const target = document.getElementById('field-contact');
  if (!target) return;

  const storedEmail = localStorage.getItem(CONTACT_EMAIL_STORAGE_KEY);
  if (!storedEmail) return;

  target.textContent = storedEmail;
}

/**
 * Helper à appeler depuis `src/index.ts` pour activer l'ensemble du flux.
 */
export function initContactEmailFlow(): void {
  cacheContactEmailOnSubmit();
  displayCachedContactEmailOnConfirmation();
}
