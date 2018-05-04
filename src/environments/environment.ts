// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyA6gyTv38klhCOhGQwAzed9SK-C_EvGXk4",
    authDomain: "ng-carousel.firebaseapp.com",
    databaseURL: "https://ng-carousel.firebaseio.com",
    projectId: "ng-carousel",
    storageBucket: "ng-carousel.appspot.com",
    messagingSenderId: "350810809502"
  }
};
