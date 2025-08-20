This is a website similar to abg.ninja which will have a variety of tests available to practice.

The code will be written in JavaScript, React and Tailwind and run using node.js, bundled using vite for static deployment. Development is done using the vite dev server.

The sitemap looks like this:

- /: contains links and brief descriptions to each of the tests
- /dexamethasone: dexamethasone suppression test

The style should be minimal, with a beige background colour, and modern theme.

The typeface can be found in @tailwind.config.js and is installed using FontSource.

Use `npx prettier` for formatting. Run it after every change.

- Only look at the background dev shell to see if your changes have compiled properly.

# Deployment

- The website is deployed as a static site on Cloudflare Pages.
- Don't run build tests, only use the dev server.
- Add new pages to @vite.config.js so they can be deployed
