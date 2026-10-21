# MyDesign3D

Next.js website with a Payload CMS admin dashboard backed by PostgreSQL.

## Local setup

Use Node 22 (`nvm use` reads `.nvmrc`), then install dependencies with `npm install`. Install PostgreSQL 17 and start a local server. Copy `.env.example` to `.env.local`, set a real `DATABASE_URL` and a long random `PAYLOAD_SECRET`, then run:

```bash
npm run cms:seed
npm run dev
```

The current development database is stored in the ignored `.data/postgres` directory and listens on port 5433. To restart that existing database with Homebrew PostgreSQL 17:

```bash
/opt/homebrew/opt/postgresql@17/bin/pg_ctl -D .data/postgres -o '-h 127.0.0.1 -p 5433 -k /tmp' -l .data/postgres.log start
```

Open `http://localhost:3000/admin` and create the first administrator. Subsequent visits use the login page. The public site remains available at its existing URLs.

## Editing content

- **Website → Pages:** choose a page by its `path`, then edit its section tabs. Text, images, links, lists, form copy, pricing, and SEO title/description are editable. List items can be added, removed, or reordered. An advanced JSON view is available for unusual structures.
- **Website → Site Settings:** branding and logo paths, the consultation destination, contact details, shared navigation, service form labels, and footer text. Navigation items can be added, removed, or reordered.
- **Content → Posts:** article titles, excerpts, dates, images, category, and article body. New posts use the rich-text `body` field; seeded posts also have legacy `blocks` content.
- **Content → Comments:** reader submissions arrive as `pending`. Review each comment and set its status to `approved` to display it on the article, or `rejected` to keep it private. Email addresses are stored for moderation and are never displayed publicly.
- **Content → Projects:** architecture and web portfolio items, images, summaries, links, and display order.
- **Content → Media:** upload replacement images and use their URLs in page sections. Post and project records can link directly to uploads.

`npm run cms:seed` imports missing starter content and leaves existing edits intact. For schema changes, run `npm run cms:types`. Media is stored in the ignored `media/` directory; production hosting needs persistent storage for both PostgreSQL and uploaded media. Configure a production `DATABASE_URL`, `PAYLOAD_SECRET`, and `NEXT_PUBLIC_SITE_URL` before deployment.
