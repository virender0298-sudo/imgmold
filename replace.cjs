const fs = require('fs');

let content = fs.readFileSync('src/pages/index.astro', 'utf8');

const disqusHtml = `<!-- Disqus Comments -->
    <div class="bg-[#f5f5f7] dark:bg-[#1c1c1e] rounded-3xl p-8 mb-12 border border-[#e0e0e0] dark:border-[#2a2a2c] shadow-[0_4px_24px_rgba(0,0,0,0.04)] dark:shadow-none">
      <div id="disqus_thread"></div>
      <script>
          var disqus_config = function () {
              this.page.url = window.location.href;
              this.page.identifier = 'home';
          };
          (function() {
              var d = document, s = d.createElement('script');
              s.src = 'https://imgmold.disqus.com/embed.js';
              s.setAttribute('data-timestamp', +new Date());
              (d.head || d.body).appendChild(s);
          })();
      </script>
      <noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
    </div>
  `;

content = content.replace(/<!-- Review Form -->[\s\S]*?(?=<\/section>)/, disqusHtml);
content = content.replace(/\/\/ Review Form Logic[\s\S]*?(?=\s*<\/script>)/, '');

fs.writeFileSync('src/pages/index.astro', content);
