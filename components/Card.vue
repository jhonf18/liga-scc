<template>
  <article class="card max-w-sm border rounded mx-auto mb-4 w-full">
    <div class="container-img s-ratio-16-9 relative rounded-tl rounded-tr">
      <span v-if="content === 'infographic'" @click="clickCard" class="cursor-pointer">
        <div
          class="block overflow-hidden absolute inset-0 box-border m-0">
          <img
            :src="data.url_image"
            alt="Juego sobre el cáncer de piel"
            :class="{ 'h-0 max-h-full' : content !== 'infographic' }"
            class="absolute top-0 left-0 w-full transition-all">
        </div>
      </span>
      <nuxt-link v-if="content !== 'infographic'" :to="data.link">
        <div
          class="block overflow-hidden absolute inset-0 box-border m-0">
          <img
            :src="data.url_image"
            alt="Juego sobre el cáncer de piel"
            class="absolute top-0 left-0 w-full transition-all">
        </div>
      </nuxt-link>
    </div>
    <div class="card-content p-4">
      <span v-if="!data.link" @click="clickCard"
        class="text-xl text-primary font-semibold hover:underline transition-all cursor-pointer">
        {{ data.name }}
      </span>
      <nuxt-link v-if="data.link" :to="data.link"
        class="text-xl text-primary font-semibold hover:underline transition-all cursor-pointer">
        {{ data.name }}
      </nuxt-link>
      <p class="line-clamp-4 text-gray-800" :title="data.description">
        {{ data.description }}
      </p>
    </div>
  </article>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    },
    content: {
      type: String,
      required: false
    }
  },
  methods: {
    clickCard(card) {
      this.$emit('clickCard');
    }
  }
}
</script>

<style lang="postcss" scoped>
.card-img:hover img {
  transform: scale(1.1);
}

.s-ratio-16-9 {
  width: 100%;
  height: 0;
  overflow: hidden;
  padding-bottom: 56.25%;
}

.container-img img {
  position: absolute;
    inset: 0px;
    box-sizing: border-box;
    padding: 0px;
    border: none;
    margin: auto;
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
