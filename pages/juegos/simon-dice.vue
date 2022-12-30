<template>
  <!-- TODO: deshabilitar boton de comenzar, mostrar mensaje al finalizar ya sea ganado o perdido -->
  <!-- TODO: poner boton al terminar el tricky de volver a jugar y deshabilitar el juego -->
  <main class="py-6 sm:py-4">
    <h1 class="text-2xl sm:text-4xl font-bold text-primary text-center">
      Simón dice
    </h1>
    <div class="container mx-auto max-w-4xl p-4 mt-8 border rounded px-4 py-5 shadow-lg w-full-1rem transition duration-500"
    :class="{ 'bg-pink-300': step === 3,
    'px-12': step === 3 }">
      <transition name="slide" mode="out-in">
        <div v-if="step === 1" key="step-1">
          <h3 class="text-center text-xl sm:text-2xl font-semibold mb-8">
          Instrucciones de juego
          </h3>
          <p class="mt-4 text-sm sm:text-base">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit nihil quaerat iste fugiat quidem, nesciunt quasi quia harum tempore illum doloribus impedit assumenda eaque, quibusdam sunt natus deleniti, praesentium optio?
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus aliquam, cupiditate, delectus magnam ut doloremque odit adipisci nihil blanditiis suscipit deleniti quasi ad porro reprehenderit explicabo quod vitae eveniet quidem.
          </p>
          <div class="text-right mt-8 flex justify-end">
            <Button size="lg" variant="tertiary" @click="step = 2">SIGUIENTE</Button>
          </div>
        </div>
        <div v-if="step === 2" key="step-2">
          <p class="text-center font-semibold max-w-2xl mx-auto mt-6 mb-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. A eum quibusdam deserunt aliquam odit. Magnam in dolore cupiditate tenetur, nulla impedit ipsa veniam aut, suscipit, magni quo quod explicabo quia.
          </p>
          <div class="text-right mt-8 flex justify-end">
            <Button size="lg" variant="tertiary" @click="step = 3">SIGUIENTE</Button>
          </div>
        </div>
        <div v-if="step === 3" key="step-3">
          <h3 class="text-center text-2xl sm:text-4xl text-white font-semibold mb-4 mt-4">
            Aprende hacerte el autoexamen
          </h3>
          <div class="cards grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
            <div
              class="card mx-auto cursor-pointer h-28 w-28 sm:h-44 sm:w-44"
              v-for="(card, index) in cards"
              :key="`${card.name}-${index}`"
              @click="clickCard(card.button, index)"
              :id="card.button">
              <div class="back"></div>
              <div class="front flex justify-center items-center"
                :class="card.class"
                :style="{
                  backgroundImage: 'url(' + card.image + ')',
                  backgroundSize: card.backgroundSize }">
                  <p class="hidden sm:text-lg">{{ card.name }}</p>
                </div>
            </div>
          </div>
          <div class="mt-8 max-w-xl mx-auto">
            <Button
              @click="startGame"
              variant="primary" class="!bg-pink-500" size="block">
              Comenzar
            </Button>
          </div>
        </div>
      </transition>
    </div>
  </main>
</template>

<script>
import { getIndexOfElementInArray, suffleArray } from '~/helpers';


let cards = [
  {
    name: 'Imagen 1.1',
    image: require('~/static/images/playgames/simon-dice/paso-1.png'),
    button: 1,
    class: {},
    backgroundSize: '105%'
  },
  {
    name: 'Imagen 1.2',
    image: require('~/static/images/playgames/simon-dice/paso-2.png'),
    button: 2,
    class: {},
    backgroundSize: '103%'
  },
  {
    name: 'Imagen 1.3',
    image: require('~/static/images/playgames/simon-dice/paso-3.png'),
    button: 3,
    class: {},
    backgroundSize: '101%'
  },
  {
    name: 'Imagen 1.1',
    image: require('~/static/images/playgames/simon-dice/paso-4.png'),
    button: 4,
    class: {},
    backgroundSize: '105%'
  },
  {
    name: 'Imagen 1.2',
    image: require('~/static/images/playgames/simon-dice/paso-5.png'),
    button: 5,
    class: {},
    backgroundSize: '105%'
  },
  {
    name: 'Imagen 1.3',
    image: require('~/static/images/playgames/simon-dice/paso-6.png'),
    button: 6,
    class: {},
    backgroundSize: '117%'
  },
]

cards = suffleArray(cards)

export default {
  data() {
    return {
      step: 1,
      cards: cards,
      canPlay: false,
      counter: 0,
      score: 0,
      sequence: []
    }
  },
  methods: {
    async clickCard(button, index) {
      if (!this.canPlay) {
        console.log('No puedes jugar');
        return;
      } else {
        this.canPlay = false;
        console.log(button)
        console.log(this.sequence, this.counter)
        const ok = this.compareSequenceOfUserwithOriginal(button);
        if (ok) {
          await this.onAndOfButton(index, 100);
          if (this.counter >= this.sequence.length - 1) {
            this.score++;
            await this.sleep(500)
            await this.cpuTurn();
          } else {
            this.counter++;
          }
          this.canPlay = true;
        } else {
          alert('Haz perdido');
        }
      }
    },
    compareSequenceOfUserwithOriginal(button){
      return this.cards[this.sequence[this.counter]].button == button;
    },
    async cpuTurn() {
      this.canPlay = false;
      this.addButtonToSequence()
      await this.playSequence()
    },
    addButtonToSequence() {
      const length = this.sequence.length;
      const index = getIndexOfElementInArray(this.cards, 'object', 'button', length + 1);
      this.sequence.push(index);
      this.counter = 0;
      this.canPlay = true;
    },
    startGame() {
      const index = getIndexOfElementInArray(this.cards, 'object', 'button', 1);
      this.sequence.push(index);
      this.playSequence()
    },
    async playSequence(){
      for (const index of this.sequence) {
        await this.onAndOfButton(index, 200);
      }
    },
    async onAndOfButton(index, duration) {
      this.canPlay = false;
      //const index = getIndexOfElementInArray(this.cards, 'object', 'button', button);

      this.playSound( this.cards[index].button )
      this.cards[index].class = ['brightness-125']
      await this.sleep(duration)
      this.cards[index].class = ['']
      await this.sleep(duration)
      this.canPlay = true
    },
    sleep(m) {
      return new Promise(r  => setTimeout(r, m));
    },
    playSound(nameSound) {
      const audioFile = require(`@/assets/sounds/${nameSound}.mp3`).default

      const audio = new Audio(audioFile);
      if (nameSound !== 5 || nameSound !== 6 ) {
        audio.volume = 0.7;
      }
      audio.play();
    }
  }
}
</script>

<style lang="postcss" scoped>


.cards .card {
  position: relative;
  display: inline-block;
  transition: opacity 0.5s;
  @apply rounded-full;
}
.cards .card .front {
  border-radius: 5px;
  @apply rounded-full;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: #f7f7f7;
  backface-visibility: hidden;
  transform: translateZ(0);
  transition: transform 0.6s;
  transform-style: preserve-3d;
  background-size: 110%;
  background-repeat: no-repeat;
  background-position: top center;
  background-size: cover;
  @apply rounded-full;
  box-shadow:inset 0px 0px 0px 5px #ec4899;
}


.slide-enter {
  transform: translateX(100%);
  opacity: 0;
}
.slide-enter-to { transform: translateX(0), }
.slide-slide-enter-active { position: absolute }

.slide-leave { transform: translateX(0) }
.slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active { transition: all .35s linear }
</style>
