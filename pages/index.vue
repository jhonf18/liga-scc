<template>
  <div>
    <main class="banner">
      <h1
        class="mx-auto text-3xl sm:text-5xl text-center max-w-2xl font-medium leading-normal mt-12 mb-12">
        Juega y aprende con la Liga Santandereana Contra el Cáncer
      </h1>
    </main>

    <section class="p-6 sm:container sm:p-0 mx-auto mt-16 mb-16 lg:p-4">
      <h2 class="text-center text-2xl sm:text-3xl mb-8 font-semibold">
        Conoce sobre el cáncer
      </h2>
      <div class="md:grid md:grid-cols-5 md:gap-4">
        <div class="container-video col-span-3">
          <div
            @click="openVideo"
            class="container-video cursor-pointer h-full flex justify-center items-center">
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
        <div class="container-info mt-6 md:mt-0 col-span-2 md:p-4">
          <div>
            <h3 class="text-xl sm:text-2xl font-medium">
              ¿Qué es el cáncer?
            </h3>
            <p class="mt-4 mb-8">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit dolore molestias natus nulla possimus, perferendis magni numquam. Aut repudiandae, eligendi quo, at eveniet consequatur deleniti perspiciatis, rerum voluptates quae ex.
            </p>
          </div>
          <div>
            <span>Aprende sobre el cáncer con</span>
            <div class="grid grid-cols-2 gap-6 mt-2">
              <Button variant="primary" @click="openInfographic">Infografías</Button>
              <Button variant="primary" to="/juegos/trivia">Juegos</Button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div>
      <div class="border-t border-gray-400 w-2/5 h-1 mx-auto"></div>
      <div class="border-t border-gray-400 w-1/5 h-1 mx-auto mt-4"></div>
    </div>

    <section class="p-6 sm:container sm:p-0 mx-auto mt-8 sm:mt-16">
      <p class="text-lg sm:text-xl text-center">
        Visita nuestras herramientas interactivas y educate para prevenir y detectar de forma temprana el cáncer.
      </p>
      <div class="flex flex-col sm:flex-row sm:justify-center mt-8">
        <div class="mr-4 mt-4 sm:mt-0 w-full sm:w-auto">
          <Button size="lg" variant="primary" to="/juegos">
            <PlayGamesIcon style="width: 25px" class="mr-2" />
            Juegos
          </Button>
        </div>
        <div class="mr-4 mt-4 sm:mt-0 w-full sm:w-auto">
          <Button size="lg" variant="secondary" to="/videos" >
            <VideoIcon style="width: 25px" class="mr-2" />
            Videos
          </Button>
        </div>
        <div class="mt-4 sm:mt-0 w-full sm:w-auto">
          <Button size="lg" variant="tertiary" to="/infografias" >
            <PictureIcon style="width: 18px" class="mr-2" />
            Infografías
          </Button>
        </div>
      </div>
    </section>

    <Modal
      id="modal-video"
      ref="modal-video"
      target="modal-video"
      type="iframe"
      link-multimedia="//www.youtube.com/embed/n3rL-OeHeoE?autoplay=1"
      >
    </Modal>

    <Modal
      id="modal-infographic"
      ref="modal-infographic"
      target="modal-infographic"
      type="image"
      :link-multimedia="require(`~/static/images/infografias/cancer/aprende-sobre-el-cancer.png`)"
      >
    </Modal>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  components: {
    PlayGamesIcon: () => import('@/static/icons/play-games.svg?inline'),
    VideoIcon: () => import('@/static/icons/video.svg?inline'),
    PictureIcon: () => import('@/static/icons/picture.svg?inline')
  },
  methods: {
    openVideo() {
      this.$refs['modal-video'].open()
    },
    openInfographic() {
      this.$refs['modal-infographic'].open()
    }
  }
}
</script>

<style lang="postcss" scoped>
.banner {
  background: rgb(46,52,138);
  background: radial-gradient(circle, rgba(46,52,138,0.9990371148459384) 10%, rgba(40,43,83,1) 98%);
  color: #fff;
  padding: 1.5em 0;
}

.banner-title {
  max-width: 700px;
  margin: auto;
  text-align: center;
}

.container-video {
  background: url('https://licancerbucaramanga.org/wp-content/uploads/2021/06/Fachada-1.jpg?id=13704');
  position: relative;
  min-height: 14rem;
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
  width: 150px;
  height: 150px;
  margin: 0 auto;
}
.wrapper .circle {
  width: 100px;
  height: 100px;
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

.section-tools-icons {
  width: 20px;
}



</style>
