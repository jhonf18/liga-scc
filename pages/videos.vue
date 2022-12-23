<template>
  <main>
    <h1
      class="text-2xl md:text-4xl lg:text-5xl font-bold text-primary text-center my-12">
      Videos sobre el cáncer
    </h1>
    <section
    class="px-4 sm:px-0 sm:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-4 sm:container mx-auto">
      <div v-for="(video, i) in videos" :key="i">
        <div class="container-video">
          <div
            @click="openVideo(video)"
            class="container-video cursor-pointer h-full flex justify-center items-center"
            :style="{
              'background': `url(${video.url_preview_video})`,
              'background-position': 'top center',
              'background-repeat': 'no-repeat',
              'background-size': 'cover' }">
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
          <nuxt-link :to="video.link"
            class="text-lg text-primary font-semibold hover:underline transition-all">
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
export default {
  data() {
    return {
      videos: [
        {
          title: 'Cáncer de mama',
          url_preview_video: 'https://licancerbucaramanga.org/wp-content/uploads/2021/06/Fachada-1.jpg?id=13704',
          url_video: '//www.youtube.com/embed/n3rL-OeHeoE?autoplay=1',
          link: '/etapas/adulto/mujer'
        },
        {
          title: 'Cáncer de piel',
          url_preview_video: 'https://licancerbucaramanga.org/wp-content/uploads/2021/10/Piezas-Octubre.png',
          url_video: 'https://www.youtube.com/embed/KWNAZc93iBs?feature=oembed',
          link: '/etapas/ninos'
        },
        {
          title: 'Tabaquismo',
          url_preview_video: 'https://licancerbucaramanga.org/wp-content/uploads/2021/05/Slider-icontec1.png',
          url_video: 'https://www.youtube.com/embed/ZVtZj6csrYE?feature=oembed',
          link: '/etapas/adolescente'
        },
        {
          title: 'Cáncer de próstata',
          url_preview_video: 'https://licancerbucaramanga.org/wp-content/uploads/2022/12/BANNER-PAGINA-WEB-de-2022.png',
          url_video: 'https://www.youtube.com/embed/p5u_CQFbReI?feature=oembed',
          link: '/etapas/adulto/hombre'
        },
        {
          title: 'Cáncer en general',
          url_preview_video: 'https://licancerbucaramanga.org/wp-content/uploads/2022/09/DSC5075-440x260.jpg.webp',
          url_video: 'https://www.youtube.com/embed/2DkcxwJseGQ?feature=oembed',
          link: '/'
        }
      ],
      url_video: ''
    }
  },
  methods: {
    openVideo(video) {
      this.url_video = video.url_video;
      this.$refs['modal-content-video'].open();
    }
  }
}
</script>

<style lang="postcss" scoped>
.container-video {
  position: relative;
  min-height: 12rem;
}

.container-infographic {
  position: relative;
  transition: all .4s;
  min-height: 20rem;
}

.filter-container {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: #282b5360;
}

.wrapper {
  position: relative;
  width: 120px;
  height: 120px;
  margin: 0 auto;
}
.wrapper .circle {
  width: 80px;
  height: 80px;
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
  background-color: #282b53ad;
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
  background-color: #282b5360;
}

.filter-content {
  display: none;
}
</style>
