# Brutechgyan Website Requirements (So Far)

Last updated: 2026-03-10

## Project Goal

Build and launch a company website for Brutechgyan with service information, contact/support details, and production deployment on Cloudflare.

## Business Content Requirements

- Company positioning and hero message
- Technology providers / tech stack section
- Building tech solutions section
- Website and mobile app development section
- About section
- Portfolio section
- Testimonials section
- Pricing section
- Contact and support section
- Project inquiry form

## Legal and Additional Pages

- Privacy Policy page
- Terms page
- Careers page

## SEO and Discoverability

- Meta description and social tags
- Canonical URL on homepage
- robots.txt
- sitemap.xml
- Root-to-www canonical redirect (301)

## Contact Form Requirements

- Form fields: name, email, phone, service, message
- Spam honeypot field
- Server-side API endpoint at `/api/contact`
- Email delivery via Resend API
- Config via Cloudflare Pages secrets:
  - `RESEND_API_KEY`
  - `CONTACT_TO_EMAIL`
  - `CONTACT_FROM_EMAIL`

## Infrastructure and Deployment

- Host on Cloudflare Pages
- Use Cloudflare Pages Functions for API
- Custom domains active:
  - `brutechgyan.com`
  - `www.brutechgyan.com`
- SSL active
- Security headers enabled via `_headers`
- GitHub repository backup in place

## Analytics

- Cloudflare Web Analytics enabled with automatic setup

## Implemented Contact Information

- General inquiries email: `contact@brutechgyan.com`
- Technical support email: `support@brutechgyan.com`
- Project discussions email: `sales@brutechgyan.com`
- Main phone: `(469) 573-0772`
- Support windows shown in:
  - India Standard Time (IST)
  - US Central Time

## Current Status

- Website is live
- Contact form API responds successfully
- Legal routes working (`/privacy`, `/terms`)
- Canonical redirect from apex to www working
