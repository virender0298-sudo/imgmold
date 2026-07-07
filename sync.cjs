const fs = require('fs');
const indexContent = fs.readFileSync('src/pages/index.astro', 'utf8');
const langFrontmatter = `---
import Layout from '../../layouts/Layout.astro';
import ImageResizerWorkspace from '../../components/ImageResizerWorkspace';
import FAQ from '../../components/FAQ.astro';
import { nonDefaultLocales } from '../../i18n/config';
import { t, useTranslations } from '../../i18n/utils';

export function getStaticPaths() {
  return nonDefaultLocales.map((lang) => ({
    params: { lang },
  }));
}

const { lang } = Astro.params;
const locale = lang || 'en';

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "ImgMold.com Local Resizer",
  "operatingSystem": "All",
  "applicationCategory": "UtilityApplication",
  "offers": {
    "@type": "Offer",
    "price": "0.00",
    "priceCurrency": "USD"
  },
  "description": t(locale, 'site.description')
};
---`;
const indexWithoutFrontmatter = indexContent.replace(/^---[\s\S]*?---/, '');
fs.writeFileSync('src/pages/[lang]/index.astro', langFrontmatter + indexWithoutFrontmatter);
console.log('Successfully synced files!');
