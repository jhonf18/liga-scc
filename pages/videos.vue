<template>
  <main>
    <h1
      class="text-2xl md:text-4xl lg:text-5xl font-bold text-primary text-center pt-7 mb-9"
    >
      Videos sobre el cáncer
    </h1>
    <section
      class="px-4 sm:px-0 sm:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-6 sm:container mx-auto"
    >
      <div v-for="(video, i) in videos" :key="i" class="mb-6 sm:mb-0">
        <div class="container-video">
          <div
            @click="openVideo(video)"
            class="container-video cursor-pointer h-full flex justify-center items-center"
            :style="{
              background: `url(${video.url_preview_video})`,
              'background-position': 'top center',
              'background-repeat': 'no-repeat',
              'background-size': 'cover',
            }"
          >
            <div class="filter-container"></div>
            <div class="wrapper">
              <div class="circle pulse"></div>
              <div class="circle">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                  <polygon points="40,30 65,50 40,70"></polygon>
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-2 pl-2">
          <nuxt-link
            :to="video.link"
            class="text-lg text-primary font-semibold hover:underline transition-all"
          >
            {{ video.title }}
          </nuxt-link>
        </div>
      </div>
    </section>
    <Modal
      id="modal-content-video"
      ref="modal-content-video"
      target="modal-content-video"
      type="iframe"
      :link-multimedia="url_video"
    />
  </main>
</template>

<script>
import metadataDynamic from "~/plugins/metadata/metadata-dynamic";
export default {
  data() {
    return {
      videos: [
        {
          title: "Cáncer de mama",
          url_preview_video: require(`~/static/images/miniaturas/mama.png`),
          url_video: "https://www.youtube.com/embed/pw12Bqfjn94",
          link: this.$routesApp.woman.url,
        },
        {
          title: "Cáncer de piel",
          url_preview_video: require("~/static/images/miniaturas/piel.png"),
          url_video: "https://www.youtube.com/embed/MBO7hFZO590",
          link: this.$routesApp.children.url,
        },
        {
          title: "Tabaquismo",
          url_preview_video: require(`~/static/images/miniaturas/pulmon.png`),
          url_video: "https://www.youtube.com/embed/k3eMUzjeBsc",
          link: this.$routesApp.adolescent.url,
        },
        {
          title: "Cáncer de próstata",
          url_preview_video: require(`~/static/images/miniaturas/prostata.png`),
          url_video: "https://www.youtube.com/embed/X02CfqOt1zM",
          link: this.$routesApp.man.url,
        },
        {
          title: "Cáncer en general",
          url_preview_video: require(`~/static/images/miniaturas/cancer-m.png`),
          url_video: "https://www.youtube.com/embed/L1PFtUE5G_c",
          link: "/",
        },
      ],
      url_video: "",
    };
  },
  head() {
    const title = "Videos";
    const url = `${this.$config.baseURL}/videos`;
    const description =
      "Edúcate con la Liga Santandereana Contra el Cáncer a través de videos interactivos sobre la prevención y detección de diferentes tipos de cáncer.";
    const image =
      "https://res.cloudinary.com/dsvy4oeqc/image/upload/v1674192653/educate-cancer/screenshot-videos-lscc_frqzex.png";
    const dynamicMeta = metadataDynamic({
      title,
      description,
      url,
      image,
    });
    return { title, meta: [...dynamicMeta] };
  },
  methods: {
    openVideo(video) {
      this.url_video = video.url_video;
      this.$refs["modal-content-video"].open();
    },
  },
};
</script>

<style lang="postcss" scoped>
.container-video {
  position: relative;
  min-height: 12rem;
}

.container-infographic {
  position: relative;
  transition: all 0.4s;
  min-height: 20rem;
}

.filter-container {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: #282b5338;
}

.wrapper {
  position: relative;
  width: 90px;
  height: 90px;
  margin: 0 auto;
}
.wrapper .circle {
  width: 65px;
  height: 65px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 50%;
  background-color: #171a3b;
  margin: auto;
  transform: scale(1, 1);
}
.wrapper .circle.pulse {
  animation-timing-function: ease;
  animation: pulse 2s infinite;
  background-color: #282b53da;
}
.wrapper svg {
  fill: #ffffff;
  stroke: #ffffff;
  stroke-linejoin: round;
  stroke-width: 5;
  transition: all 0.3s;
}
.wrapper svg:hover {
  cursor: pointer;
  fill: #eeeeee;
  stroke: #eeeeee;
  transform: scale(1.2, 1.2);
}

@-webkit-keyframes pulse {
  0% {
    transform: scale(1, 1);
  }
  25% {
    transform: scale(1, 1);
  }
  50% {
    transform: scale(1.2, 1.2);
  }
  100% {
    transform: scale(1, 1);
  }
}

@keyframes pulse {
  0% {
    transform: scale(1, 1);
  }
  25% {
    transform: scale(1, 1);
  }
  50% {
    transform: scale(1.2, 1.2);
  }
  100% {
    transform: scale(1, 1);
  }
}

.container-video:hover .filter-container {
  background-color: #282b5367;
}

.container-video:hover .filter-content {
  display: flex;
}

.filter-container {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: #282b5333;
}

.filter-content {
  display: none;
}
</style>
