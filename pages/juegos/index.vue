<template>
  <main>
    <h1
      class="text-2xl md:text-4xl lg:text-5xl font-bold text-primary text-center pt-7 mb-9">
      Juegos sobre el cáncer
    </h1>
    <section
      class="px-4 sm:px-0 sm:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-6 sm:container mx-auto">
      <Card v-for="(playGame, i) in play_games" :key="i" :data="playGame" class="mb-6 sm:mb-0"  />
    </section>
  </main>
</template>

<script>
import metadataDynamic from '~/plugins/metadata/metadata-dynamic'
export default {
  head() {
    const title = 'Juegos'
    const url = `${this.$config.baseURL}/juegos`
    const description = 'Aprende jugando y divirtiéndote sobre los diferentes tipos de cáncer.'

    const dynamicMeta = metadataDynamic({
      title,
      description,
      url
    })
    return { title, meta: [...dynamicMeta] }
  },
  data() {
    const $routesApp = this.$routesApp;
    return {
      play_games: [
        {
          name: 'Hazle triqui al cáncer de próstata',
          link: $routesApp.tictacMan.url,
          url_image: '/images/tic-tac-hombre.png',
          description: 'Desafía con tu conocimiento al cáncer de próstata y márcale tres en raya para vencerlo.'
        },
        {
          name: 'Reconoce los signos y vence al cáncer de mama ',
          link: $routesApp.rememberCards.url,
          url_image: '/images/recordar.png',
          description: 'Pon a prueba tu memoria para recordar y detectar a tiempo los signos de alarma y vencer al cáncer de mama.'
        },
        {
          name: 'Descubre las fichas del cáncer de pulmón',
          link: $routesApp.puzzle.url,
          url_image: '/images/puzzle.png',
          description: 'Demuestra que tanto sabes sobre el cáncer de pulmón y ordena las fichas del conocimiento para vencerlo.'
        },
        {
          name: 'Ve al ritmo de la liga con el autoexamen de mama',
          link: $routesApp.simonSays.url,
          url_image: '/images/simon-dice.png',
          description: 'Sigue el ritmo que te indica la liga y aprende a realizar el autoexamen de mama.'
        },
        {
          name: 'Trivia contra el cáncer',
          link: $routesApp.trivia.url,
          url_image: '/images/trivia.png',
          description: 'Vence la trivia del cáncer desde el conocimiento.'
        },
        {
          name: 'Sálvate de ir a la horca  por el cáncer de próstata',
          link: $routesApp.hangman.url,
          url_image: '/images/ahorcado.png',
          description: 'Identifica la palabra oculta que te ayudará a salvarte y vencer el cáncer de próstata.'
        },
        {
          name: 'Márcale triqui al Tabaquismo',
          link: $routesApp.tictacAdolescent.url,
          url_image: '/images/tic-tac-adolescente.png',
          description: 'Enfréntate al principal factor de riesgo del cáncer de pulmón y vencelo con estrategia y conocimiento.'
        },
        {
          name: 'La carrera contra el  sol',
          link: $routesApp.cars.url,
          url_image: '/images/carros.png',
          description: 'Compite esquivando los efectos del sol y usa tu destreza al volante para obtener elementos de protección contra el sol.'
        },
      ]
    }
  }
}
</script>
