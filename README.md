# Carla Inacio Duarte — portfolio

A custom React + Vite reproduction of `carlainac.io`, built from the existing Framer project without modifying the original.

## Run locally

Requirements: Node.js 22 or newer.

```sh
npm install
npm run dev
```

Open `http://localhost:5173`. Run `npm run check` for linting and `npm run build` for the production build.

## Edit the site

- Page and component code: `src/App.jsx`
- Furniture project content and photo collections: `src/data.js`
- Design and responsive styles: `src/styles.css`
- Local media: `public/assets/`

All visual assets and fonts are local; the production site does not depend on Framer-hosted URLs.

## Contact form

GitHub Pages cannot process forms. Create a Formspree-compatible endpoint, copy `.env.example` to `.env.local`, and set `VITE_CONTACT_ENDPOINT`. Add the same value as a GitHub Actions variable or secret before deploying if form delivery is required in production.

## Deploy to GitHub Pages

1. Create a GitHub repository and push this project to its `main` branch.
2. In the repository, open **Settings → Pages** and select **GitHub Actions** as the source.
3. Push to `main`, or run the **Deploy to GitHub Pages** workflow manually.

The workflow builds with the repository name as Vite's base path and generates static entry files for every route, so direct links and assets work on a project Pages URL.

For a custom domain such as `carlainac.io`, first verify the GitHub Pages deployment at its repository URL. Then add the custom domain in GitHub Pages settings, create `public/CNAME` containing the domain, and change the workflow's `BASE_PATH` to `/`. Update DNS only when you are ready to move traffic away from Framer.
