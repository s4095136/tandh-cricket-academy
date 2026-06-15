// Smoothly scrolls to an in-page section, accounting for the fixed navbar.
//
// Used for any in-page anchor link (e.g. the Hero's "Learn more" button and
// the Navbar's nav links) so they all share the same offset logic instead of
// relying on the browser's native (instant, unoffset) anchor jump.
export function scrollToSection(href: string) {
  const el = document.querySelector(href)
  if (!el) return

  let targetY = el.getBoundingClientRect().top + window.scrollY

  // The philosophy section is sized to exactly fill the viewport below the
  // fixed navbar, so shift the scroll position up by the navbar's height -
  // this tucks that empty space behind the navbar instead of having the
  // section's own content start underneath it.
  if (href === '#philosophy') {
    const navbar = document.querySelector('header.MuiAppBar-root')
    const navH = navbar ? navbar.getBoundingClientRect().height : 0
    targetY = Math.max(0, targetY - navH)
  }

  window.scrollTo({ top: targetY, behavior: 'smooth' })
}
