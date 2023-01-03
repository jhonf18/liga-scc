<template>
<!--   <portal v-if="isOpen" :to="target"> -->
    <div
      v-if="isOpen"
      class="modal-outer transition-all duration-300 delay-300"
      @keypress.esc="isOpen = false">
      <div
        :id="id"
        :ref="`backdrop-${id}`"
        class="modal-backdrop"
        :aria-labelledby="`modal-title-${id}`"
        :aria-describedby="`modal-body-${id}`"
        @click="close">
        <div
          v-if="type !== 'text'"
          class="p-2 rounded-full bg-gray-200 absolute top-10 right-10 font-semibold transition-all duration-300 delay-150 cursor-pointer -mr-2 -mt-2 -mb-2 text-md ml-auto hover:rotate-180"
          @click="closeByButton">
          <CloseIcon width="24" height="24" />
        </div>
        <div
          class="modal transition-all duration-300" role="dialog"
          :style="[type === 'image' ? {'overflow': 'auto'} : {}]"
          :class="{
            'animate-show-modal': isOpen,
            'animate-hide-modal': !isOpen,
            'max-w-md': size === 'sm' && type === 'text',
            'max-w-lg': size === 'md' && type === 'text',
            'max-w-3xl': size === 'lg' && type === 'text',
            'max-w-4xl': size === 'xl' && type === 'text',
            'max-w-5xl': type !== 'text',
            'scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-400 scrollbar-track-gray-200': type === 'image'
          }">
          <header v-if="type === 'text'" class="modal-header">
            <h5
              :id="`modal-title-${id}`"
              class="md:text-xl text-lg font-semibold leading-normal">
              <slot name="header">
                {{ title }}
              </slot>
            </h5>
            <div
              class="p-2 font-semibold transition-all duration-300 delay-150 cursor-pointer -mr-2 -mt-2 -mb-2 text-md ml-auto hover:rotate-180"
              @click="closeByButton">
              <CloseIcon width="24" height="24" />
            </div>
          </header>
          <div
            v-if="type === 'text'"
            :id="`modal-body-${id}`"
            :ref="`modal-body-${id}`"
            :style="stylesModalBody"
            class="modal-body scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-200 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-500 dark:scrollbar-track-gray-400">
            <slot></slot>
          </div>
          <div v-if="type === 'iframe'" class="container-iframe">
            <iframe
              class="iframe"
              :src="linkMultimedia"
              allowfullscreen frameborder="0"></iframe>
          </div>
          <div v-if="type === 'image'" >
            <img :src="linkMultimedia" alt="Infografía sobre el cáncer">
          </div>
          <div  v-if="footer && type === 'text'" class="modal-footer">
            <button
              type="button"
              class="bg-red-700 px-4 py-1 ml-auto text-white rounded"
              @click="closeByButton">
              {{ textFooter }}
            </button>
          </div>
        </div>
      </div>
    </div>
<!--   </portal> -->
</template>

<script>
export default {
  components: {
    CloseIcon: () => import('@/static/icons/x.svg?inline')
  },
  props: {
    size: {
      type: String,
      required: false,
      default: 'md'
    },
    id: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: false,
      default: ''
    },
    footer: {
      type: Boolean,
      required: false,
      default: true
    },
    textFooter: {
      type: String,
      required: false,
      default: 'Salir'
    },
    target: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: false,
      default: 'text'
    },
    linkMultimedia: {
      type: String,
      required: false,
      default: ''
    }
  },
  data() {
    return {
      isOpen: false,
      stylesModalBody: {
        maxHeight: '100%'
      }
    }
  },
  destroyed() {
    document.body.classList.remove('overflow-hidden')
    document.removeEventListener('keydown', this.handlerEscape)
  },
  mounted() {
    document.addEventListener('keydown', this.handlerEscape)
  },
  methods: {
    open() {
      document.body.classList.add('overflow-hidden')
      this.isOpen = true
      this.$nextTick(() => {
        if (!this.footer) {
          this.stylesModalBody.maxHeight = 'calc(100vh - 1rem - 63px)'
        }
      })
    },
    hide(type) {
      if (type !== 'login' && type !== 'register' ) document.body.classList.remove('overflow-hidden')
      this.isOpen = false
    },
    close(e) {
      if (e.target === this.$refs[`backdrop-${this.id}`]) {
        this.isOpen = false
        document.body.classList.remove('overflow-hidden')
        this.$emit('close')
      }
    },
    closeByButton() {
      this.isOpen = false
      document.body.classList.remove('overflow-hidden')
      this.$emit('close')
    },
    handlerEscape(e) {
      if (e && e.key === 'Escape') {
        this.closeByButton()
      }
    }
  }
}
</script>

<style lang="postcss" scoped>

.iframe {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  border: 0;
}

.container-iframe {
  position: relative;
  height: 0;
  padding: 29%;
}

.modal-outer {
  @apply fixed w-screen h-screen left-0 top-0 z-30 overflow-hidden;
}

.modal-backdrop {
  background-color: rgba(0,0,0,.5);
  @apply flex items-center w-screen h-screen transition-all;
}

.modal {
  @apply bg-light-background w-full-1rem lg:w-full max-h-1rem m-auto rounded overflow-hidden;
}

.animate-show-modal {
  animation: show-modal .5s;
}

@keyframes show-modal {
  from {
    transform: translateY(-100vh)
  }
  to {
    transform: translateY(0);
  }
}

.animate-hide-modal {
  animation: hide-modal .5s;
}

@keyframes hide-modal {
  from {
    transform: translateY(0)
  }
  to {
    transform: translateY(-100vh);
  }
}

.hide-modal {
  transform: translateY(-100vh);
}

.show-modal {
  transform: none;
}

.modal-header {
  @apply flex items-start p-4 justify-between border-b border-gray-300;
}

.modal-body {
  @apply p-4;
}

.modal-footer {
  @apply flex px-4 pb-2;
}

.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity .5s ease;
}
.modal-fade-leave-active {
  transition-delay: 10s;
}

</style>
