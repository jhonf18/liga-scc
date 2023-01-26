<template>
  <div class="flex flex-wrap">
    <div class="w-full">
      <ul class="flex mb-0 list-none flex-wrap pt-3 flex-row">
        <li class="-mb-px last:mr-0 flex-auto text-center">
          <a target="#" class=" flex items-center h-full justify-center text-xs font-bold uppercase px-5 py-3 rounded-tl border-l border-t block leading-normal cursor-pointer"
            v-on:click="toggleTabs(1)"
            v-bind:class="{'text-tertiary bg-white': openTab !== 1, 'text-white bg-tertiary': openTab === 1}">
            <VideoIcon class="icon" style="width: 30px" :class="{'!text-gray-200': openTab === 1}" />
            Videos
          </a>
        </li>
        <li class="-mb-px last:mr-0 flex-auto text-center cursor-pointer">
          <a target="#" class=" flex items-center h-full justify-center text-xs font-bold uppercase px-5 py-3  border-r border-t block leading-normal"
            v-on:click="toggleTabs(3)"
            v-bind:class="{'text-tertiary bg-white': openTab !== 3, 'text-white bg-tertiary': openTab === 3}">
            <PictureIcon class="icon" style="width: 21px" :class="{'!text-gray-200': openTab === 3}"/>
            Infografías
          </a>
        </li>
        <li class="-mb-px last:mr-0 flex-auto text-center cursor-pointer">
          <a target="#" class=" flex items-center h-full justify-center text-xs font-bold uppercase px-5 py-3 rounded-tr border-l border-r border-t block leading-normal"
            v-on:click="toggleTabs(2)"
            v-bind:class="{'text-tertiary bg-white': openTab !== 2, '!text-white bg-tertiary': openTab === 2}">
            <PlayGamesIcon class="icon" style="width: 30px" :class="{'!text-gray-200': openTab === 2}"/>
            Juegos
          </a>
        </li>
      </ul>
      <div
        :class="{ '!pt-0': openTab === 1 }"
        class="relative flex flex-col pt-4 min-w-0 border-t break-words bg-white w-full mb-6 shadow-lg">
        <div class="flex-auto">
          <div class="tab-content tab-space">
            <div v-bind:class="{'hidden': openTab !== 1, 'block': openTab === 1}">
            <div class="">
              <div
                @click="openVideo"
                class="mx-auto tab-content-preview-video w-full cursor-pointer flex justify-center items-center"
                >
                <div class="relative container-img s-ratio-16-9 relative rounded-tl rounded-tr">
                  <div
                    class="block overflow-hidden absolute inset-0 box-border m-0">
                    <nuxt-img
                      :src="data.url_preview_video"
                      format="png"
                      :title="`Miniatura de video de ${data.title}`"
                      :alt="`Miniatura de video de ${data.title}`"
                      class="absolute top-0 left-0 w-full transition-all"
                      quality="100"
                      loading="lazy"/>
                  </div>
                </div>
                <div class="filter-container"></div>
                <div class="wrapper">
                  <div class="circle pulse"></div>
                  <div class="circle">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                      <polygon points="40,30 65,50 40,70"></polygon>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            </div>
            <div v-bind:class="{'hidden': openTab !== 2, 'block': openTab === 2}">
              <div class="md:grid md:grid-cols-2 md:gap-2 lg:gap-4 p-4">
                <Card v-for="(playGame, i) in data.play_games"
                  :key="i"
                  :data="playGame">
                </Card>
              </div>
            </div>
            <div v-bind:class="{'hidden': openTab !== 3, 'block': openTab === 3}">
              <div class="md:grid md:grid-cols-2 md:gap-2 lg:gap-4 p-4">
                <Card v-for="(infographic, i) in data.infographics"
                  :key="'infographic-' + i"
                  content="infographic"
                  :data="infographic"
                  @clickCard="openInfographic(infographic)">
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Modal
      id="modal-content-video"
      ref="modal-content-video"
      target="modal-content-video"
      type="iframe"
      :link-multimedia="data.url_video"
      />

      <Modal
      id="content-infographic"
      ref="content-infographic"
      target="content-infographic"
      type="image"
      :link-multimedia="url_infographic"
      />
  </div>
</template>

<script>
export default {
  components: {
    PlayGamesIcon: () => import('@/static/icons/play-games.svg?inline'),
    VideoIcon: () => import('@/static/icons/video.svg?inline'),
    PictureIcon: () => import('@/static/icons/picture.svg?inline')
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      openTab: 1,
      url_infographic: ''
    }
  },
  methods: {
    toggleTabs: function(tabNumber){
      this.openTab = tabNumber
    },
    openVideo() {
      this.$refs['modal-content-video'].open()
    },
    openInfographic(infographic) {
      this.url_infographic = infographic.url_image;
      this.$refs['content-infographic'].open()
    }
  }
}
</script>


<style lang="postcss" scoped>
.container-video {
  position: relative;
  min-height: 24rem;
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
  background-color: #282b531e;
}

.tab-content-preview-video:hover .filter-container {
  background-color: #282b5328;
}

.container-video:hover .filter-container {
  background-color: #282b5373;
}

.container-video:hover .filter-content {
  display: flex;
}

.filter-content {
  display: none;
}


.wrapper {
  position: absolute;
  height: 90px;
  width: 90px;
  margin: 0 auto;
}
.wrapper .circle {
  position: absolute;
  height: 65px;
  width: 65px;
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


@media (min-width: 768px) {
  .wrapper {
    height: 120px;
    width: 120px;
  }

  .wrapper .circle {
    height: 80px;
    width: 80px;
  }
}

@media (min-width: 1024px) {
  .wrapper {
    height: 150px;
    width: 150px;
  }

  .wrapper .circle {
    height: 100px;
    width: 100px;
  }
}


.icon {
  @apply hidden sm:block mr-2 fill-current text-gray-700;
}

</style>
