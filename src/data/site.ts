/** Site-wide facts and navigation, so a URL only ever changes here. */

const repo = 'https://github.com/allwiine/Reclaim';

export const SITE = {
  name: 'Reclaim',
  repo,
  issues: `${repo}/issues`,
  newIssue: `${repo}/issues/new`,
  releases: `${repo}/releases`,
  download: `${repo}/releases/latest`,
  catalogue: `${repo}/blob/main/Sources/ReclaimKit/Domain/TargetRegistry.swift`,
  nav: [
    { label: 'Source', href: repo },
    { label: 'Support', href: '/support/' },
    { label: 'Privacy', href: '/privacy/' },
  ],
  /** Footer links; the page a visitor is on is filtered out at render time. */
  footerNav: [
    { label: 'Home', href: '/' },
    { label: 'Support', href: '/support/' },
    { label: 'Privacy', href: '/privacy/' },
    { label: 'github.com/allwiine/Reclaim', href: repo },
  ],
} as const;
