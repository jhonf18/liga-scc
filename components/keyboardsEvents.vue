<template>
  <div class="hidden"></div>
</template>

<script>
  export default {
    methods: {
      handler(e) {
        this.$emit('keydown', e);
      },
      destroyEvents() {
        window.removeEventListener('keydown', this.handler);
      }
    },
    mounted() {
      if (process.client) {
        window.addEventListener('keydown', this.handler);
      }
    },
    beforeDestroy() {
      this.destroyEvents()
    }
  }
</script>
