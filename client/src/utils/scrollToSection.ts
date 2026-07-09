// Scrolls to an in-page section anchor.
// Manual offset calculation — avoids iOS Safari quirks with scroll-margin-top
// and gives pixel-identical results on mobile and desktop.
export function scrollToSection(href: string) {
  const el = document.querySelector(href) as HTMLElement | null
  if (!el) return
  // Navbar is 64px on mobile (< 900px), 72px on desktop
  const navH = window.innerWidth < 900 ? 64 : 72
  const gap = 8
  const top = window.scrollY + el.getBoundingClientRect().top - navH - gap
  window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
}
