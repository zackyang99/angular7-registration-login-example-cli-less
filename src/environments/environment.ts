// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://35.237.38.125:4000',
  signinUrl: 'http://35.237.38.125:5000/api/auth/signin',
  signupUrl: 'http://35.237.38.125:5000/api/auth/signup',
  countryListUrl: 'http://35.237.38.125:5000/place/countries',
  stateListUrl: 'http://35.237.38.125:5000/place/states?countryId=%s',
  cityListUrl: 'http://35.237.38.125:5000/place/cities?stateId=%s',
  country2ListUrl: 'http://35.237.38.125:5000/place/countries2',
  universityListUrl: 'http://35.237.38.125:5000/place/universities?countryId=%s'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
