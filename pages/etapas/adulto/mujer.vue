<template>
  <ContentPageCancer :data="data"/>
</template>

<script>
import metadataDynamic from '~/plugins/metadata/metadata-dynamic';
export default {
  data() {
    return {
      data: {
        title: 'Cáncer de mama',
        url_principal_image: '/images/sections/cancer-de-mama.png',
        paragraph_1: 'El cáncer de mama ocupa uno de los primeros puestos de incidencia en las mujeres, se caracteriza por la proliferación descontrolada de células en las glándulas mamarias que posteriormente producen masas. En este tipo de enfermedad se pueden identificar los principales signos de alarma a través del autoexamen de mama y llevar a cabo un diagnóstico oportuno mediante los exámenes de tamización, el examen clínico de mama y la mamografía, para lograr transformar la experiencia del cáncer de mama y disminuir las cifras de incidencia en las mujeres.',
        paragraph_2: '',
        second_title: 'Instrúyete sobre el cáncer de mama',
        url_preview_video: `/images/miniaturas/mama.png`,
        url_video: 'https://www.youtube.com/embed/iDY3p6JHaog',
        play_games: [
          {
            name: 'Reconoce los signos y vence al cáncer de mama ',
            link: this.$routesApp.rememberCards.url,
            url_image: '/images/recordar.png',
            description: 'Pon a prueba tu memoria para recordar y detectar a tiempo los signos de alarma y vencer al cáncer de mama.'
          },
          {
            name: 'Ve al ritmo de la liga con el autoexamen de mama',
            link: this.$routesApp.simonSays.url,
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
  },
  head(){
    const title = this.$routesApp.woman.name;
    const url = `${this.$nuxt.$route.path}`
    const description = 'Aprende sobre la prevención y detención del cáncer de mama junto a la Liga Santandereana Contra el Cáncer a través de herramientas interactivas como infografías, juegos y videos.'
    const image = 'https://res.cloudinary.com/dsvy4oeqc/image/upload/v1674146047/educate-cancer/cancer-de-mama_txye8r.png'

    const dynamicMeta = metadataDynamic({
      title,
      url,
      description,
      image
    });

    return { title, meta: [...dynamicMeta] }
  },
}
</script>
