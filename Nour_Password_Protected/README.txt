NOUR BIRTHDAY WEBSITE — CLOUDFLARE PAGES PASSWORD-PROTECTED VERSION

IMPORTANT:
- Deploy this as a Cloudflare PAGES project with Git integration (not plain GitHub Pages).
- Keep the repository PRIVATE if possible, because it contains personal photos.
- All requests, including direct image/CSS/JS URLs, are protected by functions/_middleware.js.
- Do not store the password in any file or GitHub. Configure it as an encrypted secret named SITE_PASSWORD.

Cloudflare Pages setup:
1. Upload the contents of this folder to the ROOT of a GitHub repository. Keep index.html at the root and include the functions/ and static/ folders.
2. In Cloudflare, create a Pages project connected to that repository.
3. Framework preset: None. Build command: leave blank. Build output directory: . (a single dot), so the root directory is deployed.
4. Before testing the deployment, open the Pages project > Settings > Variables and Secrets (sometimes shown under Settings > Functions/Variables and Secrets) > Add, choose an encrypted Secret, name it SITE_PASSWORD, and set your chosen password. Save and redeploy if needed.
5. Open the public *.pages.dev URL. The browser should ask for a username and password. Username can be nour; enter the SITE_PASSWORD value as the password.
6. Share the URL and password separately with Nour.

Security note:
- Browser Basic Authentication may save credentials in the browser until it is closed; test in a private/incognito window to confirm the prompt appears.
- Anyone who knows the password can access the site. Use a unique password and share it privately.
- Keep the GitHub repository private. The deployed website itself remains reachable by URL, but its pages and assets require authentication.
