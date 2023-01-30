<template>
  <ContentPageCancer :data="data" />
</template>

<script>
import metadataDynamic from "~/plugins/metadata/metadata-dynamic";
export default {
  data() {
    return {
      data: {
        title: "Cáncer de piel",
        url_principal_image: "/images/sections/cancer-de-piel.png",
        paragraph_1: `El cáncer de piel es uno de los tipos de cáncer más frecuentes, se caracteriza por la
          <strong>transformación de las células sanas</strong> en células malignas, su <strong>
          principal factor de riesgo es la exposición a la luz solar</strong>.
          Por ello, es importante que desde edades tempranas los niños y niñas comprendan el impacto que trae
          el sol y la <strong>relevancia de cuidar la piel</strong> con los diferentes elementos
          de <strong>fotoprotección</strong>: el bloqueador solar, la sombrilla, el sombrero y ropa que cubra la piel para evitar un cáncer.`,
        paragraph_2: "",
        second_title: "Instrúyete sobre la prevención del cáncer de piel",
        url_preview_video: "/images/miniaturas/piel.png",
        url_video: "https://www.youtube.com/embed/ogl3svT2I5Y",
        play_games: [
          {
            name: "La carrera contra el  sol",
            link: this.$routesApp.cars.url,
            url_image: "/images/carros.png",
            description:
              "Compite esquivando los efectos del sol y usa tu destreza al volante para obtener elementos de protección contra el sol.",
          },
        ],
        infographics: [
          {
            name: "Cuidemos nuestra piel para evitar el cáncer",
            url_image: `/images/infografias/piel/cancer-de-piel.png`,
          },
        ],
      },
    };
  },
  head() {
    const title = this.$routesApp.children.name;
    const url = `${this.$nuxt.$route.path}`;
    const description =
      "Aprende junto a la Liga Santandereana Contra el Cáncer sobre las generalidades del cáncer de piel";
    const image =
      "https://res.cloudinary.com/dsvy4oeqc/image/upload/v1674146047/educate-cancer/cancer-de-piel_zqxxhw.png";

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
