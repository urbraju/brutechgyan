# Brutechgyan Website

[![Cloudflare Pages Pipeline](https://github.com/urbraju/brutechgyan/actions/workflows/cloudflare-pages-pipeline.yml/badge.svg)](https://github.com/urbraju/brutechgyan/actions/workflows/cloudflare-pages-pipeline.yml)

Static marketing website for `www.brutechgyan.com`, including Cloudflare Pages Functions for contact form delivery.

## Files

- `index.html`: Website content and sections
- `styles.css`: Visual design and responsive styles
- `script.js`: Mobile menu and contact form API submission
- `privacy.html`, `terms.html`, `careers.html`: Extra pages
- `functions/api/contact.js`: Cloudflare Pages Function for real inquiry emails
- `sitemap.xml`, `robots.txt`: SEO files
- `_headers`, `_redirects`: Domain and security routing tweaks

## Run Locally

Open `index.html` in a browser, or use a local static server:

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

To test Pages Functions locally, use Wrangler:

```bash
cp .dev.vars.example .dev.vars
npx wrangler pages dev .
```

Then visit the local URL shown by Wrangler.

## Deploy on Cloudflare Pages

1. Push this folder to a GitHub repository.
2. In Cloudflare dashboard, go to `Workers & Pages` -> `Create` -> `Pages`.
3. Connect your GitHub repository.
4. Build settings:
   - Framework preset: `None`
   - Build command: *(leave empty)*
   - Build output directory: `/`
5. Add production environment variables in Pages settings:
   - `RESEND_API_KEY`
   - `CONTACT_TO_EMAIL`
   - `CONTACT_FROM_EMAIL`
6. Deploy.
7. In Pages project settings, add custom domain `www.brutechgyan.com`.
8. In Cloudflare DNS, point `www` CNAME to the Pages domain shown by Cloudflare.

## GitHub Pipeline (Each Push)

This repository includes a GitHub Actions pipeline at:

- `.github/workflows/cloudflare-pages-pipeline.yml`

What it does:

1. Runs validation checks on every push and pull request.
2. Deploys automatically to Cloudflare Pages on every push.
   - `main` branch updates production.
   - Other branches create/update preview deployments.

Required GitHub repository secrets:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

How to add secrets:

1. GitHub repo -> `Settings` -> `Secrets and variables` -> `Actions`.
2. Click `New repository secret`.
3. Add the two secrets listed above.

Token permission recommendation:

- Cloudflare API token with `Account:Cloudflare Pages:Edit` and `Zone:Zone:Read`.

## CLI Setup (Recommended)

Use these commands from the project root:

```bash
npx wrangler login
npx wrangler pages project create brutechgyan-site --production-branch main
```

Set production secrets (Wrangler prompts for each value):

```bash
npx wrangler pages secret put RESEND_API_KEY --project-name brutechgyan-site
npx wrangler pages secret put CONTACT_TO_EMAIL --project-name brutechgyan-site
npx wrangler pages secret put CONTACT_FROM_EMAIL --project-name brutechgyan-site
```

Deploy manually from local files:

```bash
npx wrangler pages deploy . --project-name brutechgyan-site --branch main
```

Attach domain:

```bash
npx wrangler pages domain add www.brutechgyan.com --project-name brutechgyan-site
```

## Real Contact Form Setup

The homepage form submits to `/api/contact`, implemented in `functions/api/contact.js`.

It uses [Resend](https://resend.com) email API, so you need:

1. A Resend account and API key.
2. A verified sender domain/email in Resend.
3. Cloudflare Pages environment variables configured.

If these are missing, the API will return a configuration error.

### Resend Sender Domain Checklist

1. In Resend, add and verify domain `brutechgyan.com`.
2. Create sender identity `no-reply@brutechgyan.com`.
3. Use this exact format for env value:
    - `CONTACT_FROM_EMAIL=Brutechgyan Contact <no-reply@brutechgyan.com>`

## Live Form Test

After deployment, test the API directly:

```bash
curl -X POST https://www.brutechgyan.com/api/contact \
   -H "content-type: application/json" \
   -d '{
      "name":"Cloudflare Test",
      "email":"contact@brutechgyan.com",
      "phone":"(469) 573-0772",
      "service":"Web Development",
      "message":"Live form API test",
      "website":""
   }'
```

Expected response:

```json
{"ok":true}
```

## SEO and Domain Tweaks Included

- Canonical and social meta tags added to pages.
- `robots.txt` and `sitemap.xml` created.
- Legal pages are available as:
   - `/privacy`
   - `/terms`
   - `/careers`
- Security and caching headers configured in `_headers`.

## Cloudflare Web Analytics

Web Analytics is enabled from Cloudflare dashboard using automatic setup.

1. Go to Cloudflare dashboard -> `Analytics & Logs` -> `Web Analytics`.
2. Confirm `brutechgyan.com` shows `Automatic setup`.
3. No token snippet is required in `index.html`.

## Before Going Live

- Add real project case studies and testimonials.
- Optionally add analytics (Cloudflare Web Analytics or GA4).
