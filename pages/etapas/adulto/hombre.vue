<template>
  <ContentPageCancer :data="data"/>
</template>

<script>
import metadataDynamic from '~/plugins/metadata/metadata-dynamic';
export default {
  data() {
    return {
      data: {
        title: 'Cáncer de próstata',
        url_principal_image: '/images/sections/cancer-de-prostata.png',
        paragraph_1: 'El cáncer de próstata es el que más afecta a los hombres después del cáncer de piel, se caracteriza por la  transformación de la estructura de la próstata a raíz del crecimiento anormal de las células.La Liga Santandereana Contra el Cáncer te educa sobre los principales signos de alarma, exámenes de tamización y generalidades para que puedas diagnosticar a tiempo esta enfermedad.',
        paragraph_2: '',
        second_title: 'Instrúyete sobre el cáncer de próstata',
        url_preview_video: '/images/miniaturas/prostata.png',
        url_video: '//www.youtube.com/embed/SPiLTySoPWM',
        play_games: [
          {
            name: 'Hazle triqui al cáncer de próstata',
            link: this.$routesApp.tictacMan.url,
            url_image: '/images/tic-tac-hombre.png',
            description: 'Desafía con tu conocimiento al cáncer de próstata y márcale tres en raya para vencerlo.'
          },
          {
            name: 'Sálvate de ir a la horca  por el cáncer de próstata',
            link: this.$routesApp.hangman.url,
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
  },
  head(){
    const title = this.$routesApp.man.name;
    const url = `${this.$nuxt.$route.path}`
    const description = 'Edúcate sobre la prevención y detención del cáncer de próstata junto a la Liga Santandereana Contra el Cáncer a través de herramientas interactivas como infografías, juegos y videos.'
    const image = 'https://res.cloudinary.com/dsvy4oeqc/image/upload/v1674146047/educate-cancer/cancer-de-prostata_nxvdsg.png'

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

