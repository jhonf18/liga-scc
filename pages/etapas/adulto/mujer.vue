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
        url_preview_video: `/images/miniaturas/mama.png`,
        url_video: 'https://www.youtube.com/embed/iDY3p6JHaog',
        play_games: [
          {
            name: 'Reconoce los signos y vence al cáncer de mama ',
            link: '/juegos/recordar',
            url_image: 'images/recordar.png',
            description: 'Pon a prueba tu memoria para recordar y detectar a tiempo los signos de alarma y vencer al cáncer de mama.'
          },
          {
            name: 'Ve al ritmo de la liga con el autoexamen de mama',
            link: '/juegos/simon-dice',
            url_image: 'images/simon-dice.png',
            description: 'Sigue el ritmo que te indica la liga y aprende a realizar el autoexamen de mama.'
          },
        ],
        infographics: [
          {
            name: 'Cáncer de mama',
            url_image: 'images/infografias/mama/cancer-de-mama.png',
          },
          {
            name: 'Autoexamen de mama y signos de alarma',
            url_image: 'images/infografias/mama/autoexamen.png',
          },
        ]
      }
    }
  }
}
</script>
