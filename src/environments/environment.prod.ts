export const environment = {
  production: false,
  api: {
    key: "15f9d7fec19ec6b5b9bc491acd508fe6",
    languages: {
      "de-DE": "Deutsch",
      "fr-FR": "Français",
      "en-US": "English",
    },
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
  url: "https://glausve.divtec.me/movies",
  baseHref: "/movies",
};
