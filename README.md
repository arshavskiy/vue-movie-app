# movie-app

This template should help get you started developing with Vue 3 in Vite.


#### Create API key for THEMOVIEDB, use BAERER

Look at .env.example file

create .env file 

Add a VITE_PARAMETER NAME property as needed

```sh
import via import.meta.env.VITE_<PARAMETER NAME>
```

##### When testing UI please refresh the page between desktop and mobile

### Compile and Hot-Reload for Development

```sh
cd vue-movie-app
npm install
npm run dev
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
