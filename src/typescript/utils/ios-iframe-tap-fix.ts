/**
 * Fix iOS Safari/WebKit bug where taps on the main page (and embedded YouTube
 * iframes) stop dispatching after a touch lands inside a cross-origin iframe.
 *
 * WebKit keeps the iframe's security origin in its "potential tap" state and
 * never clears it until a fresh `touchstart` is observed on the parent
 * document, so subsequent taps on the videos silently do nothing.
 *
 * Registering a passive no-op `touchstart` listener on the document guarantees
 * WebKit always sees a top-level touch and resets that state.
 *
 * @see https://bugs.webkit.org/show_bug.cgi?id=185001
 */
export function initIosIframeTapFix(): void {
  const noop = (): void => {};
  document.addEventListener('touchstart', noop, { passive: true });
}
