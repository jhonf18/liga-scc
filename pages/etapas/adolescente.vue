<template>
  <ContentPageCancer :data="data" />
</template>

<script>
export default {
  data() {
    return {
      data: {
        title: 'Cáncer de pulmón',
        url_principal_image: 'https://ciencia.unam.mx/uploads/infografias/if_cancer_piel_26062018.jpg',
        paragraph_1: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit dolore molestias natus nulla possimus, perferendis magni numquam. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias a ratione quam animi odit voluptas, voluptatem optio, maxime at, voluptatum tempore inventore culpa molestiae repellat debitis id tempora dolorem! Doloremque! Aut repudiandae, eligendi quo, at eveniet consequatur deleniti perspiciatis, rerum voluptates quae ex.',
        paragraph_2: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat vero eius officiis exercitationem, asperiores autem sint. Perspiciatis tenetur modi quo maiores. Facere nulla sint quisquam praesentium dolorem ad ipsam unde.',
        second_title: 'Instruyete sobre el cáncer de pulmón',
        url_preview_video: 'https://licancerbucaramanga.org/wp-content/uploads/2021/06/Fachada-1.jpg?id=13704',
        url_video: '//www.youtube.com/embed/n3rL-OeHeoE?autoplay=1',
        url_infographic: 'https://ciencia.unam.mx/uploads/infografias/if_cancer_piel_26062018.jpg',
        play_games: [
          {
            name: 'Descubre las fichas del cáncer de pulmón',
            link: '/juegos/puzzle',
            url_image: 'images/puzzle.png',
            description: 'Demuestra que tanto sabes sobre el cáncer de pulmón y ordena las fichas del conocimiento para vencerlo.'
          },
          {
            name: 'Márcale triqui al Tabaquismo',
            link: '/juegos/tic-tac-toe-adolescente',
            url_image: 'images/tic-tac-adolescente.png',
            description: 'Enfréntate al principal factor de riesgo del cáncer de pulmón y vencelo con estrategia y conocimiento.'
          },
        ],
        infographics: [
          {
            name: 'Efectos del tabaquismo',
            url_image: `images/infografias/tabaquismo/efectos-del-tabaquismo.png`,
          },
          {
            name: 'Cáncer de pulmón',
            url_image: `images/infografias/tabaquismo/cancer-de-pulmon.png`,
          }
        ]
      }
    }
  }
}
</script>
