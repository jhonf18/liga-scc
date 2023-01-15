<template>
  <article class="card max-w-sm border rounded mx-auto mb-4 w-full">
    <div class="relative container-img s-ratio-16-9 relative rounded-tl rounded-tr">
      <span v-if="content === 'infographic'" @click="clickCard" class="cursor-pointer">
        <div
          class="block overflow-hidden absolute inset-0 box-border m-0">
          <nuxt-img
            :src="data.url_image"
            format="webp"
            :title="`Infografía ${data.name}`"
            :alt="`Infografía sobre ${data.name}`"
            :class="{ 'h-0 max-h-full' : content !== 'infographic' }"
            class="absolute top-0 left-0 w-full transition-all"
            quality="75"
            loading="lazy"/>
        </div>
      </span>
      <nuxt-link v-if="content !== 'infographic'" :to="data.link">
        <div
          class="block overflow-hidden absolute inset-0 box-border m-0">
          <nuxt-img
            :src="data.url_image"
            format="webp"
            :placeholder="[306, 180, 20]"
            quality="75"
            :title="`Juego ${data.name}`"
            :alt="`Juego sobre ${data.name}`"
            class="absolute top-0 left-0 w-full transition-all"
            loading="lazy"/>
        </div>
      </nuxt-link>
      <div
      v-if="content === 'infographic'"
      @click="clickCard"
      class="card-hover absolute cursor-pointer top-0 left-0 flex justify-center items-center text-semibold bg-gray-400/[0.6] text-white w-full h-full">
        ABRIR
      </div>
    </div>
    <div class="card-content p-4"
      :class="{'text-center': content === 'infographic'}">
      <span v-if="!data.link" @click="clickCard"
        class="text-xl text-primary h-14 line-clamp-2 font-semibold hover:underline transition-all cursor-pointer">
        {{ data.name }}
      </span>
      <nuxt-link v-if="data.link" :to="data.link"
        class="text-xl text-primary h-14 line-clamp-2 font-semibold hover:underline transition-all cursor-pointer">
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
      default: 'card',
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

.card-hover {
  display: none;
}

.container-img:hover .card-hover {
  display: flex;
}

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
