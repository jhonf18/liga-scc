<template>
  <ContentPageCancer :data="data" />
</template>

<script>
import metadataDynamic from "~/plugins/metadata/metadata-dynamic";
export default {
  data() {
    return {
      data: {
        title: "Cáncer de pulmón",
        url_principal_image: "/images/sections/cancer-de-pulmon.png",
        paragraph_1: `El cáncer de pulmón se produce cuando las <strong>células</strong> de este órgano presentan un
        cambio o <strong>crecimiento descontrolado</strong> producto de factores de riesgo. El
        <strong>principal factor</strong> para desarrollar este tipo de cáncer es el <strong>consumo de tabaco</strong>,
        por ello, edúcate sobre los efectos del cigarrillo y el gran impacto que tiene en la salud, con el fin de
        desnaturalizar la aceptación social que ha tenido esta <strong>enfermedad crónica</strong> producto de la adicción a la nicotina.`,
        paragraph_2: "",
        second_title: "Instrúyete sobre el cáncer de pulmón y el tabaquismo",
        url_preview_video: `/images/miniaturas/pulmon.png`,
        url_video: "https://www.youtube.com/embed/k3eMUzjeBsc",
        play_games: [
          {
            name: "Descubre las fichas del cáncer de pulmón",
            link: this.$routesApp.puzzle.url,
            url_image: "/images/puzzle.png",
            description:
              "Demuestra que tanto sabes sobre el cáncer de pulmón y ordena las fichas del conocimiento para vencerlo.",
          },
          {
            name: "Márcale triqui al Tabaquismo",
            link: this.$routesApp.tictacAdolescent.url,
            url_image: "/images/tic-tac-adolescente.png",
            description:
              "Enfréntate al principal factor de riesgo del cáncer de pulmón y vencelo con estrategia y conocimiento.",
          },
        ],
        infographics: [
          {
            name: "Efectos del tabaquismo",
            url_image: `/images/infografias/tabaquismo/efectos-del-tabaquismo.png`,
          },
          {
            name: "Cáncer de pulmón",
            url_image: `/images/infografias/tabaquismo/cancer-de-pulmon.png`,
          },
        ],
      },
    };
  },
  head() {
    const title = this.$routesApp.adolescent.name;
    const url = `${this.$nuxt.$route.path}`;
    const description =
      "Edúcate sobre la prevención y detención del cáncer de pulmón junto a la Liga Santandereana Contra el Cáncer a través de herramientas interactivas como infografías, juegos y videos.";
    const image =
      "https://res.cloudinary.com/dsvy4oeqc/image/upload/v1674146048/educate-cancer/cancer-de-pulmon_uznmb3.png";

    const dynamicMeta = metadataDynamic({
      title,
      url,
      description,
      image,
    });

    return { title, meta: [...dynamicMeta] };
  },
};
</script>
