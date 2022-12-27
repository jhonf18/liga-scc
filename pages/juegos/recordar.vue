<template>
  <div class="py-6 sm:py-4">
    <h1 class="text-2xl sm:text-4xl font-bold text-primary text-center">Recuerda</h1>
    <div class="mt-8 container mx-auto max-w-4xl border rounded px-4 py-5 shadow-lg w-full-1rem transition duration-500"
    :class="{ 'bg-pink-400': step === 2 }" >
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
          <h3 class="text-center text-2xl sm:text-4xl text-white font-semibold mb-4 mt-4">
            Identifica los signos de alarma y vence al cáncer de mama
          </h3>
          <div class="info mb-4">
            <div><span class="label">Tiempo:</span><span class="value">{{ time }} </span></div>
            <div><span class="label">Intentos:</span><span class="value">{{ turns }} </span></div>
          </div>
          <div class="cards grid grid-cols-2 sm:grid-cols-3  lg:grid-cols-4 gap-4">
            <div
              class="card mx-auto border-pink-700 cursor-pointer h-32 w-32 sm:h-44 sm:w-44"
              v-for="(card, index) in cards"
              :key="`${card.name}-${index}`"
              :class="{ flipped: card.flipped, found: card.found }" @click="flipCard(card)">
              <div class="back"></div>
              <div class="front flex justify-center items-center"
                :style="{ backgroundImage: 'url(' + card.image + ')' }">
                  <p class="hidden sm:text-lg">{{ card.name }}</p>
                </div>
            </div>
          </div>
        </div>
      </transition>
    </div>

    <Modal
      id="modal-finished-playgame"
      target="modal-finished-playgame"
      ref="modal-finished-playgame"
      title="¡Ganaste!"
      :footer="false">
        <p class="text-center fonf-semibold text-xl">
        Haz vencido al cáncer con una puntuación de:  <strong> {{ score }} </strong>
      </p>
      <div class="flex justify-center items-center mt-8">
        <Button @click="resetGame()" size="md" variant="outline-primary">
          Volver a jugar
        </Button>
      </div>
    </Modal>

    <Modal
      id="modal-recordar"
      target="modal-recordar"
      ref="modal-recordar"
      title="Responde para avanzar"
      :footer="false"
      >
      <h4 class="font-semibold">
        {{ modal.question }}
      </h4>
      <ul class="mt-6">
        <li
          @click="e => selectResponse(response.correct, e, i)"
          class="border rounded p-2 mb-3 cursor-pointer hover:bg-gray-200 hover:border-gray-300 transition"
          v-for="(response, i) in modal.responses" :key="i">
          <span class="font-bold text-primary mr-1" v-if="i === 0">A.</span>
          <span class="font-bold text-primary mr-1" v-else-if="i == 1">B.</span>
          <span class="font-bold text-primary mr-1" v-else-if="i == 2">C.</span>
          <span class="font-bold text-primary mr-1" v-else>D.</span>
          {{ response.text }}
        </li>
      </ul>
    </Modal>


    <Toast ref="toast-recordar" :type="toast.type" :visibleTime="toast.visibleTime">
      <p>{{ toast.message }}</p>
    </Toast>

  </div>
</template>

<script>
import { getIndexOfElementInArray, suffleArray } from '~/helpers';

export default {
  data() {
    return {
      showSplash: false,
      cards: [],
      card: {},
      started: false,
      startTime: 0,
      turns: 0,
      flipBackTimer: null,
      timer: null,
      time: "--:--",
      score: 0,
      modal: {
        question: 'Identifica el signo de alarma',
        responses: []
      },
      toast: {
        visibleTime: 3,
        type: 'error',
        message: ''
      },
      step: 1
    }
  },
  methods: {
    resetGame() {
      const cards = [
        { name: 'Masas', image: require('@/static/images/playgames/sintomas-mama/Imagen1.png') },
        { name: 'Secreción', image: require('@/static/images/playgames/sintomas-mama/Imagen2.png') },
        { name: 'Engrosamiento de piel', image: require('@/static/images/playgames/sintomas-mama/Imagen3.png') },
        { name: 'Enrojecimiento', image: require('@/static/images/playgames/sintomas-mama/Imagen4.png') },
        { name: 'Hendiduras', image: require('@/static/images/playgames/sintomas-mama/Imagen5.png') },
        { name: 'Piel de naranja', image: require('@/static/images/playgames/sintomas-mama/Imagen6.png') },
        { name: 'Cambios en el pezón', image: require('@/static/images/playgames/sintomas-mama/Imagen7.png') },
        { name: 'Asimetría', image: require('@/static/images/playgames/sintomas-mama/Imagen8.png') },
      ];

      this.$refs['modal-finished-playgame'].closeByButton();
			const cardsTypes = suffleArray(cards.concat(cards));
			// const cardsTypes = cards.concat(cards);

			this.turns = 0;
			this.score = 0;
			this.started = false;
			this.startTime = 0;
      this.time = "--:--";

			cardsTypes.forEach( cardType => {
				cardType.flipped = false;
				cardType.found = false;
			});

			this.cards = JSON.parse(JSON.stringify(cardsTypes));
    },
    flippedCards() {
      return this.cards.filter(card => card.flipped)
    },
    sameFlippedCard() {
      let flippedCards = this.flippedCards();
			if (flippedCards.length == 2) {
				if (flippedCards[0].name == flippedCards[1].name)
					return true;
			}
    },
    setCardFounds() {
			this.cards.forEach( card => {
				if (card.flipped)
					card.found = true;
			});
		},
    checkAllFound() {
			let foundCards = this.cards.filter(card => card.found);
			if (foundCards.length == this.cards.length)
				return true;
		},
    startGame() {
			this.started = true;
			this.startTime = this.$moment();

			this.timer = setInterval(() => {
				this.time = this.$moment(this.$moment().diff(this.startTime)).format("mm:ss");
			}, 1000);
		},
    finishGame() {
			this.started = false;
			clearInterval(this.timer);
			let score = 1000 - (this.$moment().diff(this.startTime, 'seconds') - 8 * 5) * 3 - (this.turns - 8) * 5;
			this.score = Math.max(score, 0);
			this.$refs['modal-finished-playgame'].open();
		},
    continousFlipCard(card) {
      this.flipBackTimer = setTimeout( ()=> {
        this.clearFlipBackTimer();
        this.setCardFounds();
        this.clearFlips();

        if (this.checkAllFound()) {
          this.finishGame();
        }

      }, 200);
    },
    flipCard(card) {
			if (card.found || card.flipped) return;

			if (!this.started) {
				this.startGame();
			}

			let flipCount = this.flippedCards().length;

      if (flipCount == 0) {
				card.flipped = !card.flipped;
			}
			else if (flipCount == 1) {
				card.flipped = !card.flipped;
				this.turns += 1;

				if (this.sameFlippedCard()) {
					// Match!

          // Realizar pregunta
          let responses = [
            'Masas',
            'Secreción',
            'Engrosamiento de piel',
            'Enrojecimiento',
            'Hendiduras',
            'Piel de naranja',
            'Cambios en el pezón',
            'Asimetría'
          ];

          const indexResponse = getIndexOfElementInArray(responses, 'plane', '', card.name);
          responses.splice(indexResponse, 1)

          const responses2 = suffleArray(responses);

          const responsesModal = suffleArray([
            { text: responses2[0] },
            { text: responses2[1] },
            { text: responses2[2] },
            { text: card.name, correct: true }
           ]);

          this.modal.responses = responsesModal;
          this.$refs['modal-recordar'].open();
          this.card = card;
				}
				else {
					// Wrong match
					this.flipBackTimer = setTimeout( ()=> {
						this.clearFlipBackTimer();
						this.clearFlips();
					}, 1000);
				}
			}
		},
		clearFlips() {
			this.cards.map(card => card.flipped = false);
		},
		clearFlipBackTimer() {
			clearTimeout(this.flipBackTimer);
			this.flipBackTimer = null;
		},
    selectResponse( response, event ) {

      event.currentTarget.classList.remove('hover:bg-gray-200', 'hover:border-gray-300')
      if (!response) {
        this.toast.type = 'error';
        this.toast.message = 'La respuesta ha sido incorrecta. Pero no te preocupes, tienes más oportunidades para identificar el signo.'
        event.currentTarget.classList.add('border-red-700', 'bg-red-400', 'hover:bg-red-500', 'hover:border-red-800');
        this.clearFlipBackTimer();
        this.clearFlips();
      } else {
        this.toast.type = 'success';
        this.toast.message = 'La respuesta ha sido correcta ¡Sigue así!'
        event.currentTarget.classList.add('border-green-700', 'bg-green-400', 'hover:bg-green-500', 'hover:border-green-800');
        //continue
        this.continousFlipCard(this.card)
      }

      this.$refs['modal-recordar'].closeByButton();
      this.$refs['toast-recordar'].show();
    }
  },
  mounted() {
    this.resetGame();
  }
}
</script>


<style lang="postcss" scoped>

#app {
  background-color: antiquewhite;
}

.info {
  text-align: center;
  padding-bottom: 1em;
  border-bottom: 1px solid #555;
}
.info > div {
  display: inline-block;
  width: 200px;
}
.info > div .label {
  margin-right: 5px;
}
.info > div .value {
  font-weight: bold;
}

.cards .card {
  position: relative;
  display: inline-block;
  transition: opacity 0.5s;
  @apply rounded-full;
}
.cards .card .front, .cards .card .back {
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
}
.cards .card .back {
  background-image: url("@/static/images/playgames/logo-cancer-recordar.jpeg");
  background-size: 50%;
  background-position: center;
  background-repeat: no-repeat;
  font-size: 12px;
  @apply rounded-full border-pink-700 border-2;
}
.cards .card .front {
  transform: rotateY(-180deg);
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
    @apply rounded-full;
}
.cards .card.flipped .back, .cards .card.found .back {
  transform: rotateY(180deg);
}
.cards .card.flipped .front, .cards .card.found .front {
  transform: rotateY(0deg);
}

.cards .card.found {
  opacity: 0.6;
}

.cards .card.found p {
  background-color: #80808069;
  width: 100%;
  height: 100%;
  @apply rounded-full;
  position: absolute;
  top: 0;
  left: 0;
  color: #fff;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.splash {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.splash .overlay {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.719);
}
.splash .content {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 400px;
  height: 200px;
  margin: auto;
  text-align: center;
  background-color: rgba(51, 51, 51, 0.9);
  -moz-border-radius: 10px;
  -webkit-border-radius: 10px;
  border-radius: 10px;
  -moz-box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.8);
  -webkit-box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.8);
  box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.8);
  padding: 1em;
}
.splash .content .title {
  font-size: 1.8em;
  padding: 0.5em;
}
.splash .content .score {
  padding: 0.5em;
}
.splash .content button {
  margin-top: 1.0em;
  background-color: #444;
  padding: 5px 20px;
  -moz-border-radius: 4px;
  -webkit-border-radius: 4px;
  border-radius: 4px;
  border: 1px solid #555;
  color: White;
  font-size: 1.4em;
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
