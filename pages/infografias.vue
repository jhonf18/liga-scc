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
          url_image: `images/infografias/mama/cancer-de-mama.png`,
          link: '/etapas/adulto/mujer',
          alt: ''
        },
        {
          name: 'Autoexamen de mama y signos de alarma',
          url_image: `images/infografias/mama/autoexamen.png`,
          link: '/etapas/adulto/mujer'
        },
        {
          name: 'Síntomas de cáncer de próstata ',
          url_image: `images/infografias/prostata/sintomas.png`,
          link: '/etapas/adulto/hombre'
        },
        {
          name: 'Cáncer de próstata ',
          url_image: `images/infografias/prostata/cancer-de-prostata.png`,
          link: '/etapas/adulto/hombre'
        },
        {
          name: 'Cuidemos nuestra piel para evitar el cáncer',
          url_image: `images/infografias/piel/cancer-de-piel.png`,
          link: '/etapas/nino'
        },
        {
          name: 'Efectos del tabaquismo',
          url_image: `images/infografias/tabaquismo/efectos-del-tabaquismo.png`,
          link: '/etapas/adolescente'
        },
        {
          name: 'Cáncer de pulmón',
          url_image: `images/infografias/tabaquismo/cancer-de-pulmon.png`,
          link: '/etapas/adolescente'
        },
        {
          name: 'Aprende sobre el cáncer',
          url_image: `images/infografias/cancer/aprende-sobre-el-cancer.png`,
          link: '/'
        }
      ],
      url: ''
    }
  },
  head(){
    const title = 'Infografías'
    const url = `${this.$config.baseURL}/infografias`
    const description = 'Conoce sobre las generalidades de cada tipo de cáncer a traves de infografias con imágenes e información relevante.'

    const dynamicMeta = metadataDynamic({
      title,
      description,
      url
    })
    return { title, meta: [...dynamicMeta] }
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
