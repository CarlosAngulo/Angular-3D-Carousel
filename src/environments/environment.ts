// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyCb4BGQkcTOUcB_dFrRJ_x7NiueriipHuU',
    authDomain: 'angular-circular-carousel.firebaseapp.com',
    databaseURL: 'https://angular-circular-carousel.firebaseio.com/',
    projectId: 'angular-circular-carousel',
    storageBucket: 'angular-circular-carousel.appspot.com',
    messagingSenderId: '241934210859'
  }
};
