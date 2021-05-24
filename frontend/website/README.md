# Website Frontend of Political Atlas

## Dependencies

You'll need `yarn` and `gatsby` beforehand.

To install dependencies from the lockfile, simply run

```bash
yarn deps
```

It's possible to use a different package manager like npm or pnpm and leverage
the package.json file.

## Run the Project

Once you have dependencies installed, you can run

```bash
yarn develop
```

However, it's worth noting it relies on our backend API, which you'll have to
replace in [./src/API/Server.js](./src/API/Server.js).

## Deploy the Project

You'll need contributor rights, but you can run

```bash
yarn deploy
```

and it'll create an optimized production build and upload to the gh-pages
branch, which hosts the site code in production.
