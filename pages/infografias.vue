<template>
  <main>
    <h1
      class="text-2xl md:text-4xl lg:text-5xl font-bold text-primary text-center pt-7 mb-9">
      Infografías sobre el cáncer
    </h1>
    <section
    class="px-4 sm:px-0 sm:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-6 sm:container mx-auto">
        <Card v-for="(infographic, i) in infographics"
          :key="'infographic-' + i"
          content="infographic"
          :data="infographic"
          @clickCard="openInfographic(infographic)">
        </Card>
    </section>
    <Modal
      id="modal-content"
      ref="modal-content"
      target="modal-content"
      type="image"
      :link-multimedia="url"
      />

  </main>
</template>

<script>
export default {
  data() {
    return {
      infographics: [
        {
          name: 'Cáncer de mama',
          url_image: require(`~/static/images/infografias/mama/cancer-de-mama.png`),
          link: '/etapas/adulto/mujer'
        },
        {
          name: 'Autoexamen de mama y signos de alarma',
          url_image: require(`~/static/images/infografias/mama/autoexamen.png`),
          link: '/etapas/adulto/mujer'
        },
        {
          name: 'Síntomas de cáncer de próstata ',
          url_image: require(`~/static/images/infografias/prostata/sintomas.png`),
          link: '/etapas/adulto/hombre'
        },
        {
          name: 'Cáncer de próstata ',
          url_image: require(`~/static/images/infografias/prostata/cancer-de-prostata.png`),
          link: '/etapas/adulto/hombre'
        },
        {
          name: 'Cuidemos nuestra piel para evitar el cáncer',
          url_image: require(`~/static/images/infografias/piel/cancer-de-piel.png`),
          link: '/etapas/adulto/nino'
        },
        {
          name: 'Cáncer en general',
          url_image: 'https://licancerbucaramanga.org/wp-content/uploads/2022/09/DSC5075-440x260.jpg.webp',
          link: '/'
        }
      ],
      url: ''
    }
  },
  methods: {
    openInfographic(infographic) {
      this.url = infographic.url_image;
      this.$refs['modal-content'].open();
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
