<template>
  <main>
    <h1 class="text-2xl sm:text-4xl font-bold text-primary text-center">
      Ahorcado
    </h1>
    <div class="container mx-auto max-w-4xl p-4 mt-8 border rounded px-4 py-5 shadow-lg w-full-1rem transition duration-500"
    :class="{ 'bg-blue-600': step === 3,
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
          <h4 class="font-semibold">
          Elije la categoría en la cual quieres jugar
        </h4>
        <ul class="mt-6">
          <li
            @click="e => selectResponse(category, e, i)"
            class="border rounded p-2 mb-3 cursor-pointer hover:bg-gray-200 hover:border-gray-300 transition"
            v-for="(category, i) in categories" :key="i">
            <span class="font-bold text-primary mr-1" v-if="i === 0">A.</span>
            <span class="font-bold text-primary mr-1" v-else-if="i == 1">B.</span>
            <span class="font-bold text-primary mr-1" v-else>C.</span>
            {{ category.name }}
          </li>
        </ul>
        </div>
        <div v-if="step === 3" key="step-3">
          <h3 class="text-center text-2xl sm:text-4xl text-white font-semibold mb-4 mt-4">
            ¿Qué tanto sabes sobre el cáncer de próstata?
          </h3>

          <div style="max-width: 17rem"
          class="max-w-10 py-1 bg-blue-300 flex items-center rounded border border-blue-400 mb-2 mt-6">
            <RightIcon />
            <h4 class="text-center text-base sm:text-xl text-gray-700 font-semibold">
            {{ categorySelected.name }}
          </h4>
          </div>

          <div class="text-center">
            <h3
              class="text-xl font-semibold">
              Palabra: <br>
              <p
                style="letter-spacing: 2px; text-align: justify; text-justify: inter-word; max-width: 17rem"
                class="mx-auto text-2xl" >
                {{ displayWord() }}
              </p>
            </h3>
            <!-- <p class="text-xl text-red-500">
              Remaining attempts: {{remainingAttempts}}
              </p> -->
            <br>
            <img
              class="max-w-14 sm:max-w-17 mx-auto h-auto" :src="imagePath()" alt="Imagen del ahorcado">
          </div>

          <div class="font-semibold mt-4">
            Intentos: {{ remainingAttempts }}
          </div>


          <div class="grid grid-cols-6 sm:grid-cols-9 lg:grid-cols-12 gap-3 text-center mt-6">
            <button
              v-for="(letter, index) in letters"
              :key="index"
              :disabled="letter.disabled"
              @click="attemptWithLetter(letter.letter, index)"
              class="button bg-blue-300 hover:bg-blue-400 text-black"
              :class="{ 'bg-gray-400 hover:bg-gray-400 !cursor-none': letter.disabled }">
                {{ letter.letter }}
              </button>
          </div>


          <div class="mt-8 max-w-xl mx-auto">
            <Button variant="primary" size="block" class="mb-3" @click="generateNewWord">
              Nueva palabra
            </Button>
            <Button variant="tertiary" size="block" @click="step = 2">
              Cambiar de categoría
            </Button>
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
    <Toast ref="toast" :type="toast.type" :visible-time="toast.visibleTime">
      <p>
        {{ toast.text }}
      </p>
    </Toast>
  </main>
</template>

<script>

const MAX_ATTEMPTS = 6;
const MASK_CHAR = '_';
const ALPHABET = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";


const categories = [
  {
    name: 'Síntomas',
    namedCategory: 'síntoma',
    words: ['Dolor al orinar', 'Dificultad para orinar', 'Sangre en la orina', 'Sangre en el semen']
    //words: ['Sangre en el semen']
  },
  {
    name: 'Factores de riesgo',
    namedCategory: 'factor de riesgo',
    words: ['Edad', 'Raza', 'Antecedentes familiares']
  },
  {
    name: 'Exámenes de detección',
    namedCategory: 'examen de detección',
    words: ['Tacto rectal', 'Antígeno prostático', 'Biopsia']
  }
]

export default {
  components: {
     RightIcon: () => import('@/static/icons/right.svg?inline'),
  },
  data() {
    return {
      modal: {},
      step: 1,
      categories: JSON.parse(JSON.stringify(categories)),
      letters: [],
      hiddenWord: [],
      remainingAttempts: 6,
      categorySelected: {
        name: '',
        words: []
      },
      toast: {
        visibleTime: 3,
        text: '',
        type: 'error'
      },
      currentWord: {
        text: '',
        index: 0
      }
    }
  },
  methods: {
    resetGame() {
      this.resetAttempts();
      this.chooseWord();
      this.setupKeys();
    },
    selectResponse(category, event) {
      event.currentTarget.classList.remove('hover:bg-gray-200', 'hover:border-gray-300')
      event.currentTarget.classList.add('border-green-700', 'bg-green-400', 'hover:bg-green-500', 'hover:border-green-800');

      this.step = 3;
      this.categorySelected = category;
      this.resetGame()
    },
    generateNewWord() {
      if (this.categorySelected.words.length > 1) {
        this.categorySelected.words.splice(this.currentWord.index, 1);
        this.toast.type = 'success'
        this.toast.visibleTime = 3;
        this.toast.text = 'Se ha generado una nueva palabra para que sigas jugando'
        this.$refs['toast'].show()
        this.resetGame();
      } else {
        this.toast.type = 'success'
        this.toast.visibleTime = 3;
        this.toast.text = 'Ya haz completado todas las imágenes de esta categoría, cambia de categoría para seguir jugando.'
        this.$refs['toast'].show()
      }
    },
    chooseWord() {
      const index = Math.floor(Math.random() * this.categorySelected.words.length)
      let word = this.categorySelected.words[index];
      this.currentWord.text = word;
      this.currentWord.index = index;

      this.prepareWord(word);
    },
    prepareWord(word) {
      word = word.toUpperCase();
      const hiddenWord = [];
      for (const letter of word) {
          hiddenWord.push({
            letter,
            hidden: true,
          });
      }
      this.hiddenWord = hiddenWord;
    },
    displayWord() {
      let displayedWord = "";
      for (const letter of this.hiddenWord) {
        if (letter.letter === ' ') {
          displayedWord += ' ';
        } else {
          if (letter.hidden) {
            displayedWord += MASK_CHAR;
          } else {
            displayedWord += letter.letter;
          }
        }
        displayedWord += "";
      }
      return displayedWord;
    },
    setupKeys() {
      // We make a dictionary from the letters
      for (let i = 0; i < ALPHABET.length; i++) {
        const letter = ALPHABET[i]
        this.$set(this.letters, i, {
            letter,
            disabled: false, // We disable it when the user clicks on it
        });
      }
    },
    resetAttempts() {
      this.remainingAttempts = MAX_ATTEMPTS;
    },
    clickToResetGame(){
      this.$refs['modal-finished-playgame'].closeByButton();
    },
    imagePath() {
      return require(`~/static/images/hangman/Ahorcado-${MAX_ATTEMPTS - this.remainingAttempts}.png`);
    },
    letterExistsInWord(searchedLetter) {
      for (const letter of this.hiddenWord) {
        if (letter.letter === searchedLetter) {
          return true;
        }
      }
      return false;
    },
    discoverLetter(letter) {
      for (const index in this.hiddenWord) {
        if (this.hiddenWord[index].letter === letter) {
          this.hiddenWord[index].hidden = false;
        }
      }
    },
    attemptWithLetter(letter, index) {
      this.$set(this.letters[index], 'disabled', true );

      if (!this.letterExistsInWord(letter)) {
        // the user failed
        this.remainingAttempts -= 1;
        this.playSound('fail')
        this.toast.text = 'Haz fallado. Te quedan ' + this.remainingAttempts + ' intentos.'
        this.toast.type = 'error'
        this.toast.visibleTime = 2;
        this.$refs['toast'].show();
      } else {
        // its ok
        this.playSound('correct')
        this.toast.text = 'Vas muy bien, sigue así.'
        this.toast.type = 'success'
        this.toast.visibleTime = 2;
        this.$refs['toast'].show();
        this.discoverLetter(letter);
      }
      this.checkGameStatus();
    },
    playSound(type){
      let sound;
      if (type === 'correct') {
        sound = require('@/assets/sounds/correct.mp3').default;
      } else if (type === 'fail') {
        sound = require('@/assets/sounds/fail.mp3').default;
      }
      const audio = new Audio(sound);
      audio.play();
    },
    playerWins() {
      // If there's at least a hidden letter, the player hasn't win yet
      for (const letter of this.hiddenWord) {
        if (letter.letter !== ' ') {
          if (letter.hidden) {
            return false;
          }
        }
      }
      return true;
    },
    playerLoses() {
      return this.remainingAttempts <= 0;
    },
    getUnhiddenWord() {
      let word = "";
      for (const letter of this.hiddenWord) {
        word += letter.letter;
      }
      return word;
    },
    checkGameStatus() {
      if (this.playerWins()) {
        let text = 'Encontraste un nuevo ' + this.categorySelected.namedCategory
        this.modal =  {
          title: '¡Haz ganado!',
          text: text
        }
        this.$refs['modal-finished-playgame'].open()
        //this.resetGame();
      }
      if (this.playerLoses()) {
        this.modal =  {
          title: 'Fallaste',
          text: 'El ' + this.categorySelected.namedCategory + ' es ' + this.getUnhiddenWord()
        }
        this.$refs['modal-finished-playgame'].open()
        // the player lose
        //console.log(this.getUnhiddenWord());
        //Swal.fire("You lose. The word was " + this.getUnhiddenWord());
        //this.resetGame();
      }
    }
  }
}
</script>


<style lang="postcss" scoped>
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
