<template>
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
          <div
            class="cards grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
            <div v-for="(card, index) in cards"
            :key="`${card.name}-${index}`"
            :class="card.class">
              <div
                class="card mx-auto cursor-pointer h-28 w-28 sm:h-44 sm:w-44"
                @click="clickCard(card.button, index)"
                :id="card.button">
                <div class="front flex justify-center items-center"
                  :style="{
                    backgroundImage: 'url(' + card.image + ')',
                    backgroundSize: card.backgroundSize }">
                    <p class="hidden sm:text-lg">{{ card.name }}</p>
                  </div>
              </div>
              <div class="text-center leading-3">
                <span class="text-xs font-semibold md:text-white md:bg-pink-500 md:px-1 md:py-1">{{ card.name }}</span>
              </div>
            </div>
          </div>
            <div class="mt-8 max-w-xl mx-auto">
              <transition mode="out-in">
                <Button
                  v-if="!gameStarted"
                  @click="startGame"
                  key="button-1"
                  variant="primary" class="!bg-pink-500 !hover:bg-pink-600" size="block">
                  Comenzar
                </Button>
                <Button
                  v-else
                  variant="primary"
                  key="button-2"
                  class="!bg-pink-500 !hover:bg-pink-600" size="block">
                  Jugando ...
                </Button>
              </transition>
            </div>
          <!-- <div class="cards grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6"> -->
        </div>
      </transition>
    </div>
    <Modal
      id="modal-finished-playgame"
      target="modal-finished-playgame"
      ref="modal-finished-playgame"
      :title="modal.title"
      @close="resetGame"
      :footer="false">
        <p class="text-center fonf-semibold text-xl">
          {{ modal.text }}
        </p>
      <div class="flex justify-center items-center mt-8">
        <Button @click="clickToResetGame" size="md" variant="outline-primary">
          Volver a jugar
        </Button>
      </div>
    </Modal>
  </main>
</template>

<script>
import { getIndexOfElementInArray, suffleArray } from '~/helpers';


let cards = [
  {
    name: 'Observar con brazos abajo',
    image: require('~/static/images/playgames/simon-dice/paso-1.png'),
    button: 1,
    class: [],
    backgroundSize: '105%'
  },
  {
    name: 'Observar con brazos en el cuello',
    image: require('~/static/images/playgames/simon-dice/paso-2.png'),
    button: 2,
    class: [],
    backgroundSize: '103%'
  },
  {
    name: 'Observar con brazos en la cintura',
    image: require('~/static/images/playgames/simon-dice/paso-3.png'),
    button: 3,
    class: [],
    backgroundSize: '101%'
  },
  {
    name: 'Palpar con un brazo en el cuello',
    image: require('~/static/images/playgames/simon-dice/paso-4.png'),
    button: 4,
    class: [],
    backgroundSize: '105%'
  },
  {
    name: 'Palpar acostada',
    image: require('~/static/images/playgames/simon-dice/paso-5.png'),
    button: 5,
    class: [],
    backgroundSize: '105%'
  },
  {
    name: 'Hacer presión en el pezón',
    image: require('~/static/images/playgames/simon-dice/paso-6.png'),
    button: 6,
    class: [],
    backgroundSize: '117%'
  },
]

cards = suffleArray(cards)

export default {
  data() {
    return {
      step: 1,
      cards: [],
      canPlay: false,
      counter: 0,
      score: 0,
      sequence: [],
      modal: {
        title: '',
        text: ''
      },
      gameStarted: false
    }
  },
  mounted(){
    if(process.client) {
      this.$ga.page(this.$router)
    }
  },
  created() {
    this.cards = suffleArray(cards);
  },
  methods: {
    async clickCard(button, index) {
      if (!this.canPlay) {
        console.log('No puedes jugar');
        return;
      } else {
        this.canPlay = false;
        const ok = this.compareSequenceOfUserwithOriginal(button);
        if (ok) {
          await this.onAndOfButton(index, 200);
          if (this.counter >= this.sequence.length - 1) {
            this.score++;
            await this.sleep(100)
            await this.cpuTurn();
          } else {
            this.counter++;
          }
          this.canPlay = true;
        } else {
          this.modal = {
            title: 'Haz perdido',
            text: 'Aún te faltan pasos del autoexamen por aprender, pero no te preocupes puedes volver a intentarlo cuando quieras'
          }
          this.gameStarted = false;
          this.$refs['modal-finished-playgame'].open()
        }
      }
    },
    compareSequenceOfUserwithOriginal(button){
      return this.cards[this.sequence[this.counter]].button == button;
    },
    clickToResetGame() {
      this.$refs['modal-finished-playgame'].closeByButton();
    },
    resetGame() {
      this.cards =[];
      const newCards = suffleArray(cards);
      for (let i = 0; i < 6; i++) {
        this.cards.push(newCards[i]);
      }

      this.sequence = [];
      this.canPlay = false;
      this.counter = 0;
    },
    async cpuTurn() {
      if (this.sequence.length === 6) {
        this.modal = {
          title: '¡Felicitaciones!',
          text: 'Te haz aprendido los pasos correctamente. Puedes volver a repasarlos si prefieres'
        }
        this.gameStarted = false;
        this.$refs['modal-finished-playgame'].open();
      } else {
        this.canPlay = false;
        this.addButtonToSequence()
        await this.playSequence()
      }
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
      this.gameStarted = true;
      this.playSequence()
    },
    async playSequence(){
      for (const index of this.sequence) {
        await this.onAndOfButton(index, 500);
      }
    },
    async onAndOfButton(index, duration) {
      this.canPlay = false;

      this.playSound( this.cards[index].button )
      this.cards[index].class = ['brightness-[1.35]']
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


.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}

</style>
