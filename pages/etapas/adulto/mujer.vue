<template>
  <ContentPageCancer :data="data"/>
</template>

<script>
export default {
  data() {
    return {
      data: {
        title: 'Cáncer de mama',
        url_principal_image: 'https://ciencia.unam.mx/uploads/infografias/if_cancer_piel_26062018.jpg',
        paragraph_1: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit dolore molestias natus nulla possimus, perferendis magni numquam. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias a ratione quam animi odit voluptas, voluptatem optio, maxime at, voluptatum tempore inventore culpa molestiae repellat debitis id tempora dolorem! Doloremque! Aut repudiandae, eligendi quo, at eveniet consequatur deleniti perspiciatis, rerum voluptates quae ex.',
        paragraph_2: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat vero eius officiis exercitationem, asperiores autem sint. Perspiciatis tenetur modi quo maiores. Facere nulla sint quisquam praesentium dolorem ad ipsam unde.',
        second_title: 'Instruyete sobre el cáncer de pulmón',
        url_preview_video: 'https://licancerbucaramanga.org/wp-content/uploads/2021/06/Fachada-1.jpg?id=13704',
        url_video: 'https://www.youtube.com/embed/zqYc5c4bOZ8?feature=oembed',
        play_games: [
          {
            name: 'Simón dice',
            link: '/juegos/simon-dice',
            url_image: require('~/static/images/simon-dice.png'),
            description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi quaerat culpa minus dolorem, laudantium harum doloremque eos fugiat fugit itaque. Molestias eaque, numquam excepturi porro dolor voluptatibus iusto voluptas quis.'
          },
          {
            name: 'Recordar',
            link: '/juegos/recordar',
            url_image: require('~/static/images/recordar.png'),
            description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi quaerat culpa minus dolorem, laudantium harum doloremque eos fugiat fugit itaque. Molestias eaque, numquam excepturi porro dolor voluptatibus iusto voluptas quis.'
          }
        ],
        infographics: [
          {
            name: 'Cáncer de mama',
            url_image: require(`~/static/images/infografias/mama/cancer-de-mama.png`),
          },
          {
            name: 'Autoexamen de mama y signos de alarma',
            url_image: require(`~/static/images/infografias/mama/autoexamen.png`),
          },
        ]
      }
    }
  }
}
</script>
