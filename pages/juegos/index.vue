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
          name: 'Juego XXX',
          link: '/etapas/juegos/1',
          url_image: 'https://media.cdnp.elobservador.com.uy/adjuntos/184/imagenes/013/019/0013019026.jpg?&cw=350',
          description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi quaerat culpa minus dolorem, laudantium harum doloremque eos fugiat fugit itaque. Molestias eaque, numquam excepturi porro dolor voluptatibus iusto voluptas quis.'
        },
        {
          name: 'Juego XXX',
          link: '/etapas/juegos/2',
          url_image: 'https://media.cdnp.elobservador.com.uy/adjuntos/184/imagenes/013/019/0013019030.jpg?&cw=350',
          description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi quaerat culpa minus dolorem, laudantium harum doloremque eos fugiat fugit itaque. Molestias eaque, numquam excepturi porro dolor voluptatibus iusto voluptas quis.'
        },
        {
          name: 'Juego XXX',
          link: '/etapas/juegos/1',
          url_image: 'https://media.cdnp.elobservador.com.uy/adjuntos/184/imagenes/013/019/0013019026.jpg?&cw=350',
          description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi quaerat culpa minus dolorem, laudantium harum doloremque eos fugiat fugit itaque. Molestias eaque, numquam excepturi porro dolor voluptatibus iusto voluptas quis.'
        },
        {
          name: 'Juego XXX',
          link: '/etapas/juegos/2',
          url_image: 'https://media.cdnp.elobservador.com.uy/adjuntos/184/imagenes/013/019/0013019030.jpg?&cw=350',
          description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi quaerat culpa minus dolorem, laudantium harum doloremque eos fugiat fugit itaque. Molestias eaque, numquam excepturi porro dolor voluptatibus iusto voluptas quis.'
        },
        {
          name: 'Juego XXX',
          link: '/etapas/juegos/1',
          url_image: 'https://media.cdnp.elobservador.com.uy/adjuntos/184/imagenes/013/019/0013019026.jpg?&cw=350',
          description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi quaerat culpa minus dolorem, laudantium harum doloremque eos fugiat fugit itaque. Molestias eaque, numquam excepturi porro dolor voluptatibus iusto voluptas quis.'
        },
        {
          name: 'Juego XXX',
          link: '/etapas/juegos/2',
          url_image: 'https://media.cdnp.elobservador.com.uy/adjuntos/184/imagenes/013/019/0013019030.jpg?&cw=350',
          description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi quaerat culpa minus dolorem, laudantium harum doloremque eos fugiat fugit itaque. Molestias eaque, numquam excepturi porro dolor voluptatibus iusto voluptas quis.'
        },
        {
          name: 'Juego XXX',
          link: '/etapas/juegos/1',
          url_image: 'https://media.cdnp.elobservador.com.uy/adjuntos/184/imagenes/013/019/0013019026.jpg?&cw=350',
          description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi quaerat culpa minus dolorem, laudantium harum doloremque eos fugiat fugit itaque. Molestias eaque, numquam excepturi porro dolor voluptatibus iusto voluptas quis.'
        }
      ]
    }
  }
}
</script>
