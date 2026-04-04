import { Helmet } from "react-helmet-async";

const SITE_URL = "https://www.sewakamarperjamgresik.org";
const DEFAULT_IMAGE = "https://storage.googleapis.com/gpt-engineer-file-uploads/dg7f8ZXRm0deGNbI2zQiFlKoeEB3/social-images/social-1774826632651-WhatsApp_Image_2026-03-24_at_13.41.15_(1).webp";

interface SeoMetaProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: string;
}

interface JsonLdProps {
  jsonLd?: Record<string, unknown>;
}

const SeoMeta = ({ title, description, path = "", image, type = "website", jsonLd }: SeoMetaProps & JsonLdProps) => {
  const url = `${SITE_URL}${path}`;
  const img = image || DEFAULT_IMAGE;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={img} />
      <meta property="og:site_name" content="Sewa Apartemen Gunawangsa Gresik" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={img} />

      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
};

export default SeoMeta;
