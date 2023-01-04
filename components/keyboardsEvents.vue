<template>
  <div class="hidden"></div>
</template>

<script>
  export default {
    methods: {
      handler(e) {
        this.$emit('keydown', e);
      },
      handlerKeyUp(e) {
        this.$emit('keyup', e);
      },
      destroyEvents() {
        window.removeEventListener('keydown', this.handler);
        window.removeEventListener('keyup', this.handlerKeyUp);
      }
    },
    mounted() {
      if (process.client) {
        window.addEventListener('keydown', this.handler);
        window.addEventListener('keyup', this.handlerKeyUp);
      }
    },
    beforeDestroy() {
      this.destroyEvents()
    }
  }
</script>
