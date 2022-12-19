<template>
  <div class="flex flex-wrap">
    <div class="w-full">
      <ul class="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row">
        <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
          <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal cursor-pointer"
            v-on:click="toggleTabs(1)"
            v-bind:class="{'text-tertiary bg-white': openTab !== 1, 'text-white bg-tertiary': openTab === 1}">
            Videos
          </a>
        </li>
        <li class="-mb-px mr-2 last:mr-0 flex-auto text-center cursor-pointer">
          <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal"
            v-on:click="toggleTabs(2)"
            v-bind:class="{'text-tertiary bg-white': openTab !== 2, 'text-white bg-tertiary': openTab === 2}">
            Juegos
          </a>
        </li>
        <li class="-mb-px mr-2 last:mr-0 flex-auto text-center cursor-pointer">
          <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal"
            v-on:click="toggleTabs(3)"
            v-bind:class="{'text-tertiary bg-white': openTab !== 3, 'text-white bg-tertiary': openTab === 3}">
            Infografías
          </a>
        </li>
      </ul>
      <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div class="px-4 py-5 flex-auto">
          <div class="tab-content tab-space">
            <div v-bind:class="{'hidden': openTab !== 1, 'block': openTab === 1}">
            <div class="container-video">
              <div

                class="container-video cursor-pointer h-full flex justify-center items-center">
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

            </div>
            <div v-bind:class="{'hidden': openTab !== 3, 'block': openTab === 3}">
              <p>

              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      openTab: 1
    }
  },
  methods: {
    toggleTabs: function(tabNumber){
      this.openTab = tabNumber
    }
  }
}
</script>


<style lang="postcss" scoped>
.container-video {
  background: url('https://licancerbucaramanga.org/wp-content/uploads/2021/06/Fachada-1.jpg?id=13704');
  position: relative;
  min-height: 16rem;
}

.filter-container {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: #282b5360;
}

.wrapper {
  position: relative;
  width: 150px;
  height: 150px;
  margin: 0 auto;
}
.wrapper .circle {
  width: 100px;
  height: 100px;
  position: absolute;
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
</style>
