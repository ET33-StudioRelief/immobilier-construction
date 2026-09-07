import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SELECTOR = '[data-element="navbar"]';
const SCROLL_THRESHOLD = 5;
const SCROLL_DELTA = 5;
const SCROLLED_THRESHOLD = 80;
const OVERLAY_WHEEL_DELTA = 1;
const OVERLAY_FADE_MS = 350;

function isMobileMenuOpen(navbar: HTMLElement): boolean {
  return (
    navbar.querySelector('.w-nav-button.w--open') !== null ||
    navbar.querySelector('.w-nav-menu[data-nav-menu-open]') !== null
  );
}

function isPointerOverMenu(navbar: HTMLElement, x: number, y: number): boolean {
  const menu = navbar.querySelector<HTMLElement>('.w-nav-menu');
  if (!menu) return false;

  const rect = menu.getBoundingClientRect();
  return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
}

function hideOverlay(overlay: HTMLElement): void {
  if (window.getComputedStyle(overlay).display === 'none') return;

  overlay.style.display = 'block';
  overlay.style.pointerEvents = 'none';

  window.requestAnimationFrame(() => {
    overlay.style.opacity = '0';
    overlay.style.visibility = 'hidden';
  });

  window.setTimeout(() => {
    overlay.style.display = 'none';
    overlay.style.removeProperty('opacity');
    overlay.style.removeProperty('visibility');
    overlay.style.removeProperty('pointer-events');
  }, OVERLAY_FADE_MS);
}

function cleanupMenuState(navbar: HTMLElement): void {
  navbar.classList.remove('w--open');
  navbar.querySelector('.w-nav-button')?.classList.remove('w--open');

  const menu = navbar.querySelector<HTMLElement>('.w-nav-menu');
  menu?.classList.remove('w--nav-menu-open');
  menu?.removeAttribute('data-nav-menu-open');

  const overlay = navbar.querySelector<HTMLElement>('.w-nav-overlay');
  if (overlay) hideOverlay(overlay);

  document.body.classList.remove('w--nav-menu-open');
  document.body.style.removeProperty('overflow');
  document.body.style.removeProperty('position');
}

function isOverlayVisible(navbar: HTMLElement): boolean {
  const overlay = navbar.querySelector<HTMLElement>('.w-nav-overlay');
  if (!overlay) return false;

  const style = window.getComputedStyle(overlay);
  return style.display !== 'none' && parseFloat(style.opacity) > 0;
}

function closeMobileMenu(navbar: HTMLElement): void {
  if (!isMobileMenuOpen(navbar)) return;

  navbar.querySelector<HTMLElement>('.w-nav-button')?.click();

  window.requestAnimationFrame(() => {
    if (isMobileMenuOpen(navbar) || isOverlayVisible(navbar)) {
      cleanupMenuState(navbar);
    }
  });
}

/** Closes the menu on scroll-down over the overlay, outside `.w-nav-menu`. */
function initOverlayMenuClose(navbar: HTMLElement): void {
  const menu = navbar.querySelector<HTMLElement>('.w-nav-menu');

  const handleWheel = (event: WheelEvent): void => {
    if (!isMobileMenuOpen(navbar)) return;
    if (event.deltaY < OVERLAY_WHEEL_DELTA) return;
    if (isPointerOverMenu(navbar, event.clientX, event.clientY)) return;
    if (menu?.contains(event.target as Node)) return;

    closeMobileMenu(navbar);
  };

  window.addEventListener('wheel', handleWheel, { capture: true, passive: true });
}

/**
 * Hides the navbar on scroll down (slide up) and reveals it on scroll up (slide down).
 * Toggles `.scrolled` for a readable background past the hero.
 */
export function initNavbar(): void {
  const navbar = document.querySelector<HTMLElement>(SELECTOR);
  if (!navbar) return;

  initOverlayMenuClose(navbar);

  let isHidden = false;
  let lastScrollY = window.scrollY;

  const updateScrolled = (scrollY: number): void => {
    navbar.classList.toggle('scrolled', scrollY > SCROLLED_THRESHOLD);
  };

  /**
   * Removes the inline `transform` once the navbar is settled in its visible
   * position. On iOS Safari a `position: fixed` element that keeps a transform
   * stays promoted to a composited layer whose hit-test region can swallow taps
   * on the content below it (the cross-origin YouTube iframes), which is why the
   * videos became untappable only after a scroll-up brought the navbar back.
   */
  const clearTransform = (): void => {
    if (!isHidden) gsap.set(navbar, { clearProps: 'transform' });
  };

  const show = (): void => {
    if (!isHidden) return;
    isHidden = false;
    gsap.to(navbar, {
      yPercent: 0,
      duration: 0.3,
      ease: 'power2',
      overwrite: 'auto',
      onComplete: clearTransform,
    });
  };

  const hide = (): void => {
    if (isHidden) return;
    isHidden = true;
    gsap.to(navbar, {
      yPercent: -100,
      duration: 0.3,
      ease: 'power2',
      overwrite: 'auto',
    });
  };

  updateScrolled(window.scrollY);

  ScrollTrigger.create({
    start: 0,
    end: 'max',
    onUpdate: (self) => {
      const scrollY = self.scroll();

      updateScrolled(scrollY);

      if (isMobileMenuOpen(navbar) || scrollY <= SCROLL_THRESHOLD) {
        show();
        lastScrollY = scrollY;
        return;
      }

      const delta = scrollY - lastScrollY;

      if (delta > SCROLL_DELTA) {
        hide();
        lastScrollY = scrollY;
      } else if (delta < -SCROLL_DELTA) {
        show();
        lastScrollY = scrollY;
      }
    },
  });
}
