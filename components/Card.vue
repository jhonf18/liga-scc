<template>
  <div class="card max-w-sm border rounded mx-auto mb-4">
    <nuxt-link :to="data.link">
      <div class="card-img overflow-hidden cursor-pointer h-44 sm:h-56 relative">
        <img
          :src="data.url_image"
          alt="Juego sobre el cáncer de piel"
          class="absolute top-0 left-0 w-full transition-all">
      </div>
    </nuxt-link>
    <div class="card-content p-4">
      <nuxt-link :to="data.link"
        class="text-xl text-primary font-semibold hover:underline transition-all">
        {{ data.name }}
      </nuxt-link>
      <p class="text-xs md:text-sm md:h-28 h-32 text-gray-800 leading-5">
        {{ data.description }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="postcss" scoped>
.card-img:hover img {
  transform: scale(1.1);
}
</style>
