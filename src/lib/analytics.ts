// Inisialisasi Google Analytics 4 (gtag.js) dengan Measurement ID dari connector.
// Menggunakan import.meta.env agar ID tidak hardcoded di HTML.

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

const measurementId = import.meta.env
  .VITE_LOVABLE_CONNECTOR_GOOGLE_ANALYTICS_API_KEY as string | undefined;

export function initGoogleAnalytics(): void {
  if (typeof window === "undefined") return;

  if (!measurementId) {
    console.warn(
      "[GA4] VITE_LOVABLE_CONNECTOR_GOOGLE_ANALYTICS_API_KEY tidak tersedia.",
    );
    return;
  }

  if (document.querySelector(`script[src*="${measurementId}"]`)) {
    return; // sudah dimuat
  }

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function (...args: unknown[]) {
    window.dataLayer.push(args);
  };
  window.gtag("js", new Date());
  window.gtag("config", measurementId, {
    send_page_view: false, // kita kirim page_view manual saat route change
    cookie_flags: "SameSite=None;Secure",
  });
}

export function trackPageView(path: string): void {
  if (typeof window === "undefined" || !window.gtag || !measurementId) return;

  window.gtag("event", "page_view", {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
    send_to: measurementId,
  });
}

export function trackEvent(
  name: string,
  params?: Record<string, string | number | boolean>,
): void {
  if (typeof window === "undefined" || !window.gtag || !measurementId) return;

  window.gtag("event", name, { ...params, send_to: measurementId });
}
