export default function Head() {
  return (
    <>
      <title>Mediclear AI</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta name="description" content="Mediclear - Medical Coder Agent" />
      <link rel="icon" href="/images/favicon.ico" />

      {/* Open Graph tags */}
      <meta property="og:title" content="Mediclear AI" />
      <meta property="og:description" content="Mediclear - Medical Coder Agent" />
      <meta property="og:image" content="https://www.mediclear.ai/og-image.png?v=1" />
      <meta property="og:url" content="https://mediclear.ai" />
      <meta property="og:type" content="website" />

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="mediclear.ai" />
      <meta property="twitter:url" content="https://mediclear.ai" />
      <meta name="twitter:title" content="Mediclear AI" />
      <meta name="twitter:description" content="Mediclear - Medical Coder Agent" />
      <meta name="twitter:image" content="https://www.mediclear.ai/og-image.png?v=1" />
    </>
  );
}
