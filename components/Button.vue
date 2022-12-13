<template>
  <component
    :is="tag"
    :to="to"
    class="button"
    :class="`button-${variant} button-${size} flex justify-center` "
    @click="$emit('click')"
    >
    <span class="flex justify-center">
      <slot></slot>
    </span>
  </component>
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      required: false,
      default: ''
    },
    variant: {
      type: String,
      required: false,
      default: 'default'
    },
    size: {
      type: String,
      required: false,
      default: 'md'
    }
  },
  data(){
    return {
      tag: 'span'
    }
  },
  mounted() {
    if (this.to !== '') {
      this.tag = 'nuxt-link'
    }
  }
}
</script>
