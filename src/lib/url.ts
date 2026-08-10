/** True when `href` is an internal link to the page at `pathname`. */
export function isCurrentPage(href: string, pathname: string): boolean {
  if (!href.startsWith('/')) return false;
  const normalize = (path: string) => path.replace(/\/+$/, '') || '/';
  return normalize(href) === normalize(pathname);
}
