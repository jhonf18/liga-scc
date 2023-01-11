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
export default {
  data() {
    return {
      play_games: [
        {
          name: 'Tic Tac Hombre',
          link: '/juegos/tic-tac-toe-hombre',
          url_image: require('~/static/images/tic-tac-hombre.png'),
          description: 'excepturi porro dolor voluptatibus iusto voluptas quis.'
        },
        {
          name: 'Tic Tac Adolescente',
          link: '/juegos/tic-tac-toe-adolescente',
          url_image: require('~/static/images/tic-tac-adolescente.png'),
          description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi quaerat culpa minus dolorem, laudantium harum doloremque eos fugiat fugit itaque. Molestias eaque, numquam excepturi porro dolor voluptatibus iusto voluptas quis.'
        },
        {
          name: 'Recordar',
          link: '/juegos/recordar',
          url_image: require('~/static/images/recordar.png'),
          description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi quaerat culpa minus dolorem, laudantium harum doloremque eos fugiat fugit itaque. Molestias eaque, numquam excepturi porro dolor voluptatibus iusto voluptas quis.'
        },
        {
          name: 'Puzzle',
          link: '/juegos/puzzle',
          url_image: require('~/static/images/puzzle.png'),
          description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi quaerat culpa minus dolorem, laudantium harum doloremque eos fugiat fugit itaque. Molestias eaque, numquam excepturi porro dolor voluptatibus iusto voluptas quis.'
        },
        {
          name: 'Simón dice',
          link: '/juegos/simon-dice',
          url_image: require('~/static/images/simon-dice.png'),
          description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi quaerat culpa minus dolorem, laudantium harum doloremque eos fugiat fugit itaque. Molestias eaque, numquam excepturi porro dolor voluptatibus iusto voluptas quis.'
        },
        {
          name: 'Ahorcado',
          link: '/juegos/ahorcado',
          url_image: require('~/static/images/ahorcado.png'),
          description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi quaerat culpa minus dolorem, laudantium harum doloremque eos fugiat fugit itaque. Molestias eaque, numquam excepturi porro dolor voluptatibus iusto voluptas quis.'
        },
        {
          name: 'Trivia',
          link: '/juegos/trivia',
          url_image: require('~/static/images/trivia.png'),
          description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi quaerat culpa minus dolorem, laudantium harum doloremque eos fugiat fugit itaque. Molestias eaque, numquam excepturi porro dolor voluptatibus iusto voluptas quis.'
        },
        {
          name: 'Carros: Falta',
          link: '/juegos/carros',
          url_image: require('~/static/images/puzzle.png'),
          description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi quaerat culpa minus dolorem, laudantium harum doloremque eos fugiat fugit itaque. Molestias eaque, numquam excepturi porro dolor voluptatibus iusto voluptas quis.'
        },
      ]
    }
  }
}
</script>
