const routesApp = {
  index: {
    url: '/',
    name: 'Inicio'
  },
  videos: {
    url: '/videos',
    name: 'Videos'
  },
  playgames: {
    url: '/juegos',
    name: 'Juegos'
  },
  infographic: {
    url: '/infografias',
    name: 'Infografías'
  },
  children: {
    url: '/etapas/ninos',
    name: 'Niño y niña'
  },
  adolescent: {
    url: '/etapas/adolescente',
    name: 'Adolescente',
  },
  woman: {
    url: '/etapas/adulto/mujer',
    name: 'Mujer'
  },
  man: {
    url: '/etapas/adulto/hombre',
    name: 'Hombre'
  },
  hangman: {
    url: '/juegos/horca-ca-prostata',
    name: 'Horca CA próstata'
  },
  tictacMan: {
    url: '/juegos/triqui-ca-prostata',
    name: 'Triqui CA próstata'
  },
  rememberCards: {
    url: '/juegos/empareja-al-signo',
    name: 'Empareja al signo'
  },
  puzzle: {
    url: '/juegos/puzzle-ca-pulmon',
    name: 'Puzzle CA pulmón'
  },
  simonSays: {
    url: '/juegos/al-ritmo-del-autoexamen',
    name: 'Al ritmo del autoexamen'
  },
  tictacAdolescent: {
    url: '/juegos/triqui-contra-el-tabaco',
    name: 'Triqui contra el tabaco'
  },
  cars: {
    url: '/juegos/carrera-contra-el-sol',
    name: 'Carrera contra el sol'
  },
  trivia: {
    url: '/juegos/trivia',
    name: 'Trivia del cáncer'
  }

}


export default ({ app }, inject) => {
  inject('routesApp', routesApp);
}
