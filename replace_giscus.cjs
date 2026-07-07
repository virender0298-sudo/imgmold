const fs = require('fs');

let content = fs.readFileSync('src/pages/index.astro', 'utf8');

const giscusHtml = `<!-- Giscus Comments -->
    <div class="bg-[#f5f5f7] dark:bg-[#1c1c1e] rounded-3xl p-8 mb-12 border border-[#e0e0e0] dark:border-[#2a2a2c] shadow-[0_4px_24px_rgba(0,0,0,0.04)] dark:shadow-none">
      <script is:inline src="https://giscus.app/client.js"
        data-repo="virender0298-sudo/imgmold"
        data-repo-id="MDEwOlJlcG9zaXRvcnkxMjkyNDM3NjA3"
        data-category="Announcements"
        data-category-id="DIC_kwDOTQkIZ84DAsnV"
        data-mapping="pathname"
        data-strict="0"
        data-reactions-enabled="1"
        data-emit-metadata="0"
        data-input-position="bottom"
        data-theme="preferred_color_scheme"
        data-lang="en"
        crossorigin="anonymous"
        async>
      </script>
    </div>
  `;

// Replace the previous Giscus block with the new one containing is:inline
content = content.replace(/<!-- Giscus Comments -->[\s\S]*?(?=<\/section>)/, giscusHtml);

fs.writeFileSync('src/pages/index.astro', content);
