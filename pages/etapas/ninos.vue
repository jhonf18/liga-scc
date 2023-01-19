<template>
  <ContentPageCancer :data="data"/>
</template>

<script>
export default {
  data() {
    return {
      data: {
        title: 'Cáncer de piel',
        url_principal_image: '/images/sections/cancer-de-piel.png',
        paragraph_1: 'El cáncer de piel es uno de los tipos de cáncer más frecuentes, se caracteriza por la transformación de las células sanas en células malignas,  su principal factor de riesgo es la exposición a la luz solar. Por ello, es importante que desde edades tempranas los niños y niñas comprendan el impacto que trae el sol y la relevancia de cuidar la piel con los diferentes elementos de  fotoprotección: el bloqueador solar, la sombrilla, el sombrero y ropa que cubra la piel para evitar un cáncer.',
        paragraph_2: '',
        second_title: 'Instrúyete sobre la prevención del cáncer de piel',
        url_preview_video: '/images/miniaturas/piel.png',
        url_video: 'https://www.youtube.com/embed/ogl3svT2I5Y',
        play_games: [
          {
            name: 'La carrera contra el  sol',
            link: '/juegos/carros',
            url_image: '/images/carros.png',
            description: 'Compite esquivando los efectos del sol y usa tu destreza al volante para obtener elementos de protección contra el sol.'
          },
        ],
        infographics: [
          {
            name: 'Cuidemos nuestra piel para evitar el cáncer',
            url_image: `/images/infografias/piel/cancer-de-piel.png`
          },
        ]
      }
    }
  }
}
</script>

