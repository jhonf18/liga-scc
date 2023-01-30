<template>
  <div>
    <main class="mt-12 mb-4 mx-auto sm:mb-12 p-6 sm:container sm:p-0 lg:p-4">
      <h1
        class="text-center text-3xl sm:text-5xl font-bold mb-12 text-primary uppercase"
        :class="{ 'title-children-color': $route.path === '/etapas/ninos' }"
      >
        {{ data.title }}
      </h1>
      <div class="md:grid md:grid-cols-5 md:gap-4">
        <div
          class="relative container-img s-ratio-16-9 relative rounded-tl rounded-tr col-span-3 md:ml-4"
        >
          <div class="block overflow-hidden absolute inset-0 box-border m-0">
            <nuxt-img
              :src="data.url_principal_image"
              format="webp"
              :title="`${data.title}`"
              :alt="`Infografía sobre ${data.title}`"
              class="absolute top-0 left-0 w-full transition-all"
              quality="75"
              loading="lazy"
            />
          </div>
        </div>
        <div
          class="container-info mt-4 md:mt-0 col-span-2 md:p-4 text-justify leading-7"
        >
          <div>
            <h2
              class="text-xl sm:text-2xl md:text-3xl font-medium text-center"
              :class="{
                'subtitle-children-color': $route.path === '/etapas/ninos',
              }"
            >
              ¿Qué es el {{ data.title }}?
            </h2>
            <p
              class="mt-6 lg:mt-8 mb-8"
              :class="{
                'strong-children-color': $route.path === '/etapas/ninos',
              }"
              v-html="data.paragraph_1"
            ></p>
            <p class="mt-4">
              {{ data.paragraph_2 }}
            </p>
          </div>
        </div>
      </div>
    </main>

    <div>
      <div class="border-t border-gray-400 w-2/5 h-1 mx-auto"></div>
      <div class="border-t border-gray-400 w-1/5 h-1 mx-auto mt-4"></div>
    </div>

    <section class="p-6 sm:mt-12 sm:container sm:p-0 lg:p-4 mx-auto md:mt-8">
      <h2
        class="text-2xl sm:text-4xl font-bold text-primary text-center uppercase"
      >
        {{ data.second_title }}
      </h2>
      <div class="max-w-screen-lg mx-auto mt-12">
        <Tabs :data="data" />
      </div>
    </section>

    <Modal
      id="modal-content"
      ref="modal-content"
      target="modal-content"
      type="image"
      :link-multimedia="data.url_principal_image"
    >
    </Modal>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  methods: {
    openContent() {
      this.$refs["modal-content"].open();
    },
  },
};
</script>

<style lang="postcss" scoped>
.container-video {
  position: relative;
  transition: all 0.4s;
  min-height: 14rem;
}

.container-video:hover .filter-container {
  background-color: #282b5363;
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
  background-color: #282b535b;
}

.filter-content {
  display: none;
}

.container-img img {
  position: absolute;
  inset: 0px;
  box-sizing: border-box;
  padding: 0px;
  border: none;
  /* margin: auto; */
  display: block;
  width: 0px;
  min-width: 100%;
  max-width: 100%;
  min-height: 100%;
  filter: none;
  background-size: cover;
  background-image: none;
  background-position: 0% 0%;
}
</style>
