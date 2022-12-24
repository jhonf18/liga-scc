<template>
  <article class="card max-w-sm border rounded mx-auto mb-4">
    <div class="container-img s-ratio-16-9 relative rounded-tl rounded-tr">
      <nuxt-link :to="data.link">
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
      <nuxt-link :to="data.link"
        class="text-xl text-primary font-semibold hover:underline transition-all">
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
    height: 0px;
    min-width: 100%;
    max-width: 100%;
    min-height: 100%;
    max-height: 100%;
    filter: none;
    background-size: cover;
    background-image: none;
    background-position: 0% 0%;
}



</style>
