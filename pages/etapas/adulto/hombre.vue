<template>
  <ContentPageCancer :data="data"/>
</template>

<script>
export default {
  data() {
    return {
      data: {
        title: 'Cáncer de próstata',
        url_principal_image: 'https://ciencia.unam.mx/uploads/infografias/if_cancer_piel_26062018.jpg',
        paragraph_1: 'El cáncer de próstata es el que más afecta a los hombres después del cáncer de piel, se caracteriza por la  transformación de la estructura de la próstata a raíz del crecimiento anormal de las células.La Liga Santandereana Contra el Cáncer te educa sobre los principales signos de alarma, exámenes de tamización y generalidades para que puedas diagnosticar a tiempo esta enfermedad.',
        paragraph_2: '',
        second_title: 'Instrúyete sobre el cáncer de próstata',
        url_preview_video: '/images/miniaturas/prostata.png',
        url_video: '//www.youtube.com/embed/SPiLTySoPWM',
        play_games: [
          {
            name: 'Hazle triqui al cáncer de próstata',
            link: '/juegos/tic-tac-toe-hombre',
            url_image: '/images/tic-tac-hombre.png',
            description: 'Desafía con tu conocimiento al cáncer de próstata y márcale tres en raya para vencerlo.'
          },
          {
            name: 'Sálvate de ir a la horca  por el cáncer de próstata',
            link: '/juegos/ahorcado',
            url_image: '/images/ahorcado.png',
            description: 'Identifica la palabra oculta que te ayudará a salvarte y vencer el cáncer de próstata.'
          },
        ],
        infographics: [
          {
            name: 'Síntomas de cáncer de prostata ',
            url_image: '/images/infografias/prostata/sintomas.png',
          },
          {
            name: 'Cáncer de próstata ',
            url_image: '/images/infografias/prostata/cancer-de-prostata.png',
          }
        ]
      }
    }
  }
}
</script>

