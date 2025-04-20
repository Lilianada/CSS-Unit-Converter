// JSON-LD Structured Data for Organization/Site
export default function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Lily's Lab",
          "url": "https://lilyslab.xyz/",
          "logo": "https://lilyslab.xyz/images/logo.png",
          "sameAs": [
            "https://twitter.com/LilysLab"
          ],
          "contactPoint": [{
            "@type": "ContactPoint",
            "email": "hello@lilyslab.xyz",
            "contactType": "customer support",
            "url": "https://lilyslab.xyz/contact"
          }]
        }),
      }}
    />
  );
}
