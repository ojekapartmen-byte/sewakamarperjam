// Mengarahkan pengunjung dari domain Lovable ke domain utama (custom domain)
// agar sinyal SEO terkonsolidasi di satu domain kanonik.
// Preview editor (id-preview--*.lovable.app) sengaja tidak dialihkan.

const CANONICAL_HOST = "www.sewakamarperjamgresik.org";
const REDIRECT_HOSTS = ["sewakamarperjam.lovable.app"];

export function redirectToCanonicalDomain() {
  if (typeof window === "undefined") return;

  const { hostname, pathname, search, hash } = window.location;
  if (!REDIRECT_HOSTS.includes(hostname)) return;

  window.location.replace(
    `https://${CANONICAL_HOST}${pathname}${search}${hash}`,
  );
}
