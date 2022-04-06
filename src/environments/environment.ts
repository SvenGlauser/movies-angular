// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api: {
    key: "15f9d7fec19ec6b5b9bc491acd508fe6",
    language: "fr",
    url: "https://api.themoviedb.org/3",
  },
  images: {
    url: "https://image.tmdb.org/t/p/",
    backdrop_sizes: [
      "w300",
      "w780",
      "w1280",
      "original"
    ],
    logo_sizes: [
      "w45",
      "w92",
      "w154",
      "w185",
      "w300",
      "w500",
      "original"
    ],
    poster_sizes: [
      "w92",
      "w154",
      "w185",
      "w342",
      "w500",
      "w780",
      "original"
    ],
    profile_sizes: [
      "w45",
      "w185",
      "h632",
      "original"
    ],
    still_sizes: [
      "w92",
      "w185",
      "w300",
      "original"
    ]
  },
  url: "http://localhost:4200"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
