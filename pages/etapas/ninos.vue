<template>
  <ContentPageCancer :data="data"/>
</template>

<script>
export default {
  data() {
    return {
      data: {
        title: 'Cáncer de piel',
        url_principal_image: 'https://ciencia.unam.mx/uploads/infografias/if_cancer_piel_26062018.jpg',
        paragraph_1: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit dolore molestias natus nulla possimus, perferendis magni numquam. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias a ratione quam animi odit voluptas, voluptatem optio, maxime at, voluptatum tempore inventore culpa molestiae repellat debitis id tempora dolorem! Doloremque! Aut repudiandae, eligendi quo, at eveniet consequatur deleniti perspiciatis, rerum voluptates quae ex.',
        paragraph_2: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat vero eius officiis exercitationem, asperiores autem sint. Perspiciatis tenetur modi quo maiores. Facere nulla sint quisquam praesentium dolorem ad ipsam unde.',
        second_title: 'Instruyete sobre el cáncer de pulmón',
        url_preview_video: 'https://licancerbucaramanga.org/wp-content/uploads/2021/06/Fachada-1.jpg?id=13704',
        url_video: 'https://www.youtube.com/embed/zqYc5c4bOZ8?feature=oembed',
        url_infographic: 'https://ciencia.unam.mx/uploads/infografias/if_cancer_piel_26062018.jpg',
        play_games: [
          {
            name: 'Juego cáncer de piel',
            link: '/etapas/juegos/1',
            url_image: 'https://media.cdnp.elobservador.com.uy/adjuntos/184/imagenes/013/019/0013019026.jpg?&cw=350',
            description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi quaerat culpa minus dolorem, laudantium harum doloremque eos fugiat fugit itaque. Molestias eaque, numquam excepturi porro dolor voluptatibus iusto voluptas quis.'
          },
          {
            name: 'Juego cáncer de piel 2',
            link: '/etapas/juegos/2',
            url_image: 'https://media.cdnp.elobservador.com.uy/adjuntos/184/imagenes/013/019/0013019030.jpg?&cw=350',
            description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi quaerat culpa minus dolorem, laudantium harum doloremque eos fugiat fugit itaque. Molestias eaque, numquam excepturi porro dolor voluptatibus iusto voluptas quis.'
          }
        ],
        infographics: [
          {
            name: 'Cuidemos nuestra piel para evitar el cáncer',
            url_image: require(`~/static/images/infografias/piel/cancer-de-piel.png`)
          },
        ]
      }
    }
  }
}
</script>

