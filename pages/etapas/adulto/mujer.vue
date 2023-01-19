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
        paragraph_1: 'El cáncer de mama ocupa el puesto número uno de  incidencia en las mujeres, se caracteriza por la proliferación descontrolada de células en las glándulas mamarias que posteriormente producen masas. Este tipo de enfermedad se puede diagnosticar a tiempo a través del autoexamen de mama y los diferentes exámenes de tamización. Por ello, educate con la Liga Santandereana Contra el cáncer para transformar la experiencia del cáncer de mama y disminuir las cifras de incidencia en las mujeres.',
        paragraph_2: '',
        second_title: 'Instrúyete sobre el cáncer de mama',
        url_preview_video: `/images/miniaturas/mama.png`,
        url_video: 'https://www.youtube.com/embed/iDY3p6JHaog',
        play_games: [
          {
            name: 'Reconoce los signos y vence al cáncer de mama ',
            link: '/juegos/recordar',
            url_image: '/images/recordar.png',
            description: 'Pon a prueba tu memoria para recordar y detectar a tiempo los signos de alarma y vencer al cáncer de mama.'
          },
          {
            name: 'Ve al ritmo de la liga con el autoexamen de mama',
            link: '/juegos/simon-dice',
            url_image: '/images/simon-dice.png',
            description: 'Sigue el ritmo que te indica la liga y aprende a realizar el autoexamen de mama.'
          },
        ],
        infographics: [
          {
            name: 'Cáncer de mama',
            url_image: '/images/infografias/mama/cancer-de-mama.png',
          },
          {
            name: 'Autoexamen de mama y signos de alarma',
            url_image: '/images/infografias/mama/autoexamen.png',
          },
        ]
      }
    }
  }
}
</script>
