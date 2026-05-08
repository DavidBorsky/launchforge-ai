import JSZip from "jszip";
import { BrandingKit, GeneratedStartupContent, SEOConfig } from "@/types";

export async function buildProjectZip(project: {
  name: string;
  branding: BrandingKit;
  generatedContent: GeneratedStartupContent;
  seo: SEOConfig;
}) {
  const zip = new JSZip();
  const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${project.seo.title}</title>
    <meta name="description" content="${project.seo.description}" />
    <link rel="stylesheet" href="./styles.css" />
  </head>
  <body>
    <main class="shell">
      <section class="hero">
        <span class="eyebrow">${project.branding.logoPlaceholder}</span>
        <h1>${project.generatedContent.hero.headline}</h1>
        <p>${project.generatedContent.hero.subheadline}</p>
        <div class="actions">
          <a href="#pricing">${project.generatedContent.hero.ctaPrimary}</a>
          <a href="#faq" class="secondary">${project.generatedContent.hero.ctaSecondary}</a>
        </div>
      </section>
      <section>
        <h2>Features</h2>
        ${project.generatedContent.features
          .map((feature) => `<article><h3>${feature.title}</h3><p>${feature.description}</p></article>`)
          .join("")}
      </section>
      <section id="pricing">
        <h2>Pricing</h2>
        ${project.generatedContent.pricing
          .map(
            (tier) =>
              `<article><h3>${tier.name}</h3><strong>${tier.price}</strong><p>${tier.description}</p><ul>${tier.features
                .map((item) => `<li>${item}</li>`)
                .join("")}</ul></article>`
          )
          .join("")}
      </section>
      <section id="faq">
        <h2>FAQ</h2>
        ${project.generatedContent.faq
          .map((item) => `<details><summary>${item.question}</summary><p>${item.answer}</p></details>`)
          .join("")}
      </section>
      <section>
        <h2>${project.generatedContent.contact.headline}</h2>
        <p>${project.generatedContent.contact.description}</p>
        <a href="mailto:${project.generatedContent.contact.email}">${project.generatedContent.contact.email}</a>
      </section>
    </main>
  </body>
</html>`;

  const css = `:root {
  --primary: ${project.branding.palette.primary};
  --secondary: ${project.branding.palette.secondary};
  --accent: ${project.branding.palette.accent};
  --background: ${project.branding.palette.background};
  --text: ${project.branding.palette.text};
  --muted: ${project.branding.palette.muted};
}
* { box-sizing: border-box; }
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background: linear-gradient(180deg, var(--background), white);
  color: var(--text);
}
.shell { max-width: 960px; margin: 0 auto; padding: 64px 24px; }
.hero, section {
  margin-bottom: 32px;
  padding: 24px;
  border-radius: 24px;
  background: rgba(255,255,255,0.86);
  border: 1px solid rgba(15,23,42,0.08);
}
.eyebrow {
  display: inline-flex;
  padding: 8px 12px;
  border-radius: 999px;
  background: var(--muted);
  color: var(--secondary);
}
h1, h2, h3 { color: var(--primary); }
.actions { display: flex; gap: 12px; margin-top: 16px; flex-wrap: wrap; }
a {
  color: white;
  text-decoration: none;
  background: var(--primary);
  padding: 12px 18px;
  border-radius: 999px;
}
a.secondary {
  background: transparent;
  color: var(--primary);
  border: 1px solid var(--primary);
}
article { margin-top: 18px; }
ul { padding-left: 20px; }`;

  const readme = `LaunchForge AI Export

Project: ${project.name}

Files:
- index.html
- styles.css

To deploy:
1. Upload the files to any static host.
2. Or create a new Vercel project and deploy this folder.
3. Update copy, branding, and contact details as needed.
`;

  zip.file("index.html", html);
  zip.file("styles.css", css);
  zip.file("README.txt", readme);
  return zip.generateAsync({ type: "nodebuffer" });
}
